import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const IntroPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/clients")
      .then((response) => {
        setClients(response.data.clientList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white font-sans">
      <header className="w-full text-center py-4 ">
        <h1 className="text-4xl font-bold">The Goat App</h1>
      </header>
      <main className="flex-grow p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Client List</h1>
          <Link to="/clients/create">
            <MdOutlineAddBox className="text-sky-600 text-5xl"></MdOutlineAddBox>
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg font-mono bg-gray-900">
            <table className="w-full text-sm text-gray-300">
              <thead className="bg-gray-800">
                <tr>
                  <th className="border border-gray-600 px-4 py-2">No</th>
                  <th className="border border-gray-600 px-4 py-2">Client</th>
                  <th className="border border-gray-600 px-4 py-2 max-md:hidden">
                    Coach
                  </th>
                  <th className="border border-gray-600 px-4 py-2 max-md:hidden">
                    Enrolment Date
                  </th>
                  <th className="border border-gray-600 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client._id} className="bg-gray-700">
                    <td className="border border-gray-600 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {client.trainee}
                    </td>
                    <td className="border border-gray-600 px-4 py-2 max-md:hidden">
                      {client.coach}
                    </td>
                    <td className="border border-gray-600 px-4 py-2 max-md:hidden">
                      {client.enrolmentDate}
                    </td>
                    <td className="border border-gray-600 px-4 py-2 flex justify-center gap-x-4">
                      <Link to={`/clients/details/${client._id}`}>
                        <BsInfoCircle className="text-green-500 hover:text-green-300 transition duration-300" />
                      </Link>
                      <Link to={`/clients/edit/${client._id}`}>
                        <AiOutlineEdit className="text-yellow-500 hover:text-yellow-300 transition duration-300" />
                      </Link>
                      <Link to={`/clients/delete/${client._id}`}>
                        <MdOutlineDelete className="text-red-500 hover:text-red-300 transition duration-300" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer className="w-full text-center py-4 ">
        <p className="text-sm">All copyrights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default IntroPage;
