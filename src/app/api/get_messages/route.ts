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
        }, { status: 401 })
    }
    const userId = user._id;
    try {
        //normal

        // const findUser = await userModel.findById(userId);
        // const userMessages = findUser.messages;

        //via aggregation pipeline
        const findUser = await userModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);
        if (!findUser || findUser.length === 0) {
            return NextResponse.json({
                success: true,
                message: "User Not Found"

            }, { status: 401 })
        }


        return NextResponse.json({
            success: true,
            messages: findUser[0].messages
        })
    } catch (error) {
        return NextResponse.json({
            success: true,
            message: "Error fetching user messages"
        }, { status: 401 })
    }
}