import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/model/User"

export async function POST(request: NextRequest) {
    await dbConnect();
    
    const { username, content } = await request.json();
    try {

        const user = await userModel.findOne({ username });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User Not Found"
            }, { status: 401 })
        }

        if (!user.isAcceptingMessages) {
            return NextResponse.json({
                success: false,
                message: "User is Not Accepting messages"
            }, { status: 403 })
        }

        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message);
        await user.save();
        return NextResponse.json({
            success: true,
            message: "Message Sent successfully"
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while sending Message"
        }, { status: 500 })

    }
}