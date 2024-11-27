import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Earth",
      url: "#",
      items: [
        {
          title: "Users",
          url: "#",
        },
        {
          title: "Classes",
          url: "#",
        },
        {
          title: "My Classes",
          url: "#",
        },
        {
          title: "Q&A",
          url: "#",
        },
      ],
    },
    {
      title: "Main Features",
      url: "#",
      items: [
        {
          title: "Schedules",
          url: "#",
        },
        {
          title: "Courses",
          url: "#",
        },
        {
          title: "Task",
          url: "#",
        },
        {
          title: "Submitted Task",
          url: "#",
        },
        {
          title: "Meetings",
          url: "#",
        },
      ],
    },
    {
      title: "Private",
      url: "#",
      items: [
        {
          title: "Notes",
          url: "#",
        },
        {
          title: "Bookmarks",
          url: "#",
        },
      ],
    },
    {
      title: "Admin Features",
      url: "#",
      items: [
        {
          title: "News",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
      ],
    },
    {
      title: "AI tools",
      url: "#",
      items: [
        {
          title: "ChatBot",
          url: "#",
        },
        {
          title: "Summarization",
          url: "#",
        },
        {
          title: "Translation",
          url: "#",
        },
      ],
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Version</span>
                  <span className="">v1.0.0 BETA</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
