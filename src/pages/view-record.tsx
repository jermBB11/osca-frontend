import Barangay from '@/types/barangays';
import FormData from '@/types/data';
import { House } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function View() {
    const [data, setData] = useState<FormData[]>([]);
    const [barangay, setBarangay] = useState<Barangay[]>([]);

    const fetchBarangay = async () => {
        const fetchs = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/barangays`);

        const bar = await fetchs.json();

        if (!fetchs.ok) {
            throw new Error("Network Error");
        }

        setBarangay(bar.data);
    }

    const response = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/records`)
        const data = await res.json();

        if (!res.ok) {
            throw new Error("Failed to load barangays")
        }
        setData(data.data)
    }

    useEffect(() => {
        fetchBarangay()
        response()
    }, []);
    return (
        <div className='flex flex-col justify-center p-5'>
            <div>
                <div className="card min-w-full bg-base-100 card-xs shadow-sm p-2">
                    <div className="card-body flex flex-row justify-between align-middle items-center">
                        <div className="group cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-gray-300  flex flex-col items-center justify-center" >
                            <Link href="/">
                                <House className="w-6 h-6 text-gray-600 transition-colors duration-200 group-hover:text-black" />
                            </Link>
                            <p className='label'>Home</p>
                        </div>
                        <div className="">
                            <h6 className='text-xl font-extrabold'>
                                OSCA RECORDS
                            </h6>
                        </div>
                        <div className="flex gap-4">
                            {/* Search Bar */}
                            <div className="">
                                <input type="text" className="input" />
                                <p className='label'>Search osca records here</p>
                            </div>
                            {/* Filter */}
                            <div className="">
                                <select name="" id="" className="select">
                                    <option value="">Select Barangay</option>
                                    {barangay && barangay.map((b) => (
                                        <option key={b.id} value={b.barangay}>{b.barangay} <p className='label'>Unit - {b.unit}</p></option>
                                    ))}
                                </select>
                                <p className='label'>Filter by Barangay here</p>
                            </div>
                        </div>




                    </div>

                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className='bg-green-600 text-white font-bold text-center'>
                                <th className='border-black border-1'>Last Name</th>
                                <th className='border-black border-1'>First Name</th>
                                <th className='border-black border-1'>Middle Name</th>
                                <th className='border-black border-1'>Name Extension</th>
                                <th className='border-black border-1'>Sex</th>
                                <th className='border-black border-1'>Barangay</th>
                                <th className='border-black border-1'>Barangay Unit</th>
                                <th className='border-black border-1'>Bith Date</th>
                                <th className='border-black border-1'>Age</th>
                                <th className='border-black border-1'>OSCA Id No.</th>
                                <th className='border-black border-1'>Remarks</th>
                                <th className='border-black border-1'>Date Applied</th>
                                <th className='border-black border-1'>Date Issued</th>

                            </tr>
                        </thead>
                        <tbody className='text-center text-sm'>
                            {data.map((d) => (
                                <tr key={d.id}>
                                    <td className='border-black border-1'>{d.lastname}</td>
                                    <td className='border-black border-1'>{d.firstname}</td>
                                    <td className='border-black border-1'>{d.middle_name}</td>
                                    <td className='border-black border-1'>{d.suffix}</td>
                                    <td className='border-black border-1'>{d.sex}</td>
                                    <td className='border-black border-1'>{d.barangay}</td>
                                    <td className='border-black border-1'>{d.unit}</td>
                                    <td className='border-black border-1'>{d.birthdate}</td>
                                    <td className='border-black border-1'>{d.age}</td>
                                    <td className='border-black border-1'>{d.osca_id}</td>
                                    <td className='border-black border-1'>{d.remarks}</td>
                                    <td className='border-black border-1'>{d.date_applied}</td>
                                    <td className='border-black border-1'>{d.date_issued}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default View
