/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useRef } from 'react'
import ResponsiveAppBar from './nav.js'
import SpacingGrid from './grids.js'
//MUI

import Modal from '@mui/material/Modal'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
//import './Home.css'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import { CContainer } from '@coreui/react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { storage } from '../../firebase1'
import { uploadBytes, listAll } from 'firebase/storage'
import db from '../../firebase1'
import { CForm } from '@coreui/react'
// import { forEach } from 'core-js/core/array'
const Dashboard = (props) => {
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('is_log') === 'false')
    {
        navigate('/')
    }
},[])

  const location = useLocation()
  const [show_load_message, setShow_load_message] = useState(true)
  const [time_stamps, setTime_stamps] = useState([])
  // const [v, setV] = useState(false)
  var today = new Date()
  if (today.getMonth() < 10) {
    var new_month = '0' + (today.getMonth() + 1)
  } else {
    var new_month = today.getMonth() + 1
  }
  if (today.getDate() < 10) {
    var new_Date = '0' + today.getDate()
  } else {
    var new_Date = today.getDate()
  }

  var date = new_Date + '/' + new_month + '/' + today.getFullYear()
  var currTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

  var currDate = date + ' ' + currTime
  var count = 1

  const output1 = document.querySelector('#output1')
  const [age, setAge] = React.useState('')

  const change_className = (e, index) => {
    all_image_info[index]['class_name'] = e.target.value
    document
      .getElementById(all_image_info[index]['name'] + 'class')
      .setAttribute('value', e.target.value)
    //document.getElementById(all_image_info[index]['name'] + 'class').style.value = e.target.value
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const [open, setOpen] = React.useState(true)
  const handleOpen = () => {
    setShow_load_message(false)
    if (time_stamp_selected == 0) {
      get_full_image_url(time_stamps[time_stamp_selected])
    }
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
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

  function Crop_nameTOcode(name) {
    name = name.toLowerCase()
    if (name === 'maize') {
      name = 'mz'
    } else if (name === 'rice') {
      name = 'rc'
    } else if (name === 'wheat') {
      name = 'wh'
    } else if (name === 'channa') {
      name = 'ch'
    } else if (name === 'soyabean') {
      name = 'sy'
    } else if (name === 'barley') {
      name = 'by'
    } else if (name === 'moong') {
      name = 'mg'
    } else if (name === 'arhar') {
      name = 'ar'
    } else if (name === 'urad') {
      name = 'ud'
    } else if (name === 'masoor') {
      name = 'ms'
    } else if (name === 'paddy') {
      name = 'pd'
    } else {
      name = 'invlid'
    }
    return name
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
  const [proper_date, setDate] = useState('Not set')
  //const [all_image_info, setImage_info] = useState()
  const [show_full_image, setShow_full_image] = useState(false)
  const [full_image_url, setFull_image_url] = useState('')
  const [all_image_info, setImage_info] = useState([{}])
  const [initial_path, setInitial_path] = useState('')
  const [time_stamp_selected, setTime_stamp_selected] = useState(0)

  // The use effect module will obtain the image info from the database and store it in the state variable all_image_info.
  const newuserHandler = () => {
    console.log('load_button')
  }
  const clearuserHandler = () => {
    console.log('load_button')
  }
  return (
    <>
        <ResponsiveAppBar />
        <br /><br />
        <SpacingGrid />
    </>
  )
}

export default Dashboard
