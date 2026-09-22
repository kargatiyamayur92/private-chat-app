import { useEffect, useState } from "react";
import {
  Pencil,
  Check,
  X,
  Mail,
  Phone,
  MapPin,
  UserRound,
  CalendarDays,
} from "lucide-react";
import api from "../api";
import { toast } from "react-toastify";

function UserDetail({
  profile,
  onClose,
  onSave,
  setshowProfile,
}) {
  const [editingName, setEditingName] = useState(false);

  const [name, setName] = useState(
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim()
  );

  useEffect(() => {
    setName(
      `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim()
    );
  }, [profile]);

  // ===============================
  // SAVE NAME
  // ===============================

  const handleSave = () => {
    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    // Send only name to parent
    onSave?.({
      name: name.trim(),
    });

    api.post(`/api/v1/updateprofile/${name}/${profile._id}`)
      .then((response) => {
        if (response.data.success) toast.success(response.data.msg)
        else toast.error(response.data.msg)
      })
      .catch((err) => {
        console.log(err)
      })

    setEditingName(false);
  };

  const hasChanges =
    name.trim() !==
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();

  return (
    <div className="fixed inset-0 z-[100]">

      {/* BACKDROP */}
      <div
        onClick={() => setshowProfile(false)}
        className="
          absolute inset-0
          bg-black/45
          backdrop-blur-md
        "
      />

      {/* PROFILE PANEL */}
      <div
        className="
          absolute

          right-4 top-4 bottom-4
          w-[420px]

          md:max-w-[420px]

          max-md:left-0
          max-md:right-0
          max-md:top-auto
          max-md:bottom-0
          max-md:w-full
          max-md:max-h-[92vh]

          rounded-[32px]
          max-md:rounded-t-[32px]
          max-md:rounded-b-none

          overflow-hidden

          bg-white/[0.075]
          backdrop-blur-[45px]

          border border-white/15

          shadow-[0_25px_80px_rgba(0,0,0,0.45)]

          text-white
        "
      >

        {/* LIQUID LIGHT EFFECT */}
        <div
          className="
            pointer-events-none
            absolute
            -top-32
            -right-24
            w-72
            h-72
            rounded-full
            bg-orange-500/20
            blur-[90px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-24
            w-72
            h-72
            rounded-full
            bg-red-500/15
            blur-[90px]
          "
        />

        {/* CONTENT */}
        <div className="relative h-full overflow-y-auto">

          {/* HEADER */}
          <div
            className="
              sticky
              top-0
              z-10

              flex
              items-center
              justify-between

              px-6
              sm:px-7
              py-5

              bg-black/10
              backdrop-blur-2xl

              border-b
              border-white/10
            "
          >
            <div>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                Profile
              </h2>

              <p className="text-xs text-white/40 mt-1">
                Manage your personal information
              </p>
            </div>

            <button
              onClick={() => setshowProfile(false)}
              className="
                w-9
                h-9
                rounded-full

                flex
                items-center
                justify-center

                bg-white/10
                border border-white/10

                text-white/60

                hover:bg-white/15
                hover:text-white

                transition
              "
            >
              <X size={18} />
            </button>
          </div>

          {/* PROFILE HERO */}
          <div className="px-6 sm:px-8 pt-8 pb-7">

            <div
              className="
                relative
                rounded-[28px]
                p-6
                sm:p-7

                bg-white/[0.055]

                border border-white/10

                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              "
            >

              {/* PROFILE ICON */}
              <div className="flex flex-col items-center">

                <div className="relative">

                  {/* Glow */}
                  <div
                    className="
                      absolute
                      -inset-2

                      rounded-full

                      bg-gradient-to-br
                      from-red-500/30
                      via-orange-400/20
                      to-yellow-300/20

                      blur-xl
                    "
                  />

                  {/* Initial Avatar */}
                  <div
                    className="
                      relative

                      w-28
                      h-28

                      sm:w-32
                      sm:h-32

                      rounded-full

                      flex
                      items-center
                      justify-center

                      bg-gradient-to-br
                      from-red-500
                      via-orange-500
                      to-yellow-400

                      border
                      border-white/20

                      shadow-[0_10px_40px_rgba(0,0,0,0.35)]

                      text-white
                      text-4xl
                      font-semibold
                    "
                  >
                    {(name?.charAt(0) || "U").toUpperCase()}
                  </div>

                </div>

                {/* NAME */}
                <h1 className="mt-5 text-xl sm:text-2xl font-semibold">
                  {name || "Your Name"}
                </h1>

                {/* EMAIL */}
                <p className="mt-1 text-sm text-white/40">
                  {profile?.email || "No email"}
                </p>

                {/* EDIT NAME */}
                <button
                  onClick={() => setEditingName(true)}
                  className="
                    mt-4

                    flex
                    items-center
                    gap-2

                    px-4
                    py-2

                    rounded-full

                    bg-white/[0.07]
                    border border-white/10

                    text-xs
                    text-white/60

                    hover:text-white
                    hover:bg-white/10

                    transition
                  "
                >
                  <Pencil size={13} />
                  Edit name
                </button>

              </div>

            </div>

          </div>

          {/* DETAILS */}
          <div className="px-6 sm:px-8 pb-8">

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.18em]
                text-white/30
                mb-3
              "
            >
              Personal information
            </p>

            <div
              className="
                rounded-[24px]
                overflow-hidden

                bg-white/[0.045]

                border border-white/10
              "
            >

              <DetailRow
                icon={<Mail size={17} />}
                label="Email"
                value={profile?.email}
              />

              <DetailRow
                icon={<Phone size={17} />}
                label="Mobile"
                value={profile?.mobile}
              />

              <DetailRow
                icon={<MapPin size={17} />}
                label="Address"
                value={profile?.address}
              />

              <DetailRow
                icon={<UserRound size={17} />}
                label="Gender"
                value={profile?.gender}
              />

              <DetailRow
                icon={<CalendarDays size={17} />}
                label="Age"
                value={profile?.age}
                last
              />

            </div>

          </div>

          {/* NAME EDIT MODAL */}
          {editingName && (

            <div
              className="
                absolute
                inset-0
                z-30

                flex
                items-center
                justify-center

                p-5

                bg-black/35
                backdrop-blur-xl
              "
            >

              <div
                className="
                  w-full
                  max-w-sm

                  p-6

                  rounded-[26px]

                  bg-[#18181a]/90
                  backdrop-blur-3xl

                  border border-white/15

                  shadow-2xl
                "
              >

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="font-semibold">
                      Change name
                    </h3>

                    <p className="text-xs text-white/40 mt-1">
                      Enter your display name
                    </p>
                  </div>

                  <button
                    onClick={() => setEditingName(false)}
                    className="
                      text-white/40
                      hover:text-white
                    "
                  >
                    <X size={18} />
                  </button>

                </div>

                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    mt-6

                    w-full

                    px-4
                    py-3.5

                    rounded-2xl

                    bg-white/[0.07]

                    border
                    border-white/10

                    outline-none

                    text-sm

                    focus:border-orange-400/50
                    focus:bg-white/[0.09]

                    transition
                  "
                  placeholder="Your name"
                />

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => setEditingName(false)}
                    className="
                      flex-1
                      py-3

                      rounded-xl

                      bg-white/[0.06]
                      border border-white/10

                      text-sm
                      text-white/60

                      hover:bg-white/10
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="
                      flex-1
                      py-3

                      rounded-xl

                      bg-gradient-to-r
                      from-red-500
                      via-orange-500
                      to-yellow-400

                      text-sm
                      font-medium

                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <Check size={16} />
                    Done
                  </button>

                </div>

              </div>

            </div>

          )}

          {/* SAVE */}
          {hasChanges && !editingName && (

            <div
              className="
                sticky
                bottom-0

                px-6
                sm:px-8
                py-4

                bg-black/20
                backdrop-blur-2xl

                border-t
                border-white/10
              "
            >

              <button
                onClick={handleSave}
                className="
                  w-full

                  py-3.5

                  rounded-2xl

                  bg-gradient-to-r
                  from-red-500
                  via-orange-500
                  to-yellow-400

                  text-sm
                  font-semibold

                  shadow-[0_8px_30px_rgba(249,115,22,0.2)]

                  hover:scale-[1.01]

                  transition
                "
              >
                Save Changes
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({ icon, label, value, last }) {

  return (
    <div
      className={`
        flex
        items-center
        gap-4

        px-5
        py-4

        ${!last ? "border-b border-white/[0.07]" : ""}
      `}
    >

      <div
        className="
          w-9
          h-9
          shrink-0

          rounded-xl

          flex
          items-center
          justify-center

          bg-white/[0.06]

          border
          border-white/10

          text-white/45
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-[11px] text-white/30">
          {label}
        </p>

        <p className="mt-1 text-sm text-white/75 truncate">
          {value || "Not provided"}
        </p>

      </div>

    </div>
  );
}

export default UserDetail;