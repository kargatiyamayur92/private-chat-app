import { useEffect, useRef, useState } from "react";

function ChatMenu({ onDeleteAll }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDelete = () => {
        setOpen(false);
        onDeleteAll();
    };

    return (
        <div ref={menuRef} className="relative">
            {/* 3 Dot Button */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="
          flex h-10 w-10 items-center justify-center
          rounded-full
          border border-white/10
          bg-white/5
          text-zinc-300
          backdrop-blur-xl
          transition-all duration-200
          hover:bg-white/10
          hover:text-white
          active:scale-95
        "
                aria-label="Chat menu"
            >
                <span className="flex flex-col gap-1">
                    <span className="h-1 w-1 rounded-full bg-current" />
                    <span className="h-1 w-1 rounded-full bg-current" />
                    <span className="h-1 w-1 rounded-full bg-current" />
                </span>
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="
            absolute right-0 top-12 z-50
            w-52
            overflow-hidden
            rounded-2xl
            border border-white/10
            bg-zinc-900/90
            p-1.5
            shadow-[0_15px_50px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
            animate-in fade-in zoom-in-95
            duration-150
          "
                >
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="
              flex w-full items-center gap-3
              rounded-xl
              px-3 py-3
              text-left text-sm font-medium
              text-red-400
              transition-colors
              hover:bg-red-500/10
              hover:text-red-300
            "
                    >
                        {/* Trash icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 7h16M10 11v6m4-6v6M9 7l1-2h4l1 2m-9 0 1 13h8l1-13"
                            />
                        </svg>

                        <span>Delete all messages</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChatMenu;