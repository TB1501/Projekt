import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
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
    <div className="flex flex-col min-h-screen bg-gray-800 text-white p-4">
      <header className="w-full text-center py-4">
        <h1 className="text-4xl font-bold">The Goat App</h1>
      </header>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Show Client</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 mx-auto">
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
              <span className="text-xl mr-4 text-gray-500">Enrolment Date</span>
              <span>{client.enrolmentDate}</span>
            </div>
          </div>
        )}
      </div>
      <footer className="w-full text-center py-4 mt-auto">
        <p>All copyrights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default ShowBook;
