import mongoose from "mongoose";

const sondageSchema = mongoose.Schema(
  {
    voterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    vote: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Sondage = mongoose.model("Sondage", sondageSchema);

export default Sondage;
