"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSingleGoal = async () => {
      try {
        const response = await axios.get(
          `https://goal-tracker-api.onrender.com/api/v1/goals/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoal(response.data.goal);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleGoal();
  },[]);

  if (!goal) {
    return <div>No goal found</div>;
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
