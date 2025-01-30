import React from 'react';

const ServicesPage = () => {
  return (
    <>
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          At CircleU, we offer a range of services designed to simplify and enhance your student life.
        </p>
      </section>

      <section className="container mx-auto py-8 px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service Item 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800">Group Formation & Collaboration</h3>
          <p className="mt-2 text-gray-600">Easily form or join teams for hackathons, group studies, or collaborative projects.</p>
        </div>

        {/* Service Item 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800">Event Organization & Management</h3>
          <p className="mt-2 text-gray-600">Plan, organize, and manage events seamlessly with our powerful tools.</p>
        </div>

        {/* Service Item 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800">Communication Tools</h3>
          <p className="mt-2 text-gray-600">Stay connected with built-in messaging, announcements, and community boards.</p>
        </div>

        {/* Service Item 4 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800">Hackathon & Competition Support</h3>
          <p className="mt-2 text-gray-600">Access tools and resources to help you succeed in hackathons and competitions.</p>
        </div>

        {/* Service Item 5 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800">AI-Driven Recommendations</h3>
          <p className="mt-2 text-gray-600">Get personalized suggestions based on your preferences and activities.</p>
        </div>
      </section>

      {/* Why Choose CircleU */}
      <section className="container mx-auto py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800">Why Choose CircleU?</h3>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Feature Item 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800">Seamless Integration</h4>
            <p className="text-gray-600 mt-2">
              All your needs in one platform—whether it's collaboration, event management, or communication.
            </p>
          </div>

          {/* Feature Item 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800">User-Centered Design</h4>
            <p className="text-gray-600 mt-2">
              Built with you in mind, our platform provides an intuitive and easy-to-use interface.
            </p>
          </div>

          {/* Feature Item 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800">AI-Powered Features</h4>
            <p className="text-gray-600 mt-2">
              Smart suggestions help make your student life more connected and organized.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; 2025 CircleU. All rights reserved.</p>
      </footer>
    </>
  );
};

export default ServicesPage;

