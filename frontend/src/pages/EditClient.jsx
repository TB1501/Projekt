import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditClient = () => {
  const [coach, setCoach] = useState("");
  const [trainee, setTrainee] = useState("");
  const [enrolmentDate, setEnrolmentDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/clients/${id}`)
      .then((response) => {
        setCoach(response.data.coach);
        setEnrolmentDate(response.data.enrolmentDate);
        setTrainee(response.data.trainee);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check the console");
        console.log(error);
      });
  }, [id]);

  const handleEditClient = () => {
    const data = {
      coach,
      trainee,
      enrolmentDate,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/clients/${id}`, data)
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
      <div className="flex flex-col items-center justify-center flex-grow bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl text my-4">Edit Client</h1>
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
              onClick={handleEditClient}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full text-center py-4 ">
        <p className="text-white">All rights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default EditClient;
