import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import userModel from "@/model/User";

export async function GET(request: NextRequest) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user
    if (!session || !user) {
        return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 403 })
    }
    const userId = user._id;
    try {
        //no
        const findUser = await userModel.findById(userId);
        if (!findUser) {
            return NextResponse.json({
                success: true,
                message: "User Not Found"
                
            }, { status: 401 })
        }
        const userMessages = findUser?.messages;
        return NextResponse.json({
            success: true,
            messages: userMessages
        })
    } catch (error) {
        return NextResponse.json({
            success: true,
            message: "Error fetching user messages"
        }, { status: 500 })
    }
}