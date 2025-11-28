"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, CloudSun, CloudLightning } from "lucide-react";
import { useWeather } from "@/components/weather/weather-context";
import { Skeleton } from "@/components/ui/skeleton";

export function DailyForecast() {
    const { forecast, loading } = useWeather();

    if (loading) {
        return (
            <Card className="w-full h-full backdrop-blur-md bg-background/40 border-primary/10">
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <Skeleton className="h-4 w-12" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-4 w-16" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (!forecast) return null;

    // Filter for daily data (e.g., one entry per day, roughly every 8th item)
    const dailyData = forecast.list.filter((_, index) => index % 8 === 0);

    return (
        <Card className="w-full h-full backdrop-blur-md bg-background/40 border-primary/10">
            <CardHeader>
                <CardTitle className="text-xl font-light text-muted-foreground">5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {dailyData.map((day, index) => {
                        const date = new Date(day.dt * 1000);
                        const dayName = date.toLocaleDateString([], { weekday: 'short' });
                        return (
                            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-background/50 transition-colors">
                                <div className="w-16 font-medium">{dayName}</div>
                                <div className="flex items-center gap-2 flex-1 justify-center">
                                    {day.weather[0].main === "Clear" ? <Sun className="h-5 w-5 text-yellow-500" /> :
                                        day.weather[0].main === "Rain" ? <CloudRain className="h-5 w-5 text-blue-500" /> :
                                            <Cloud className="h-5 w-5 text-gray-500" />}
                                    <span className="text-sm text-muted-foreground hidden sm:inline-block">{day.weather[0].main}</span>
                                </div>
                                <div className="flex gap-4 w-24 justify-end">
                                    <span className="font-bold">{Math.round(day.main.temp)}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
