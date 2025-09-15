import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

// Initialize Gemini client once per edge/runtime instance
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { message, context, temperature } = await req.json()
    //can add userId after temperature

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // upgraded per request
      // model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: typeof temperature === "number" ? temperature : 0.7,
        maxOutputTokens: 1024, // Increase token limit for more detailed response
      },
      // Safety settings can be customized; keeping default SDK safeguards.
      // Removed explicit safetySettings due to type mismatch with current SDK typings.
    })

    const systemPrompt = `You are FarmGrow AI, an expert agricultural advisor specializing in sustainable farming practices for Indian farmers. You have deep knowledge of:

- Crop management and seasonal planning
- Organic farming and natural pest control
- Water conservation and irrigation techniques
- Soil health improvement methods
- Government schemes (PM-KISAN, Soil Health Card, etc.)
- Post-harvest storage and marketing
- Climate-smart agriculture
- Regional farming practices across Indian states

IMPORTANT GUIDELINES:
1. Only answer farming, agriculture, and rural development questions
2. If asked about non-farming topics, politely redirect: "I specialize in farming guidance. How can I help with your agricultural needs?"
3. Provide practical, cost-effective solutions suitable for Indian conditions
4. Use simple, clear language that farmers can easily understand
5. When relevant, mention how implementing suggestions can earn coins in the FarmGrow app
6. Always be encouraging and supportive

Context: ${context || "General farming inquiry"}

Provide actionable advice with specific steps when possible.`
// User ID: ${userId || "anonymous"} use can use this after context: $

    const prompt = `${systemPrompt}\n\nFarmer's question: ${message}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const enhancedResponse =
     text + "\n\n💡 Tip: Complete related missions in FarmGrow to earn coins and unlock more farming resources!"

    return NextResponse.json({
      message: text, // message: enhancedResponse,
      timestamp: new Date().toISOString(),
      model: "gemini-2.0-flash-exp",
    })
  } catch (error) {
    console.error("AI Chat Error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
