import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/model/User";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function DELETE(request: NextRequest, { params }: { params: { messageId: string } }) {
    const messageId = params.messageId;
    await dbConnect()
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user || !session) {
        return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 403 })
    }
    try {
        const updateMessages = await userModel.updateOne({
            _id: user._id
        }, { $pull: { messages: { _id: messageId } } })

        if (updateMessages.modifiedCount === 0) {
            return NextResponse.json({
                success: false,
                message: "Message not found or Already deleted"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: "Message deleted"
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while deleting messages",
            error: error
        }, { status: 500 })
    }
}