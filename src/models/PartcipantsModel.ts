import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  teamname: {type:String, required: true},
  name: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: String, required: true },
  linkedin: { type: String, required: false },
  event: { type: String, required: true },
  paymentid: {type: String, required: true}
}, { timestamps: true });


ParticipantSchema.index({ email: 1, event: 1 }, { unique: true });

const Participant = mongoose.models.Participant || mongoose.model("Participant", ParticipantSchema);
export default Participant;
