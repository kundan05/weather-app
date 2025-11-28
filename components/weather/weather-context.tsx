"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { API_KEY, API_BASE_URL } from "@/lib/api-config";

interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
        pressure: number;
        feels_like: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    visibility: number;
    coord: {
        lat: number;
        lon: number;
    };
}

interface ForecastData {
    list: {
        dt: number;
        main: {
            temp: number;
        };
        weather: {
            main: string;
            icon: string;
        }[];
        dt_txt: string;
    }[];
}

interface WeatherContextType {
    weather: WeatherData | null;
    forecast: ForecastData | null;
    loading: boolean;
    error: string | null;
    unit: "metric" | "imperial";
    setUnit: (unit: "metric" | "imperial") => void;
    fetchWeather: (city: string) => Promise<void>;
    fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [lastCity, setLastCity] = useState<string>("New York");

    const fetchWeather = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            // Fetch current weather
            const weatherRes = await fetch(
                `${API_BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
            );
            if (!weatherRes.ok) throw new Error("City not found");
            const weatherData = await weatherRes.json();
            setWeather(weatherData);

            // Fetch forecast
            const forecastRes = await fetch(
                `${API_BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
            );
            if (!forecastRes.ok) throw new Error("Forecast not found");
            const forecastData = await forecastRes.json();
            setForecast(forecastData);

            setLastCity(city);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherByCoords = async (lat: number, lon: number) => {
        setLoading(true);
        setError(null);
        try {
            // Fetch current weather
            const weatherRes = await fetch(
                `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
            );
            if (!weatherRes.ok) throw new Error("Location not found");
            const weatherData = await weatherRes.json();
            setWeather(weatherData);

            // Fetch forecast
            const forecastRes = await fetch(
                `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
            );
            if (!forecastRes.ok) throw new Error("Forecast not found");
            const forecastData = await forecastRes.json();
            setForecast(forecastData);

            setLastCity(weatherData.name);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch with Geolocation
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    // Fallback to default city if geolocation fails or is denied
                    fetchWeather("New York");
                }
            );
        } else {
            fetchWeather("New York");
        }
    }, []);

    // Refetch when unit changes
    useEffect(() => {
        if (lastCity) {
            fetchWeather(lastCity);
        }
    }, [unit]);

    return (
        <WeatherContext.Provider
            value={{ weather, forecast, loading, error, unit, setUnit, fetchWeather, fetchWeatherByCoords }}
        >
            {children}
        </WeatherContext.Provider>
    );
}

export function useWeather() {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error("useWeather must be used within a WeatherProvider");
    }
    return context;
}
