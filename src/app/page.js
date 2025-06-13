"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import { useRouter } from "next/navigation";
import { createGoal, getGoals } from "../services/goalService";

export default function Home() {
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
  });
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsloadig] = useState(false);
  const token = localStorage.getItem("token");
  const router = useRouter();

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
      const res = createGoal(goalData, token);
      setGoalData({
        title: "",
        description: "",
        priority: "",
        status: "",
      });
      setShowForm(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchGoals = async () => {
      setIsloadig(true);
      try {
        const response = await getGoals(token);
        setIsloadig(false);
        setGoals(response.goals || []);
      } catch (error) {
        setIsloadig(false);
        console.log(error);
      }
    };
    fetchGoals();
  }, [setGoalData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-amber-300">
      <button
        onClick={() => setShowForm(true)}
        className="absolute top-10 right-20 bg-green-500 p-2 rounded-2xl text-white"
      >
        Create goal
      </button>

      <h1 className="text-3xl">{!isLoading && "Goals"}</h1>
      <div className="grid grid-cols-3 ml-10 gap-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          goals.map((goal) => (
            <Link href={`/goal/${goal._id}`} key={goal._id}>
              <div className="bg-amber-200 p-3 rounded-md hover:bg-amber-100 max-w-sm mt-5">
                <h2>Title: {goal.title}</h2>
                <p>description: {goal.description}</p>
                <div>
                  <h5>priority: {goal.priority}</h5>
                  <h5>status : {goal.status}</h5>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      {showForm && (
        <GoalForm
          handleChanage={handleChanage}
          goalData={goalData}
          submitGoal={submitGoal}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
}
