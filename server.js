import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 MongoDB Connection (Use MongoDB Atlas for Render)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// 🟢 Dynamic Schema — stores any form fields
const DynamicSchema = new mongoose.Schema({}, { strict: false });
const Patient = mongoose.model("patients", DynamicSchema);

// 🟢 API to Add Patient
app.post("/add-patient", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ status: "success", message: "Patient saved successfully" });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

// 🟢 API to Get All Patients
app.get("/patients", async (req, res) => {
  const allPatients = await Patient.find().sort({ _id: -1 });
  res.json(allPatients);
});

// 🟢 Start Server
app.listen(process.env.PORT || 5000, () =>
  console.log("Backend running on port 5000")
);
