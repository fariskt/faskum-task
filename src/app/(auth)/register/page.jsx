"use client";

import { registerUser } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      const res = await registerUser(formData)
      if(res){
        router.push("/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-amber-300 min-h-screen flex justify-center flex-col items-center">
      <h1 className="mb-5 text-2xl">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col space-y-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="name"
          name="name"
                    className="border p-2 rounded-md"
          value={formData.name}
          onChange={hanldeChange}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          className="border p-2 rounded-md"
          onChange={hanldeChange}
        />
        <label htmlFor="name">Password</label>
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          name="password"
          className="border p-2 rounded-md"
          onChange={hanldeChange}
        />
        <button className="mt-4 bg-white rounded-md p-2" type="submit">Submit</button>
        <div>
          <h5>Already have an account, <Link href="/login">Login</Link></h5>
        </div>
      </form>
    </div>
  );
};

export default page;
