// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    // Commented out Prisma query
    // const existingUser = await prisma.user.findUnique({
    //   where: { email },
    // });

    // Dummy check for existing user
    const existingUser = email === "test@example.com";

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Commented out Prisma user creation
    // const user = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     hashedPassword,
    //   },
    // });

    // Dummy user response
    const user = {
      id: "1",
      name,
      email,
    };

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 