import { DashboardHeader } from "@/src/widgets/DashboardHeader";
import { StatsCards } from "@/src/widgets/StatsCards";
import { RecentBookings } from "@/src/widgets/RecentBookings";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsCards />
      <RecentBookings />
    </div>
  );
}
