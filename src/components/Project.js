/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CCardText,
  CTable,
  CCardHeader,
  CFormSelect,
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
import ReactPaginate from 'react-paginate'

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
  const [searchSelectInputValue, setSearchSelectInputValue] = useState('name')
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5

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

  const filterSelectOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Revenue', value: 'revenue' },
    { label: 'Profit', value: 'profit' },
    { label: 'Spent number of days', value: 'spentNumberOfDays' },
    { label: 'Estimated number of days', value: 'estimatedNumberOfDays' },
    { label: 'Spent cost', value: 'spentCost' },
    { label: 'Estimated cost', value: 'estimatedCost' },
    { label: 'Description', value: 'description' },
    { label: 'Completion percentage', value: 'completionPercentage' },
    { label: 'Status', value: 'status' },
    { label: 'Street address', value: 'streetAddress' },
    { label: 'Country', value: 'country' },
    { label: 'Zip code', value: 'zipCode' },
  ]

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

    const HandleSearchSelectChange = (event) => {
      setSearchSelectInputValue(event.target.value)
    }

    const projectsQueryFilter = (project) => {
      if (searchQuery.length > 0) {
        if (searchSelectInputValue === 'name' && project.name.toLowerCase().includes(searchQuery))
          return true
        if (
          searchSelectInputValue === 'description' &&
          project.description.toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'area' &&
          project.area.toString().toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'estimatedCost' &&
          project.estimatedCost.toString().toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'estimatedNumberOfDays' &&
          project.estimatedNumberOfDays.toString().toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'spentNumberOfDays' &&
          project.spentNumberOfDays.toString().toLowerCase().includes(searchQuery)
        )
          return true

        if (
          searchSelectInputValue === 'completionPercentage' &&
          project.completionPercentage.toString().toLowerCase().includes(searchQuery)
        )
          return true

        if (
          searchSelectInputValue === 'revenue' &&
          project.revenue.toString().toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'profit' &&
          project.profit.toString().toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'spentCost' &&
          project.spentCost.toString().toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'status' &&
          project.status.toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'streetAddress' &&
          project.address.streetAddress.toString().toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'country' &&
          project.address.country.toString().toLowerCase().includes(searchQuery)
        )
          return true
        if (
          searchSelectInputValue === 'zipCode' &&
          project.address.zipCode.toLowerCase().includes(searchQuery)
        )
          return true
      } else return true
      return false
    }

    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected)
    }

    const offset = currentPage * itemsPerPage
    const pageCount = Math.ceil(filteredProject.length / itemsPerPage)
    const paginatedProjects = filteredProject
      .filter(projectsQueryFilter)
      .slice(offset, offset + itemsPerPage)

    return (
      <>
        <div className="d-flex">
          <CCard className="mb-3 me-3">
            <CCardHeader>Filtering Projects</CCardHeader>
            <CCardBody className="d-flex">
              <CFormSelect
                aria-label="Select filter field for projects"
                options={filterSelectOptions}
                className="searchProjectsSelect"
                onChange={HandleSearchSelectChange}
                value={searchSelectInputValue}
              />
              <CFormInput
                type="text"
                className="searchProjectsInput"
                placeholder="Search field"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}
              />
            </CCardBody>
          </CCard>
          <CCard className="mb-3">
            <CCardHeader>Sorting Projects</CCardHeader>
            <CCardBody className="d-flex">
              <CFormSelect
                aria-label="Select filter field for projects"
                options={filterSelectOptions}
                className="searchProjectsSelect"
                onChange={HandleSearchSelectChange}
                value={searchSelectInputValue}
              />
              <CFormInput
                type="text"
                className="searchProjectsInput"
                placeholder="Search field"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}
              />
            </CCardBody>
          </CCard>
        </div>
        {paginatedProjects.length > 0
          ? paginatedProjects.map((project, key) => (
              <CCard className="mb-3" key={key}>
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
                    <CButton
                      type="button"
                      color="success"
                      variant="outline"
                      onClick={() => showProject(project)}
                    >
                      Show Details
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            ))
          : handleNoFilteredProjects()}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </>
    )
  }
  const handleLoadingState = () => {
    dispatch(setLoading(true))
  }
  return isLoading || isFetching ? handleLoadingState() : renderProjects()
}

export default Projects
