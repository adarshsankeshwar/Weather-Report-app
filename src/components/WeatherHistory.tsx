import { useState } from "react";
import { History, Thermometer, Droplets, Wind, CloudRain } from "lucide-react";

interface HistoryDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  windMax: number;
  precipitation: number;
  weatherCode: number;
}

interface WeatherHistoryProps {
  lat: number;
  lon: number;
  cityName: string;
}

const getWeatherLabel = (code: number): string => {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 65) return "Rain";
  if (code <= 67) return "Freezing rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  if (code <= 99) return "Thunderstorm";
  return "Unknown";
};

const getWeatherEmoji = (code: number): string => {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 65) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 99) return "⛈️";
  return "🌡️";
};

const WeatherHistory = ({ lat, lon, cityName }: WeatherHistoryProps) => {
  const [history, setHistory] = useState<HistoryDay[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    if (history) {
      setShowHistory(!showHistory);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - 1);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const fmt = (d: Date) => d.toISOString().split("T")[0];

      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${fmt(startDate)}&end_date=${fmt(endDate)}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_sum,weathercode&timezone=auto`;
      const res = await fetch(url);

      if (!res.ok) throw new Error("Failed to fetch historical weather data.");

      const data = await res.json();
      const days: HistoryDay[] = data.daily.time.map((date: string, i: number) => {
        const d = new Date(date + "T00:00:00");
        return {
          date,
          dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          windMax: Math.round(data.daily.windspeed_10m_max[i]),
          precipitation: data.daily.precipitation_sum[i],
          weatherCode: data.daily.weathercode[i],
        };
      });

      setHistory(days);
      setShowHistory(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <button
        onClick={fetchHistory}
        disabled={isLoading}
        className="w-full rounded-2xl glass-card px-5 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? (
          <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        ) : (
          <History size={16} className="text-primary" />
        )}
        {showHistory ? "Hide Previous Weather Report" : "Previous Weather Report"}
      </button>

      {error && (
        <p className="text-sm text-destructive mt-2 text-center">{error}</p>
      )}

      {showHistory && history && (
        <div className="mt-4 space-y-2 animate-fade-in">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
            Last 7 Days — {cityName}
          </h3>
          {history.map((day) => (
            <div
              key={day.date}
              className="glass-card rounded-xl p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">{getWeatherEmoji(day.weatherCode)}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {day.dayName}{" "}
                    <span className="font-normal text-muted-foreground">
                      {new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getWeatherLabel(day.weatherCode)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-1" title="Temperature">
                  <Thermometer size={14} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {day.tempMax}° / {day.tempMin}°
                  </span>
                </div>
                <div className="flex items-center gap-1" title="Wind">
                  <Wind size={14} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {day.windMax} km/h
                  </span>
                </div>
                <div className="flex items-center gap-1" title="Precipitation">
                  <CloudRain size={14} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {day.precipitation} mm
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherHistory;
