"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Eye } from "lucide-react"

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase()
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain className="h-6 w-6 text-blue-500" />
  } else if (conditionLower.includes('snow')) {
    return <CloudSnow className="h-6 w-6 text-blue-300" />
  } else if (conditionLower.includes('cloud')) {
    return <Cloud className="h-6 w-6 text-gray-500" />
  } else {
    return <Sun className="h-6 w-6 text-yellow-500" />
  }
}

const getWeatherAdvice = (condition: string, temperature: number) => {
  const conditionLower = condition.toLowerCase()
  
  if (conditionLower.includes('rain')) {
    return {
      advice: "Good time for planting and soil preparation",
      color: "bg-blue-100 text-blue-800",
      icon: "🌧️"
    }
  } else if (temperature > 35) {
    return {
      advice: "Ensure adequate irrigation and shade",
      color: "bg-orange-100 text-orange-800",
      icon: "☀️"
    }
  } else if (temperature < 15) {
    return {
      advice: "Protect sensitive crops from cold",
      color: "bg-blue-100 text-blue-800",
      icon: "❄️"
    }
  } else {
    return {
      advice: "Ideal conditions for most farming activities",
      color: "bg-green-100 text-green-800",
      icon: "🌱"
    }
  }
}

export default function WeatherWidget() {
  const { weather, setWeather } = useAppStore()
  const [loading, setLoading] = useState(false)

  // Mock weather data - in a real app, this would come from a weather API
  const mockWeatherData = {
    location: "Punjab, India",
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    description: "Partly Cloudy",
    forecast: [
      { date: "2025-09-16", high: 32, low: 22, condition: "Sunny" },
      { date: "2025-09-17", high: 30, low: 20, condition: "Partly Cloudy" },
      { date: "2025-09-18", high: 28, low: 18, condition: "Light Rain" },
      { date: "2025-09-19", high: 26, low: 16, condition: "Cloudy" },
      { date: "2025-09-20", high: 29, low: 19, condition: "Sunny" }
    ]
  }

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setWeather(mockWeatherData)
        setLoading(false)
      }, 1000)
    }

    if (!weather) {
      fetchWeather()
    }
  }, [weather, setWeather])

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) return null

  const advice = getWeatherAdvice(weather.description, weather.temperature)

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          Weather Forecast
        </CardTitle>
        <p className="text-sm text-muted-foreground">{weather.location}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.description)}
            <div>
              <div className="text-2xl font-bold">{weather.temperature}°C</div>
              <div className="text-sm text-muted-foreground">{weather.description}</div>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4" />
              {weather.humidity}%
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-4 w-4" />
              {weather.windSpeed} km/h
            </div>
          </div>
        </div>

        {/* Farming Advice */}
        <div className={`p-3 rounded-lg ${advice.color}`}>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>{advice.icon}</span>
            <span>Farming Tip:</span>
          </div>
          <p className="text-sm mt-1">{advice.advice}</p>
        </div>

        {/* 5-Day Forecast */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">5-Day Forecast</h4>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {getWeatherIcon(day.condition)}
                  <span className="font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{day.low}°</span>
                  <div className="w-12 h-1 bg-muted rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${Math.min(((day.high - day.low) / 20) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <span className="font-medium">{day.high}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        {weather.temperature > 35 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-orange-800">
              <Thermometer className="h-4 w-4" />
              <span className="text-sm font-medium">Heat Alert</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              High temperatures detected. Ensure adequate irrigation and provide shade for sensitive crops.
            </p>
          </div>
        )}

        {weather.description.toLowerCase().includes('rain') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-800">
              <CloudRain className="h-4 w-4" />
              <span className="text-sm font-medium">Rain Alert</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Rain expected. Good time for planting and soil preparation. Avoid heavy machinery on wet soil.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
