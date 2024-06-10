import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateClientList from "./pages/CreateClientList";
import DeleteClient from "./pages/DeleteClient";
import EditClient from "./pages/EditClient";
import Home from "./pages/Home";
import ShowClient from "./pages/ShowClient";
import IntroPage from "./pages/IntroPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients/create" element={<CreateClientList />} />
      <Route path="/clients/intro" element={<IntroPage />} />
      <Route path="/clients/details/:id" element={<ShowClient />} />
      <Route path="/clients/edit/:id" element={<EditClient />} />
      <Route path="/clients/delete/:id" element={<DeleteClient />} />
    </Routes>
  );
};

export default App;
