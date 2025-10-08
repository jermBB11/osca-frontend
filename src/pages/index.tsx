import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-black mb-10 tracking-wide">
        OSCA Records Management System
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        <Link href="/view-record">
          <div className="card bg-blue-600 w-80 shadow-lg hover:shadow-xl border border-gray-200 transition-transform hover:-translate-y-1 rounded-2xl cursor-pointer">
            <div className="card-body text-center py-8">
              <h2 className="text-2xl font-bold text-white">View Record</h2>
              <p className='font-light text-xs text-white'>For viewing and printing record</p>
            </div>
          </div>
        </Link>

        <Link href="/add-record">
          <div className="card bg-green-600 w-80 shadow-lg hover:shadow-xl border border-gray-200 transition-transform hover:-translate-y-1 rounded-2xl cursor-pointer">
            <div className="card-body text-center py-8">
              <h2 className="text-2xl font-bold text-white ">Add Record</h2>
              <p className='font-light text-xs text-white'>For adding records</p>
            </div>
          </div>
        </Link>

        <Link href="/manage-record">
          <div className="card bg-red-600 w-80 shadow-lg hover:shadow-xl border border-gray-200 transition-transform hover:-translate-y-1 rounded-2xl cursor-pointer">
            <div className="card-body text-center py-8">
              <h2 className="text-2xl font-bold text-white ">Manage Record</h2>
              <p className='font-light text-xs text-white'>For updating and deleting records</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home
