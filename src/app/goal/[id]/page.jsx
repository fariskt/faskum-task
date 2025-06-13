"use client";

import { getGoalById } from "../../../services/goalService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [isLoading, setIsloadig] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchSingleGoal = async () => {
      setIsloadig(true)
      try {
        const response = await getGoalById(id, token)
        setIsloadig(false)
        setGoal(response.goal);
      } catch (error) {
        console.log(error);
        setIsloadig(false)
      }
    };
    fetchSingleGoal();
  },[]);

  if (isLoading) {
    return <div className="bg-amber-300 min-h-screen text-center flex items-center justify-center">loading...</div>;
  }
  return (
    <div className="flex flex-col items-center bg-amber-300 min-h-screen justify-center">
      <div className="bg-white p-5 rounded-md">
        <h2>Title: {goal?.title}</h2>
        <p>Description : {goal?.description}</p>
        <div>
          <p>Priority: {goal?.priority}</p>
          <p>Status: {goal?.status}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
