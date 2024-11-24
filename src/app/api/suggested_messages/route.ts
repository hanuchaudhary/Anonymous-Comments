import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
        const prompt = "Generate three short, user-specific messages that: Appreciate the user. Ask a relevant question about the user. Motivate or encourage the user. Format the messages as <message 1> || <message 2> || <message 3>. Keep each message under 10 words."

        const { response } = await model.generateContent(prompt);
        const code = response.text();
        return NextResponse.json({ code }, { status: 200 })
    } catch (error) {
        console.error('Error checking username:', error);
        return Response.json(
            {
                success: false,
                message: 'Error checking username',
            },
            { status: 500 }
        );
    }
}