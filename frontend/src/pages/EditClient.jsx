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
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <header className="w-full text-center py-4">
        <h1 className="text-4xl font-bold">The Goat App</h1>
      </header>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Edit Client</h1>
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
          <button className="p-2 bg-sky-300 m-8" onClick={handleEditClient}>
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

export default EditClient;
