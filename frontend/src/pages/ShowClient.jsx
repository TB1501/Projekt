import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/clients/${id}`)
      .then((response) => {
        setClient(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <header className="w-full text-center py-4">
        <h1 className="text-4xl font-bold">The Goat App</h1>
      </header>
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="p-4 flex flex-col items-center justify-center flex-grow">
        <div className="p-4"></div>
        <div className="p-4">
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto">
              <h1 className="text-3xl text-center font-bold mb-4">
                Client Info
              </h1>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Id</span>
                <span>{client._id}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Client</span>
                <span>{client.trainee}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Coach</span>
                <span>{client.coach}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">
                  Enrolment Date
                </span>
                <span>{client.enrolmentDate}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="w-full text-center py-4">
        <p className="text-white">All copyrights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default ShowClient;
