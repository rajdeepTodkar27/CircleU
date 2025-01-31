
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    

<footer className="bg-gradient-to-br from-blue-700 to-blue-300 text-white py-4   w-full">
      <div className="container mx-auto text-center">
        <div className="mt-4">
          <Link href="/src/app/dashboard/About/page" className="hover:text-gray-300 mx-3">Services</Link>
          <a href="#" className="hover:text-gray-300 mx-3">Contact Us</a>
          <a href="#" className="hover:text-gray-300 mx-3">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 mx-3">Terms & Conditions</a>
        </div>
      </div>
    </footer>
   
  )
}

export default Footer
