import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    // 1. Fetch transcript from Supadata
    const transcriptRes = await fetch(
      `https://api.supadata.ai/v1/youtube/transcript?url=${encodeURIComponent(url)}&text=true`,
      { headers: { "x-api-key": process.env.SUPADATA_API_KEY || "" } }
    );

    if (!transcriptRes.ok) {
      return NextResponse.json({ error: "Could not get transcript from Supadata" }, { status: 500 });
    }

    const data = await transcriptRes.json();
    const transcriptText = data.content;

    // 2. Select the correct model (Gemini 2.5 Flash is the 2026 standard)
    // We define 'model' once OUTSIDE the try/catch to fix your 'undefined' error
    let model;
    try {
      // 'gemini-2.5-flash' is the stable version for 2026
      model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    } catch (e) {
      console.log("Gemini 2.5 Flash failed, trying fallback...");
      model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    }

    const prompt = `Based on this transcript, create structured Markdown study notes with key takeaways and a summary: ${transcriptText}`;

    // Now 'model' is guaranteed to be defined here
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const finalNotes = response.text();

    return NextResponse.json({ notes: finalNotes });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}