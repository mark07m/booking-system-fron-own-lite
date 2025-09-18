import { NextRequest, NextResponse } from "next/server";
import { ServerCookieManager } from "@shared/utils/cookies";

export async function POST(request: NextRequest) {
  try {
    // Get auth token for logging purposes
    const authToken = ServerCookieManager.getAuthToken(request);
    
    if (authToken) {
      // In real app: invalidate token in database/Redis
      await invalidateToken(authToken);
    }

    // Create response
    const response = NextResponse.json(
      { 
        success: true,
        message: "Logged out successfully" 
      },
      { status: 200 }
    );

    // Clear all auth cookies
    ServerCookieManager.clearAuthTokens(response);
    
    // Clear remember me cookie if exists
    response.cookies.set("remember_me", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // Clear CSRF token
    response.cookies.set("csrf_token", "", {
      maxAge: 0,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    
    // Even if there's an error, clear cookies
    const response = NextResponse.json(
      { error: "Logout completed with errors" },
      { status: 200 }
    );
    
    ServerCookieManager.clearAuthTokens(response);
    return response;
  }
}

// Helper function
async function invalidateToken(token: string): Promise<void> {
  // In real app: add token to blacklist in database/Redis
  console.log(`Invalidating token: ${token.substring(0, 20)}...`);
}
