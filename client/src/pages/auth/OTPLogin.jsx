import { useState } from "react";
import Input from "../../components/Input";
import OTPInput from "../../components/OTPInput";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function OTPLogin({ onBack }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OTP Login:", { email, otp });

    let response = await axios.post('/api/v1/loginOTPVerify', { email: email, otp: otp })

    console.log(response)
    if (response.data.success) {
      navigate('/chat')
      toast.success(response.data.msg)
    }
    else {
      toast.error(response.data.msg)
    }

  };

  async function sendotp() {

    let otpsendresponse = await axios.post('/api/v1/loginOTPSEND', { email: email })

    console.log(otpsendresponse)
    if (otpsendresponse.data.success) {
      toast.success(otpsendresponse.data.msg)
    }
    else {
      toast.error(otpsendresponse.data.msg)
    }

  }



  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="button"
        onClick={() => {
          console.log("Send OTP:", email)
          sendotp()
        }}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 font-semibold hover:opacity-90 transition"
      >
        Send OTP
      </button>

      <div className="mt-5">
        <OTPInput value={otp} onChange={setOtp} />
      </div>

      <button
        type="submit"
        className="w-full mt-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 transition font-medium"
      >
        Verify OTP
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full mt-4 text-sm text-zinc-400 hover:text-white"
      >
        ← Login with password
      </button>
    </form>
  );
}

export default OTPLogin;
