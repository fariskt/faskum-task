"use client";

import { loginUser } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData)
      if (res?.token) {
        localStorage.setItem("token", res.data.token)
        router.push("/");
        alert("Login succedd")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-amber-300">
      <h1 className="mb-5 text-2xl">Login</h1>
      <form onSubmit={handleRegister} className="flex flex-col">
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          placeholder="email"
          className="border p-2 rounded-md"
          value={formData.email}
          name="email"
          onChange={hanldeChange}
        />
        <label htmlFor="name">Password</label>
        <input
          type="password"
          className="border p-2 rounded-md"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={hanldeChange}
        />
        <button className="cursor-pointer mt-4 bg-white rounded-md p-2" type="submit">Submit</button>
        <br />
        <h5>
          Dont have an account, <Link href="/register">Register</Link>
        </h5>
      </form>
    </div>
  );
};

export default page;
