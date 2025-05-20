import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  lifePathNumber: Number,
  expressionNumber: Number,
  soulUrgeNumber: Number,
  personalityNumber: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
});

const NumerologyReport = mongoose.model("NumerologyReport", reportSchema);

export default NumerologyReport;