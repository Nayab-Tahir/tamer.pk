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
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
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
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import runningProject from 'src/assets/images/running_project.jpg'
import completedProject from 'src/assets/images/completed_project.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useSelector } from 'react-redux'
import { useGetAllUsersQuery } from '../../store/rtk-query/index'

const Dashboard = () => {
  const state = useSelector((state) => state)
  // const { data: users, isFetching, isLoading } = useGetAllUsersQuery()
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  // console.log('USERS: ', users)

  ////////////////////////////////////// DUMMY DATA

  const projects = [
    {
      id: 1,
      name: 'Project A',
      description:
        'This is a sample project that demonstrates the basic functionality of the application.',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      status: 'active',
      completionPercentage: 75,
      revenue: 100000,
      cost: 80000,
      profit: 20000,
    },
    {
      id: 2,
      name: 'Project B',
      description:
        'This project is a more advanced version of Project A and includes additional features.',
      startDate: '2022-02-01',
      endDate: '2022-11-30',
      status: 'active',
      completionPercentage: 50,
      revenue: 150000,
      cost: 120000,
      profit: 30000,
    },
    {
      id: 3,
      name: 'Project C',
      description:
        'This project is a complex project that involves multiple teams and a long development timeline.',
      startDate: '2022-03-01',
      endDate: '2022-12-31',
      status: 'inactive',
      completionPercentage: 100,
      revenue: 200000,
      cost: 180000,
      profit: 20000,
    },
    {
      id: 1,
      name: 'Project A',
      description:
        'This is a sample project that demonstrates the basic functionality of the application.',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      status: 'active',
      completionPercentage: 75,
      revenue: 100000,
      cost: 80000,
      profit: 20000,
    },
    {
      id: 2,
      name: 'Project B',
      description:
        'This project is a more advanced version of Project A and includes additional features.',
      startDate: '2022-02-01',
      endDate: '2022-11-30',
      status: 'active',
      completionPercentage: 50,
      revenue: 150000,
      cost: 120000,
      profit: 30000,
    },
    {
      id: 3,
      name: 'Project C',
      description:
        'This project is a complex project that involves multiple teams and a long development timeline.',
      startDate: '2022-03-01',
      endDate: '2022-12-31',
      status: 'inactive',
      completionPercentage: 100,
      revenue: 200000,
      cost: 180000,
      profit: 20000,
    },
    {
      id: 4,
      name: 'Project D',
      description: 'This project involves the development of a new e-commerce platform.',
      startDate: '2022-04-01',
      endDate: '2022-09-30',
      status: 'active',
      completionPercentage: 60,
      revenue: 250000,
      cost: 200000,
      profit: 50000,
    },
    {
      id: 5,
      name: 'Project E',
      description:
        'This project is focused on the design and implementation of a new mobile application.',
      startDate: '2022-05-01',
      endDate: '2022-12-31',
      status: 'active',
      completionPercentage: 45,
      revenue: 300000,
      cost: 270000,
      profit: 30000,
    },
    {
      id: 6,
      name: 'Project F',
      description:
        'This project is a complex project that involves the integration of multiple systems.',
      startDate: '2022-06-01',
      endDate: '2022-11-30',
      status: 'inactive',
      completionPercentage: 100,
      revenue: 350000,
      cost: 330000,
      profit: 20000,
    },
    {
      id: 7,
      name: 'Project G',
      description:
        'This project is focused on the development of a new website for a small business.',
      startDate: '2022-07-01',
      endDate: '2022-12-31',
      status: 'active',
      completionPercentage: 70,
      revenue: 400000,
      cost: 350000,
      profit: 50000,
    },
  ]

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

    projects.forEach((item) => {
      if (item.status === 'active') {
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

  ///////////////////////////////////// DUMMY DATA

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
  const data = {
    total: 11,
    running: 2,
  }
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
              <h5>Completion ({(rnPer * rnPs + cmPer * cmPs) / (rnPs + cmPs)}%)</h5>
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

        <CCardFooter>
          <CRow>
            <CCol sm={10}>
              <CRow>
                <CCol sm={4}>
                  <div className="border-start border-start-4 border-start-info py-1 px-3">
                    <div className="text-medium-emphasis large">Revenue</div>
                    <div className="fs-5 fw-semibold">Rs. {rnRevenue + cmRevenue}</div>
                  </div>
                </CCol>
                <CCol sm={4}>
                  <div className="border-start border-start-4 border-start-danger py-1 px-3">
                    <div className="text-medium-emphasis large">Cost</div>
                    <div className="fs-5 fw-semibold">Rs. {rnCost + cmCost}</div>
                  </div>
                </CCol>
                <CCol sm={4}>
                  <div className="border-start border-start-4 border-start-primary py-1 px-3">
                    <div className="text-medium-emphasis large">Profits</div>
                    <div className="fs-5 fw-semibold">Rs. {rnProfit + cmProfit}</div>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol sm={2}>
              <div className="border-start border-start-4 border-start-success py-1 px-3">
                <div className="text-medium-emphasis large">Profit Percentage</div>
                <div className="fs-5 fw-semibold">
                  {Math.floor(((rnProfit + cmProfit) * 100) / (rnRevenue + cmRevenue))}%
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardFooter>
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
                <CButton color="success" variant="outline">
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
                <CButton color="success" variant="outline">
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

      {/* <WidgetsDropdown />

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
