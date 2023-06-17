/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
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
  setProjectsRefetch,
} from 'src/store/slices/main'
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
    return filteredProject.length > 0
      ? filteredProject.map((project, key) => (
          <CCard className="mb-3 pointer-cursor" key={key} onClick={() => showProject(project)}>
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
              </CTable>
              <div className="text-center">
                <CButton type="button" color="success" variant="outline">
                  Show Details
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        ))
      : handleNoFilteredProjects()
  }
  const handleLoadingState = () => {
    dispatch(setLoading(true))
  }
  return isLoading || isFetching ? handleLoadingState() : renderProjects()
}

export default Projects
