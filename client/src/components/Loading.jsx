function Loading({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <span
        className="h-5 w-5 animate-spin rounded-full border-2
        border-white/30 border-t-white"
      />

      <span>{text}</span>
    </div>
  );
}

export default Loading;