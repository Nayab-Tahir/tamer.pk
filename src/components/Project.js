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
} from '@coreui/react'
import { useGetAllProjectsByUserIdQuery } from 'src/store/rtk-query'
import { setCurrentProject, setLoading } from 'src/store/slices/main'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Projects = ({ status }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.main.userId)
  const navigate = useNavigate()
  const { data: allProjects = [], isLoading, isFetching } = useGetAllProjectsByUserIdQuery(userId)
  useEffect(() => {})
  const showProject = (project) => {
    dispatch(setCurrentProject(project))
    navigate('/updateProject')
  }
  const renderProjects = () => {
    dispatch(setLoading(false))
    return allProjects
      .filter((project) => {
        if (status === 'COMPLETED') {
          if (project.status === 'COMPLETED') return project
        }
        if (status === 'ACTIVE') {
          if (project.status === 'ACTIVE') return project
        }
        if (status === 'ALL') return project
        return false
      })
      .map((project, key) => (
        <CCard className="mb-3" key={key} onClick={() => showProject(project)}>
          {/* <CCardImage orientation="top" src={completedProject} /> */}
          <CCardBody>
            {/* <CCardTitle>Completed Projects</CCardTitle> */}
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
                <td>{project.estimatedDays} days</td>
              </tr>
            </CTable>
          </CCardBody>
        </CCard>
      ))
  }
  const handleLoadingState = () => {
    dispatch(setLoading(true))
  }
  return isLoading || isFetching ? handleLoadingState() : renderProjects()
}

export default Projects
