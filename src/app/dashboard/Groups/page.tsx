"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface TeamForm {
  hackathonName: string;
  teamName: string;
  problemStatement: string;
  details: string;
  teamLeader: string;
  teamMembers: string[];
}

const Page: React.FC = () => {
  const [form, setForm] = useState<TeamForm>({
    hackathonName: "",
    teamName: "",
    problemStatement: "",
    details: "",
    teamLeader: "",
    teamMembers: ["", "", "", "", ""], // Predefined 5 members
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    const updatedTeamMembers = [...form.teamMembers];
    updatedTeamMembers[index] = value;
    setForm({ ...form, teamMembers: updatedTeamMembers });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submitGrpDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        console.log("Team details submitted successfully!");
        setForm({
          teamName: "",
          hackathonName: "",
          problemStatement: "",
          details: "",
          teamLeader: "",
          teamMembers: ["", "", "", "", ""],
        });

        window.location.href = "/dashboard/viewTeam";
      } else {
        console.error("Failed to submit team details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-[90vw] md:w-[60vw] space-y-6">
        <h1 className="text-4xl font-bold text-blue-600 text-center">Create Team Details</h1>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="teamName">
            Team Name
          </label>
          <input
            value={form.teamName}
            onChange={handleChange}
            type="text"
            name="teamName"
            id="teamName"
            placeholder="Enter the Team Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="hackathonName">
            Hackathon Name
          </label>
          <input
            value={form.hackathonName}
            onChange={handleChange}
            type="text"
            name="hackathonName"
            id="hackathonName"
            placeholder="Enter the Hackathon Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="problemStatement">
            Problem Statement
          </label>
          <textarea
            value={form.problemStatement}
            onChange={handleChange}
            id="problemStatement"
            name="problemStatement"
            placeholder="Describe the problem statement"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="details">
            Details
          </label>
          <textarea
            value={form.details}
            onChange={handleChange}
            id="details"
            name="details"
            placeholder="Provide additional details"
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="teamLeader">
            Team Leader
          </label>
          <input
            value={form.teamLeader}
            onChange={handleChange}
            type="text"
            id="teamLeader"
            name="teamLeader"
            placeholder="Enter Team Leader's Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="teamMembers">
            Team Members
          </label>
          <div className="space-y-2">
            {form.teamMembers.map((member, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Team Member ${index + 1}`}
                value={member}
                onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Team Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
