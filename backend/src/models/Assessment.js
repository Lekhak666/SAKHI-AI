import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      enum: ["en", "hi", "bn"],
    },

    mode: {
      type: String,
      required: true,
      enum: ["text", "voice"],
    },

    consent: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "Consent must be accepted",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;
