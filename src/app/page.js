"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";

export default function Home() {
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
  });
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");

  const handleChanage = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setGoalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://goal-tracker-api.onrender.com/api/v1/goals",
        goalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchGoals = async () => {
      const response = await axios.get(
        "https://goal-tracker-api.onrender.com/api/v1/goals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGoals(response.data.goals || []);
    };
    fetchGoals();
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-amber-300">
      <button
        onClick={() => setShowForm(true)}
        className="absolute top-10 right-20 bg-green-500 p-2 rounded-2xl text-white"
      >
        Create goal
      </button>

      <h1 className="text-3xl">{goals.length > 0 ? "Goals" : "No goal found"}</h1>
      <div className="grid grid-cols-3 ml-10">
        {goals.map((goal) => (
          <Link href={`/goal/${goal._id}`} key={goal._id}>
            <div className="bg-amber-200 p-3 rounded-md hover:bg-amber-100">
              <h2>Title: {goal.tilte}</h2>
              <p>description: {goal.description}</p>
              <div>
                <h5>priority: {goal.priority}</h5>
                <h5>status : {goal.status}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {showForm && (
        <GoalForm handleChanage={handleChanage} goalData={goalData} submitGoal={submitGoal} setShowForm={setShowForm}/>
      )}
    </div>
  );
}
