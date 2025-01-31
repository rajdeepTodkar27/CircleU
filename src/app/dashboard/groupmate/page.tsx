'use client'

import { useState } from "react";

export default function GroupmatesPage() {
  const [query, setQuery] = useState<string>(""); // Store search query
  const [groupmates, setGroupmates] = useState<any[]>([]); // Store search results
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  // Function to handle form submit and search groupmates
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setQuery("");
    setGroupmates([]);
    setError("");
    try {
      // Make the API request to search for groupmates
      const response = await fetch(`/api/Serach?query=${query}`);
      const data = await response.json();

      if (data.success && data.result.length > 0) {
        // console.log(data);
        setGroupmates(data.result); // Set results if successful
      } else {
        setError("No results found.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Search for Groupmates</h1>
      
      <form onSubmit={handleSearch} className="mb-4 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter name, email, college, or domain"
          className="border border-gray-300 p-2 rounded-md w-1/3"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-900">
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {groupmates.length > 0 && (
        <div className="flex justify-center p-5 gap-6">
          {groupmates.map((groupmate: any) => (
            <div
              key={groupmate._id}
              className="border flex flex-col gap-2 items-center border-gray-300 p-10 rounded-lg shadow-md"
            >
              <h2 className="text-xl  font-semibold">{groupmate.name}</h2>
              <p className="text-sm text-gray-600">{groupmate.email}</p>
              <p className="text-sm text-gray-600">{groupmate.college}</p>
              <p className="text-sm text-gray-600">{groupmate.domain}</p>
              <button className="mt-2 p-2 bg-blue-600  hover:bg-blue-900 text-white rounded-md"> Send Request</button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
