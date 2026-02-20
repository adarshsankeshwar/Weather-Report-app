import { useState } from "react";
import { CloudSun, AlertCircle, Key } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import WeatherCard, { WeatherData } from "@/components/WeatherCard";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(
    import.meta.env.VITE_WEATHER_API_KEY || ""
  );
  const [showKeyInput, setShowKeyInput] = useState(
    !import.meta.env.VITE_WEATHER_API_KEY
  );

  const fetchWeather = async (city: string) => {
    if (!apiKey.trim()) {
      setError("Please enter your OpenWeatherMap API key first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);

      if (res.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling.`);
      }
      if (res.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      }
      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen sky-gradient flex flex-col items-center justify-start px-4 pt-16 pb-20">
      {/* Stars decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground opacity-10"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 60 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl glass-card">
            <CloudSun size={28} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight glow-text">
            WeatherScope
          </h1>
        </div>
        <p className="text-muted-foreground text-base">
          Real-time weather data for any city in the world
        </p>
      </div>

      {/* API Key Input (shown if no env key) */}
      {showKeyInput && (
        <div className="glass-card rounded-2xl p-5 w-full max-w-md mx-auto mb-6 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Key size={16} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">
              OpenWeatherMap API Key
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your API key here..."
              className="input-glass flex-1 rounded-xl px-4 py-2.5 text-sm"
            />
            <button
              onClick={() => setShowKeyInput(false)}
              disabled={!apiKey.trim()}
              className="rounded-xl bg-primary px-4 py-2.5 text-primary-foreground text-sm font-medium disabled:opacity-50"
            >
              Save
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Get a free key at{" "}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-2"
            >
              openweathermap.org
            </a>
          </p>
        </div>
      )}

      {/* Search bar */}
      <div className="w-full relative z-10 mb-8">
        <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
      </div>

      {/* Loading spinner */}
      {isLoading && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Fetching weather data…</p>
        </div>
      )}

      {/* Error message */}
      {error && !isLoading && (
        <div className="glass-card rounded-2xl p-5 w-full max-w-md mx-auto flex items-start gap-3 border-l-4 border-destructive">
          <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Error</p>
            <p className="text-sm text-muted-foreground mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Weather card */}
      {weather && !isLoading && (
        <div className="w-full">
          <WeatherCard data={weather} />
        </div>
      )}

      {/* Empty state */}
      {!weather && !isLoading && !error && (
        <div className="text-center mt-8 opacity-50">
          <CloudSun size={48} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Search for a city to see the weather
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
