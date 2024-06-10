import React, { useState } from "react";
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
        <h1 className="text-3xl my-4">Delete Client</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">Are you sure you want to delete it? </h3>
          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDeleteClient}
          >
            Yes, delete it!
          </button>
        </div>
      </div>
      <footer className="w-full text-center py-4 mt-auto">
        <p>All copyrights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default DeleteClient;
