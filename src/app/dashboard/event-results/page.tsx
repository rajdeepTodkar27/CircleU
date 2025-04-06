"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
interface TeamPosition {
  teamName: string;
  teamLeader: string;
}

interface EventResult {
  _id: string;
  eventName: string;
  winner: TeamPosition;
  runnerUp: TeamPosition;
  secondRunnerUp: TeamPosition;
}

export default function ResultPage() {
  const [results, setResults] = useState<EventResult[]>([]);

  useEffect(() => {
    axios.get("/api/event-result")
    .then(res=>{
      setResults(res.data.data)
      
    }).catch(err=>{
      setResults([])
      console.log(err);
      
    })
  }, []);

  useEffect(() => {
    console.log(results);
    
  }, [results])
  
  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Event Results</h1>

      {results.length === 0 ? (
        <p className="text-center text-gray-500">No results available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.map((result,index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500"
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                {result.eventName}
              </h2>

              <div className="mb-2">
                <h3 className="font-semibold text-green-600">🏆 Winner</h3>
                <p>Team: {result.winner.teamName}</p>
                <p>Leader: {result.winner.teamLeader}</p>
              </div>

              <div className="mb-2">
                <h3 className="font-semibold text-yellow-600">🥈 Runner-Up</h3>
                <p>Team: {result.runnerUp.teamName}</p>
                <p>Leader: {result.runnerUp.teamLeader}</p>
              </div>

              <div>
                <h3 className="font-semibold text-orange-600">🥉 Second Runner-Up</h3>
                <p>Team: {result.secondRunnerUp.teamName}</p>
                <p>Leader: {result.secondRunnerUp.teamLeader}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
