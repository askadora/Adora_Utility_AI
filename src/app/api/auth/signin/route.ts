// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

// const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // const user = await prisma.user.findUnique({
    //   where: {
    //     email
    //   }
    // });

    // if (!user) {
    //   return new NextResponse("User not found", { status: 404 });
    // }

    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //   return new NextResponse("Invalid password", { status: 401 });
    // }

    const token = sign(
      {
        // id: user.id,
        // email: user.email,
        // name: user.name,
        id: "1",
        email: email,
        name: "Test User",
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    // await prisma.session.create({
    //   data: {
    //     userId: user.id,
    //     token,
    //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    //   },
    // });

    return NextResponse.json({
      token,
      // user: {
      //   id: user.id,
      //   email: user.email,
      //   name: user.name,
      // }
    });
  } catch (error) {
    console.error("[SIGNIN_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 