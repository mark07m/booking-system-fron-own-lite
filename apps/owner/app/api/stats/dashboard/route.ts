import { NextRequest, NextResponse } from "next/server";

// GET /api/stats/dashboard - Get dashboard statistics
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

    // Mock dashboard stats
    const stats = {
      totalBookings: 156,
      totalRevenue: 425000,
      activeClients: 89,
      totalResources: 12,
      bookingsGrowth: 12.5,
      revenueGrowth: 8.3,
      clientsGrowth: 5.2,
      resourcesGrowth: 0,
      recentBookings: [
        {
          id: "BKG-1001",
          clientName: "Иван Петров",
          resourceName: "Стол 1",
          startDate: "2024-01-15T10:00:00Z",
          status: "confirmed",
          totalPrice: 2500
        },
        {
          id: "BKG-1002",
          clientName: "Мария Сидорова",
          resourceName: "Банкетный зал",
          startDate: "2024-01-16T14:00:00Z",
          status: "pending",
          totalPrice: 3000
        }
      ],
      monthlyRevenue: [
        { month: "Янв", revenue: 45000 },
        { month: "Фев", revenue: 52000 },
        { month: "Мар", revenue: 48000 },
        { month: "Апр", revenue: 61000 },
        { month: "Май", revenue: 58000 },
        { month: "Июн", revenue: 67000 }
      ],
      bookingsByStatus: {
        pending: 12,
        confirmed: 89,
        cancelled: 8,
        completed: 47
      }
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
