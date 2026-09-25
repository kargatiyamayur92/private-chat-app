import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Private Chat <onboarding@resend.dev>",
            to: [email],
            subject: "Your Private Chat OTP",
            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 500px;
                    margin: auto;
                    padding: 30px;
                    border-radius: 20px;
                    background: #111827;
                    color: white;
                ">
                    <h2>Private Chat</h2>

                    <p>Your OTP is:</p>

                    <h1 style="
                        letter-spacing: 8px;
                        font-size: 36px;
                    ">
                        ${otp}
                    </h1>

                    <p>
                        This OTP is valid for a limited time.
                    </p>

                    <p style="color: #9ca3af;">
                        If you didn't request this OTP,
                        you can safely ignore this email.
                    </p>
                </div>
            `
        });

        if (error) {
            console.error("Resend Error:", error);
            throw new Error(error.message);
        }

        console.log("Email sent:", data.id);

        return data;
    } catch (error) {
        console.error("Email Service Error:", error);
        throw error;
    }
};