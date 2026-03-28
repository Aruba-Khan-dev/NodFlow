import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  FileUp,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/nodflow_logo_clean.png";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "freelancer" | "client";
}

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "" },
  { title: "Projects", icon: FolderKanban, path: "/projects" },
  { title: "Deliverables", icon: FileUp, path: "/deliverables" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
  { title: "Profile", icon: User, path: "/profile" },
];

function SidebarInner({ role }: { role: "freelancer" | "client" }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const location = useLocation();
  const base = `/${role}`;

  const isItemActive = (itemPath: string) => {
    const fullPath = `${base}${itemPath}`;
    if (itemPath === "") {
      return location.pathname === base || location.pathname === `${base}/`;
    }
    if (itemPath === "/deliverables") {
      return location.pathname.startsWith(`${base}/deliverables`) || location.pathname.includes("/deliverable/");
    }
    if (itemPath === "/projects") {
      return (location.pathname.startsWith(`${base}/projects`) || location.pathname.startsWith(`${base}/project`)) && !location.pathname.includes("/deliverable/");
    }
    return location.pathname.startsWith(fullPath);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5">
          <img src={logo} alt="NodFlow" className="w-12 h-12 object-contain shrink-0" />
          {!collapsed && (
            <span className="font-display text-lg font-bold text-sidebar-foreground tracking-tight">
              NodFlow
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/50">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = isItemActive(item.path);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={`${base}${item.path}`}
                        end
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                          active
                            ? "text-white font-bold bg-sidebar-accent"
                            : "text-white/70 font-normal hover:bg-sidebar-accent hover:text-white"
                        )}
                        activeClassName=""
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout at bottom */}
        <div className="mt-auto px-3 pb-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 transition-all hover:bg-red-500/15 hover:text-red-400 w-full"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarInner role={role} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border bg-brand/[0.03] backdrop-blur-sm px-4 gap-4 shrink-0">
            <SidebarTrigger />
            <div className="flex-1" />
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-grid-pattern">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
