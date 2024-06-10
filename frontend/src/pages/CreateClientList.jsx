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
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <header className="w-full text-center py-4">
        <h1 className="text-4xl font-bold">The Goat App</h1>
      </header>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Create Client</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Client</label>
            <input
              type="text"
              value={trainee}
              onChange={(e) => setTrainee(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full text-black"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Coach</label>
            <input
              type="text"
              value={coach}
              onChange={(e) => setCoach(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full text-black"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Enrolment Date</label>
            <input
              type="text"
              value={enrolmentDate}
              onChange={(e) => setEnrolmentDate(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full text-black"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveClient}>
            Save
          </button>
        </div>
      </div>
      <footer className="w-full text-center py-4 mt-auto">
        <p>All copyrights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default CreateClientList;
