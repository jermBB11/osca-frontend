import Barangay from "@/types/barangays"
import FormData from "@/types/data"
import { House } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import type React from "react"
import { useState, useEffect, type FormEvent } from "react"
import toast from "react-hot-toast"
import Swal from "sweetalert2"





export default function Page() {
    const [formData, setFormData] = useState<FormData>({
        lastname: "",
        firstname: "",
        middle_name: "",
        suffix: "",
        sex: "",
        barangay: "",
        unit: "",
        birthdate: "",
        age: "",
        osca_id: "",
        remarks: "",
        date_issued: "",
        date_applied: "",
    })

    const route = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [barangaySearch, setBarangaySearch] = useState("")
    const [showBarangayDropdown, setShowBarangayDropdown] = useState(false)

    const [barangays, setBarangays] = useState<Barangay[]>([])
    const [isLoadingBarangays, setIsLoadingBarangays] = useState(true)
    const [barangayError, setBarangayError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBarangays = async () => {
            try {
                setIsLoadingBarangays(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/barangays`)

                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Failed to load barangays")
                }

                setBarangays(data.data)
                setBarangayError(null)
            } catch (error) {
                console.error("Error loading barangays:", error)
                setBarangayError("Failed to load barangays. Please refresh the page.")
            } finally {
                setIsLoadingBarangays(false)
            }
        }

        fetchBarangays()
    }, [])

    const filteredBarangays = barangays.filter((barangay) =>
        barangay.barangay.toLowerCase().includes(barangaySearch.toLowerCase()),
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Auto-calculate age when birthdate changes
        if (name === "birthdate" && value) {
            const birthDate = new Date(value)
            const today = new Date()
            let age = today.getFullYear() - birthDate.getFullYear()
            const monthDiff = today.getMonth() - birthDate.getMonth()
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--
            }
            setFormData((prev) => ({
                ...prev,
                age: age.toString(),
            }))
        }
    }

    const handleBarangaySelect = (barangay: Barangay) => {
        setFormData((prev) => ({
            ...prev,
            barangay: barangay.barangay,
            unit: barangay.unit,
        }))
        setBarangaySearch(barangay.barangay)
        setShowBarangayDropdown(false)
    }

    const handleBarangaySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBarangaySearch(e.target.value)
        setFormData((prev) => ({
            ...prev,
            barangay: e.target.value,
        }))
        setShowBarangayDropdown(true)
    }


    const submitRec = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    ...formData
                })
            });

            const res = await response.json();

            if (!response.ok) {
                throw new Error("Failed to submit", res?.error);
                console.log(res?.error)
            }

        } catch (error) {
            console.log(error)
            throw new Error('Error: Network Error');
        }
    }



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        // await new Promise((resolve) => setTimeout(resolve, 1500))

        await submitRec();
        console.log("Form submitted:", formData)
        Swal.fire({
            icon: 'success',
            title: 'Record Added',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                route.reload();
            }
        });
        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen mx-auto">
                <div className="card mb-6 px-6 py-4 flex flex-col md:flex-row items-center justify-between bg-card shadow-sm rounded-xl border border-border">

                    {/* Left: Home Button */}
                    <div className="flex justify-start mb-4">
                        <Link
                            href="/"
                            className="flex flex-col items-center justify-center px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                            <House className="w-6 h-6 text-gray-700 mb-1" />
                            <span className="text-sm font-semibold text-gray-700">Home</span>
                        </Link>
                    </div>


                    {/* Center: Title and Subtitle */}
                    <div className="text-center flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                            OSCA Registration Form
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Office of Senior Citizens Affairs
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 text-red-500">
                            Please fill out all required fields marked with{" "}
                            <span className="text-destructive">*</span>
                        </p>
                    </div>

                    {/* Right Spacer (for symmetry) */}
                    <div className="w-[80px] hidden md:block"></div>
                </div>





                <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-12">

                        {/* --- Landscape Wrapper --- */}
                        <div className="flex flex-col lg:flex-row gap-10">

                            {/* 1️⃣ Personal Information Section */}
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex text-white items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-lg">
                                        1
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-foreground">Personal Information</h2>
                                        <p className="text-sm text-muted-foreground">Basic details about the applicant</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* Each input preserved */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            Last Name <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                            placeholder="Enter last name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            First Name <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                            placeholder="Enter first name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">Middle Name</label>
                                        <input
                                            type="text"
                                            name="middle_name"
                                            value={formData.middle_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                            placeholder="Enter middle name (optional)"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">Suffix</label>
                                        <select
                                            name="suffix"
                                            value={formData.suffix}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                        >
                                            <option value="">Select suffix (optional)</option>
                                            <option value="Jr.">Jr.</option>
                                            <option value="Sr.">Sr.</option>
                                            <option value="II">II</option>
                                            <option value="III">III</option>
                                            <option value="IV">IV</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            Sex <span className="text-destructive">*</span>
                                        </label>
                                        <select
                                            name="sex"
                                            value={formData.sex}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                            required
                                        >
                                            <option value="">Select sex</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Birthdate */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">
                                                Birthdate <span className="text-destructive">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="birthdate"
                                                value={formData.birthdate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>

                                        {/* Age */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">
                                                Age <span className="text-destructive">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-base rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                                required
                                                readOnly
                                                placeholder="Auto-calculated"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* 2️⃣ Address + OSCA Information Side by Side */}
                            <div className="flex-1 space-y-10">
                                {/* Address Information */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex text-white items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-lg">
                                            2
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold text-foreground">Address Information</h2>
                                            <p className="text-sm text-muted-foreground">Current residential address</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2 relative">
                                            <label className="block text-sm font-medium text-foreground">
                                                Barangay <span className="text-destructive">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={barangaySearch}
                                                    onChange={handleBarangaySearchChange}
                                                    onFocus={() => setShowBarangayDropdown(true)}
                                                    onBlur={() => setTimeout(() => setShowBarangayDropdown(false), 200)}
                                                    className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    placeholder={isLoadingBarangays ? "Loading barangays..." : "Search barangay..."}
                                                    required
                                                    disabled={isLoadingBarangays}
                                                />
                                                {isLoadingBarangays ? (
                                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                )}
                                            </div>

                                            {barangayError && <p className="text-sm text-destructive mt-1">{barangayError}</p>}

                                            {showBarangayDropdown && filteredBarangays.length > 0 && !isLoadingBarangays && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-input rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                    {filteredBarangays.map((barangay) => (
                                                        <button
                                                            key={barangay.id}
                                                            type="button"
                                                            onClick={() => handleBarangaySelect(barangay)}
                                                            className="w-full px-4 py-3 text-left text-base hover:bg-gray-300 transition-colors flex justify-between items-center group"
                                                        >
                                                            <span className="text-foreground">{barangay.barangay}</span>
                                                            <span className="text-xs text-muted-foreground group-hover:text-foreground">{barangay.unit}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">
                                                Barangay Unit <span className="text-destructive">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="unit"
                                                value={formData.unit}
                                                className="w-full px-4 py-3 text-base rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                                placeholder="Auto-filled based on barangay"
                                                required
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* OSCA Information */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex text-white items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-lg">
                                            3
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold text-foreground">OSCA Information</h2>
                                            <p className="text-sm text-muted-foreground">Senior citizen identification details</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">
                                                OSCA ID Number <span className="text-destructive">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="osca_id"
                                                value={formData.osca_id}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                                placeholder="Enter OSCA ID number"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">Date Applied</label>
                                            <input
                                                type="date"
                                                name="date_applied"
                                                value={formData.date_applied}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">Date Issued</label>
                                            <input
                                                type="date"
                                                name="date_issued"
                                                value={formData.date_issued}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">Remarks</label>
                                            <textarea
                                                name="remarks"
                                                value={formData.remarks ?? ""}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-4 py-3 text-base rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                                placeholder="Additional notes or remarks (optional)"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Buttons --- */}
                        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-end gap-4">
                            <button
                                type="button"
                                className="px-6 py-3 cursor-pointer text-base font-medium rounded-lg border border-input bg-gray-200 text-foreground hover:bg-muted transition-colors"
                                onClick={() => {
                                    if (confirm('Are you sure you want to reset the form?')) {
                                        setFormData({
                                            lastname: '',
                                            firstname: '',
                                            middle_name: '',
                                            suffix: '',
                                            sex: '',
                                            barangay: '',
                                            unit: '',
                                            birthdate: '',
                                            age: '',
                                            osca_id: '',
                                            remarks: '',
                                            date_issued: '',
                                            date_applied: '',
                                        });
                                        setBarangaySearch('');
                                    }
                                }}
                            >
                                Reset Form
                            </button>

                            <button
                                type="submit"
                                className="px-8 py-3 cursor-pointer text-white text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Registration'
                                )}
                            </button>
                        </div>
                    </form>
                </div>



            </div>
        </div>
    )
}
