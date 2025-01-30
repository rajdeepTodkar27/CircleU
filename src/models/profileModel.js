"use server";
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userEmail: { type: String, required: true },
  profession: { type: String, required: true },
  location: { type: String, required: true },
  phoneNo: { type: String, required: true },

  rating: { type: Number },
  profilePic: String,
  // facebook: String,
  whatsApp: String,
  // twitter: String,
  // linkedIn: String,
  website: String,
  email: { type: String },
  isWorking: { type: Boolean, default: false },
  bio: String,
});

const Profile =
  mongoose.models.profiles || mongoose.model("profiles", profileSchema);

export default Profile;
