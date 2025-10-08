import Barangay from '@/types/barangays';
import FormData from '@/types/data';
import { House, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

function Manage() {
    const route = useRouter();
    const [data, setData] = useState<FormData[]>([]);
    const [barangay, setBarangay] = useState<Barangay[]>([]);
    const [upData, setUpData] = useState<FormData[]>([]);
    const [searchs, setSearchs] = useState("");
    const [filter, setFilter] = useState<string>('');

    const fetchBarangay = async () => {
        const fetchs = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/barangays`);

        const bar = await fetchs.json();

        if (!fetchs.ok) {
            throw new Error("Network Error");
        }

        setBarangay(bar.data);
    }

    const handlesearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        response(searchs, filter);
    }

    const resetFilter = () => {
        route.reload()
    }
    const handleFilter = () => {
        response(searchs, filter);
    }


    const response = async (search: string | null = null, filter: string | null = null) => {

        let url = `${process.env.NEXT_PUBLIC_APP_URL}/records`;

        if (search && filter) {
            url += `?search=${search}&filter=${filter}`;
        } else if (search) {
            url += `?search=${search}`;
        } else if (filter) {
            url += `?filter=${filter}`;
        }

        const ress = await fetch(url)

        const data = await ress.json();

        if (!ress.ok) {
            throw new Error("Failed to load barangays")
        }
        setData(data.data || [])
    }

    const edit = async () => {
        const update = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/update`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(upData)
            }
        )
        const up = await update.json();

        if (!update.ok) {
            throw new Error("Failed to update")
        }
        setUpData(up.data)
    }

    useEffect(() => {
        fetchBarangay()
        response();
    }, []);
    return (
        <div className='flex flex-col justify-center p-5'>
            <div>
                <div className="card min-w-full bg-base-100 card-xs shadow-sm p-2">
                    <div className="card-body flex flex-row justify-between align-middle items-center">
                        <div className="flex items-center gap-4">
                            <div className="group cursor-pointer px-2 transition-colors duration-200 hover:border-primary hover:border-b-2  flex flex-col items-center justify-center" >
                                <Link href="/">
                                    <House className="w-6 h-6 text-gray-600 transition-colors duration-200 group-hover:text-black" />
                                </Link>
                                <p className='label'>Home</p>
                            </div>
                            <div className="">
                                <h6 className='text-xl font-semibold'>
                                    MANAGE OSCA RECORDS
                                </h6>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {/* Search Bar */}
                            <div className="">
                                <form onSubmit={handlesearch}>
                                    <input value={searchs} onChange={(e) => setSearchs(e.target.value)} type="text" className="input" />
                                </form>
                                <p className='label'>Search osca records here</p>
                            </div>
                            {/* Filter */}
                            <div className="">
                                {/* <form onSubmit={handleFilter}> */}
                                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="select">
                                        <option onClick={resetFilter}>All Barangays</option>
                                        {barangay && barangay.map((b) => (
                                            <option onClick={handleFilter} key={b.id} value={b.barangay}>{b.barangay} <p className='label'>Unit - {b.unit}</p></option>
                                        ))}
                                    </select>
                                {/* </form> */}
                                <p className='label'>Filter by Barangay here</p>
                            </div>
                        </div>




                    </div>

                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Name Extension</th>
                                <th>Sex</th>
                                <th>Barangay</th>
                                <th>Barangay Unit</th>
                                <th>Bith Date</th>
                                <th>Age</th>
                                <th>OSCA Id No.</th>
                                <th>Remarks</th>
                                <th>Date Applied</th>
                                <th>Date Issued</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d) => (
                                <tr key={d.id}>
                                    <td>{d.lastname}</td>
                                    <td>{d.firstname}</td>
                                    <td>{d.middle_name}</td>
                                    <td>{d.suffix}</td>
                                    <td>{d.sex}</td>
                                    <td>{d.barangay}</td>
                                    <td>{d.unit}</td>
                                    <td>
                                        {d.birthdate
                                            ? format(new Date(d.birthdate), 'MMMM d, yyyy')
                                            : '—'}
                                    </td>
                                    <td>{d.age}</td>
                                    <td>{d.osca_id}</td>
                                    <td>{d.remarks}</td>
                                    <td>
                                        {d.date_applied
                                            ? format(new Date(d.date_applied), 'MMMM d, yyyy')
                                            : '—'}
                                    </td>
                                    <td>
                                        {d.date_issued
                                            ? format(new Date(d.date_issued), 'MMMM d, yyyy')
                                            : '—'}
                                    </td>

                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn btn-info btn-sm rounded text-white text-sm"><Pencil size={15} /> Update</button>
                                            <button className="btn btn-error btn-sm rounded text-white text-sm"><Trash size={15} /> Remove</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Manage
