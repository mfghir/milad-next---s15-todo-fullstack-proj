import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="signin-form">
      <h3>Login Form</h3>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginhandler}>Login</button>

      <div>
        <p>Create an account?</p>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SigninPage;
