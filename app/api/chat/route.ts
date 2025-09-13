import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// Initialize Gemini client once per edge/runtime instance
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { message, context, temperature } = await req.json()

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // upgraded per request
      generationConfig: {
        temperature: typeof temperature === "number" ? temperature : 0.7,
        maxOutputTokens: 1024,
      },
      // Safety settings can be customized; keeping default SDK safeguards.
      // Removed explicit safetySettings due to type mismatch with current SDK typings.
    })

    const systemPrompt = `You are an expert agricultural advisor. Only answer questions related to farming, agriculture, crops, soil, water, pests, diseases, government schemes, or sustainable practices. If the question is not about these topics, reply: 'Sorry, I can only help with farming-related questions.'

Always reply in plain text only. Do not use any formatting, markdown, bullet points, or special characters like * or -.

Context about the farmer: ${context || "General farming inquiry"}

Provide practical, actionable advice in simple language. Focus on sustainable and cost-effective solutions. If you're unsure about location-specific advice, ask for more details about their region and crop type.`

    const prompt = `${systemPrompt}\n\nFarmer's question: ${message}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("AI Chat Error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
