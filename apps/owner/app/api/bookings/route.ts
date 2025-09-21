import { NextRequest, NextResponse } from "next/server";
import { validateCSRFToken } from "@/shared/utils/cookies.server";

// Mock data for demo purposes
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
  },
  {
    id: "BKG-1002",
    userId: "user-2",
    resourceId: "resource-2",
    startDate: "2024-01-16T14:00:00Z",
    endDate: "2024-01-16T16:00:00Z",
    status: "pending",
    totalPrice: 3000,
    notes: "Банкетный зал",
    specialRequests: "Декор в синих тонах",
    paymentStatus: "pending",
    paymentMethod: "cash",
    user: {
      id: "user-2",
      name: "Мария Сидорова",
      email: "maria@example.com",
      phone: "+7 (999) 234-56-78"
    },
    resource: {
      id: "resource-2",
      name: "Банкетный зал",
      description: "Просторный зал для мероприятий"
    },
    client: {
      id: "client-2",
      name: "Мария Сидорова",
      email: "maria@example.com",
      phone: "+7 (999) 234-56-78"
    },
    createdAt: "2024-01-11T09:30:00Z",
    updatedAt: "2024-01-11T09:30:00Z"
  },
  {
    id: "BKG-1003",
    userId: "user-3",
    resourceId: "resource-3",
    startDate: "2024-01-17T18:00:00Z",
    endDate: "2024-01-17T20:00:00Z",
    status: "completed",
    totalPrice: 5000,
    notes: "VIP комната",
    specialRequests: "Шампанское",
    paymentStatus: "paid",
    paymentMethod: "card",
    paymentId: "pay_124",
    user: {
      id: "user-3",
      name: "Алексей Козлов",
      email: "alex@example.com",
      phone: "+7 (999) 345-67-89"
    },
    resource: {
      id: "resource-3",
      name: "VIP 1",
      description: "Премиальная комната"
    },
    client: {
      id: "client-3",
      name: "Алексей Козлов",
      email: "alex@example.com",
      phone: "+7 (999) 345-67-89"
    },
    createdAt: "2024-01-12T10:15:00Z",
    updatedAt: "2024-01-12T10:15:00Z"
  }
];

// GET /api/bookings - Get bookings list
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authToken = request.cookies.get("auth_token")?.value;
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "desc";

    // Filter bookings
    let filteredBookings = [...mockBookings];
    
    if (status) {
      filteredBookings = filteredBookings.filter(booking => booking.status === status);
    }

    // Sort bookings
    filteredBookings.sort((a, b) => {
      const aValue = a[sort as keyof typeof a];
      const bValue = b[sort as keyof typeof b];
      
      if (order === "desc") {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

    const total = filteredBookings.length;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        data: paginatedBookings,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create new booking
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { resourceId, startDate, endDate, notes, specialRequests } = body;

    // Validate input
    if (!resourceId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Resource ID, start date, and end date are required" },
        { status: 400 }
      );
    }

    // Create new booking
    const newBooking = {
      id: `BKG-${1000 + mockBookings.length + 1}`,
      userId: "user-current", // In real app, get from auth
      resourceId,
      startDate,
      endDate,
      status: "pending",
      totalPrice: 2500, // In real app, calculate based on resource
      notes: notes || "",
      specialRequests: specialRequests || "",
      paymentStatus: "pending",
      paymentMethod: "card",
      user: {
        id: "user-current",
        name: "Текущий пользователь",
        email: "current@example.com",
        phone: "+7 (999) 000-00-00"
      },
      resource: {
        id: resourceId,
        name: "Выбранный ресурс",
        description: "Описание ресурса"
      },
      client: {
        id: "client-current",
        name: "Текущий клиент",
        email: "current@example.com",
        phone: "+7 (999) 000-00-00"
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to mock data
    mockBookings.push(newBooking);

    return NextResponse.json({
      success: true,
      data: newBooking
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
