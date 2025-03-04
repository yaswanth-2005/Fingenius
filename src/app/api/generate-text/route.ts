import { NextRequest, NextResponse } from "next/server";

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      console.error("Missing MISTRAL API Key in Environment Variables");
      return NextResponse.json({ error: "Missing API Key in Environment Variables" }, { status: 500 });
    }

    // ✅ Call Mistral AI API
    const response = await fetch(MISTRAL_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-tiny", // Options: mistral-tiny, mistral-small, mistral-medium, etc.
        messages: [{ role: "user", content: message }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mistral API Error:", errorData);
      return NextResponse.json({ error: errorData.error || "Failed to get response from Mistral" }, { status: response.status });
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "Unexpected AI response format.";

    return NextResponse.json({ response: aiResponse }, { status: 200 });
  } catch (error: any) {
    console.error("Mistral API Error:", error.message);
    return NextResponse.json({ error: "AI service failed: " + error.message }, { status: 500 });
  }
}
