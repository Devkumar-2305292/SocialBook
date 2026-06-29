// src/components/AppSidebar.jsx

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  Home,
  Users,
  Store,
  Tv,
  UsersRound,
  Clock,
  Bookmark,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Home",
    path: "/",
    icon: Home,
  },
  {
    title: "Friends",
    path: "/friends",
    icon: Users,
  },
  {
    title: "Marketplace",
    path: "/marketplace",
    icon: Store,
  },
  {
    title: "Watch",
    path: "/watch",
    icon: Tv,
  },
  {
    title: "Groups",
    path: "/groups",
    icon: UsersRound,
  },
  {
    title: "Memories",
    path: "/memories",
    icon: Clock,
  },
  {
    title: "Saved",
    path: "/saved",
    icon: Bookmark,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      style={{
        "--sidebar-width": "20rem",
      }}
      className="border-r relative top-10"
    >
      <SidebarContent className="pt-4 overflow-y-auto">
        <SidebarGroup>
          <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg hover:bg-accent cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">Dev Kumar</span>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : "hover:bg-accent/50"
                        }`
                      }
                    >
                      <Icon className="h-5 w-5 text-blue-500" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
