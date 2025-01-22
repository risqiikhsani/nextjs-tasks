"use client"


import * as React from "react";
import { FolderIcon, GalleryVerticalEnd } from "lucide-react";

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
import Link from "next/link";
import { useParams } from "next/navigation";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      items: [
        {
          title: "Organizations",
          url: "/orgs",
        },
        {
          title: "Settings",
          url: "/settings",
        },
      ],
    },
  ],
  orgMain: [
    {
      title: "Earth",
      url: "#",
      items: [
        {
          title: "Classes",
          url: "/classes",
        },
        {
          title: "Users",
          url: "/users",
        },

        {
          title: "Q&A",
          url: "/qna",
        },
      ],
    },
    {
      title: "Main Features",
      url: "#",
      items: [
        {
          title: "Schedules",
          url: "/schedules",
        },
        {
          title: "My Classes",
          url: "/classes",
        },
        {
          title: "My Courses",
          url: "/courses",
        },
        {
          title: "My Tasks",
          url: "/tasks",
        },
        {
          title: "My Submitted Tasks",
          url: "/tasks",
        },
      ],
    },
    {
      title: "Private",
      url: "#",
      items: [
        {
          title: "Notes",
          url: "/notes",
        },
      ],
    },
    {
      title: "Admin Features",
      url: "#",
      items: [
        {
          title: "News",
          url: "/news",
        },
        {
          title: "Analytics",
          url: "/analytics",
        },
      ],
    },
    {
      title: "AI tools",
      url: "#",
      items: [
        {
          title: "ChatBot",
          url: "/chatbot",
        },
        {
          title: "Summarization",
          url: "/summarize",
        },
        {
          title: "Translation",
          url: "/translate",
        },
      ],
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const params = useParams<{ organization_id: string }>();
  console.log(params);

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
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={item.url}>
                            <FolderIcon />
                            {item.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
            {params.organization_id &&
              data.orgMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="font-medium">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={`/orgs/${params.organization_id}${item.url}`}>
                              <FolderIcon />
                              {item.title}
                            </Link>
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
