"use client"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Container className="max-w-md w-full bg-[#111] rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h1>
                <a href="/api/auth/signin/google" className="w-full block">
                    <Button className="w-full bg-gold-400 hover:bg-gold-500 text-white font-bold rounded-xl">Sign in with Google</Button>
                </a>
            </Container>
        </div>
    )
}
