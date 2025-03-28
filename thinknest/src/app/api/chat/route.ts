import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialisiere das Modell nur einmal
const genAI = new GoogleGenerativeAI("AIzaSyAdXMaU-wkVTh0F-TCBXWF-pdgsZsOYMXU"!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Hier benannter Export für POST:
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Kein Nachrichteninhalt" }, { status: 400 });
    }

    const chat = model.startChat({ history: [], generationConfig: { maxOutputTokens: 500 } });
    const result = await chat.sendMessageStream(message);

    let responseText = "";
    for await (const chunk of result.stream) {
      responseText += await chunk.text();
    }

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Unbekannter Fehler" }, { status: 500 });
  }
}
