"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Calculator, TrendingUp, DollarSign, Package, AlertCircle } from "lucide-react"

interface CropData {
  name: string
  yieldPerAcre: number
  marketPrice: number
  costPerAcre: number
  season: string
  duration: number
}

const cropDatabase: CropData[] = [
  { name: "Rice", yieldPerAcre: 25, marketPrice: 35, costPerAcre: 25000, season: "Kharif", duration: 120 },
  { name: "Wheat", yieldPerAcre: 20, marketPrice: 25, costPerAcre: 20000, season: "Rabi", duration: 150 },
  { name: "Cotton", yieldPerAcre: 8, marketPrice: 120, costPerAcre: 35000, season: "Kharif", duration: 180 },
  { name: "Sugarcane", yieldPerAcre: 60, marketPrice: 15, costPerAcre: 40000, season: "Year-round", duration: 365 },
  { name: "Maize", yieldPerAcre: 30, marketPrice: 20, costPerAcre: 18000, season: "Kharif", duration: 90 },
  { name: "Tomato", yieldPerAcre: 40, marketPrice: 30, costPerAcre: 30000, season: "Year-round", duration: 120 },
  { name: "Potato", yieldPerAcre: 25, marketPrice: 25, costPerAcre: 25000, season: "Rabi", duration: 100 },
  { name: "Onion", yieldPerAcre: 20, marketPrice: 40, costPerAcre: 22000, season: "Rabi", duration: 120 },
]

export default function CropCalculator() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [landArea, setLandArea] = useState("")
  const [customYield, setCustomYield] = useState("")
  const [customPrice, setCustomPrice] = useState("")
  const [customCost, setCustomCost] = useState("")
  const [results, setResults] = useState<any>(null)

  const calculateProfit = () => {
    if (!selectedCrop || !landArea) return

    const area = parseFloat(landArea)
    const crop = cropDatabase.find(c => c.name === selectedCrop)
    
    if (!crop) return

    const yieldPerAcre = customYield ? parseFloat(customYield) : crop.yieldPerAcre
    const marketPrice = customPrice ? parseFloat(customPrice) : crop.marketPrice
    const costPerAcre = customCost ? parseFloat(customCost) : crop.costPerAcre

    const totalYield = yieldPerAcre * area
    const totalRevenue = totalYield * marketPrice
    const totalCost = costPerAcre * area
    const profit = totalRevenue - totalCost
    const profitMargin = (profit / totalRevenue) * 100

    setResults({
      crop: selectedCrop,
      area,
      totalYield,
      totalRevenue,
      totalCost,
      profit,
      profitMargin,
      yieldPerAcre,
      marketPrice,
      costPerAcre,
      season: crop.season,
      duration: crop.duration
    })
  }

  const getProfitColor = (profit: number) => {
    if (profit > 0) return "text-green-600"
    if (profit < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getProfitBadgeColor = (profit: number) => {
    if (profit > 0) return "bg-green-100 text-green-800"
    if (profit < 0) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Crop Profit Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate potential profits for different crops based on your land area and market conditions.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="crop">Select Crop</Label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a crop" />
              </SelectTrigger>
              <SelectContent>
                {cropDatabase.map((crop) => (
                  <SelectItem key={crop.name} value={crop.name}>
                    {crop.name} ({crop.season})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Land Area (Acres)</Label>
            <Input
              id="area"
              type="number"
              placeholder="Enter land area"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
            />
          </div>
        </div>

        {/* Custom Inputs */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Custom Values (Optional)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yield">Yield per Acre (Quintal)</Label>
              <Input
                id="yield"
                type="number"
                placeholder="Custom yield"
                value={customYield}
                onChange={(e) => setCustomYield(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Market Price (₹/Quintal)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Custom price"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Cost per Acre (₹)</Label>
              <Input
                id="cost"
                type="number"
                placeholder="Custom cost"
                value={customCost}
                onChange={(e) => setCustomCost(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button onClick={calculateProfit} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Profit
        </Button>

        {/* Results */}
        {results && (
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h4 className="text-lg font-semibold mb-4">Calculation Results</h4>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Total Revenue</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{results.totalRevenue.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Total Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      ₹{results.totalCost.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${results.profit > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4" />
                      <span className="text-sm font-medium">Net Profit</span>
                    </div>
                    <div className={`text-2xl font-bold ${getProfitColor(results.profit)}`}>
                      ₹{results.profit.toLocaleString()}
                    </div>
                    <Badge className={`mt-2 ${getProfitBadgeColor(results.profit)}`}>
                      {results.profitMargin.toFixed(1)}% margin
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3">
                <h5 className="font-medium">Detailed Breakdown</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Crop:</span>
                    <span className="ml-2 font-medium">{results.crop}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Season:</span>
                    <span className="ml-2 font-medium">{results.season}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Land Area:</span>
                    <span className="ml-2 font-medium">{results.area} acres</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="ml-2 font-medium">{results.duration} days</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Yield per Acre:</span>
                    <span className="ml-2 font-medium">{results.yieldPerAcre} quintals</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Yield:</span>
                    <span className="ml-2 font-medium">{results.totalYield} quintals</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Market Price:</span>
                    <span className="ml-2 font-medium">₹{results.marketPrice}/quintal</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cost per Acre:</span>
                    <span className="ml-2 font-medium">₹{results.costPerAcre.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Recommendations</span>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  {results.profit > 0 ? (
                    <>
                      <li>• This crop shows good profit potential</li>
                      <li>• Consider market timing and seasonal factors</li>
                      <li>• Monitor input costs and market prices regularly</li>
                    </>
                  ) : (
                    <>
                      <li>• This crop may not be profitable at current prices</li>
                      <li>• Consider reducing input costs or finding better markets</li>
                      <li>• Explore alternative crops with better margins</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

