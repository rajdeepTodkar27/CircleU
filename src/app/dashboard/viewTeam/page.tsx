"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Team {
  id: string;
  teamName: string;
  hackathonName: string;
  teamLeader: string;
}

const Card: React.FC = () => {
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null); // for modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/submitGrpDetails", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }

        const teams = await response.json();
        setTeamData(teams.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchData();
  }, []);

 


  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/submitDetails", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the team.");
      }

      setTeamData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("An error occurred while trying to delete the team. Please try again.");
    }
  };

  return (
    <>
     <div className="h-full flex items-center justify-center p-4">
  <div className="bg-white shadow-xl rounded-xl border border-gray-200 w-full md:w-[90vw] lg:w-[80vw] xl:w-[70vw] p-6 overflow-y-auto max-h-[90vh]">
    <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Available Teams</h2>

    {teamData.length === 0 ? (
      <div className="text-center text-gray-500 text-lg">No teams yet. <span className="font-semibold text-blue-500">Create your own team!</span></div>
    ) : (
      <div className="flex flex-wrap justify-center gap-6">
        {teamData.map((item) => (
          <div
            key={item.id || item._id}
            className="relative flex flex-col items-start justify-between border border-gray-200 bg-white shadow-md rounded-xl p-5 w-full sm:w-[45%] lg:w-[30%] xl:w-[23%] min-w-[250px] h-64 transition-transform hover:scale-[1.02] hover:shadow-xl duration-300"
          >
            <div className="w-full">
              <div className="text-lg font-bold text-blue-700 mb-1">{item.teamName}</div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Hackathon:</span> {item.hackathonName}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                <span className="font-semibold">Leader:</span> {item.teamLeader}
              </div>
            </div>

            <div className="absolute bottom-3 right-4 flex gap-2">
              <button
                onClick={() => setSelectedTeam(item)}
                className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow"
              >
                Team Details
              </button>
              <button
                onClick={() => console.log("Request to join:", item.id || item._id)}
                className="text-xs px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md shadow"
              >
                Request to Join
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Modal */}
    {selectedTeam && (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => setSelectedTeam(null)}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Team Details</h2>
          <p className="mb-2"><span className="font-semibold">Team Name:</span> {selectedTeam.teamName}</p>
          <p className="mb-2"><span className="font-semibold">Hackathon:</span> {selectedTeam.hackathonName}</p>
          <p className="mb-2"><span className="font-semibold">Leader:</span> {selectedTeam.teamLeader}</p>
          <p className="mb-2"><span className="font-semibold">Problem Statement:</span> {selectedTeam.problemStatement}</p>
          <p className="mb-2 font-semibold">Team Members:</p>
          <div className="pl-4">
            {selectedTeam.teamMembers.length !== 0 ? (
              selectedTeam.teamMembers.map((member, idx) => (
                <p key={idx} className="mb-1 text-sm text-gray-600">• {member}</p>
              ))
            ) : (
              <p className="text-sm text-gray-400">No members listed</p>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
</div>

      
    </>
  );
};

export default Card;
