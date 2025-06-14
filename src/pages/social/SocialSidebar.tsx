import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { User, Users, Trophy, BarChart2, Settings, UserPlus } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

const pages = [
  { title: "Мои друзья", to: "/social/friends", icon: Users },
  { title: "Лидерборд", to: "/social/leaderboard", icon: Trophy },
  { title: "Сравнение категорий", to: "/social/comparison", icon: BarChart2 },
  { title: "Пригласить", to: "/social/invite", icon: UserPlus },
  { title: "Настройки", to: "/social/settings", icon: Settings },
];

export default function SocialSidebar() {
  // We will use only the NavLink's isActive for link styling
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";
  // Collapse logic removed for compatibility
  return (
    <Sidebar className="w-60" collapsible>
      <SidebarTrigger className="m-2 self-end" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Друзья</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.to} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
