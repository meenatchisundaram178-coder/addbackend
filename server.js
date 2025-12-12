import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// 🟢 Dynamic Schema — to store all fields
const DynamicSchema = new mongoose.Schema({}, { strict: false });
const Patient = mongoose.model("patients", DynamicSchema);

// 🟢 API to Add Patient (POST)
app.post("/add-patient", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ status: "success", message: "Patient saved successfully" });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

// 🟢 API to Get All Patients (GET)
app.get("/patients", async (req, res) => {
  const patients = await Patient.find().sort({ _id: -1 });
  res.json(patients);
});

// 🟢 Start Server
app.listen(process.env.PORT || 5000, () =>
  console.log("Backend running on port", process.env.PORT || 5000)
);
