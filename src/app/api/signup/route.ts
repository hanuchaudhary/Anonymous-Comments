import dbConnect from "@/lib/dbConnect";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import userModel from "@/model/User";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const existingUserByUsername = await userModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserByUsername) {
            return Response.json({
                success: false,
                message: "User already exist"
            }, { status: 400 })
        }

        const existingUserByEmail = await userModel.findOne({
            email
        })


        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists"
                }, { status: 400 })
            } else {
                const hashesPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashesPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }

        } else {
            const hashesPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            const verifyCodeExpiry = expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new userModel({
                username: username,
                email: email,
                password: hashesPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: verifyCodeExpiry,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            })

            await newUser.save();
        }

        const emailRes = await sendVerificationEmail(email, username, verifyCode);
        if (!emailRes.success) {
            return Response.json({
                success: false,
                message: emailRes.message
            }, { status: 500 })
        }
        return Response.json({
            success: true,
            message: "User created Successfully, Verify your email"
        }, { status: 200 })

    } catch (error) {
        console.error("Error Registering User, Error : ", error)
        return Response.json({
            success: false,
            message: "Error while registering user"
        }, { status: 500 })
    }
}