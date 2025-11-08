import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const { text, maxLength = 100 } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // If text is already short enough, just return it
    if (text.length <= maxLength) {
      return NextResponse.json({ summary: text });
    }

    // Use OpenAI to generate a concise summary
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a text summarizer. Summarize the given text to be concise and under ${maxLength} characters while preserving the key information. Be direct and concise.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.3,
      max_tokens: 100,
    });

    const summary = completion.choices[0]?.message?.content?.trim() || text.substring(0, maxLength);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error summarizing text:", error);

    // Fallback: just truncate if OpenAI fails
    const { text, maxLength = 100 } = await request.json();
    const fallback = text.substring(0, maxLength) + (text.length > maxLength ? "..." : "");

    return NextResponse.json({ summary: fallback });
  }
}
