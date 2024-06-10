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
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <header className="w-full text-center py-4">
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
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md border-w-2">
                  No
                </th>
                <th className="border border-slate-600 rounded-md border-w-2">
                  Client
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden border-w-2">
                  Coach
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden border-w-2">
                  Enrolment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={client._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center border-w-2">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden border-w-2">
                    {client.trainee}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center border-w-2">
                    {client.coach}
                  </td>

                  <td className="border border-slate-700 rounded-md text-center max-md:hidden border-w-2">
                    {client.enrolmentDate}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center border-w-2">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/clients/details/${client._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/clients/edit/${client._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/clients/delete/${client._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <footer className="w-full text-center py-4 bg-gray-800 text-white mt-4">
        <p>All copyrights reserved by Tin</p>
      </footer>
    </div>
  );
};

export default IntroPage;
