import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import { toast } from "react-toastify";

import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import HomeBottomNav from "../../components/home/HomeBottomNav.jsx";
import MPrivateLoader from "../../components/MPrivateLoader.jsx";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  // 👇 request loading state
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    // Prevent double click
    if (loading) return;

    try {
      setLoading(true);

      const response = await api.post("/api/v1/register", form);

      if (response.data.success) {
        toast.success(response.data.msg);

        // Agar registration ke baad OTP page par jana hai
        // navigate("/otp");
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log("Register Error:", err);

      toast.error(
        err?.response?.data?.msg ||
        "Registration failed. Please try again."
      );
    } finally {
      // Response/error dono ke baad loading false
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        title="Create your account"
        subtitle="Join and start chatting with your friends"
      >
        <HomeBottomNav />

        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              name="firstName"
              placeholder="Mayur"
              value={form.firstName}
              onChange={handleChange}
            />

            <Input
              label="Last Name"
              name="lastName"
              placeholder="Kargatiya"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            required
            onChange={handleChange}
          />

          <Input
            label="Mobile Number"
            name="mobile"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={form.mobile}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <label
            className="my-5 flex cursor-pointer items-start gap-3
          text-sm text-zinc-400"
          >
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 accent-orange-500"
            />

            <span>
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>

          <PrimaryButton
            type="submit"
            loading={loading}
            loadingText="Creating account..."
            disabled={loading}
          >
            Create Account
          </PrimaryButton>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
            disabled={loading}
            className="font-medium text-orange-400 hover:text-orange-300
          disabled:cursor-not-allowed disabled:opacity-50"
          >
            Login
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

export default RegisterPage;