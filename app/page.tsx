import { AppShell } from "@/components/layout/AppShell";
import { CurrentWeather } from "@/components/weather/CurrentWeather";
import { HourlyForecast } from "@/components/weather/HourlyForecast";
import { DailyForecast } from "@/components/weather/DailyForecast";
import { WeatherDetails } from "@/components/weather/WeatherDetails";

export default function Home() {
  return (
    <AppShell>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <CurrentWeather />
          <HourlyForecast />
          <WeatherDetails />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <DailyForecast />
        </div>
      </div>
    </AppShell>
  );
}
