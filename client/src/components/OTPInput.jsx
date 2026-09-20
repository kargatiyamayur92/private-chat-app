function OTPInput({ value, onChange }) {
  const digits = value.padEnd(6, "").split("").slice(0, 6);

  const handleChange = (index, newValue) => {
    if (!/^\d?$/.test(newValue)) return;

    const currentOtp = value.split("");
    currentOtp[index] = newValue;

    onChange(currentOtp.join("").slice(0, 6));

    if (newValue) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index]) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          id={`otp-${index}`}
          value={digits[index] || ""}
          maxLength={1}
          inputMode="numeric"
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-11 h-12 md:w-12 md:h-13 text-center text-lg font-bold bg-white/[0.05] border border-white/10 rounded-xl outline-none focus:border-orange-500"
        />
      ))}
    </div>
  );
}

export default OTPInput;
