"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Search, Settings, User } from "lucide-react";
import { useWeather } from "@/components/weather/weather-context";

export function TopNav() {
    const [value, setValue] = useState("");
    const { fetchWeather } = useWeather();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <a className="mr-6 flex items-center space-x-2" href="/">
                        <span className="hidden font-bold sm:inline-block">
                            WeatherApp
                        </span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (value.trim()) {
                                    fetchWeather(value);
                                    setValue("");
                                }
                            }}
                            className="relative"
                        >
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search city..."
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8 md:w-[300px] lg:w-[400px]"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </form>
                    </div>
                    <nav className="flex items-center space-x-2">
                        <ModeToggle />
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/settings">
                                <Settings className="h-4 w-4" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
