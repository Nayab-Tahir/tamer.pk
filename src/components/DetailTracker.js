import React from 'react'
import { CCard, CCardBody, CCardText, CTable } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil } from '@coreui/icons'
import PropTypes from 'prop-types'

const DetailTracker = ({ detailTracker, onClick, onUpdate, onDelete }) => {
  return (
    <>
      <CCard className="mb-3" onClick={onClick}>
        {/* <CCardImage orientation="top" src={completedProject} /> */}
        <CCardBody className="position-relative">
          {/* <CCardTitle>Completed Projects</CCardTitle> */}
          <CIcon
            icon={cilTrash}
            height={20}
            className="my-4 text-danger projectDeleteIcon position-absolute"
            onClick={() => onDelete(detailTracker)}
          />
          <CIcon
            icon={cilPencil}
            height={20}
            className="my-4 text-warning projectUpdateIcon position-absolute"
            onClick={() => onUpdate(detailTracker)}
          />
          <CCardText>{detailTracker.description}</CCardText>
          <CTable borderless>
            <tr>
              <td>Revenue</td>
              <td>Rs. {detailTracker.revenue}</td>
            </tr>
            <tr>
              <td>Cost</td>
              <td>Rs. {detailTracker.cost}</td>
            </tr>
            <tr>
              <td>Profit</td>
              <td>Rs. {detailTracker.profit}</td>
            </tr>
            <tr>
              <td>Number of days</td>
              <td>{detailTracker.numberOfDays} days</td>
            </tr>

            <tr>
              <td>Completion percentage</td>
              <td>{detailTracker.completionPercentage} %</td>
            </tr>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

DetailTracker.propTypes = {
  onClick: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  detailTracker: PropTypes.object,
}

export default DetailTracker
