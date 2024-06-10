import express from "express";
import { coachApp } from "../models/coachAppModel.js";

const router = express.Router();

//Route for Save new client
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.coach ||
      !request.body.trainee ||
      !request.body.enrolmentDate
    ) {
      return response.status(400).send({
        message: "Send all required fileds: coach, trainee, enrolmentDate",
      });
    }
    const newClientList = {
      coach: request.body.coach,
      trainee: request.body.trainee,
      enrolmentDate: request.body.enrolmentDate,
    };
    const clientList = await coachApp.create(newClientList);
    return response.status(201).send(clientList);
  } catch (error) {
    console.log.apply(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get all clinets from DB
router.get("/", async (request, response) => {
  try {
    const clientList = await coachApp.find({});
    return response.status(200).json({ clientList });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get 1 clinet from DB
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const clientList = await coachApp.findById(id);
    return response.status(200).json(clientList);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a Client
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.coach ||
      !request.body.trainee ||
      !request.body.enrolmentDate
    ) {
      return response.status(400).send({
        message: "Send all required fileds: coach, client, enrolmentDate",
      });
    }
    const { id } = request.params;
    const result = await coachApp.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Client not found" });
    }
    return response
      .status(200)
      .send({ message: "Client updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for delete a Client
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await coachApp.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Client not found" });
    }
    return response
      .status(200)
      .send({ message: "Client deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
