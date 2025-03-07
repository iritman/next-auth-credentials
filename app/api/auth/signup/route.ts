import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/app/lib/validationSchema";

export async function POST(request: NextRequest) {
  try {
    // Extract and validate request body
    const body = await request.json();
    const validatedData = signupSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { firstName, lastName, username, password } = validatedData.data;

    // Check if username already exists
    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password: hashedPassword,
      },
    });

    // Return success response with user data (excluding password)
    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
    });
  } catch (error) {
    // Log error and return generic error response
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
