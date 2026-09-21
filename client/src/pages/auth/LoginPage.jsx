import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api.js";
import { toast } from "react-toastify";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import OTPLogin from "./OTPLogin";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("password");

  const [loginForm, setLoginForm] = useState({
    emailOrMobile: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginForm.emailOrMobile || !loginForm.password) return;

    api
      .post("/api/v1/login/password", loginForm)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          navigate("/chat");
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue your conversations"
    >
      {loginType === "password" ? (
        <form onSubmit={handleLogin}>
          <Input
            label="Email or Mobile"
            name="emailOrMobile"
            placeholder="Enter email or mobile number"
            value={loginForm.emailOrMobile}
            onChange={handleLoginChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={loginForm.password}
            onChange={handleLoginChange}
          />

          <div className="flex justify-end mb-5">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-orange-400 hover:text-orange-300"
            >
              Forgot password?
            </button>
          </div>

          <PrimaryButton type="submit">Login</PrimaryButton>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-zinc-500">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <button
            type="button"
            onClick={() => setLoginType("otp")}
            className="w-full py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-medium"
          >
            Login with OTP
          </button>
        </form>
      ) : (
        <OTPLogin onBack={() => setLoginType("password")} />
      )}

      <p className="text-center text-sm text-zinc-400 mt-7">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-orange-400 hover:text-orange-300 font-medium"
        >
          Create account
        </button>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
