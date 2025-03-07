import { Box, Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <Flex direction="column" m="5">
      <Text size="6" className="font-bold text-green-700">
        Welcome to Next DB App
      </Text>

      <Box mt="5">
        <Flex gap="3">
          <Button>
            <Link href="/login">
              Login
            </Link>
          </Button>
          <Button color="red">
            <Link href="/signup">
              Signup
            </Link>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
