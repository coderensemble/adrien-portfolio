import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/projects";

// GET /api/projects → liste les projets
export async function GET() {
  await dbConnect();
  const projects = await Project.find().lean();
  return NextResponse.json(projects);
}

// POST /api/projects → ajouter un projet
// POST /api/projects → ajouter un projet
export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newProject = await Project.create(data);
  return NextResponse.json(newProject.toObject(), { status: 201 });
}

