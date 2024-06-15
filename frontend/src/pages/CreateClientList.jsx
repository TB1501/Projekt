import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateClientList = () => {
  const [coach, setCoach] = useState("");
  const [trainee, setTrainee] = useState("");
  const [enrolmentDate, setEnrolmentDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveClient = () => {
    const data = {
      coach,
      trainee,
      enrolmentDate,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/clients", data)
      .then(() => {
        setLoading(false);
        navigate("/clients/intro");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check the console");
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <header className="w-full text-center py-4">
        <h1 className="text-4xl font-bold">The Goat App</h1>
      </header>
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="p-4 flex justify-center items-center">
        <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl my-4">Create Client</h1>
          {loading ? <Spinner /> : ""}
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={trainee}
              onChange={(e) => setTrainee(e.target.value)}
              placeholder="Enter client name"
              className="border-2 border-gray-500 px-4 py-2 rounded-lg text-black focus:outline-none focus:border-blue-400"
            />
            <input
              type="text"
              value={coach}
              onChange={(e) => setCoach(e.target.value)}
              placeholder="Enter coach name"
              className="border-2 border-gray-500 px-4 py-2 rounded-lg text-black focus:outline-none focus:border-blue-400"
            />
            <input
              type="date"
              value={enrolmentDate}
              onChange={(e) => setEnrolmentDate(e.target.value)}
              placeholder="Select enrolment date"
              className="border-2 border-gray-500 px-4 py-2 rounded-lg text-black focus:outline-none focus:border-blue-400"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
              onClick={handleSaveClient}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full text-center py-4 mt-auto bg-gray-800">
        <p className="text-white">All copyrights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default CreateClientList;
