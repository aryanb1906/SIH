"use client"

import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { Search, Filter, Star, ShoppingCart, Heart, Package, Truck, Shield, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MarketplacePage() {
  const { marketplaceItems, loadMarketplaceItems, addToCart, cart } = useAppStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [filteredItems, setFilteredItems] = useState(marketplaceItems)

  useEffect(() => {
    loadMarketplaceItems()
  }, [loadMarketplaceItems])

  useEffect(() => {
    let filtered = marketplaceItems

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Sort items
    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popularity":
      default:
        filtered = filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    setFilteredItems(filtered)
  }, [marketplaceItems, searchTerm, selectedCategory, sortBy])

  const categories = ["all", ...Array.from(new Set(marketplaceItems.map(item => item.category)))]

  const handleAddToCart = (item: any) => {
    addToCart(item)
  }

  const isInCart = (itemId: string) => {
    return cart.some(item => item.id === itemId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10 px-4">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back
            </Button>
          </Link>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-primary/10 rounded-full border border-primary/20">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              FarmGrow Marketplace
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover high-quality seeds, tools, and agricultural products from trusted suppliers.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Truck className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders above ₹1000
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                100% authentic products with quality assurance
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Farmer Support</h3>
              <p className="text-sm text-muted-foreground">
                Expert advice and support for all your farming needs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  {item.discount && (
                    <Badge variant="destructive" className="text-xs">
                      {item.discount}% OFF
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {item.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({item.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-primary">
                    ₹{item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="text-sm text-muted-foreground mb-4">
                  <span>Sold by: </span>
                  <span className="font-medium">{item.seller}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock || isInCart(item.id)}
                    className="flex-1"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isInCart(item.id) ? 'In Cart' : item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 z-50">
            <Link href="/cart">
              <Button className="shadow-lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cart.length})
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  )
}

