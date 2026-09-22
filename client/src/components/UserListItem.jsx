function UserListItem({ user, active, onClick, profileurl }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 mt-4 p-3 rounded-2xl transition text-left ${active ? "bg-white/10" : "hover:bg-white/[0.05]"
        }`}
    >
      <div className="relative flex-shrink-0">

        <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center text-4xl font-bold">
          {user.lastName?.charAt(0)}
        </div>



        {user.online && (
          <span className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 border-2 border-[#0d0d0f] rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className="font-medium truncate">
            {user.firstName} {user.lastName}
          </h3>
          <span className="text-[10px] text-zinc-600">{user.time}</span>
        </div>

        <div className="flex justify-between mt-1">
          <p className="text-sm text-zinc-500 truncate">
            {user.lastMessage}
          </p>

          {user.unread > 0 && (
            <span className="ml-2 min-w-5 h-5 px-1.5 rounded-full bg-orange-500 text-[10px] flex items-center justify-center font-bold">
              {user.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default UserListItem;
