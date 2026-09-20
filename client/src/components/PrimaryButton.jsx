function PrimaryButton({ children, type = "button" }) {
  return (
    <button
      type={type}
      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 font-semibold shadow-lg shadow-orange-500/10 hover:opacity-90 active:scale-[0.98] transition"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
