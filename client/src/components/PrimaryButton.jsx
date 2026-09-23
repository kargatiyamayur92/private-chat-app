import Loading from "./Loading";

function PrimaryButton({
  children,
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        group relative w-full overflow-hidden
        rounded-full
        border border-white/20
        bg-gradient-to-r
        from-emerald-500
        via-green-500
        to-lime-400
        px-6 py-3.5
        font-semibold text-white

        shadow-[0_8px_30px_rgba(34,197,94,0.25)]

        transition-all duration-300

        hover:-translate-y-0.5
        hover:shadow-[0_12px_35px_rgba(34,197,94,0.4)]

        active:translate-y-0
        active:scale-[0.98]

        focus:outline-none
        focus:ring-2
        focus:ring-green-400/50

        disabled:cursor-not-allowed
        disabled:opacity-60
      `}
    >
      {/* Liquid shine */}
      <span
        className="
          pointer-events-none absolute inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          transition-transform duration-700
          group-hover:translate-x-full
        "
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <Loading text={loadingText} />
        ) : (
          <>
            <span>{children}</span>

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </>
        )}
      </span>
    </button>
  );
}

export default PrimaryButton;