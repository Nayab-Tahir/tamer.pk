import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { useDeleteSingleProjectMutation } from 'src/store/rtk-query'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil } from '@coreui/icons'
import { toast } from 'react-toastify'
import { setCurrentProject, setRefetchProjects } from 'src/store/slices/main'

const ProjectDetails = () => {
  const navigate = useNavigate()
  const state = useSelector((state) => state.main)
  const dispatch = useDispatch()
  const [deleteProject] = useDeleteSingleProjectMutation()
  const [showDetailsTrackerModal, setShowDetailsTrackerModal] = useState(false)
  const [isDetailTrackerUpdating, setIsDetailTrackerUpdating] = useState(false)

  useEffect(() => {
    if (state.currentProject == undefined || Object.keys(state.currentProject).length === 0) {
      navigate('/allProjects')
    }
  }, [state.currentProject])

  const deleteProjectHandle = async () => {
    try {
      const response = await deleteProject(state.currentProject._id).unwrap()
      console.log('RESPONSE: ', response)
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
              <td>{state.currentProject.estimatedDays} days</td>
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
      <CModal visible={showDetailsTrackerModal}>
        <CModalHeader>
          <CModalTitle>{isDetailTrackerUpdating ? 'Update' : 'Add'} Details</CModalTitle>
        </CModalHeader>
        <CModalBody>React Modal body text goes here.</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDetailsTrackerModal(false)}>
            Close
          </CButton>
          <CButton color="primary">{isDetailTrackerUpdating ? 'Update' : 'Add'}</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ProjectDetails
