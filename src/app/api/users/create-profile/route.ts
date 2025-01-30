import { NextResponse } from "next/server";
import Profile from "@/models/profileModel";
import { dbconnect } from "@/dbConfig/dfConfig";

// Connect to MongoDB
dbconnect();

// 📌 Create Profile (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Create Profile - Raw request body:', body);
    
    const { 
      name, 
      email, 
      age, 
      department, 
      skills, 
      degree, 
      Linkedin, 
      phone_number, 
      college, 
      city 
    } = body;

    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!age) missingFields.push('age');
    if (!department) missingFields.push('department');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}`,
          missingFields 
        },
        { status: 400 }
      );
    }

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return NextResponse.json(
        { success: false, message: "Profile already exists" },
        { status: 400 }
      );
    }

    // Create new profile
    const newStudent = new Profile({ 
      name, 
      email, 
      age, 
      department, 
      skills, 
      degree, 
      Linkedin, 
      phone_number, 
      college, 
      city 
    });
    
    await newStudent.save();
    console.log('New profile created:', newStudent);

    return NextResponse.json({
      success: true,
      message: "Student profile created successfully",
      profile: newStudent,
    });
  } catch (error: any) {
    console.error("Error creating student profile:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Error creating student profile",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// 📌 Get Profile (GET)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    console.log('Get Profile - Searching for email:', email);

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const profile = await Profile.findOne({ email });
    console.log('Profile found:', profile);

    if (!profile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    console.error("Error fetching student profile:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Error fetching profile",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// 📌 Update Profile (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log('Update Profile - Raw request body:', body);
    
    const { 
      name, 
      email, 
      age, 
      department,
      skills, 
      degree, 
      Linkedin, 
      phone_number, 
      college, 
      city 
    } = body;

    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!age) missingFields.push('age');
    if (!department) missingFields.push('department');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}`,
          missingFields 
        },
        { status: 400 }
      );
    }

    // Check if profile exists before updating
    const existingProfile = await Profile.findOne({ email });
    if (!existingProfile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      { 
        name, 
        age, 
        department,
        skills, 
        degree, 
        Linkedin, 
        phone_number, 
        college, 
        city 
      },
      { 
        new: true,
        runValidators: true 
      }
    );

    console.log('Profile updated:', updatedProfile);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error: any) {
    console.error("Error updating student profile:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Error updating profile",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// 📌 Delete Profile (DELETE)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    console.log('Delete Profile - Email:', email);

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const deletedProfile = await Profile.findOneAndDelete({ email });
    console.log('Profile deleted:', deletedProfile);

    if (!deletedProfile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting student profile:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Error deleting profile",
        error: error.message 
      },
      { status: 500 }
    );
  }
}