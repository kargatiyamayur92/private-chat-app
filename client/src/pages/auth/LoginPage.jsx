import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import { toast } from "react-toastify";

import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import OTPLogin from "./OTPLogin";
import HomeBottomNav from "../../components/home/HomeBottomNav.jsx";
import MPrivateLoader from "../../components/MPrivateLoader.jsx";

function LoginPage() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("password");

  const [loginForm, setLoginForm] = useState({
    emailOrMobile: "",
    password: "",
  });

  // Login loading state
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginForm.emailOrMobile || !loginForm.password) {
      toast.error("Please enter email/mobile and password");
      return;
    }

    // Prevent multiple requests
    if (loading) return;

    try {
      setLoading(true);

      const response = await api.post(
        "/api/v1/login/password",
        loginForm
      );

      if (response.data.success) {
        toast.success(response.data.msg);

        navigate("/chat");
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log("Login Error:", err);

      toast.error(
        err?.response?.data?.msg ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        title="Welcome back"
        subtitle="Login to continue your conversations"
      >


        {loginType === "password" ? (
          <form onSubmit={handleLogin}>

            {/* Email / Mobile */}
            <Input
              label="Email or Mobile"
              name="emailOrMobile"
              placeholder="Enter email or mobile number"
              value={loginForm.emailOrMobile}
              onChange={handleLoginChange}
              required
            />

            {/* Password */}
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />

            {/* Forgot Password */}
            <div className="mb-5 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                disabled={loading}
                className="
                text-sm font-medium
                text-orange-400
                transition-colors
                hover:text-orange-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <PrimaryButton
              type="submit"
              loading={loading}
              loadingText="Logging in..."
              disabled={loading}
            >
              Login
            </PrimaryButton>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs font-medium tracking-wider text-zinc-500">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* OTP Login */}
            <button
              type="button"
              onClick={() => setLoginType("otp")}
              disabled={loading}
              className="
              group relative w-full overflow-hidden
              rounded-2xl
              border border-white/10
              bg-white/[0.06]
              px-5 py-3.5
              font-medium text-white/80
              backdrop-blur-xl
              transition-all duration-300

              hover:-translate-y-0.5
              hover:border-white/20
              hover:bg-white/[0.10]
              hover:text-white

              active:scale-[0.98]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              {/* Liquid shine */}
              <span
                className="
                pointer-events-none absolute inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
                transition-transform duration-700
                group-hover:translate-x-full
              "
              />

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>✦</span>
                Login with OTP
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </form>
        ) : (
          <OTPLogin
            onBack={() => setLoginType("password")}
          />
        )}

        {/* Register */}
        <p className="mt-7 text-center text-sm text-zinc-400">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/register")}
            disabled={loading}
            className="
            font-medium
            text-orange-400
            transition-colors
            hover:text-orange-300
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          >
            Create account
          </button>
        </p>
      </AuthLayout>
      {
        loading ?
          <MPrivateLoader />
          :
          null
      }
    </>

  );
}

export default LoginPage;