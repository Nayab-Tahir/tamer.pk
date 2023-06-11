import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CCol,
  CFormInput,
  CSpinner,
} from '@coreui/react'
import {
  useDeleteSingleProjectMutation,
  useCreateDetailTrackerMutation,
  useUpdateSingleDetailTrackerMutation,
  useDeleteSingleDetailTrackerMutation,
  useGetAllDetailTrackersByProjectIdQuery,
} from 'src/store/rtk-query'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil } from '@coreui/icons'
import { toast } from 'react-toastify'
import {
  setCurrentDetailTracker,
  setCurrentProject,
  setLoading,
  setRefetchProjects,
} from 'src/store/slices/main'
import { Formik } from 'formik'
import { detailsTrackerSchema } from './detailTracker.schema'
import DetailTracker from 'src/components/DetailTracker'

const ProjectDetails = () => {
  const navigate = useNavigate()
  const state = useSelector((state) => state.main)
  const dispatch = useDispatch()
  const [deleteProject] = useDeleteSingleProjectMutation()
  const [createDetailTracker] = useCreateDetailTrackerMutation()
  const [updateDetailTracker] = useUpdateSingleDetailTrackerMutation()
  const [deleteDetailTracker] = useDeleteSingleDetailTrackerMutation()
  const {
    data: detailTrackers,
    isLoading: detailTrackersLoading,
    isFetching: detailTrackersFetching,
    refetch: detailTrackersRefetch,
  } = useGetAllDetailTrackersByProjectIdQuery(state.currentProject._id)
  const [showDetailsTrackerModal, setShowDetailsTrackerModal] = useState(false)
  const [isDetailTrackerUpdating, setIsDetailTrackerUpdating] = useState(false)
  const [showDetailsTrackerDetailsModal, setShowDetailsTrackerDetailsModal] = useState(false)

  useEffect(() => {
    if (state.currentProject == undefined || Object.keys(state.currentProject).length === 0) {
      navigate('/allProjects')
    }
  }, [state.currentProject])

  const deleteProjectHandle = async () => {
    try {
      const response = await deleteProject(state.currentProject._id).unwrap()
      if (response) {
        toast.success(`Project ${state.currentProject.name} is deleted successfully!`)
        dispatch(setCurrentProject({}))
        dispatch(setRefetchProjects(true))
        navigate('/allProjects')
      }
    } catch (error) {
      toast.error('Something went wrong, please try again later!')
    }
  }

  const updateProjectHandle = async () => {
    navigate('/updateProject')
  }

  const handleDeleteDetailTracker = async (event, detailTracker) => {
    event.stopPropagation()
    try {
      const response = await deleteDetailTracker(detailTracker._id)
      if (response) {
        toast.success('Project details object is deleted')
        dispatch(setCurrentDetailTracker({}))
        dispatch(setRefetchProjects(true))
        detailTrackersRefetch()
      }
    } catch (error) {
      console.error('Something went wrong: ', error)
      toast.error('Something went wrong, please try again later!')
    }
  }
  const handleUpdateDetailTracker = (event, detailTracker) => {
    dispatch(setCurrentDetailTracker(detailTracker))
    setIsDetailTrackerUpdating(true)
    setShowDetailsTrackerModal(true)
    event.stopPropagation()
  }

  const handleClickDetailTracker = (detailTracker) => {
    dispatch(setCurrentDetailTracker(detailTracker))
    setShowDetailsTrackerDetailsModal(true)
  }

  const handleSubmit = async (values, actions) => {
    dispatch(setLoading(true))
    try {
      let response = {}

      if (isDetailTrackerUpdating) {
        response = await updateDetailTracker({
          completionPercentage: values.completionPercentage,
          profit: values.profit,
          cost: values.cost,
          revenue: values.revenue,
          description: values.description,
          numberOfDays: values.numberOfDays,
          id: state.currentDetailsTracker._id,
        }).unwrap()
      } else {
        response = await createDetailTracker({
          completionPercentage: values.completionPercentage,
          profit: values.profit,
          cost: values.cost,
          revenue: values.revenue,
          description: values.description,
          numberOfDays: values.numberOfDays,
          projectId: state.currentProject._id,
        }).unwrap()
      }
      if (response) {
        actions.resetForm()
        toast.success(`Project details are ${isDetailTrackerUpdating ? 'Updated' : 'Added'}.`)
        setShowDetailsTrackerModal(false)
        detailTrackersRefetch()
        dispatch(setRefetchProjects(true))
      } else {
        toast.error('Something went wrong please try again later!')
        actions.resetForm()
        setShowDetailsTrackerModal(false)
        dispatch(setLoading(false))
      }
    } catch (e) {
      console.error('Something went wrong: ', e)
      toast.error('Something went wrong please try again later!')
      setShowDetailsTrackerModal(false)
      actions.resetForm()
      dispatch(setLoading(false))
    }
  }

  const addInitialValues = {
    completionPercentage: 0,
    profit: 0,
    cost: 0,
    revenue: 0,
    description: '',
    numberOfDays: 0,
  }

  const updateInitialValues = {
    completionPercentage: state.currentDetailsTracker.completionPercentage,
    profit: state.currentDetailsTracker.profit,
    cost: state.currentDetailsTracker.cost,
    revenue: state.currentDetailsTracker.revenue,
    description: state.currentDetailsTracker.description,
    numberOfDays: state.currentDetailsTracker.numberOfDays,
  }

  return (
    <>
      <CCard className="mb-3">
        {/* <CCardImage orientation="top" src={completedProject} /> */}
        <CCardBody className="position-relative">
          <CCardTitle>{state.currentProject.name}</CCardTitle>
          <CIcon
            icon={cilTrash}
            height={20}
            className="my-4 text-danger projectDeleteIcon position-absolute"
            onClick={deleteProjectHandle}
          />
          <CIcon
            icon={cilPencil}
            height={20}
            className="my-4 text-warning projectUpdateIcon position-absolute"
            onClick={updateProjectHandle}
          />
          <CCardText>{state.currentProject.description}</CCardText>
          <CTable borderless>
            <tr>
              <td>Revenue</td>
              <td>Rs. {state.currentProject.revenue}</td>
            </tr>
            <tr>
              <td>Estimated Cost</td>
              <td>Rs. {state.currentProject.estimatedCost}</td>
            </tr>
            <tr>
              <td>Profit</td>
              <td>Rs. {state.currentProject.profit}</td>
            </tr>
            <tr>
              <td>Estimated Time</td>
              <td>{state.currentProject.estimatedNumberOfDays} days</td>
            </tr>
          </CTable>
          <div className="text-center">
            <CButton
              type="submit"
              color="success"
              variant="outline"
              onClick={() => {
                setShowDetailsTrackerModal(true)
                setIsDetailTrackerUpdating(false)
              }}
            >
              Add Progress Details
            </CButton>
          </div>
        </CCardBody>
      </CCard>
      {detailTrackersLoading && detailTrackersFetching ? (
        <div className="text-center">
          <CSpinner color="primary" />
        </div>
      ) : (
        <>
          <h3>Details</h3>
          {detailTrackers.map((detailTracker, index) => (
            <DetailTracker
              key={index}
              detailTracker={detailTracker}
              onUpdate={handleUpdateDetailTracker}
              onDelete={handleDeleteDetailTracker}
              onClick={() => handleClickDetailTracker(detailTracker)}
            />
          ))}
        </>
      )}
      <CModal visible={showDetailsTrackerModal} onClose={() => setShowDetailsTrackerModal(false)}>
        <CModalHeader>
          <CModalTitle>{isDetailTrackerUpdating ? 'Update' : 'Add'} Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Formik
            initialValues={isDetailTrackerUpdating ? updateInitialValues : addInitialValues}
            validationSchema={detailsTrackerSchema}
            onSubmit={handleSubmit}
          >
            {({ handleBlur, handleChange, values, errors, touched, handleSubmit }) => (
              <CForm method="POST" className="row g-3" onSubmit={handleSubmit}>
                <CCol md={6}>
                  <CFormInput
                    onChange={handleChange}
                    type="number"
                    label="Profit"
                    name="profit"
                    onBlur={handleBlur}
                    value={values.profit}
                  />
                  {touched.profit && errors.profit && (
                    <div className="mt-2 text-danger mb-2">{errors.profit}</div>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    onChange={handleChange}
                    type="number"
                    label="Revenue"
                    name="revenue"
                    onBlur={handleBlur}
                    value={values.revenue}
                  />
                  {touched.revenue && errors.revenue && (
                    <div className="mt-2 text-danger mb-2">{errors.revenue}</div>
                  )}
                </CCol>
                <CCol xs={12}>
                  <CFormInput
                    onChange={handleChange}
                    type="text"
                    label="Description"
                    name="description"
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {touched.description && errors.description && (
                    <div className="mt-2 text-danger mb-2">{errors.description}</div>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    id="Cost"
                    label="Cost"
                    name="cost"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cost}
                    type="number"
                  />
                  {touched.cost && errors.cost && (
                    <div className="mt-2 text-danger mb-2">{errors.cost}</div>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Number of days"
                    name="numberOfDays"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numberOfDays}
                  />
                  {touched.numberOfDays && errors.numberOfDays && (
                    <div className="mt-2 text-danger mb-2">{errors.numberOfDays}</div>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    label="Completion Percentage"
                    name="completionPercentage"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.completionPercentage}
                  />
                  {touched.completionPercentage && errors.completionPercentage && (
                    <div className="mt-2 text-danger mb-2">{errors.completionPercentage}</div>
                  )}
                </CCol>
                <CButton color="secondary" onClick={() => setShowDetailsTrackerModal(false)}>
                  Close
                </CButton>
                <CButton type="submit" color="primary">
                  {isDetailTrackerUpdating ? 'Update' : 'Add'}
                </CButton>
              </CForm>
            )}
          </Formik>
        </CModalBody>
      </CModal>

      <CModal
        visible={showDetailsTrackerDetailsModal}
        onClose={() => setShowDetailsTrackerDetailsModal(false)}
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardText>{state.currentDetailsTracker.description}</CCardText>
          <CTable borderless>
            <tr>
              <td>Revenue</td>
              <td>Rs. {state.currentDetailsTracker.revenue}</td>
            </tr>
            <tr>
              <td>Cost</td>
              <td>Rs. {state.currentDetailsTracker.cost}</td>
            </tr>
            <tr>
              <td>Profit</td>
              <td>Rs. {state.currentDetailsTracker.profit}</td>
            </tr>
            <tr>
              <td>Number of days</td>
              <td>{state.currentDetailsTracker.numberOfDays} days</td>
            </tr>

            <tr>
              <td>Completion percentage</td>
              <td>{state.currentDetailsTracker.completionPercentage} %</td>
            </tr>
          </CTable>
        </CModalBody>
      </CModal>
    </>
  )
}

export default ProjectDetails
