import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import ShaderBackground from "@/components/ui/shader-background";
import { TopNav } from "@/components/layout/TopNav";


interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="relative min-h-screen flex flex-col">
                <ShaderBackground />
                <TopNav />
                <main className="flex-1 container py-6">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
}
