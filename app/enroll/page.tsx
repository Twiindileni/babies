'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function EnrollPage() {
  const [loading, setLoading] = useState(false)
  const supabase = createSupabaseClient()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const get = (key: string) => (formData.get(key) || '').toString().trim()

      const payload = {
        child_full_name: get('child_full_name'),
        child_preferred_name: get('preferred_name') || null,
        date_of_birth_year: Number(get('date_of_birth_year')) || null,
        date_of_birth_month: Number(get('date_of_birth_month')) || null,
        date_of_birth_day: Number(get('date_of_birth_day')) || null,
        address: get('address'),
        parent1_name: get('parent1_name'),
        parent2_name: get('parent2_name') || null,
        parent1_home_phone: get('parent1_home_phone') || null,
        parent2_home_phone: get('parent2_home_phone') || null,
        parent1_cell_phone: get('parent1_cell_phone') || null,
        parent2_cell_phone: get('parent2_cell_phone') || null,
        parent1_email: get('parent1_email') || null,
        parent2_email: get('parent2_email') || null,
        parent1_workplace: get('parent1_workplace') || null,
        parent2_workplace: get('parent2_workplace') || null,
        parent1_work_phone: get('parent1_work_phone') || null,
        parent2_work_phone: get('parent2_work_phone') || null,
        enrollment_date_year: Number(get('enrollment_date_year')) || null,
        enrollment_date_month: Number(get('enrollment_date_month')) || null,
        enrollment_date_day: Number(get('enrollment_date_day')) || null,
        emergency_contact1_name: get('emergency_contact1_name'),
        emergency_contact1_home_phone: get('emergency_contact1_home_phone') || null,
        emergency_contact1_relationship: get('emergency_contact1_relationship') || null,
        emergency_contact1_work_cell_phone: get('emergency_contact1_work_cell_phone') || null,
        emergency_contact2_name: get('emergency_contact2_name') || null,
        emergency_contact2_home_phone: get('emergency_contact2_home_phone') || null,
        emergency_contact2_relationship: get('emergency_contact2_relationship') || null,
        emergency_contact2_work_cell_phone: get('emergency_contact2_work_cell_phone') || null,
        doctor_name: get('doctor_name') || null,
        doctor_address: get('doctor_address') || null,
        doctor_phone: get('doctor_phone') || null,
        doctor_city: get('doctor_city') || null,
        doctor_postal_code: get('doctor_postal_code') || null,
        health_card_number: get('health_card_number') || null,
        health_card_expiry: get('health_card_expiry') || null,
        allergies: get('allergies') || 'No',
        allergies_details: get('allergies_details') || null,
        foods_disliked: get('foods_disliked') || null,
        outdoor_play: get('outdoor_play') || null,
        toilet_trained: get('toilet_trained') || null,
        agreement_accepted: get('agreement_accepted') === '1',
        status: 'Pending' as const,
      }

      const { error } = await supabase
        .from('enrollment_applications')
        .insert([payload])

      if (error) throw error

      toast.success('Registration form submitted successfully! We will contact you soon.')
      form.reset()
    } catch (error: any) {
      toast.error(error.message || 'Error submitting form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="enroll-page py-4">
      <div className="container enroll-shell">
        <Image
          src="/assets/images/logo.jpg"
          alt="Babies&Todd's Logo"
          width={200}
          height={120}
          className="logo"
        />
        <div className="form-header">
          <h1>Registration Form</h1>
          <div className="registration-fee">Registration Fee: N$300.00</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Child Information</h3>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Child Full Name *</label>
                <input type="text" name="child_full_name" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Preferred Name</label>
                <input type="text" name="preferred_name" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Date of Birth - Year *</label>
                <input type="number" min="2000" max="2100" name="date_of_birth_year" className="form-control" required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Month *</label>
                <input type="number" min="1" max="12" name="date_of_birth_month" className="form-control" required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Day *</label>
                <input type="number" min="1" max="31" name="date_of_birth_day" className="form-control" required />
              </div>
              <div className="col-12">
                <label className="form-label">Address *</label>
                <input type="text" name="address" className="form-control" required />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Parent Information</h3>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Parent 1 Name *</label><input type="text" name="parent1_name" className="form-control" required /></div>
              <div className="col-md-6"><label className="form-label">Parent 2 Name</label><input type="text" name="parent2_name" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">Parent 1 Home Phone</label><input type="tel" name="parent1_home_phone" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">Parent 1 Cell Phone *</label><input type="tel" name="parent1_cell_phone" className="form-control" required /></div>
              <div className="col-md-4"><label className="form-label">Parent 1 Email</label><input type="email" name="parent1_email" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">Parent 2 Home Phone</label><input type="tel" name="parent2_home_phone" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">Parent 2 Cell Phone</label><input type="tel" name="parent2_cell_phone" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">Parent 2 Email</label><input type="email" name="parent2_email" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Parent 1 Workplace</label><input type="text" name="parent1_workplace" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Parent 1 Work Phone</label><input type="tel" name="parent1_work_phone" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Parent 2 Workplace</label><input type="text" name="parent2_workplace" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Parent 2 Work Phone</label><input type="tel" name="parent2_work_phone" className="form-control" /></div>
            </div>
          </div>

          <div className="form-section">
            <h3>Enrollment Date</h3>
            <div className="row g-3">
              <div className="col-md-4"><label className="form-label">Year *</label><input type="number" min="2000" max="2100" name="enrollment_date_year" className="form-control" required /></div>
              <div className="col-md-4"><label className="form-label">Month *</label><input type="number" min="1" max="12" name="enrollment_date_month" className="form-control" required /></div>
              <div className="col-md-4"><label className="form-label">Day *</label><input type="number" min="1" max="31" name="enrollment_date_day" className="form-control" required /></div>
            </div>
          </div>

          <div className="form-section">
            <h3>Emergency Contacts</h3>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Emergency Contact 1 Name *</label><input type="text" name="emergency_contact1_name" className="form-control" required /></div>
              <div className="col-md-6"><label className="form-label">Emergency Contact 1 Home Phone *</label><input type="tel" name="emergency_contact1_home_phone" className="form-control" required /></div>
              <div className="col-md-6"><label className="form-label">Emergency Contact 1 Relationship</label><input type="text" name="emergency_contact1_relationship" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Emergency Contact 1 Work/Cell Phone</label><input type="tel" name="emergency_contact1_work_cell_phone" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Emergency Contact 2 Name</label><input type="text" name="emergency_contact2_name" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Emergency Contact 2 Home Phone</label><input type="tel" name="emergency_contact2_home_phone" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Emergency Contact 2 Relationship</label><input type="text" name="emergency_contact2_relationship" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Emergency Contact 2 Work/Cell Phone</label><input type="tel" name="emergency_contact2_work_cell_phone" className="form-control" /></div>
            </div>
          </div>

          <div className="form-section">
            <h3>Medical Information</h3>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Doctor Name</label><input type="text" name="doctor_name" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Doctor Address</label><input type="text" name="doctor_address" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">Doctor Phone</label><input type="tel" name="doctor_phone" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">Doctor City</label><input type="text" name="doctor_city" className="form-control" /></div>
              <div className="col-md-4"><label className="form-label">Doctor Postal Code</label><input type="text" name="doctor_postal_code" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Health Card Number</label><input type="text" name="health_card_number" className="form-control" /></div>
              <div className="col-md-6"><label className="form-label">Health Card Expiry</label><input type="date" name="health_card_expiry" className="form-control" /></div>
              <div className="col-12">
                <label className="form-label d-block">Allergies</label>
                <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="allergies" value="No" defaultChecked /><label className="form-check-label">No</label></div>
                <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="allergies" value="Yes" /><label className="form-check-label">Yes</label></div>
              </div>
              <div className="col-12"><label className="form-label">Allergies Details</label><textarea name="allergies_details" className="form-control" rows={3}></textarea></div>
              <div className="col-md-6"><label className="form-label">Foods Disliked</label><textarea name="foods_disliked" className="form-control" rows={3}></textarea></div>
              <div className="col-md-6"><label className="form-label">Outdoor Play Notes</label><textarea name="outdoor_play" className="form-control" rows={3}></textarea></div>
              <div className="col-12"><label className="form-label">Toilet Trained</label><input type="text" name="toilet_trained" className="form-control" /></div>
            </div>
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" name="agreement_accepted" id="agreement_accepted" value="1" required />
            <label className="form-check-label" htmlFor="agreement_accepted">
              I confirm that the information provided is accurate and complete.
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
      <style jsx>{`
        .enroll-page { background: var(--light-brown); }
        .enroll-shell { background:#fff; border-radius:20px; padding:2rem; box-shadow:0 8px 30px rgba(139,110,78,.1); }
        .logo { display:block; margin:0 auto 1rem; border-radius:10px; object-fit:cover; }
        .form-header { text-align:center; margin-bottom:2rem; padding-bottom:1rem; border-bottom:3px solid var(--primary-green); }
        .form-header h1 { color: var(--primary-green); font-weight:700; margin-bottom:.75rem; }
        .registration-fee { display:inline-block; background:var(--light-red); color:var(--secondary-red); border:2px dashed var(--secondary-red); border-radius:999px; padding:.6rem 1rem; font-weight:600; }
        .form-section { border:2px solid #e2e8f0; border-radius:14px; padding:1.25rem; margin-bottom:1.25rem; background:#fff; }
        .form-section h3 { color: var(--accent-brown); font-size:1.25rem; border-bottom:2px solid var(--accent-brown); padding-bottom:.5rem; margin-bottom:1rem; }
      `}</style>
    </div>
  )
}
