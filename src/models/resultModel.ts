import mongoose, { Schema, Document } from "mongoose";

interface ITeamPosition {
    teamName: string;
    teamLeader: string;
  }
  
  export interface IEventResult extends Document {
    eventName: string;
    winner: ITeamPosition;
    runnerUp: ITeamPosition;
    secondRunnerUp: ITeamPosition;
  }
  
  const TeamPositionSchema: Schema<ITeamPosition> = new Schema({
    teamName: { type: String, required: true },
    teamLeader: { type: String, required: true },
  });
  
  const EventResultSchema: Schema<IEventResult> = new Schema({
    eventName: { type: String, required: true },
    winner: { type: TeamPositionSchema, required: true },
    runnerUp: { type: TeamPositionSchema, required: true },
    secondRunnerUp: { type: TeamPositionSchema, required: true },
  },{ timestamps: true });


const Result = mongoose.models.Result || mongoose.model<IEventResult>("Result", EventResultSchema);

export default Result;
