import React from 'react'
import { CForm, CCol, CFormInput, CButton } from '@coreui/react'
const AddProject = () => {
  return (
    <>
      <h2 className="card-title text-center my-3">Add Project</h2>
      <CForm className="row g-3">
        <CCol md={6}>
          <CFormInput type="text" label="Project Name" name="name" />
        </CCol>
        <CCol md={6}>
          <CFormInput type="text" label="Area (in feet square)" name="area" />
        </CCol>
        <CCol xs={12}>
          <CFormInput type="text" label="Description" name="description" />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            id="inputAddress"
            label="Location"
            placeholder="1234 Main St"
            name="location"
          />
        </CCol>
        <CCol md={4}>
          <CFormInput type="date" size="sm" label="Start Date" name="startDate" />
        </CCol>
        <CCol md={4}>
          <CFormInput type="number" min="1" label="Estimated Days" name="days" />
        </CCol>
        <CCol md={4}>
          <CFormInput type="number" min="0" label="Estimated Cost" name="cost" />
        </CCol>
        <CCol xs={12}>
          <CButton type="submit" color="success">
            Add Project
          </CButton>
        </CCol>
        <CCol xs={12}>
          <CButton type="cancel" color="secondary" variant="outline">
            Cancel
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddProject
