import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
        const prompt = "Generate a single string containing three random, unique comments about the user, separated by ||. Tailor the comments to reflect their potential interests, activities, or personality traits based on what you know about them. Ensure each comment is conversational, creative, and distinct. Always generate new comments each time."

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