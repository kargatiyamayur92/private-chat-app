import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import AuthLayout from "../../components/AuthLayout";
import OTPInput from "../../components/OTPInput";
import PrimaryButton from "../../components/PrimaryButton";

function OTPPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("Registration OTP:", otp);
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the 6-digit code sent to your email"
    >
      <form onSubmit={handleVerify}>
        <div className="flex justify-center mb-7">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Lock className="text-orange-400" />
          </div>
        </div>

        <OTPInput value={otp} onChange={setOtp} />

        <PrimaryButton type="submit">Verify OTP</PrimaryButton>

        <div className="text-center mt-5">
          <p className="text-sm text-zinc-500 mb-2">
            Didn't receive the code?
          </p>
          <button type="button" className="text-sm text-orange-400">
            Resend OTP
          </button>
          <span className="text-zinc-600 mx-2">•</span>
          <span className="text-sm text-zinc-500">00:28</span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-6 text-sm text-zinc-400 hover:text-white"
        >
          ← Back to login
        </button>
      </form>
    </AuthLayout>
  );
}

export default OTPPage;
