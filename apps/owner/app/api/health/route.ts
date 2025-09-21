import { NextResponse } from "next/server";

// GET /api/health - Health check endpoint
export async function GET() {
  try {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "booking-system-owner",
      version: "1.0.0"
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      { 
        status: "error", 
        timestamp: new Date().toISOString(),
        service: "booking-system-owner",
        error: "Internal server error"
      },
      { status: 500 }
    );
  }
}
