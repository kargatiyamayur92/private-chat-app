function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 outline-none transition focus:border-orange-500/60 focus:bg-white/[0.07] placeholder:text-zinc-600"
      />
    </div>
  );
}

export default Input;
