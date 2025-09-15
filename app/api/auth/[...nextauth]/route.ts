import NextAuth, { type AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        ...(process.env.EMAIL_SERVER && process.env.EMAIL_FROM
            ? [
                EmailProvider({
                    server: process.env.EMAIL_SERVER,
                    from: process.env.EMAIL_FROM,
                }),
            ]
            : []),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/signin" },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
