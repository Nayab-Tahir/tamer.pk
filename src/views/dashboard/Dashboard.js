import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardImage,
  CCardTitle,
  CCardText,
  CCol,
  CProgress,
  CRow,
  CTable,
  CWidgetStatsB,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsD,
} from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilArrowThickFromTop,
  cilBuilding,
  cilLibraryBuilding,
  cilMoney,
  cilArrowThickFromBottom,
} from '@coreui/icons'

import runningProject from 'src/assets/images/running_project.jpg'
import completedProject from 'src/assets/images/completed_project.jpg'
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllProjectsByUserIdQuery } from '../../store/rtk-query/index'
import { useNavigate } from 'react-router-dom'
import { setProjects } from 'src/store/slices/main'

const Dashboard = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.main)
  const navigate = useNavigate()
  const {
    data: allProjects = [],
    isLoading,
    isFetching,
    refetch: refetchProjects,
  } = useGetAllProjectsByUserIdQuery(state.userId)
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  !isLoading && !isFetching && dispatch(setProjects(allProjects))

  const findCount = () => {
    let rnPs = 0
    let cmPs = 0
    let rnPer = 0
    let cmPer = 0
    let rnRevenue = 0
    let cmRevenue = 0
    let rnCost = 0
    let cmCost = 0
    let rnProfit = 0
    let cmProfit = 0

    allProjects.forEach((item) => {
      if (item.status === 'ACTIVE') {
        rnPs += 1
        rnPer += item.completionPercentage
        rnRevenue += item.revenue
        rnCost += item.cost
        rnProfit += item.profit
      } else {
        cmPs += 1
        cmPer += item.completionPercentage
        cmRevenue += item.revenue
        cmCost += item.cost
        cmProfit += item.profit
      }
    })
    rnPer = rnPer / rnPs
    cmPer = cmPer / cmPs
    return { rnPs, cmPs, rnPer, cmPer, rnRevenue, cmRevenue, rnCost, cmCost, rnProfit, cmProfit }
  }

  const { rnPs, cmPs, rnPer, cmPer, rnRevenue, cmRevenue, rnCost, cmCost, rnProfit, cmProfit } =
    findCount()

  let savedColorHexForLaterUse = '#3b5998'
  let anotherOneColor = '#2eb85c'
  ///////////////////////////////////// DUMMY DATA

  return (
    <>
      {/* <div>{!isLoading && users.length}</div>
      <div>{data.running}</div> */}
      <CCard className="mb-4">
        <CCardHeader>
          <h3 className="card-title text-center my-2">Overall Statistics</h3>
        </CCardHeader>

        <CCardBody>
          <CRow>
            <CCol sm={3}></CCol>
            <CCol sm={3}>
              <h5>Total Projects:</h5>
              <h5>Completed Projects:</h5>
              <h5>Running Projects:</h5>
            </CCol>
            <CCol sm={2}></CCol>
            <CCol sm={4}>
              <h5>{rnPs + cmPs}</h5>
              <h5>{cmPs}</h5>
              <h5>{rnPs}</h5>
            </CCol>
          </CRow>
          <CRow className="mx-5 px-5">
            <div className="text-center mt-2">
              <h5>Completion ({(rnPer * rnPs + cmPer * cmPs) / (rnPs + cmPs || 1)}%)</h5>
            </div>
            <div className="px-5">
              <CProgress
                className="mb-3 mx-5 px-0"
                color="success"
                value={Math.floor((rnPer * rnPs + cmPer * cmPs) / (rnPs + cmPs))}
              >
                {(rnPer * rnPs + cmPer * cmPs) / (rnPs + cmPs)}%
              </CProgress>
            </div>
          </CRow>
        </CCardBody>
      </CCard>

      <CRow>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsD
            className="mb-4"
            icon={<CIcon icon={cilLibraryBuilding} height={52} className="my-4 text-white" />}
            values={[
              { title: 'Revenue', value: `${rnRevenue + cmRevenue}` },
              // { title: 'feeds', value: '459' },
            ]}
            style={{
              '--cui-card-cap-bg': savedColorHexForLaterUse,
            }}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsD
            className="mb-4"
            icon={<CIcon icon={cilArrowThickFromTop} height={52} className="my-4 text-white" />}
            values={[
              { title: 'Cost', value: `${rnCost + cmCost}` },
              // { title: 'feeds', value: '459' },
            ]}
            style={{
              '--cui-card-cap-bg': savedColorHexForLaterUse,
            }}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsD
            className="mb-4"
            icon={<CIcon icon={cilMoney} height={52} className="my-4 text-white" />}
            values={[
              { title: 'Profits', value: `${rnProfit + cmProfit}` },
              // { title: 'feeds', value: '459' },
            ]}
            style={{
              '--cui-card-cap-bg': savedColorHexForLaterUse,
            }}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsD
            className="mb-4"
            icon={<CIcon icon={cilArrowThickFromBottom} height={52} className="my-4 text-white" />}
            values={[
              {
                title: 'Profit Percentage',
                value: `${Math.floor(((rnProfit + cmProfit) * 100) / (rnRevenue + cmRevenue))}%`,
              },
              // { title: 'feeds', value: '459' },
            ]}
            style={{
              '--cui-card-cap-bg': savedColorHexForLaterUse,
            }}
          />
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>Projet Profits</CCardHeader>
        <CCardBody>
          <CChartBar
            data={{
              labels: allProjects.map((project) => project.name),
              datasets: [
                {
                  label: 'Project Revenue',
                  backgroundColor: '#2eb85c',
                  data: allProjects.map((project) => project.revenue),
                },
                {
                  label: 'Project Cost',
                  backgroundColor: '#e55353',
                  data: allProjects.map((project) => project.cost),
                },
              ],
            }}
            labels="Projects"
          />
        </CCardBody>
      </CCard>

      <CRow>
        <CCol lg={6}>
          <CCard className="mb-3">
            <CCardImage orientation="top" src={runningProject} />
            <CCardBody>
              <CCardTitle>Running Projects</CCardTitle>
              <CCardText>
                These are the Projects that are in progress and not completed yet. Further details
                are available...
              </CCardText>
              <CTable borderless>
                <tr>
                  <td>Revenue</td>
                  <td>Rs. {rnRevenue}</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>Rs. {rnCost}</td>
                </tr>
                <tr>
                  <td>Profit</td>
                  <td>Rs. {rnProfit}</td>
                </tr>
              </CTable>
              <div className="mt-2">
                <strong>Progress</strong>
              </div>
              <div>
                <CProgress className="mb-3 px-0" color="success" value={rnPer}>
                  {Math.floor(rnPer)}%
                </CProgress>
              </div>
              <div className="text-center">
                <CButton
                  color="success"
                  variant="outline"
                  onClick={() => navigate('/runningProjects')}
                >
                  Show All
                </CButton>
                <div>
                  <small className="text-medium-emphasis">Total Running Projects: {rnPs} </small>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={6}>
          <CCard className="mb-3">
            <CCardImage orientation="top" src={completedProject} />
            <CCardBody>
              <CCardTitle>Completed Projects</CCardTitle>
              <CCardText>
                These are the Projects that have been completed by you. Further details are
                available...
              </CCardText>
              <CTable borderless>
                <tr>
                  <td>Revenue</td>
                  <td>Rs. {cmRevenue}</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>Rs. {cmCost}</td>
                </tr>
                <tr>
                  <td>Profit</td>
                  <td>Rs. {cmProfit}</td>
                </tr>
                <tr>
                  <td>Profit/Project</td>
                  <td>Rs. {cmProfit / cmPs}</td>
                </tr>
                <tr>
                  <td>Time/Project</td>
                  <td>5 months</td>
                </tr>
              </CTable>
              <div className="text-center">
                <CButton
                  color="success"
                  variant="outline"
                  onClick={() => navigate('/completedProjects')}
                >
                  Show All
                </CButton>
                <div>
                  <small className="text-medium-emphasis">Total Completed Projects: {cmPs} </small>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
