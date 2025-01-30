"use client";
import { getProfileInfo } from "@/actions/profileActions";
import ProfileEdit from "@/components/ProfileEdit";
import ProfileStatic from "@/components/ProfileStatic";
import ToggleButton from "@/components/ToggleButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function profile() {
  const user = useSession();
  const [profileExist, setProfileExist] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Your name",
    profilePic: "",
    profession: "Your Profession",
    bio: "",
    location: "e.g: Jorpati",
    phoneNo: "",
    whatsApp: "",
    email: "",
  });
  const [profileStatic, setProfileStatic] = useState({
    name: "",
    profilePic: "",
    profession: "",
    bio: "",
    location: "",
    phoneNo: "",
    whatsApp: "",
    email: "",
  });

  useEffect(() => {
    async function getProfile() {
      const result = await getProfileInfo();
      if (result != false) {
        setProfile(result);
        setProfileStatic(result);
      } else {
        setProfileExist(false);
        setProfileStatic((prev) => ({
          ...prev,
          name: user?.data?.user?.name,
          email: user?.data?.user?.email,
          profilePic: user?.data?.user?.image || "",
        }));
      }
    }

    getProfile();
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 mx-auto max-w-[800px] mt-5 relative">
        <div className="self-end relative top-3 m-4">
          <ToggleButton
            isChecked={editMode}
            setIsChecked={setEditMode}
            name={"Edit Mode"}
          />
        </div>

        {editMode ? (
          <ProfileEdit
            user={user?.data?.user}
            profile={profile}
            setProfile={setProfile}
            setProfileStatic={setProfileStatic}
            profileExist={profileExist}
            setEditMode={setEditMode}
          />
        ) : (
          <ProfileStatic  profile={profileStatic} user={user} />
        )}
      </div>
    </>
  );
}
