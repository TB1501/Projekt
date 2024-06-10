import mongoose from "mongoose";

const coachAppSchema = mongoose.Schema({
  coach: {
    type: String,
    required: true,
  },
  trainee: {
    type: String,
    required: true,
  },
  enrolmentDate: {
    type: String,
    required: true,
  },
});

export const coachApp = mongoose.model("App", coachAppSchema);
