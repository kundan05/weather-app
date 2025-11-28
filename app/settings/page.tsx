"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/components/weather/weather-context";
import Link from "next/link";

export default function SettingsPage() {
    const { unit, setUnit } = useWeather();

    return (
        <AppShell>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <Button variant="outline" asChild>
                        <Link href="/">Back to Dashboard</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Units</CardTitle>
                        <CardDescription>Manage your preferred units of measurement.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Temperature Unit</Label>
                                <p className="text-sm text-muted-foreground">Switch between Celsius and Fahrenheit</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={`text-sm font-medium ${unit === 'metric' ? 'text-primary' : 'text-muted-foreground'}`}>°C</span>
                                <Switch
                                    checked={unit === 'imperial'}
                                    onCheckedChange={(checked) => setUnit(checked ? 'imperial' : 'metric')}
                                />
                                <span className={`text-sm font-medium ${unit === 'imperial' ? 'text-primary' : 'text-muted-foreground'}`}>°F</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Manage weather alerts and notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Daily Forecast</Label>
                                <p className="text-sm text-muted-foreground">Receive a daily weather summary</p>
                            </div>
                            <Switch disabled />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Severe Weather Alerts</Label>
                                <p className="text-sm text-muted-foreground">Get notified about severe weather conditions</p>
                            </div>
                            <Switch defaultChecked disabled />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
