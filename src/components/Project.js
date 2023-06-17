/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CFormInput,
  CCardText,
  CTable,
  CCardHeader,
} from '@coreui/react'
import { useGetAllProjectsByUserIdQuery } from 'src/store/rtk-query'
import {
  setCurrentProject,
  setCurrentProjectPreviousStatus,
  setLoading,
  setProjects,
} from 'src/store/slices/main'
import {} from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Projects = ({ status }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.main)
  const navigate = useNavigate()
  const {
    data: allProjects = [],
    isLoading,
    isFetching,
    refetch: refetchProjects,
  } = useGetAllProjectsByUserIdQuery(state.userId)

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await refetchProjects()
      dispatch(setProjects(projects.data))
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(setProjects(allProjects))
    }
  }, [isLoading, isFetching])

  const showProject = (project) => {
    dispatch(setCurrentProject(project))
    dispatch(setCurrentProjectPreviousStatus(project.status))
    navigate('/showProject')
  }

  const renderProjects = () => {
    dispatch(setLoading(false))
    const handleNoFilteredProjects = () => {
      if (status === 'COMPLETED') {
        return 'No completed projects soo far!'
      }
      if (status === 'ACTIVE') {
        return 'No active projects soo far!'
      }
      if (status === 'ALL') {
        return 'No projects soo far!'
      }
    }

    const filteredProject = allProjects.filter((project) => {
      if (status === 'COMPLETED') {
        if (project.status === 'COMPLETED') return project
      }
      if (status === 'ACTIVE') {
        if (project.status === 'ACTIVE') return project
      }
      if (status === 'ALL') return project
      return false
    })
    return (
      <>
        <CCard className="mb-3">
          <CCardBody className="d-flex">
            <CFormInput
              type="text"
              className="searchProjectsInput"
              placeholder="Search Projects by fields"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}
            />
          </CCardBody>
        </CCard>
        {filteredProject.length > 0
          ? filteredProject
              .filter((project) => {
                if (searchQuery.length > 0) {
                  if (project.name.toLowerCase().includes(searchQuery)) return true
                  if (project.description.toLowerCase().includes(searchQuery)) return true
                  if (project.area.toString().toLowerCase().includes(searchQuery)) return true
                  if (project.estimatedCost.toString().toLowerCase().includes(searchQuery))
                    return true
                  if (project.estimatedNumberOfDays.toString().toLowerCase().includes(searchQuery))
                    return true
                  if (project.spentNumberOfDays.toString().toLowerCase().includes(searchQuery))
                    return true

                  if (project.completionPercentage.toString().toLowerCase().includes(searchQuery))
                    return true

                  if (project.revenue.toString().toLowerCase().includes(searchQuery)) return true
                  if (project.profit.toString().toLowerCase().includes(searchQuery)) return true
                  if (project.spentCost.toString().toLowerCase().includes(searchQuery)) return true
                  if (project.status.toLowerCase().includes(searchQuery)) return true
                  if (project.address.streetAddress.toString().toLowerCase().includes(searchQuery))
                    return true
                  if (project.address.country.toString().toLowerCase().includes(searchQuery))
                    return true
                  if (project.address.zipCode.toLowerCase().includes(searchQuery)) return true
                } else return true
                return false
              })
              .map((project, key) => (
                <CCard
                  className="mb-3 pointer-cursor"
                  key={key}
                  onClick={() => showProject(project)}
                >
                  {/* <CCardImage orientation="top" src={completedProject} /> */}
                  <CCardHeader
                    className={`${
                      state.currentProject?._id?.toString() === project._id.toString()
                        ? 'border border-danger'
                        : ''
                    }`}
                  >
                    {project.name}
                  </CCardHeader>
                  <CCardBody>
                    <CCardText>{project.description}</CCardText>
                    <CTable borderless>
                      <tr>
                        <td>Revenue</td>
                        <td>Rs. {project.revenue}</td>
                      </tr>
                      <tr>
                        <td>Estimated Cost</td>
                        <td>Rs. {project.estimatedCost}</td>
                      </tr>
                      <tr>
                        <td>Profit</td>
                        <td>Rs. {project.profit}</td>
                      </tr>
                      <tr>
                        <td>Estimated Time</td>
                        <td>{project.estimatedNumberOfDays} days</td>
                      </tr>
                      <tr>
                        <td>Project Status</td>
                        <td>{project.status}</td>
                      </tr>
                    </CTable>
                    <div className="text-center">
                      <CButton type="button" color="success" variant="outline">
                        Show Details
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              ))
          : handleNoFilteredProjects()}
      </>
    )
  }
  const handleLoadingState = () => {
    dispatch(setLoading(true))
  }
  return isLoading || isFetching ? handleLoadingState() : renderProjects()
}

export default Projects
