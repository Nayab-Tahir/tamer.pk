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
  CCardHeader,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
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
  setProjects,
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
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false)
  const [showProjectScheduleModal, setShowProjectScheduleModal] = useState(false)

  const getDaysList = (days) => {
    let daysList = []
    let step = 0
    let day = 0
    let steps = Math.floor(days / 30) + 2
    while (step < steps) {
      daysList.push(day)
      day += 30
      step += 1
    }
    return daysList
  }

  const getProjectedXAxis = (days) => {
    let percentageList = []
    let percentStep = (30 / days) * 100
    let percent = 0

    while (percent < 100) {
      percentageList.push(percent)
      percent += percentStep
    }
    return percentageList
  }

  const getRealXAxis = (details) => {
    let percentageList = [0]
    let days = details.map((detail) => detail.numberOfDays)
    let percentages = details.map((detail) => detail.completionPercentage)

    let index = 0
    let remainingDays = 0
    let calculate = true
    let percent = 0

    while (index < days.length) {
      if (remainingDays > 0) {
        percent =
          (percent / 30) * remainingDays + (percentages[index] / days[index]) * (30 - remainingDays)
        remainingDays += days[index]
        calculate = false
      } else {
        remainingDays += days[index]
        if (remainingDays < 30) {
          percent = (percentages[index] / days[index]) * 30
        }
      }
      while (remainingDays >= 30) {
        if (calculate) {
          percent = (percentages[index] / days[index]) * 30
        }
        percentageList.push(percent)
        if (!calculate) {
          percent = (percentages[index] / days[index]) * 30
        }
        remainingDays -= 30
        calculate = true
      }
      index += 1
    }

    let previous = 0
    percentageList = percentageList.map((num) => {
      let answer = num + previous
      previous = answer
      return answer
    })
    return percentageList
  }

  useEffect(() => {
    if (state.currentProject == undefined || Object.keys(state.currentProject).length === 0) {
      navigate('/allProjects')
    }
    console.log(state.currentProject)
  }, [state.currentProject])

  const updateProjectsLocally = (values, isUpdating) => {
    if (isUpdating) {
      dispatch(
        setCurrentProject({
          ...state.currentProject,
          profit: state.currentProject.profit - state.currentDetailsTracker.profit + values.profit,
          completionPercentage:
            state.currentProject.completionPercentage -
            state.currentDetailsTracker.completionPercentage +
            values.completionPercentage,
          revenue:
            state.currentProject.revenue - state.currentDetailsTracker.revenue + values.revenue,
          spentCost:
            state.currentProject.spentCost - state.currentDetailsTracker.cost + values.cost,
          spentNumberOfDays:
            state.currentProject.spentNumberOfDays -
            state.currentDetailsTracker.numberOfDays +
            values.numberOfDays,
        }),
      )
    } else {
      dispatch(
        setCurrentProject({
          ...state.currentProject,
          profit: state.currentProject.profit + values.profit,
          completionPercentage:
            state.currentProject.completionPercentage + values.completionPercentage,
          revenue: state.currentProject.revenue + values.revenue,
          spentCost: state.currentProject.spentCost + values.cost,
          spentNumberOfDays: state.currentProject.spentNumberOfDays + values.numberOfDays,
        }),
      )
    }
  }

  const deleteProjectHandle = async (event) => {
    event.stopPropagation()
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

  const updateProjectsLocallyOnDeleteDetailTracker = (detailTracker) => {
    dispatch(
      setCurrentProject({
        ...state.currentProject,
        profit: state.currentProject.profit - detailTracker.profit,
        completionPercentage:
          state.currentProject.completionPercentage - detailTracker.completionPercentage,
        revenue: state.currentProject.revenue - detailTracker.revenue,
        spentCost: state.currentProject.spentCost - detailTracker.cost,
        spentNumberOfDays: state.currentProject.spentNumberOfDays - detailTracker.numberOfDays,
      }),
    )
  }

  const handleDeleteDetailTracker = async (event, detailTracker) => {
    event.stopPropagation()
    try {
      updateProjectsLocallyOnDeleteDetailTracker(detailTracker)
      const response = await deleteDetailTracker({
        id: detailTracker._id,
        projectId: state.currentProject._id,
      })
      if (response) {
        toast.success('Project details object is deleted')
        dispatch(setCurrentDetailTracker({}))
        dispatch(setRefetchProjects(true))
        detailTrackersRefetch(state.currentProject._id)
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
        updateProjectsLocally(values, isDetailTrackerUpdating)
        response = await updateDetailTracker({
          completionPercentage: values.completionPercentage,
          profit: values.profit,
          cost: values.cost,
          revenue: values.revenue,
          description: values.description,
          numberOfDays: values.numberOfDays,
          projectId: state.currentProject._id,
          id: state.currentDetailsTracker._id,
        }).unwrap()
      } else {
        updateProjectsLocally(values, isDetailTrackerUpdating)
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
        detailTrackersRefetch(state.currentProject._id)
        dispatch(setRefetchProjects(true))
        dispatch(setLoading(false))
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
      <CCard className="mb-3 pointer-cursor" onClick={() => setShowProjectDetailsModal(true)}>
        {/* <CCardImage orientation="top" src={completedProject} /> */}
        <CCardHeader>{state.currentProject.name}</CCardHeader>
        <CCardBody className="position-relative">
          <CCardTitle>{state.currentProject.description}</CCardTitle>
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
          {/* <CCardText>{state.currentProject.description}</CCardText> */}
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
              onClick={(event) => {
                event.stopPropagation()
                setShowProjectScheduleModal(true)
              }}
              type="button"
              color="primary"
              variant="outline"
              className="me-3"
            >
              Show Schedule
            </CButton>
            <CButton
              type="button"
              color="success"
              variant="outline"
              onClick={(event) => {
                event.stopPropagation()
                setShowDetailsTrackerModal(true)
                setIsDetailTrackerUpdating(false)
              }}
              className="me-3"
            >
              Add Progress Details
            </CButton>
            <CButton type="button" color="secondary" variant="outline">
              Show Details
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
          <CModal
            visible={showProjectScheduleModal}
            onClose={() => setShowProjectScheduleModal(false)}
            alignment="center"
          >
            <CModalHeader>
              <CModalTitle>{state.currentProject.name} Schedule</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div>
                <h3>Project Progress</h3>
                <CChart
                  type="line"
                  data={{
                    labels: getDaysList(state.currentProject.estimatedNumberOfDays),
                    datasets: [
                      {
                        label: 'Projected Percentage',
                        data: getProjectedXAxis(state.currentProject.estimatedNumberOfDays),
                        backgroundColor: 'transparent',
                        borderColor: 'blue',
                        pointHoverBackgroundColor: 'blue',
                        borderWidth: 2,
                        lineTension: 0.4,
                      },
                      {
                        label: 'Completion Percentage',
                        data: getRealXAxis(
                          detailTrackers,
                          state.currentProject.estimatedNumberOfDays,
                        ),
                        backgroundColor: 'transparent',
                        borderColor: 'green',
                        pointHoverBackgroundColor: 'blue',
                        borderWidth: 2,
                        lineTension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        min: 0,
                        max: 100,
                        ticks: {
                          stepSize: 10,
                        },
                      },
                    },
                  }}
                />
                <CChart
                  type="bar"
                  data={{
                    labels: ['Project Cost'],
                    datasets: [
                      {
                        label: 'Estimated Cost',
                        backgroundColor: 'blue',
                        data: [
                          Math.round(
                            (state.currentProject.estimatedCost /
                              state.currentProject.estimatedNumberOfDays) *
                              state.currentProject.spentNumberOfDays,
                          ),
                        ],
                      },
                      {
                        label: 'Real Cost',
                        backgroundColor: '#e55353',
                        data: [state.currentProject.spentCost],
                      },
                      {
                        label: 'Profit',
                        backgroundColor: '#2eb85c',
                        data: [state.currentProject.profit],
                      },
                    ],
                  }}
                />
              </div>
            </CModalBody>
          </CModal>
          {detailTrackers && detailTrackers.length > 0 && (
            <CCard>
              <CCardHeader>Details</CCardHeader>
              <CCardBody>
                {detailTrackers.map((detailTracker, index) => (
                  <DetailTracker
                    key={index}
                    detailTracker={detailTracker}
                    onUpdate={handleUpdateDetailTracker}
                    onDelete={handleDeleteDetailTracker}
                    onClick={() => handleClickDetailTracker(detailTracker)}
                  />
                ))}
              </CCardBody>
            </CCard>
          )}
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

      <CModal
        visible={showProjectDetailsModal}
        onClose={() => setShowProjectDetailsModal(false)}
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>{state.currentProject.name} Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardText>{state.currentProject.description}</CCardText>
          <CTable borderless>
            <tr>
              <td>Revenue</td>
              <td>Rs. {state.currentProject.revenue}</td>
            </tr>
            <tr>
              <td>Expected Cost</td>
              <td>Rs. {state.currentProject.estimatedCost}</td>
            </tr>
            <tr>
              <td>Spent Cost</td>
              <td>Rs. {state.currentProject.spentCost}</td>
            </tr>
            <tr>
              <td>Profit</td>
              <td>Rs. {state.currentProject.profit}</td>
            </tr>
            <tr>
              <td>Estimated Number of days</td>
              <td>{state.currentProject.estimatedNumberOfDays} days</td>
            </tr>
            <tr>
              <td>Spent Number of days</td>
              <td>{state.currentProject.spentNumberOfDays} days</td>
            </tr>

            <tr>
              <td>Completion percentage</td>
              <td>{state.currentProject.completionPercentage} %</td>
            </tr>
          </CTable>
        </CModalBody>
      </CModal>
    </>
  )
}

export default ProjectDetails
