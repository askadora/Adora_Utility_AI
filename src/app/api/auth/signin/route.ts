// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Dummy user for testing
    const dummyUser = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      hashedPassword: await bcrypt.hash("password123", 10)
    };

    // Commented out Prisma query
    // const user = await prisma.user.findUnique({
    //   where: { email },
    // });

    // Using dummy user instead
    const user = email === dummyUser.email ? dummyUser : null;

    if (!user || !user.hashedPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    // Commented out Prisma session creation
    // await prisma.session.create({
    //   data: {
    //     sessionToken: token,
    //     userId: user.id,
    //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    //   },
    // });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 