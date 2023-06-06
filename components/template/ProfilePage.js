import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../module/ProfileForm";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("data", data);
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>

      <ProfileForm
        name={name}
        lastName={lastName}
        password={password}
        setName={setName}
        setLastName={setLastName}
        setPassword={setPassword}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default ProfilePage;
