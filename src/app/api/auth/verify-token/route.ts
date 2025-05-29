import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/*
Powershell command to verify the token stored in local storage
Find token in local storage -> application on console
Invoke-WebRequest -Uri "http://localhost:3000/api/auth/verify-token" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"token":"YOUR_TOKEN_HERE"}'
*/
export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    return NextResponse.json({
      message: "Token is valid",
      userData: decoded
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
} 