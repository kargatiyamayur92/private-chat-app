function ProfileOption({ icon, text }) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5">
      {icon}
      {text}
    </button>
  );
}

export default ProfileOption;
