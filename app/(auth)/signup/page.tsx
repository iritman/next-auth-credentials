'use client'

import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'
import { SignupInput, signupSchema } from '@/app/lib/validationSchema'
import axios from 'axios'

const SignupPage = () => {
    const router = useRouter()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(false)

    const validateForm = (data: SignupInput) => {
        const result = signupSchema.safeParse(data)
        if (!result.success) {
            setError(result.error.issues[0].message)
            return false
        }
        return true
    }

    const handleSignup = async (userData: SignupInput) => {
        try {
            await axios.post('/api/auth/signup', userData)
            return true
        } catch (error: any) {
            if (error.response?.data?.error === 'Username already exists') {
                setError('Username already exists')
                return false
            }
            setError(error.response?.data?.error || 'Something went wrong')
            return false
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            username: formData.get('username') as string,
            password: formData.get('password') as string,
        }

        if (!validateForm(data)) {
            setLoading(false)
            return
        }

        try {
            const success = await handleSignup(data)
            if (success) {
                router.push("/dashboard")
            }
        } catch (error) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box className="min-h-screen bg-gray-50">
            <Flex align="center" justify="center" className="min-h-screen">
                <Flex direction="column" gap="4" className="w-full max-w-md p-8 bg-white rounded-lg shadow">
                    <Text size="6" weight="bold" align="center">
                        Sign Up
                    </Text>

                    {error && (
                        <Text color="red" size="2">
                            {error}
                        </Text>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Flex direction="column" gap="4">
                            <TextField.Root
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                placeholder="Enter your first name"
                            />

                            <TextField.Root
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                placeholder="Enter your last name"
                            />

                            <TextField.Root
                                id="username"
                                name="username"
                                type="text"
                                required
                                placeholder="Choose a username"
                            />

                            <TextField.Root
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Choose a password"
                            />

                            <Button disabled={loading}>
                                {loading ? "Signing up..." : "Sign Up"}
                            </Button>
                        </Flex>
                    </form>

                    <Text align="center">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default SignupPage

