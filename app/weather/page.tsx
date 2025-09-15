"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sun, CloudRain, Thermometer, Wind } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/container"

const API_KEY = "2f745fa85d563da5adb87b6cd4b81caf"

export default function WeatherPage() {
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchWeather = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            if (!res.ok) throw new Error("City not found")
            const data = await res.json()
            setWeather(data)
        } catch (err: any) {
            setError(err.message || "Error fetching weather")
            setWeather(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
            <Container className="py-6">
                <div className="mb-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition mb-2">
                        <ArrowLeft className="h-5 w-5" /> Back
                    </Link>
                </div>
                <Card className="w-full max-w-lg mx-auto shadow-xl border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sun className="h-5 w-5 text-yellow-500" />
                            Weather Forecast
                        </CardTitle>
                        <CardDescription>Get the latest weather forecast for your city.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={e => { e.preventDefault(); fetchWeather() }}>
                            <div>
                                <label className="block mb-1 font-medium">Enter City Name</label>
                                <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full border rounded p-2" placeholder="e.g. Delhi" />
                            </div>
                            <Button type="submit" className="w-full mt-2" disabled={loading || !city}>Get Forecast</Button>
                        </form>
                        {loading && <div className="mt-4 text-center text-muted-foreground">Loading...</div>}
                        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
                        {weather && (
                            <div className="mt-6 space-y-2 text-center">
                                <div className="text-2xl font-bold">{weather.name}, {weather.sys.country}</div>
                                <div className="flex justify-center gap-4 text-lg">
                                    <Thermometer className="h-5 w-5 text-blue-500" /> {weather.main.temp}°C
                                    <CloudRain className="h-5 w-5 text-blue-400" /> {weather.weather[0].main}
                                    <Wind className="h-5 w-5 text-gray-500" /> {weather.wind.speed} m/s
                                </div>
                                <div className="text-sm text-muted-foreground">Humidity: {weather.main.humidity}%</div>
                                <div className="text-sm text-muted-foreground">Min: {weather.main.temp_min}°C • Max: {weather.main.temp_max}°C</div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}
