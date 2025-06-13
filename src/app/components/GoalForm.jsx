import React from "react";

const GoalForm = ({ submitGoal, goalData, handleChanage,setShowForm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm bg-opacity-50 z-50">
      <div className="bg-amber-50 p-6 rounded-xl shadow-lg w-full max-w-md">
        <button className="absolute text-sm cursor-pointer font-bold text-gray-600" onClick={()=> setShowForm(false)}>Close</button>
        <h2 className="my-4 text-center text-xl">Set goal</h2>
        <form onSubmit={submitGoal}>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            className="w-full px-3 py-2 mb-4 border rounded-md"
            placeholder="Title"
            value={goalData.title}
            name="title"
            onChange={handleChanage}
          />

          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <input
            className="w-full px-3 py-2 mb-4 border rounded-md"
            placeholder="Description"
            value={goalData.description}
            name="description"
            onChange={handleChanage}
          />

          <label htmlFor="status" className="block mb-1 font-medium">
            Status
          </label>
          <select
            className="w-full px-3 py-2 mb-4 border rounded-md"
            value={goalData.status}
            onChange={handleChanage}
            name="status"
          >
            <option value="to-do">To-do</option>
            <option value="in-progress">In Progress</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <label htmlFor="priority" className="block mb-1 font-medium">
            Priority
          </label>
          <select
            className="w-full px-3 py-2 mb-4 border rounded-md"
            value={goalData.priority}
            onChange={handleChanage}
            name="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;
