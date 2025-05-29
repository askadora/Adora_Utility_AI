import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const userData = await req.json();

    const token = jwt.sign(
      {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        image: userData.image
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Token creation error:", error);
    return NextResponse.json(
      { error: "Failed to create token" },
      { status: 500 }
    );
  }
} 