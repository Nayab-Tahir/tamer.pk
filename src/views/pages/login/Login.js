import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Formik } from 'formik'
import { loginSchema } from './login-schema'
import { useLoginMutation } from 'src/store/rtk-query'
import { useDispatch } from 'react-redux'
import { setLoading, saveToken } from 'src/store/slices/main'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [login, loginResult] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialValues = {
    email: '',
    password: '',
  }
  const handleSubmit = async (values, actions) => {
    try {
      dispatch(setLoading(true))
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap()
      localStorage.clear()
      if (response && response.access_token) {
        actions.resetForm()
        dispatch(saveToken(response.access_token))
        navigate('/dashboard')
        dispatch(setLoading(false))
      }
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      console.error('LOGIN(): ', error)
    }
    console.log('VALUES: ', values)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ handleBlur, handleChange, values, errors, touched, handleSubmit }) => (
                      <CForm onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Email"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete="username"
                            value={values.email}
                          />
                        </CInputGroup>
                        {touched.email && errors.email && (
                          <div className="mt-2 text-danger">{errors.email}</div>
                        )}
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="password"
                            value={values.password}
                          />
                        </CInputGroup>
                        {touched.password && errors.password && (
                          <div className="mt-2 text-danger">{errors.password}</div>
                        )}
                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4" type="submit">
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-end">
                            <CButton color="link" className="px-0" disabled>
                              Forgot password?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
