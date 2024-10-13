import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { verifyCodeValidation } from "@/validations/Validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { username, verifyCode } = await request.json();
        const { success, error } = verifyCodeValidation.safeParse({ verifyCode });
        if (!success) {
            return NextResponse.json({
                success: false,
                message: "Validation Error",
                error: error.format()._errors
            }, { status: 500 });
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 });
        }

        const isCodeValid = user.verifyCode === verifyCode;
        const isCodeExpired = new Date(user.verifyCodeExpiry) < new Date(); 

        if (!isCodeValid) {
            return NextResponse.json({
                success: false,
                message: "Code invalid"
            }, { status: 400 });
        }

        if (isCodeExpired) {
            return NextResponse.json({
                success: false,
                message: "Code expired"
            }, { status: 400 });
        }

        if (isCodeValid && !isCodeExpired) {
            user.isVerified = true;
            await user.save();
        }

        return NextResponse.json({
            success: true,
            message: "Account verified"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while verifying code"
        }, { status: 500 });
    }
}
