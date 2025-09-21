import { NextRequest, NextResponse } from "next/server";
import { validateCSRFToken } from "@/shared/utils/cookies.server";

// Mock data - in real app, this would come from database
const mockBookings = [
  {
    id: "BKG-1001",
    userId: "user-1",
    resourceId: "resource-1",
    startDate: "2024-01-15T10:00:00Z",
    endDate: "2024-01-15T12:00:00Z",
    status: "confirmed",
    totalPrice: 2500,
    notes: "Столик у окна",
    specialRequests: "Без орехов",
    paymentStatus: "paid",
    paymentMethod: "card",
    paymentId: "pay_123",
    user: {
      id: "user-1",
      name: "Иван Петров",
      email: "ivan@example.com",
      phone: "+7 (999) 123-45-67"
    },
    resource: {
      id: "resource-1",
      name: "Стол 1",
      description: "Столик на двоих у окна"
    },
    client: {
      id: "client-1",
      name: "Иван Петров",
      email: "ivan@example.com",
      phone: "+7 (999) 123-45-67"
    },
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z"
  }
];

// GET /api/bookings/[id] - Get single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authToken = request.cookies.get("auth_token")?.value;
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const booking = mockBookings.find(b => b.id === id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/bookings/[id] - Update booking
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authToken = request.cookies.get("auth_token")?.value;
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // CSRF protection
    const csrfToken = request.headers.get("X-CSRF-Token");
    const expectedToken = request.cookies.get("csrf_token")?.value;
    
    if (!csrfToken || !expectedToken || !validateCSRFToken(csrfToken, expectedToken)) {
      return NextResponse.json(
        { error: "CSRF token validation failed" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    
    const bookingIndex = mockBookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Update booking
    const updatedBooking = {
      ...mockBookings[bookingIndex],
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    mockBookings[bookingIndex] = updatedBooking;

    return NextResponse.json({
      success: true,
      data: updatedBooking
    });

  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Delete booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authToken = request.cookies.get("auth_token")?.value;
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // CSRF protection
    const csrfToken = request.headers.get("X-CSRF-Token");
    const expectedToken = request.cookies.get("csrf_token")?.value;
    
    if (!csrfToken || !expectedToken || !validateCSRFToken(csrfToken, expectedToken)) {
      return NextResponse.json(
        { error: "CSRF token validation failed" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const bookingIndex = mockBookings.findIndex(b => b.id === id);
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Remove booking
    mockBookings.splice(bookingIndex, 1);

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
