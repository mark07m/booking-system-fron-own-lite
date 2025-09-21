import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function HomePage() {
  // Check if user is authenticated via cookies
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  
  if (authToken) {
    // User is authenticated, redirect to dashboard
    redirect("/dashboard");
  } else {
    // User is not authenticated, redirect to login
    redirect("/login");
  }
}
