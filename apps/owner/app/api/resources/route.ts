import { NextRequest, NextResponse } from "next/server";

// Mock resources data
const mockResources = [
  {
    id: "resource-1",
    name: "Стол 1",
    description: "Столик на двоих у окна",
    category: "Ресторан",
    capacity: 2,
    price: 2500,
    isActive: true,
    images: [],
    rules: ["Не курить", "Дети до 12 лет бесплатно"],
    availability: [
      {
        id: "avail-1",
        resourceId: "resource-1",
        startTime: "09:00",
        endTime: "22:00",
        dayOfWeek: 1,
        isAvailable: true,
        price: 2500
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "resource-2",
    name: "Банкетный зал",
    description: "Просторный зал для мероприятий",
    category: "Банкет",
    capacity: 50,
    price: 5000,
    isActive: true,
    images: [],
    rules: ["Минимум 20 человек", "Депозит 50%"],
    availability: [
      {
        id: "avail-2",
        resourceId: "resource-2",
        startTime: "10:00",
        endTime: "23:00",
        dayOfWeek: 1,
        isAvailable: true,
        price: 5000
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "resource-3",
    name: "VIP 1",
    description: "Премиальная комната",
    category: "VIP",
    capacity: 8,
    price: 10000,
    isActive: true,
    images: [],
    rules: ["Только по предварительной записи", "Минимальный заказ 5000₽"],
    availability: [
      {
        id: "avail-3",
        resourceId: "resource-3",
        startTime: "18:00",
        endTime: "02:00",
        dayOfWeek: 1,
        isAvailable: true,
        price: 10000
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

// GET /api/resources - Get resources list
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
    const category = searchParams.get("category");
    const isActive = searchParams.get("isActive");

    // Filter resources
    let filteredResources = [...mockResources];
    
    if (category) {
      filteredResources = filteredResources.filter(resource => resource.category === category);
    }
    
    if (isActive !== null) {
      const activeFilter = isActive === "true";
      filteredResources = filteredResources.filter(resource => resource.isActive === activeFilter);
    }

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResources = filteredResources.slice(startIndex, endIndex);

    const total = filteredResources.length;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        data: paginatedResources,
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
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/resources - Create new resource
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

    const body = await request.json();
    const { name, description, category, capacity, price, rules } = body;

    // Validate input
    if (!name || !category || !capacity || !price) {
      return NextResponse.json(
        { error: "Name, category, capacity, and price are required" },
        { status: 400 }
      );
    }

    // Create new resource
    const newResource = {
      id: `resource-${mockResources.length + 1}`,
      name,
      description: description || "",
      category,
      capacity: parseInt(capacity),
      price: parseFloat(price),
      isActive: true,
      images: [],
      rules: rules || [],
      availability: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to mock data
    mockResources.push(newResource);

    return NextResponse.json({
      success: true,
      data: newResource
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
