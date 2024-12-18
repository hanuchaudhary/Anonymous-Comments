import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import userModel from "@/model/User";

export async function POST(request: NextRequest) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user
    if (!session || !user) {
        return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }
    const userId = user._id;

    const { acceptingMessages } = await request.json();

    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            isAcceptingMessages: acceptingMessages
        }, { new: true })

        if (!updatedUser) {
            return NextResponse.json({
                success: false,
                message: "failed to update user"
            }, { status: 401 })
        }

        return NextResponse.json({
            success: true,
            message: `Accepting Message Status: ${acceptingMessages === true ? "Accepting" : "Not Accepting"}`,
            updatedUser
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "failed to update user update to accept messages"
        }, { status: 400 })
    }
}

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
        const userExist = await userModel.findById(userId);
        if (!userExist) {
            return NextResponse.json({
                success: false,
                message: "User not Found"
            }, { status: 404 })
        }
        
        return NextResponse.json({
            success: true,
            isAcceptingMessages: userExist.isAcceptingMessages

        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to get status"
        }, { status: 500 })
    }


}