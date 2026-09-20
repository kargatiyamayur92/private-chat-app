import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!termsAccepted) return;

    axios
      .post("/api/v1/register", form)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join and start chatting with your friends"
    >
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

        <label className="flex items-start gap-3 text-sm text-zinc-400 my-5 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 accent-orange-500"
          />
          <span>I agree to the Terms of Service and Privacy Policy.</span>
        </label>

        <PrimaryButton type="submit">Create Account</PrimaryButton>
      </form>

      <p className="text-center text-sm text-zinc-400 mt-6">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-orange-400 hover:text-orange-300 font-medium"
        >
          Login
        </button>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
