import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    originalName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Identity",
        "Education",
        "Finance",
        "Government",
        "Medical",
        "Personal",
        "Other",
      ],
      default: "Other",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

documentSchema.index({
  owner: 1,
  name: "text",
  originalName: "text",
});

export default mongoose.models.Document ||
  mongoose.model("Document", documentSchema);