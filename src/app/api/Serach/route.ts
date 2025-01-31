import { NextResponse } from "next/server";
import { dbconnect } from "@/dbConfig/dfConfig";
import Profile from "@/models/profileModel";

dbconnect();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const name = url.searchParams.get("name");
    const email = url.searchParams.get("email");
    const college = url.searchParams.get("college");
    const department = url.searchParams.get("department"); // Changed from domain to department

    console.log("Query Params:", { query, name, email, college, department });

    if (!query && !name && !email && !college && !department) {
      return NextResponse.json(
        { error: "No search query or parameters provided" },
        { status: 400 }
      );
    }

    // Build the search query
    const searchQuery: any = {};

    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { college: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } }, // Changed from domain to department
        { skills: { $regex: query, $options: "i" } },    // Added skills search
        { degree: { $regex: query, $options: "i" } }     // Added degree search
      ];
    }

    if (name) {
      searchQuery.name = { $regex: name, $options: "i" };
    }

    if (email) {
      searchQuery.email = { $regex: email, $options: "i" };
    }

    if (college) {
      searchQuery.college = { $regex: college, $options: "i" };
    }

    if (department) {
      searchQuery.department = { $regex: department, $options: "i" }; // Changed from domain to department
    }

    console.log("Final Search Query:", JSON.stringify(searchQuery, null, 2));

    // Add logging to check if there are any documents in the collection
    const totalDocs = await Profile.countDocuments();
    console.log("Total documents in collection:", totalDocs);

    // Query the Profile collection
    const results = await Profile.find(searchQuery).select({
      name: 1,
      email: 1,
      college: 1,
      department: 1,
      skills: 1,
      degree: 1,
      city: 1
    });

    console.log("Number of results found:", results.length);
    
    return NextResponse.json({ 
      success: true, 
      result: results,
      total: results.length 
    });
  } catch (error) {
    console.error("Error during query:", error);
    return NextResponse.json({ 
      error: "An error occurred", 
      success: false,
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}