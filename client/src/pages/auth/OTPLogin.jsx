import { useState } from "react";
import Input from "../../components/Input";
import OTPInput from "../../components/OTPInput";
import api from "../../api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HomeBottomNav from "../../components/home/HomeBottomNav.jsx";
import MPrivateLoader from "../../components/MPrivateLoader.jsx";

function OTPLogin({ onBack }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OTP Login:", { email, otp });
    setLoading(true)
    let response = await api.post('/api/v1/loginOTPVerify', { email: email, otp: otp })

    console.log(response)
    if (response.data.success) {
      navigate('/chat')
      setLoading(false)
      toast.success(response.data.msg)
    }
    else {
      setLoading(false)
      toast.error(response.data.msg)
    }

  };

  async function sendotp() {
    setLoading(true)
    let otpsendresponse = await api.post('/api/v1/loginOTPSEND', { email: email })

    console.log(otpsendresponse)
    if (otpsendresponse.data.success) {
      toast.success(otpsendresponse.data.msg)
      setLoading(false)
    }
    else {
      toast.error(otpsendresponse.data.msg)
      setLoading(false)
    }

  }



  return (
    <>
      <form onSubmit={handleSubmit}>
        <HomeBottomNav />
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
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 font-semibold hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send OTP
        </button>

        <div className="mt-5">
          <OTPInput value={otp} onChange={setOtp} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 transition font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          Verify OTP
        </button>

        <button
          type="button"
          onClick={onBack}

          className="w-full mt-4 text-sm text-zinc-400 hover:text-white "
        >
          ← Login with password
        </button>
      </form>
      {
        loading ?
          <MPrivateLoader />
          :
          null
      }
    </>

  );
}

export default OTPLogin;
