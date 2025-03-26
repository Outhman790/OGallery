import { AppSidebar } from "@/components/admin-dashboard-components/app-sidebar";
import { ChartAreaInteractive } from "@/components/admin-dashboard-components/chart-area-interactive";
import { DataTable } from "@/components/admin-dashboard-components/data-table";
import { SectionCards } from "@/components/admin-dashboard-components/section-cards";
import { SiteHeader } from "@/components/admin-dashboard-components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "../data.json";

export default function adminDashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
