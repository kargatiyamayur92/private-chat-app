import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  LogOut,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Video,
} from "lucide-react";
import api from "../../api.js";
import { toast } from "react-toastify";
import { socket } from "../../socket/socket";
import UserListItem from "../../components/UserListItem";
import Message from "../../components/Message";
import chattomtobottomscroll from "../../utils/autoscroll.js";
import UserDetail from "../../components/UserDetail.jsx";

const profileurl = import.meta.env.VITE_PROFILE_IMAGEURL

function ChatPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [mobileChat, setMobileChat] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showprofile, setshowProfile] = useState(false)
  const [isTyping, setistyping] = useState(false)


  useEffect(() => {
    if (profile && selectedUser) {
      socket.emit("typing", { senderid: profile._id, reciverid: selectedUser._id, istype: true })

      let timer = setTimeout(() => {
        socket.emit("typing", { senderid: profile._id, reciverid: selectedUser._id, istype: false })
      }, 200);

      return () => {
        clearTimeout(timer)
      }

    }

  }, [message])

  useEffect(() => {
    chattomtobottomscroll()

  }, [messages, selectedUser])

  const sendMessageUI = () => {
    if (!message.trim() || !selectedUser?._id) return;

    socket.emit("sendMessage", {
      senderuserid: profile._id,
      reciveruserid: selectedUser._id,
      message,
    });

    const now = new Date();

    setMessages((prev) => [
      ...prev,
      {
        sender: profile._id,
        text: message,
        time: now.toLocaleTimeString(),
      },
    ]);
    setMessage("");
  };

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.firstName?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText)
    );
  });

  useEffect(() => {

    const loadChat = async () => {
      try {
        const response = await api.get("/api/v1/getprofile");
        //console.log(response)
        if (!response.data.success) {
          toast.error(response.data.msg);
          navigate('/login')
          return;
        }

        const currentUser = response.data.user;
        setProfile(currentUser);

        socket.emit("joinRoom", currentUser._id);

        const peopleResponse = await api.get(
          `/api/v1/getallpeople/${currentUser._id}`
        );

        if (peopleResponse.data.success) {
          setUsers(peopleResponse.data.users);
        } else {
          toast.error(peopleResponse.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadChat();

    const handleReceiveMessage = (data) => {
      //console.log(data);

      const { message, senderuserid } = data;
      const now = new Date();

      setMessages((prev) => [
        ...prev,
        {
          sender: senderuserid,
          text: message,
          time: now.toLocaleTimeString(),
        },
      ]);

    };

    socket.on("type", (data) => {
      let { senderid, reciverid, istype } = data

      if (profile._id != reciverid) {
        setistyping(istype)
      }
    })

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const getChatMessages = async (receiverId) => {
    try {
      const response = await api.get(
        `/api/v1/getownmessages/${profile._id}/${receiverId}`
      );

      if (response.data.success) {
        setMessages(response.data.messages);
      } else {
        toast.error(response.data.msg);
        setMessages([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    socket.disconnect();
    api.post('/api/v1/logout')
      .then((response) => {
        // console.log(response)
        if (response.data.success) toast.success(response.data.msg)
        else toast.error(response.data.msg)
        navigate("/login");
      })
      .catch((err) => {
        console.log(err)
      })

  };

  return (
    <div className="h-screen bg-[#09090b] text-white flex overflow-hidden">
      {
        showprofile ?
          <UserDetail profile={profile} setshowProfile={setshowProfile} profileurl={profileurl} />
          : null
      }

      <aside
        className={`w-full md:w-[350px] lg:w-[380px] border-r border-white/10 bg-[#0d0d0f] flex flex-col ${mobileChat ? "hidden md:flex" : "flex"
          }`}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">

              {profile?.firstName ? (
                <div
                  onClick={() => setshowProfile(true)}
                  className="
      w-11 h-11
      rounded-full
      bg-green-500
      flex items-center justify-center
      cursor-pointer
    "
                >
                  {profile.firstName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div
                  onClick={() => setshowProfile(true)}
                  className="
      w-11 h-11
      rounded-full
      bg-pink-500
      flex items-center justify-center
      cursor-pointer
    "
                >
                  {profile?.lastName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}


              <div>
                <h2 className="font-semibold">
                  {profile?._id
                    ? `${profile.firstName} ${profile.lastName}`
                    : "User"}
                </h2>

                {profile?._id && (
                  <p
                    className={`text-xs ${profile.online ? "text-green-400" : "text-zinc-500"
                      }`}
                  >
                    {profile.online ? "Online" : "Offline"}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowProfile(true)}
              className="p-2.5 rounded-xl hover:bg-white/10"
            >
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-orange-500/50 placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <p className="text-xs text-zinc-600 px-3 py-3 uppercase tracking-wider">
            Conversations
          </p>

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                profileurl={profileurl}
                active={selectedUser?._id === user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setMobileChat(true);
                  getChatMessages(user._id);
                }}
              />
            ))
          ) : (
            <p className="text-sm text-zinc-500 text-center py-8">
              No users found
            </p>
          )}
        </div>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <main
        className={`flex-1 flex flex-col ${mobileChat ? "flex" : "hidden md:flex"
          }`}
      >
        <header className="h-[76px] border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-[#0d0d0f]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileChat(false)}
              className="md:hidden p-2 rounded-xl hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="relative">
              {
                selectedUser ? selectedUser?.firstName ? (
                  <div
                    onClick={() => setshowProfile(true)}
                    className="
      w-11 h-11
      rounded-full
      bg-green-500
      flex items-center justify-center
      cursor-pointer
    "
                  >
                    {selectedUser.firstName.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <div
                    onClick={() => setshowProfile(true)}
                    className="
      w-11 h-11
      rounded-full
      bg-pink-500
      flex items-center justify-center
      cursor-pointer
    "
                  >
                    {selectedUser?.lastName?.charAt(0).toUpperCase() || "U"}
                  </div>
                )
                  :
                  null
              }



              {selectedUser?.online && (
                <span className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 border-2 border-[#0d0d0f] rounded-full" />
              )}
            </div>

            <div>
              <h2 className="font-semibold">
                {selectedUser
                  ? `${selectedUser.firstName} ${selectedUser.lastName}`
                  : "Select a user"}
              </h2>

              {selectedUser && (
                <p className="text-xs text-zinc-500">
                  {selectedUser.online ? "Online" : "Offline"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2.5 rounded-xl hover:bg-white/10">
              <Phone size={19} />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-white/10">
              <Video size={19} />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-white/10">
              <MoreVertical size={19} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-3 chat-container">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-zinc-500">
              <Lock size={12} />
              Messages are private
            </div>
          </div>

          {messages.map((msg, idx) => (
            <Message
              key={msg._id || idx}
              message={msg}
              userid={profile._id}
            />
          ))}
        </div>
        {isTyping && (
          <p className="text-sm text-zinc-400">
            Typing...
          </p>
        )}

        <div className="p-3 md:p-5 border-t border-white/10 bg-[#0d0d0f]">
          <div className="flex items-center gap-2 max-w-5xl mx-auto">
            <button className="hidden sm:flex p-3 rounded-xl hover:bg-white/10 text-zinc-400">
              <Paperclip size={20} />
            </button>

            <div className="flex-1 relative">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessageUI();
                }}
                placeholder="Type a message..."
                className="w-full bg-white/[0.06] border border-white/10 rounded-2xl py-3.5 pl-4 pr-12 outline-none focus:border-orange-500/50 placeholder:text-zinc-600"
              />

              <button
                title="Press ( Window + . ) to open emojis"
                className="absolute right-3 top-3.5 text-zinc-500 hover:text-orange-400"
              >
                <Smile size={20} />
              </button>
            </div>

            <button
              onClick={sendMessageUI}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 flex items-center justify-center hover:scale-105 transition"
            >
              <Send size={19} />
            </button>
          </div>
        </div>
      </main>


    </div>
  );
}

export default ChatPage;
