import FormData from "@/types/data"
import { FormEvent, useState } from "react"

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

  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    alert("Registration submitted successfully!")
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl font-bold text-center mb-2 justify-center">OSCA Registration Form</h1>
            <p className="text-center text-gray-600 mb-6">Office of Senior Citizens Affairs</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="badge badge-primary">1</span>
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Last Name <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        First Name <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Middle Name</span>
                    </label>
                    <input
                      type="text"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Suffix</span>
                    </label>
                    <select
                      name="suffix"
                      value={formData.suffix}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">None</option>
                      <option value="Jr.">Jr.</option>
                      <option value="Sr.">Sr.</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Sex <span className="text-error">*</span>
                      </span>
                    </label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Birthdate <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Age <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* Address Information Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="badge badge-primary">2</span>
                  Address Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Barangay <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="barangay"
                      value={formData.barangay}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Unit/House No./Street <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* OSCA Information Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="badge badge-primary">3</span>
                  OSCA Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        OSCA ID Number <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="osca_id"
                      value={formData.osca_id}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date Applied</span>
                    </label>
                    <input
                      type="date"
                      name="date_applied"
                      value={formData.date_applied}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date Issued</span>
                    </label>
                    <input
                      type="date"
                      name="date_issued"
                      value={formData.date_issued}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text">Remarks</span>
                    </label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      className="textarea textarea-bordered h-24"
                      placeholder="Additional notes or remarks..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    if (confirm("Are you sure you want to reset the form?")) {
                      setFormData({
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
                    }
                  }}
                >
                  Reset
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Office of Senior Citizens Affairs Registration System</p>
        </div>
      </div>
    </div>
  )
}
