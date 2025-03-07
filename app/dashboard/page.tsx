'use client'

import { Box, Button, Card, Flex, Heading, Text, Progress } from '@radix-ui/themes'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut({ redirect: false })
        router.push('/')
    }

    if (status === 'loading') {
        return (
            <Box className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Flex direction="column" gap="4" align="center">
                    <Progress size="3" />
                    <Text size="2">Loading dashboard...</Text>
                </Flex>
            </Box>
        )
    }

    return (
        <Box className="min-h-screen bg-gray-50 p-8">
            <Flex direction="column" gap="6" className="max-w-4xl mx-auto">
                {/* Header */}
                <Flex justify="between" align="center">
                    <Heading size="8">Dashboard</Heading>
                    <Flex gap="4">
                        <Button onClick={() => router.push('/dashboard/change-password')}>
                            Change Password
                        </Button>
                        <Button color="red" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </Flex>
                </Flex>

                {/* User Info Card */}
                <Card>
                    <Flex direction="column" gap="4">
                        <Heading size="4">User Information</Heading>
                        <Flex direction="column" gap="2">
                            <Text>Username: {session?.user?.username}</Text>
                            <Text>First Name: {session?.user?.firstName}</Text>
                            <Text>Last Name: {session?.user?.lastName}</Text>
                        </Flex>
                    </Flex>
                </Card>

                {/* Welcome Message */}
                <Card>
                    <Flex direction="column" gap="2">
                        <Heading size="4">Welcome!</Heading>
                        <Text>
                            Hello, {session?.user?.firstName} {session?.user?.lastName}! You are successfully logged in.
                        </Text>
                    </Flex>
                </Card>
            </Flex>
        </Box>
    )
}

export default DashboardPage