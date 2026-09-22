import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import HomeBottomNav from "../../components/home/HomeBottomNav";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot password email:", email);
  };

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you an OTP"
    >
      <HomeBottomNav/>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PrimaryButton type="submit">Send OTP</PrimaryButton>

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

export default ForgotPasswordPage;
