import { Droplets, Wind, Thermometer, MapPin } from "lucide-react";

export interface WeatherData {
  name: string;
  sys: { country: string };
  coord: { lat: number; lon: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: { description: string; icon: string; main: string }[];
  wind: { speed: number };
}

interface WeatherCardProps {
  data: WeatherData;
}

const StatBox = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col items-center gap-1.5 rounded-xl p-4 glass-card">
    <div className="text-primary">{icon}</div>
    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {label}
    </span>
    <span className="text-lg font-semibold text-foreground">{value}</span>
  </div>
);

const WeatherCard = ({ data }: WeatherCardProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  const description = data.weather[0].description;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);

  return (
    <div className="glass-card rounded-3xl p-8 w-full max-w-md mx-auto animate-fade-in">
      {/* Location */}
      <div className="flex items-center gap-2 mb-6">
        <MapPin size={16} className="text-primary" />
        <span className="text-lg font-semibold text-foreground">
          {data.name},{" "}
          <span className="text-muted-foreground font-normal">
            {data.sys.country}
          </span>
        </span>
      </div>

      {/* Main weather */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-7xl font-bold text-foreground glow-text leading-none">
            {temp}°
            <span className="text-3xl font-light text-muted-foreground">C</span>
          </div>
          <p className="mt-2 text-muted-foreground capitalize text-base">
            {description}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Feels like {feelsLike}°C
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={iconUrl}
            alt={description}
            className="w-28 h-28 drop-shadow-[0_0_15px_hsla(199,89%,58%,0.4)]"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-glass-border mb-6" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox
          icon={<Thermometer size={18} />}
          label="Feels Like"
          value={`${feelsLike}°C`}
        />
        <StatBox
          icon={<Droplets size={18} />}
          label="Humidity"
          value={`${data.main.humidity}%`}
        />
        <StatBox
          icon={<Wind size={18} />}
          label="Wind"
          value={`${data.wind.speed} m/s`}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
