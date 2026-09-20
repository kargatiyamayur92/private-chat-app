import { MessageCircle } from "lucide-react";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl -top-32 -left-32" />
      <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -bottom-32 -right-32" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <MessageCircle size={25} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Connect</span>
          </div>
        </div>

        <div className="bg-white/[0.06] border border-white/10 backdrop-blur-2xl rounded-3xl p-7 shadow-2xl">
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-sm text-zinc-400">{subtitle}</p>
          </div>
          {children}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          © 2026 Connect. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
