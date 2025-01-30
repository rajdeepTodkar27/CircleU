import Link from 'next/link';
import React from 'react';

const App = () => {
  return (
    <div className="bg-gray-100">
      
      {/* Hero Section */}
      <header className="bg-blue-500 text-white text-center py-20">
        <h2 className="text-4xl font-bold">Welcome to CircleU</h2>
        <p className="mt-4 px-36 text-lg">In today's fast-paced world, staying connected with like-minded individuals is key to meaningful collaboration. Our platform helps college students easily create or join hackathon groups, and participate in events—all in one place. Whether you're organizing an event or looking to collaborate, we make it simple to stay connected.</p>
        <Link href="/dashboard" className="mt-6 inline-block bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200">Get Started</Link>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-10 px-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800">Our Features</h3>
          <p className="mt-4 text-gray-600">We offer amazing features to enhance your experience.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-gray-800">Group Formation & Collaboration</h4>
            <p className="text-gray-600 mt-2">Easily form or join hackathon teams, study groups, and other student communities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-gray-800">Event Organization</h4>
            <p className="text-gray-600 mt-2">Plan and manage events with tools for tracking attendance, collecting feedback, and ensuring smooth logistics.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-gray-800">Communication</h4>
            <p className="text-gray-600 mt-2">Connect with others through messaging, announcements, and community boards to stay informed and engaged.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-6">
        <p>&copy; 2025 Brand. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
