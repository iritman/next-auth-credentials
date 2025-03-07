'use client'

import { LoginInput, loginSchema } from '@/app/lib/validationSchema'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)

  // Validate form data using Zod schema
  const validateForm = (data: LoginInput) => {
    const result = loginSchema.safeParse(data)
    if (!result.success) {
      setError(result.error.issues[0].message)
      return false
    }
    return true
  }

  // Handle login process using NextAuth
  const handleLogin = async (credentials: LoginInput) => {
    try {
      // Attempt to sign in with credentials
      const response = await signIn('credentials', {
        ...credentials,
        redirect: false,
        callbackUrl: '/dashboard'
      })

      // Handle authentication errors
      if (response?.error) {
        setError('Invalid username or password')
        return false
      }

      // Handle successful login
      if (response?.ok) {
        router.push('/dashboard')
        return true
      }

      return false
    } catch (error) {
      setError('An unexpected error occurred')
      return false
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Get form data
    const formData = new FormData(e.currentTarget)
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }

    // Validate form data before submission
    if (!validateForm(data)) {
      setLoading(false)
      return
    }

    try {
      // Attempt to login
      await handleLogin(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    // Main container with centered login form
    <Box className="min-h-screen bg-gray-50">
      <Flex align="center" justify="center" className="min-h-screen">
        {/* Login form container */}
        <Flex direction="column" gap="4" className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <Text size="6" weight="bold" align="center">
            Login
          </Text>

          {/* Display error message if exists */}
          {error && (
            <Text color="red" size="2">
              {error}
            </Text>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              {/* Username input */}
              <TextField.Root
                id="username"
                name="username"
                type="text"
                required
                placeholder="Enter your username"
              />

              {/* Password input */}
              <TextField.Root
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
              />

              {/* Submit button */}
              <Button disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Flex>
          </form>

          {/* Sign up link */}
          <Text align="center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default LoginPage