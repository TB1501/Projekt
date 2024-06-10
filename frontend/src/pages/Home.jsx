import React from "react";
import { Link } from "react-router-dom";
import goatImage from "../assets/Goat_2.svg"; // Update the path to your image

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="flex flex-col items-center">
        <img
          src={goatImage}
          alt="The Goat"
          className="w-1/2 md:w-1/3 lg:w-1/4 rounded-full"
        />
        <h1 className="text-8xl md:text-8xl lg:text-8xl mt-4">The Goat</h1>
        <Link to="/clients/intro" className="mt-6">
          <button className="bg-blue-500 text-white px-7 py-2 rounded-md text-lg md:text-xl lg:text-2xl">
            Login
          </button>
        </Link>
      </div>
      <footer className="mt-16 p-4 text-center">
        <p>
          "The Goat" is a web app designed for managing clients. In the app you
          add clients, the coaches and the enrolment date to the program.
        </p>
      </footer>
    </div>
  );
};

export default Home;
