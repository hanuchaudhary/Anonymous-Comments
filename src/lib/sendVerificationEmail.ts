import { Resend } from "resend";
import VerificationEmailTemplate from "../../emailTemplate/VerificationEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
export default async function sendVerificationEmail(email: string, username: string, verifyCode: string) {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verification Code | Anonymous Comments",
            react: VerificationEmailTemplate({ username, otp: verifyCode })
        })
        return {
            success: true,
            message: "Verification email send Successfully"
        }
    } catch (emailError) {
        console.log("Error sending Verification Email, Error : ", emailError);
        return {
            success: false,
            message: "Failed to send Verification Email"
        }
    }
}