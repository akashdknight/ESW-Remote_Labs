/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useEffect } from 'react'
import './Login.css'
import background from '../../../assets/brand/WheatField.jpg'

//MUI
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import {
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormFeedback,
  CCollapse,
} from '@coreui/react'
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
  CFormLabel,
  CFormCheck,
  CFormText,
  CImage,
} from '@coreui/react'
import {
  CModal,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CModalHeader,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormSelect,
} from '@coreui/react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { auth } from '../../../firebase'
import db from '../../../firebase1'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'

const Login = () => {
  // const [openssnackbar, setOpenssnackbar] = useState(false)
  // const [openfsnackbar, setOpenfsnackbar] = useState(false)
  // const [openwsnackbar, setOpenwsnackbar] = useState(false) //for wrong password
  // const [openUserNotFound, setOpenUserNotFound] = useState(false) //for user not found
  // const [notSignedUp, setNotSignedUp] = useState(false)

  // different users
  // const [mobileUsers, setMobileUsers] = useState([])
  // const [bizUsers, setBizUsers] = useState([])
  // const [customersData1, setCustomersData1] = useState([])

  // const [passwordShown1, setPasswordShown1] = useState(false)
  // const [incomplete, setIncomplete] = useState(false)
  // const [userfound, setUserfound] = useState(false)
  // const [wrong, setWrong] = useState(false)
  // const [eye1, setEye1] = useState(false)

  // const [newUser, setNewUser] = useState('')
  // const navigate = useNavigate()
  // const emailRef = useRef(null)
  // const passwordRef = useRef(null)

  // function addNewUser(e) {
  //   setNewUser(e.target.value)
  //   console.log(newUser)
  // }

  // const togglePassword1 = (e) => {
  //   e.preventDefault()
  //   setPasswordShown1(!passwordShown1)
  //   if (passwordShown1) {
  //     setEye1(false)
  //   } else {
  //     setEye1(true)
  //   }
  // }

  // useEffect(() => {
  //   db.collection('account_details')
  //     .doc('Dashboard')
  //     .collection('Accounts')
  //     .onSnapshot((snapshot) => {
  //       setCustomersData1(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         })),
  //       )
  //     })

  //   db.collection('biz').onSnapshot((snapshot) => {
  //     setBizUsers(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       })),
  //     )
  //   })
  // }, [])

  // var text = document.getElementById('mess')
  // const signIn = (e) => {
  //   e.preventDefault()
  //   let truth = false
  //   if (emailRef.current.value === '' || passwordRef.current.value === '') {
  //     setIncomplete(true)
  //   } else {
  //     customersData1.map(({ id, data }) => {
  //       if (data.email === newUser && data.signed_up === 1) {
  //         console.log('signed_up', data.signed_up)
  //         console.log('if', data.email, 'customersData1')
  //         truth = true
  //         auth
  //           .signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
  //           .then((user) => {
  //             console.log(user)
  //             console.log('hiui from login')
  //             if (data.type === 'biz') {
  //               navigate('/company')
  //             } else if (data.type === 'tech') {
  //               navigate('/parameters')
  //             } else if (data.type === 'client') {
  //               navigate('/client')
  //             }
  //             truth = true
  //             setUserfound(true)
  //             console.log(user)
  //           })
  //           .catch(function (err) {
  //             setWrong(true)
  //             if (!userfound || wrong) {
  //               setOpenfsnackbar(true)
  //             }
  //           })
  //       } else if (data.email === newUser && data.signed_up === 0) {
  //         setNotSignedUp(true)
  //         truth = true
  //       }
  //     })

  //     bizUsers.map(({ id, data }) => {
  //       if (data.email === newUser && data.signed_up === 1) {
  //         console.log('signed_up', data.signed_up)
  //         console.log('if', data.email, 'biz')
  //         truth = true
  //         auth
  //           .signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
  //           .then((user) => {
  //             truth = true
  //             navigate('/client')
  //             setUserfound(true)
  //             console.log(user)
  //           })
  //           .catch(function (err) {
  //             setWrong(true)
  //             if (!userfound || wrong) {
  //               setOpenfsnackbar(true)
  //             }
  //           })
  //       } else if (data.email === newUser && data.signed_up === 0) {
  //         setNotSignedUp(true)
  //         truth = true
  //       }
  //     })
  //   }

  //   if (!truth) {
  //     setOpenUserNotFound(true)
  //   }
  // }

  // const forgot = (e) => {
  //   e.preventDefault()
  //   let truth = false
  //   if (emailRef.current.value === '') {
  //     setIncomplete(true)
  //   } else {
  //     customersData1.map(({ id, data }) => {
  //       if (data.email === newUser && data.signed_up === 1) {
  //         console.log('signed_up', data.signed_up)
  //         console.log('if', data.email, 'customersData1')
  //         truth = true
  //         auth
  //           .sendPasswordResetEmail(emailRef.current.value)
  //           .then((user) => {
  //             setOpenssnackbar(true)
  //           })
  //           .catch((err) => {
  //             console.log(err)
  //           })
  //       }
  //     })

  //     bizUsers.map(({ id, data }) => {
  //       if (data.email === newUser && data.signed_up === 1) {
  //         console.log('signed_up', data.signed_up)
  //         console.log('if', data.email, 'biz')
  //         truth = true
  //         auth
  //           .sendPasswordResetEmail(emailRef.current.value)
  //           .then((user) => {
  //             setOpenssnackbar(true)
  //           })
  //           .catch((err) => {
  //             console.log(err)
  //           })
  //       }
  //     })
  //   }

  //   if (!truth) {
  //     setOpenUserNotFound(true)
  //   }
  // }

  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  // })

  // const handleCloseSuccess = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }

  //   setOpenssnackbar(false)
  // }

  // const handleCloseWarning = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }

  //   setOpenfsnackbar(false)
  // }

  // const handleCloseWrong = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }

  //   setOpenwsnackbar(false)
  // }

  // const handleNotFound = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }

  //   setOpenUserNotFound(false)
  // }

  // const handleIncomplete = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }

  //   setIncomplete(false)
  //   setOpenUserNotFound(false)
  // }

  // const signUpHandler = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }

  //   setNotSignedUp(false)
  // }

  // console.log('rendered')

  // return (
  //   <div className="bg-white d-flex flex-row py-0 px-0 mx-0 my-0">
  //     <div
  //       className="d-flex flex-column justify-content-center"
  //       style={{ width: '50vw', backgroundColor: 'white', height: '100vh' }}
  //     >
  //       <CCard className="p-4 cardBorder">
  //         <CCardBody className="px-3">
  //           <CForm>
  //             <div className="pb-5">
  //               <span className="display-6 theme">Sign In</span>
  //             </div>
  //             <CForm>
  //               <div className="mb-3">
  //                 <CFormLabel htmlFor="exampleInputEmail1">Email Address</CFormLabel>
  //                 <CFormInput
  //                   type="email"
  //                   id="exampleInputEmail1"
  //                   aria-describedby="emailHelp"
  //                   ref={emailRef}
  //                   onChange={addNewUser}
  //                   autofocus
  //                   required="required"
  //                 />
  //               </div>
  //               <div className="mb-3">
  //                 <CFormLabel htmlFor="exampleInputPassword1">Password</CFormLabel>
  //                 <CFormInput
  //                   ref={passwordRef}
  //                   type="password"
  //                   autocomplete="off"
  //                   id="user-input1"
  //                   autofocus
  //                   required
  //                 />
  //               </div>
  //             </CForm>
  //             <CRow>
  //               <CCol xs={12} className="d-flex flex-row justify-content-end text-right">
  //                 <button className="l" onClick={forgot}>
  //                   Forgot password?
  //                 </button>
  //               </CCol>
  //             </CRow>
  //             <CRow className="mb-2 mt-1">
  //               <div className="d-grid gap-2 b">
  //                 <button className="px-4 b py-2" onClick={signIn}>
  //                   Login
  //                 </button>
  //               </div>
  //             </CRow>
  //             <CRow>
  //               <CCol>
  //                 <h5 className="px-4 py-2 " style={{ textAlign: 'center' }}>
  //                   Not registered yet?
  //                 </h5>
  //               </CCol>
  //               <CCol>
  //                 <div className="d-grid gap-2 b">
  //                   <Link
  //                     to="/signup"
  //                     className="px-4 py-2 b"
  //                     style={{ textDecoration: 'none', color: 'white', textAlign: 'center' }}
  //                   >
  //                     Sign Up
  //                   </Link>
  //                 </div>
  //               </CCol>
  //             </CRow>
  //             <CRow>
  //               <h4 id="mess" className="pt-2">
  //                 {' '}
  //               </h4>
  //             </CRow>
  //           </CForm>
  //         </CCardBody>
  //       </CCard>
  //     </div>
  //     <div
  //       className="d-flex flex-column justify-content-center"
  //       style={{ width: '50vw', backgroundColor: 'white' }}
  //     >
  //       <img
  //         src={`${background}`}
  //         style={{ objectFit: 'cover', width: '100%', height: '100%' }}
  //         alt="jmmm"
  //       />
  //     </div>
  //     <Snackbar
  //       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  //       open={openssnackbar}
  //       autoHideDuration={3000}
  //       onClose={handleCloseSuccess}
  //     >
  //       <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
  //         Password Reset Link is sent to email address.
  //       </Alert>
  //     </Snackbar>
  //     <Snackbar
  //       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  //       open={incomplete}
  //       autoHideDuration={3000}
  //       onClose={handleIncomplete}
  //     >
  //       <Alert onClose={handleIncomplete} severity="warning" sx={{ width: '100%' }}>
  //         Please fill the complete form
  //       </Alert>
  //     </Snackbar>
  //     <Snackbar
  //       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  //       open={openfsnackbar}
  //       autoHideDuration={3000}
  //       onClose={handleCloseWarning}
  //     >
  //       <Alert onClose={handleCloseWarning} severity="error" sx={{ width: '100%' }}>
  //         Invalid User OR Password
  //       </Alert>
  //     </Snackbar>
  //     <Snackbar
  //       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  //       open={openUserNotFound}
  //       autoHideDuration={3000}
  //       onClose={handleNotFound}
  //     >
  //       <Alert onClose={handleNotFound} severity="error" sx={{ width: '100%' }}>
  //         User not found!
  //       </Alert>
  //     </Snackbar>
  //     <Snackbar
  //       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  //       open={notSignedUp}
  //       autoHideDuration={3000}
  //       onClose={signUpHandler}
  //     >
  //       <Alert onClose={signUpHandler} severity="warning" sx={{ width: '100%' }}>
  //         New User, Please Signup!
  //       </Alert>
  //     </Snackbar>
  //   </div>
  // )

  //ref
  const refuser = useRef(null) //user name
  const refcname = useRef(null) //company name
  const refPhone = useRef(null)

  //validated
  const [validated, setValidated] = useState(false)
  const [nemailValidity, setNemailValidity] = useState(false)
  const [phValidated, setPhValidated] = useState(false)
  const [isUnique, setIsUnique] = useState(true)
  const [nuserValidity, setNuserValidity] = useState(false)
  const [ncompValidity, setNcompValidity] = useState(false)
  //modal
  const [modalVisible, setModalVisible] = useState(false)

  //date
  const [date1, setDate1] = useState(Date('2017-01-01'))

  //delete ids
  const [deleteDocId, setDeleteDocId] = useState(null)
  const [deleteDataObj, setDeleteDataObj] = useState(null)

  const [openssnackbar, setOpenssnackbar] = useState(false)
  const [openfsnackbar, setOpenfsnackbar] = useState(false)
  const [openusnackbar, setOpenusnackbar] = useState(false)
  const [visibleCompany, setVisibleCompany] = useState(true)
  const [visibleUser, setVisibleUser] = useState(true)
  const [visibleCrop, setVisibleCrop] = useState(true)
  const [visibleMachine, setVisibleMachine] = useState(true)
  const [visibleVariety, setVisibleVariety] = useState(true)
  const [v, setV] = useState(false)
  const [modal, setModal] = useState(false)
  const [nnum, setNnum] = useState('')

  const [locationKeys, setLocationKeys] = useState([])
  const navigate = useNavigate()

  const [nuser, setNuser] = useState('')
  const [ncompany, setNcompany] = useState('Upjao')
  const [nemail, setNemail] = useState('')
  const [level, setLevel] = useState(1)

  const [company, setCompany] = useState('')
  const [data1, setData1] = useState([])
  const [logData, setLogData] = useState([])
  const [newCompany, setNewCompany] = useState('')
  const [newCompanyType, setNewCompanyType] = useState('')
  const [user, setUser] = useState('')
  const [user1, setUser1] = useState([])
  const [newUser, setNewUser] = useState('')
  const [email, setEmail] = useState('')
  const [email1, setEmail1] = useState([])
  const [newEmail, setNewEmail] = useState('')
  const [newType, setNewType] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [add, setAdd] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [value1, setValue1] = useState('')
  const [companyType, setCompanyType] = useState([])
  const [customerpause, setCustomerPause] = useState('')
  const [customerreactivate, setCustomerReactivate] = useState('')
  const [cropCode, setCropCode] = useState('')
  const [crop, setCrop] = useState('Maize')
  const [firebase_signin, setFirebaseSignin] = useState(false)
  function Company_CodeToName(code) {
    if (code === 'ol') {
      code = 'Olam'
    } else if (code === 'mp') {
      code = 'Maize Products'
    } else if (code === 'up') {
      code = 'Upjao'
    } else if (code === 'pb') {
      code = 'Public'
    } else if (code === 'fm') {
      code = 'Farmart'
    }
    return code
  }

  function Company_NameToCode(name) {
    name = name.toLowerCase()
    if (name === 'olam') {
      name = 'ol'
    } else if (name === 'maize products') {
      name = 'mp'
    } else if (name === 'upjao') {
      name = 'up'
    } else if (name === 'public') {
      name = 'pb'
    } else if (name === 'farmart') {
      name = 'fm'
    }
    return name
  }
  // console.log(currentUser)
  function newCompTypeInput(e) {
    setNewCompany(e.target.value)
    // console.log(newCompany)
  }

  function company_drop(event) {
    if (event.target.value !== 'Select') {
      setCompany(event.target.value)
    }
  }

  function newUserInput(e) {
    setNewUser(e.target.value)
    // console.log(newUser)
  }
  function newCompInput(e) {
    setNewCompany(e.target.value)
    // console.log(newCompany)
  }
  function newEmailInput(e) {
    setNewEmail(e.target.value)
    // console.log(newEmail)
  }
  const currentURL = window.location.href

  // console.log(currentURL)

  useEffect(() => {
    auth
      .signInWithEmailAndPassword('biz@gmail.com', '111111')
      .then((user) => {
        console.log(user)
        console.log('hiui from login')
        setFirebaseSignin(true)
      })
      .catch(function (err) {
        alert('Error to login. No firebase access')
      })
  }, [])

  // console.log('setLogData', logData)

  let sortedLogs = [...logData]
  sortedLogs.sort((a, b) => {
    if (a.data.time < b.data.time) {
      return 1
    }
    if (a.data.time > b.data.time) {
      return -1
    }
    return 0
  })

  console.log(sortedLogs)

  function check(elem) {
    // use one of possible conditions
    // if (elem.value == 'Other')

    var variety_select = document.getElementById('varietySelect')

    if (variety_select.value === 'Other') {
      document.getElementById('company_type').style.display = 'block'
    } else {
      document.getElementById('company_type').style.display = 'none'
    }
  }

  const phoneValidityHandler = (e) => {
    setNnum(e.target.value.trim())
    let v = e.target.validity.patternMismatch
    if (v) {
      setPhValidated(false)
    } else if (!v) {
      setPhValidated(true)
    }
  }
  const insertCompanyTypeValue = () => {
    var companyTxtVal = document.getElementById('companyType-input').value,
      newCompanyVal = document.createTextNode(companyTxtVal)
    setNewCompanyType(newCompany)
    // console.log(newCompany)
    db.collection('company_type').add({
      company_type: newCompany,
    })
    setCompany('')
    setNewCompanyType('')
  }
  const [logUser, setLogUser] = useState('hii')

  const insertValue = () => {
    var companyTxtVal = document.getElementById('company-input').value,
      userTxtVal = document.getElementById('user-input').value,
      emailTxtVal = document.getElementById('email-input').value,
      newCompanyVal = document.createTextNode(companyTxtVal),
      newUserVal = document.createTextNode(userTxtVal),
      newEmailVal = document.createTextNode(emailTxtVal)
    // btn = document.getElementById("pause");

    setNewCompany(newCompanyVal)
    setNewUser(newUserVal)
    setNewEmail(newEmailVal)
    setLogUser(newUser)

    // console.log(btn.innerText)
    // console.log(newUser)
    // console.log(newEmail)
    // console.log(newCompany)
    // console.log(value1)

    db.collection('biz').add({
      name: newUser,
      email: newEmail,
      company_name: newCompany,
      company_type: company,
      pause: '0',
      recativate: '1',
      user: currentUser,
      // pause: customerpause,
      // activate: customerreactivate

      // comments:
    })

    db.collection('log').add({
      name: newUser,
      email: newEmail,
      company_name: newCompany,
      company_type: company,
      pause: '0',
      recativate: '1',
      user: currentUser,
    })
    setCompany('')
    setNewCompany('')
    setNewUser('')
    setNewEmail('')
    setNewType('')
  }

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  function selectedMode(e) {
    if (e.target.value !== 'Select') {
      setValue1(e.target.value)
    }
    // console.log(e.target.value)
  }

  const isInvalid = () => {
    return nnum === '' || !phValidated || date1 === null
  }

  const isNotUnique = () => {
    //   if (
    //     db.collection('account_details').doc('Dashboard').collection('Accounts').doc(nemail).get()
    //       .exists
    //   ) {
    //     return true
    //   } else {
    //     return false
    //   }
    console.log(nemail)
    data1.map(({ id, data }) => {
      console.log(data.email)
      if (data.email === nemail) {
        console.log('hello')
        setIsUnique(false)
        console.log(isUnique)
      }
    })
  }
  const newreviewHandler = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      setValidated(false)
    }
    setValidated(true)
    event.preventDefault()
    if (!isInvalid()) {
      setOpenssnackbar(true)
      // db.collection('biz').add({
      //   name: nuser,
      //   email: nemail,
      //   company_name: ncompany,
      //   signed_up: 0,
      //   pause: '1',
      //   recativate: '0',
      //   action: 'Pause',
      //   user: currentUser,
      //   time: currDate,
      //   level: level,
      // })

      navigate('/company/mobile-users', {
        state: { number: nnum, date: date1, company: ncompany, crop: crop },
      })
      setValidated(false)
      //setNcompany('')
      setCompany('')
      setNnum('')
      //refuser.current.value = null
      //refcname.current.value = null
    } else {
      setOpenfsnackbar(true)
    }
  }

  const clearuserHandler = () => {
    //setNcompany('')
    setNuser('')
    setNemail('')
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  const handleCloseSuccess = (event, reason) => {
    console.log(isUnique)
    if (reason === 'clickaway') {
      return
    }

    setOpenssnackbar(false)
  }

  const handleCloseWarning = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenfsnackbar(false)
  }
  const handleCloseWarning_unique = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenusnackbar(false)
  }

  console.log(deleteDataObj, deleteDocId)
  // const handleDelete = (e) => {
  //   db.collection('biz').doc(deleteDocId).delete()
  //   db.collection('log').add({
  //     name: deleteDataObj.name,
  //     email: deleteDataObj.email,
  //     company_name: deleteDataObj.company_name,
  //     action: 'Deleted',
  //     pause: '0',
  //     recativate: '1',
  //     user: currentUser,
  //     time: currDate,
  //     level: deleteDataObj.level,
  //   })
  //   setModalVisible(false)
  // }

  const handleDelete = (e) => {
    db.collection('account_details')
      .doc('Dashboard')
      .collection('Accounts')
      .doc(deleteDocId)
      .delete()
    db.collection('input_log').add({
      email: deleteDataObj.email,
      company_name: deleteDataObj.company_name,
      // company_type: company,
      // pause: '0',
      // reactivate: '1',
      user: currentUser,
      action: 'user deleted',
      level: deleteDataObj.role,
    })
    setModalVisible(false)
  }

  //validity handlers
  const userNameHandler = (e) => {
    setNuser(e.target.value)
    // e.target.tooLong
  }

  const emailValidityHandler = (e) => {
    setNemail(e.target.value)
    if (e.target.validity.typeMismatch) {
      setNemailValidity(false)
    } else {
      setNemailValidity(true)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h1>
            <strong>Kernel Review</strong>
          </h1>
        </CCardHeader>

        <CCardBody className="">
          <CCard className="my-1">
            <CCardBody>
              <CForm noValidate validated={validated} onSubmit={newreviewHandler} className="">
                <div className="mb-3">
                  {/* <div className="mb-3">
                      <CFormLabel htmlFor="InputUser">User's Name</CFormLabel>
                      <CFormInput
                        type="text"
                        required
                        id="exampleInputPassword1"
                        // value={nuser}
                        ref={refuser}
                        maxLength="15"
                        pattern="^(?!\s*$).+"
                        //className="was-validated"
                        onChange={(e) => setNuser(e.target.value.trim())}
                      />
                      <CFormFeedback valid>Looks good!</CFormFeedback>
                      <CFormFeedback invalid>Fill this field!</CFormFeedback>
                    </div> */}
                  <div className="mb-3 d-flex flex-row">
                    {/* 
                      <div className="w-50 px-1">
                        <CFormLabel htmlFor="InputCompany">Company's Name</CFormLabel>
                        <CFormInput
                          type="company"
                          id="company"
                          ref={refcname}
                          aria-describedby="companyHelp"
                          // value={ncompany}
                          required
                          maxLength="15"
                          pattern="^(?!\s*$).+"F
                          onChange={(e) => setNcompany(e.target.value.trim())}
                        />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                        <CFormFeedback invalid>Fill this field!</CFormFeedback>
                      </div> */}
                    <div className="w-50 mx-1">
                      <CFormLabel htmlFor="InputCompany">Phone Number</CFormLabel>
                      <CFormInput
                        // type="company"
                        // type="number"
                        // id="InputNumber"
                        required
                        value={nnum}
                        pattern="[6789][0-9]{9}"
                        maxLength="10"
                        ref={refPhone}
                        onChange={phoneValidityHandler}
                        // onChange={(e) => setNnum(e.target.value.trim())}
                        // value={nnum}
                      />
                      <CFormFeedback valid>Looks good!</CFormFeedback>
                      <CFormFeedback invalid>Invalid Phone Number!</CFormFeedback>
                    </div>
                    <div className="w-50 px-1">
                      <CFormLabel htmlFor="InputCompany">Company's name</CFormLabel>
                      <CDropdown className="w-100" value={ncompany}>
                        <CDropdownToggle color="secondary" size="md" className="w-100">
                          {ncompany !== '' ? ncompany : 'Select company'}
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => setNcompany('olam')}>Olam</CDropdownItem>
                          <CDropdownItem onClick={() => setNcompany('maize products')}>
                            Maize Products
                          </CDropdownItem>
                          <CDropdownItem onClick={() => setNcompany('upjao')}>Upjao</CDropdownItem>
                          <CDropdownItem onClick={() => setNcompany('public')}>
                            Public
                          </CDropdownItem>
                          <CDropdownItem onClick={() => setNcompany('farmart')}>
                            Farmart
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                      <CFormFeedback valid>Looks good!</CFormFeedback>
                      <CFormFeedback invalid>Please select company</CFormFeedback>
                    </div>
                  </div>
                </div>
                <div className="mb-3 d-flex flex-row">
                  <div className="w-50 px-1">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Select Date"
                        value={date1}
                        required
                        onChange={(newDate) => {
                          setDate1(newDate)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <CFormFeedback valid>Looks good!</CFormFeedback>
                      <CFormFeedback invalid>Fill this field!</CFormFeedback>
                    </LocalizationProvider>
                  </div>
                  <div className="w-50 px-1">
                    <CFormLabel htmlFor="InputCompany">Crop Name</CFormLabel>
                    <CDropdown className="w-100" value={crop}>
                      <CDropdownToggle color="secondary" size="md" className="w-100">
                        {crop !== '' ? crop : 'Select crop'}
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem onClick={() => setCrop('Maize')}>Maize</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Rice')}>Rice</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Wheat')}>Wheat</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Channa')}>Channa</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Soyabean')}>Soyabean</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Barley')}>Barley</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Moong')}>Moong</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Arhar')}>Arhar</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Urad')}>Urad</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Masoor')}>Masoor</CDropdownItem>
                        <CDropdownItem onClick={() => setCrop('Paddy')}>Paddy</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                    <CFormFeedback invalid>Fill this field!</CFormFeedback>
                  </div>
                </div>
                <CContainer className="d-flex my-4 justify-content-end">
                  <div className="mx-1" Style={'width: auto'}>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => setV(!v)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="mx-1" Style={'width: auto'}>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={clearuserHandler}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="mx-1" Style={'width: auto'}>
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      // onClick={newuserHandler}
                    >
                      Review
                    </button>
                  </div>
                </CContainer>
              </CForm>
            </CCardBody>
          </CCard>

          <br></br>

          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={openssnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
          >
            <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
              Your response is successfuly saved!
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={openfsnackbar}
            autoHideDuration={3000}
            onClose={handleCloseWarning}
          >
            <Alert onClose={handleCloseWarning} severity="warning" sx={{ width: '100%' }}>
              Please fill the form properly before submit!
            </Alert>
          </Snackbar>

          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={openusnackbar}
            autoHideDuration={3000}
            onClose={handleCloseWarning_unique}
          >
            <Alert onClose={handleCloseWarning_unique} severity="warning" sx={{ width: '100%' }}>
              User with same email already exists !
            </Alert>
          </Snackbar>
        </CCardBody>
      </CCard>
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>Confirmation for Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>The User will get permanently deleted.</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Login
