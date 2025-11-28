"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Cloud, CloudRain, Sun, CloudSun } from "lucide-react";
import { useWeather } from "@/components/weather/weather-context";
import { Skeleton } from "@/components/ui/skeleton";

export function HourlyForecast() {
    const { forecast, loading, unit } = useWeather();

    if (loading) {
        return (
            <Card className="w-full backdrop-blur-md bg-background/40 border-primary/10">
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-2 min-w-[80px]">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-6 w-10" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!forecast) return null;

    // Get next 12 hours (approx 4 items if 3-hour steps, but let's just show first 8 items)
    const hourlyData = forecast.list.slice(0, 8);

    return (
        <Card className="w-full backdrop-blur-md bg-background/40 border-primary/10">
            <CardHeader>
                <CardTitle className="text-xl font-light text-muted-foreground">Hourly Forecast (3h steps)</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                    <div className="flex w-max space-x-4 p-4">
                        {hourlyData.map((item, index) => {
                            const date = new Date(item.dt * 1000);
                            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            return (
                                <div key={index} className="flex flex-col items-center space-y-2 p-2 min-w-[80px]">
                                    <span className="text-sm text-muted-foreground">{time}</span>
                                    {/* Simple icon mapping based on main condition */}
                                    {item.weather[0].main === "Clear" ? <Sun className="h-8 w-8 text-yellow-500" /> :
                                        item.weather[0].main === "Rain" ? <CloudRain className="h-8 w-8 text-blue-500" /> :
                                            <Cloud className="h-8 w-8 text-gray-500" />}
                                    <span className="font-bold">{Math.round(item.main.temp)}°</span>
                                </div>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
