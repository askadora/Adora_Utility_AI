// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // const existingUser = await prisma.user.findUnique({
    //   where: {
    //     email
    //   }
    // });

    // if (existingUser) {
    //   return new NextResponse("User already exists", { status: 400 });
    // }

    // Hash password for future use when database operations are uncommented
    await bcrypt.hash(password, 12);

    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     name,
    //     password: hashedPassword,
    //   }
    // });

    return NextResponse.json({
      message: "User created successfully",
      // user: {
      //   id: user.id,
      //   email: user.email,
      //   name: user.name,
      // }
    });
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 