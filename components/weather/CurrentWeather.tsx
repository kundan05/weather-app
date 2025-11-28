"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Droplets, Wind, Thermometer } from "lucide-react";
import { useWeather } from "@/components/weather/weather-context";
import { Skeleton } from "@/components/ui/skeleton";

export function CurrentWeather() {
    const { weather, loading, error, unit } = useWeather();

    if (loading) {
        return (
            <Card className="w-full backdrop-blur-md bg-background/40 border-primary/10">
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-48" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-24 w-24 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                            <Skeleton className="h-16 w-32" />
                            <Skeleton className="h-16 w-32" />
                            <Skeleton className="h-16 w-32" />
                            <Skeleton className="h-16 w-32" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full border-red-500/50 bg-red-500/10">
                <CardContent className="pt-6 text-center text-red-500">
                    <p>Error: {error}</p>
                    <p className="text-sm mt-2">Please try searching for a different city.</p>
                </CardContent>
            </Card>
        );
    }

    if (!weather) return null;

    return (
        <Card className="w-full backdrop-blur-md bg-background/40 border-primary/10">
            <CardHeader>
                <CardTitle className="text-xl font-light text-muted-foreground">Current Weather</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-bold tracking-tight">{weather.name}</h2>
                        <div className="flex items-center justify-center md:justify-start mt-2">
                            <span className="text-7xl font-bold">{Math.round(weather.main.temp)}°</span>
                            <div className="ml-4 text-left">
                                <p className="text-xl font-medium capitalize">{weather.weather[0].description}</p>
                                <p className="text-muted-foreground">Feels like {Math.round(weather.main.feels_like)}°</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                            <Droplets className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-xs text-muted-foreground">Humidity</p>
                                <p className="font-semibold">{weather.main.humidity}%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                            <Wind className="h-5 w-5 text-slate-500" />
                            <div>
                                <p className="text-xs text-muted-foreground">Wind</p>
                                <p className="font-semibold">{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                            <Thermometer className="h-5 w-5 text-red-500" />
                            <div>
                                <p className="text-xs text-muted-foreground">Pressure</p>
                                <p className="font-semibold">{weather.main.pressure} hPa</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                            <CloudRain className="h-5 w-5 text-indigo-500" />
                            <div>
                                <p className="text-xs text-muted-foreground">Visibility</p>
                                <p className="font-semibold">{weather.visibility / 1000} km</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
