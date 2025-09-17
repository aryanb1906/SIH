"use client"

import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
    const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useAppStore()

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
            <Container className="py-10 px-4">
                <div className="flex items-center mb-6">
                    <Link href="/marketplace">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <ArrowLeft size={18} /> Back to Marketplace
                        </Button>
                    </Link>
                </div>

                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                {cart.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-muted-foreground">Your cart is empty.</CardContent>
                    </Card>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map(item => (
                                <Card key={item.id}>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">{item.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-between gap-4">
                                        <div className="text-sm text-muted-foreground">
                                            ₹{item.price.toLocaleString()} each
                                        </div>
                                        <div className="inline-flex items-center border rounded-md">
                                            <button
                                                type="button"
                                                className="px-2 py-1 text-sm"
                                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-8 text-center text-sm select-none">
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                className="px-2 py-1 text-sm"
                                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</div>
                                        <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <Button className="w-full">Checkout</Button>
                                    <Button variant="outline" className="w-full" onClick={() => clearCart()}>Clear Cart</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}
