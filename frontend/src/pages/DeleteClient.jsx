import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteClient = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteClient = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/clients/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/clients/intro");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console.");
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
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="p-4 flex justify-center items-center flex-grow">
          <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-full max-w-lg p-8">
            <AiOutlineDelete className="text-6xl text-red-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-center">
              Delete Client
            </h2>
            <p className="text-xl mb-8 text-center">
              Are you sure you want to delete this client?
            </p>
            <button
              className="p-4 bg-red-600 text-white w-full rounded-md transition duration-800 ease-in-out hover:bg-red-800 disabled:opacity-50"
              onClick={handleDeleteClient}
              disabled={loading}
            >
              {loading ? <Spinner size="w-6 h-6" /> : "Yes, delete it!"}
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full text-center py-4 mt-auto">
        <p className="text-white">All rights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default DeleteClient;
