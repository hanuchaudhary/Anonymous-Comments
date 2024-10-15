import dbConnect from "@/lib/dbConnect";
import userModel, { Message } from "@/model/User";
import { messageValidation } from "@/validations/Validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();
    const { username, content } = await request.json();
    const { success, error } = messageValidation.safeParse({content});
    if (!success) {
        return NextResponse.json({
            success: false,
            message: "Validation Error",
            error
        }, { status: 401 })
    }

    try {
        const user = await userModel.findOne({
            username
        })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not exist"
            }, { status: 404 })
        }

        if (!user.isAcceptingMessages) {
            return NextResponse.json({
                success: false,
                message: "User is not accepting messages",
            }, { status: 400 })
        }

        const message = { content, createdAt: new Date() };
        user.messages.push(message as Message)
        await user.save();

        return Response.json(
            { message: 'Message sent successfully', success: true },
            { status: 201 }
        );

    } catch (error) {
        return Response.json(
            { message: 'Error while sending message', success: false },
            { status: 500 }
        );
    }
}