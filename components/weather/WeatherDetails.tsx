"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sunrise, Sunset, Eye, Gauge } from "lucide-react";
import { useWeather } from "@/components/weather/weather-context";
import { Skeleton } from "@/components/ui/skeleton";

export function WeatherDetails() {
    const { weather, loading, unit } = useWeather();

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
            </div>
        );
    }

    if (!weather) return null;

    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Card className="w-full backdrop-blur-md bg-background/40 border-primary/10">
            <CardHeader>
                <CardTitle className="text-xl font-light text-muted-foreground">Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50">
                        <Sunrise className="h-8 w-8 text-orange-500 mb-2" />
                        <span className="text-sm text-muted-foreground">Sunrise</span>
                        <span className="text-lg font-bold">{formatTime(weather.sys.sunrise)}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50">
                        <Sunset className="h-8 w-8 text-indigo-500 mb-2" />
                        <span className="text-sm text-muted-foreground">Sunset</span>
                        <span className="text-lg font-bold">{formatTime(weather.sys.sunset)}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50">
                        <Eye className="h-8 w-8 text-blue-500 mb-2" />
                        <span className="text-sm text-muted-foreground">Visibility</span>
                        <span className="text-lg font-bold">
                            {unit === 'metric'
                                ? `${(weather.visibility / 1000).toFixed(1)} km`
                                : `${(weather.visibility / 1609).toFixed(1)} mi`}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50">
                        <Gauge className="h-8 w-8 text-green-500 mb-2" />
                        <span className="text-sm text-muted-foreground">Pressure</span>
                        <span className="text-lg font-bold">{weather.main.pressure} hPa</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
