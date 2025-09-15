"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import Link from "next/link"
import { ArrowLeft, BarChart2, Percent, TrendingUp, Info } from "lucide-react"
import { Container } from "@/components/container"

const cropData = {
    Rice: { pricePerAcre: 22500, costPerAcre: 12500 },
    Wheat: { pricePerAcre: 20000, costPerAcre: 11000 },
    Maize: { pricePerAcre: 18000, costPerAcre: 9000 },
    Sugarcane: { pricePerAcre: 35000, costPerAcre: 20000 },
    Cotton: { pricePerAcre: 30000, costPerAcre: 17000 },
}

export default function CropCalculatorPage() {
    const [crop, setCrop] = useState<keyof typeof cropData>("Rice")
    const [acres, setAcres] = useState(2)
    const [marketPrice, setMarketPrice] = useState(0)
    const [customCost, setCustomCost] = useState(0)
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [result, setResult] = useState<{ revenue: number; cost: number; profit: number; margin: number; roi: number } | null>(null)

    const handleCalculate = () => {
        const data = cropData[crop]
        const price = marketPrice > 0 ? marketPrice : data.pricePerAcre
        const cost = customCost > 0 ? customCost : data.costPerAcre
        const revenue = price * acres
        const totalCost = cost * acres
        const profit = revenue - cost
        const margin = Math.round((profit / revenue) * 100)
        const roi = totalCost > 0 ? Math.round((profit / totalCost) * 100) : 0
        setResult({ revenue, cost, profit, margin, roi })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
            <Container className="py-6">
                <div className="mb-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition mb-2">
                        <ArrowLeft className="h-5 w-5" /> Back
                    </Link>
                </div>
                <Card className="w-full max-w-md mx-auto shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-green-600" />
                            Crop Profit Calculator
                        </CardTitle>
                        <CardDescription>Calculate potential profits for different crops based on your land area and market prices.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleCalculate() }}>
                            <div>
                                <label className="block mb-1 font-medium">Select Crop</label>
                                <select value={crop} onChange={e => setCrop(e.target.value as keyof typeof cropData)} className="w-full border rounded p-2">
                                    {Object.keys(cropData).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Land Area (acres)</label>
                                <input type="number" min={1} value={acres} onChange={e => setAcres(Number(e.target.value))} className="w-full border rounded p-2" />
                            </div>
                            <Button type="button" variant="outline" className="w-full" onClick={() => setShowAdvanced(v => !v)}>
                                <BarChart2 className="h-4 w-4 mr-2" /> {showAdvanced ? "Hide" : "Show"} Advanced Options
                            </Button>
                            {showAdvanced && (
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <label className="block mb-1 font-medium">Custom Market Price (per acre)</label>
                                        <input type="number" min={0} value={marketPrice} onChange={e => setMarketPrice(Number(e.target.value))} className="w-full border rounded p-2" placeholder={`Default: ₹${cropData[crop].pricePerAcre}`} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Custom Cost (per acre)</label>
                                        <input type="number" min={0} value={customCost} onChange={e => setCustomCost(Number(e.target.value))} className="w-full border rounded p-2" placeholder={`Default: ₹${cropData[crop].costPerAcre}`} />
                                    </div>
                                </div>
                            )}
                            <Button type="submit" className="w-full mt-2">Calculate Profit</Button>
                        </form>
                        {result && (
                            <div className="mt-6 space-y-2">
                                <div className="text-lg font-bold text-green-600">₹{result.revenue.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Potential Revenue</div>
                                <div className="text-lg font-bold text-blue-600">₹{result.cost.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Estimated Cost</div>
                                <div className="text-xl font-bold text-primary">₹{result.profit.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Net Profit ({result.margin}% margin)</div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}
