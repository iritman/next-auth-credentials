'use client'

import { changePasswordFormSchema } from '@/app/lib/validationSchema'
import { Box, Button, Flex, Heading, Link, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useState } from 'react'

const ChangePasswordPage = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setIsLoading(true)

        // Validate using schema
        const validationResult = changePasswordFormSchema.safeParse(data)
        if (!validationResult.success) {
            setError(validationResult.error.issues[0].message)
            setIsLoading(false)
            return
        }

        try {
            await axios.post('/api/auth/change-password', {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            setSuccess('Password changed successfully!');
            // Reset form
            setData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box className="min-h-screen bg-gray-50">
            <Flex align="center" justify="center" className="min-h-screen">
                <Flex direction="column" gap="4" className="w-full max-w-md p-8 bg-white rounded-lg shadow">
                    <Heading size="5">Change Password</Heading>

                    <Link href="/dashboard" className="mb-4">
                        ← Back to Dashboard
                    </Link>

                    <form onSubmit={handleSubmit}>
                        <Flex direction="column" gap="4">
                            <div className="relative">
                                <TextField.Root
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    value={data.currentPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="relative">
                                <TextField.Root
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={data.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <TextField.Root
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {error && (
                                <Text color="red" size="2">
                                    {error}
                                </Text>
                            )}

                            {success && (
                                <Text color="green" size="2">
                                    {success}
                                </Text>
                            )}

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Changing Password...' : 'Change Password'}
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </Flex >
        </Box >
    )
}

export default ChangePasswordPage 