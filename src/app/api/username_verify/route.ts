import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { usernameValidation } from "@/validations/Validation";
import { NextRequest } from "next/server";
import { z } from "zod"

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const querParams = {
            username: searchParams.get("username")
        }

        const validateUsername = UsernameQuerySchema.safeParse(querParams);
        if (!validateUsername.success) {
            const usernameErrors = validateUsername.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid query params"
            }, { status: 400 })
        }

        const { username } = validateUsername.data;
        const existingUser = await userModel.findOne({
            username: username,
            isVerified: true
        })


        if (existingUser) {
            return Response.json({
                success: false,
                message: "User already exist with this username"
            }, { status: 200 })
        }

        return Response.json({
            success: true,
            message: 'Username is available',
        },
            { status: 200 }
        );
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