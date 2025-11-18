import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProjectDocument extends Document {
  title: string;
  role: string;
  description: string;
  technologies: string[];
  image?: {
    light?: string;
    dark?: string;
  };
  link?: string;
  code?: string;
}

export interface Project {
  _id: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  image?: {
    light?: string;
    dark?: string;
  };
  imageUrl?: string; // 👈 ajout
  link?: string;
  code?: string;
}

const ProjectSchema: Schema<IProjectDocument> = new Schema({
  title: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  image: {
    light: { type: String },
    dark: { type: String },
  },
  link: { type: String },
  code: { type: String },
});

const ProjectModel: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>("Project", ProjectSchema);

export default ProjectModel;
