import AppSidebar from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <SidebarProvider> 
      <AppSidebar className="mt-20"/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b mt-20">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-slate-200" />
            <div className="aspect-video rounded-xl bg-slate-200" />
            <div className="aspect-video rounded-xl bg-slate-200" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// import React, { ReactNode } from 'react'

// export default function layout({children}:{children:ReactNode}) {
//   return (
//     <div>{children}</div>
//   )
// }
