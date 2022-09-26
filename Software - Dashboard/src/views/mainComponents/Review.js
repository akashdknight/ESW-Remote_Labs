/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useRef } from 'react'

//MUI

import Modal from '@mui/material/Modal'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
//import './Home.css'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { CContainer } from '@coreui/react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { storage } from '../../firebase1'
import { uploadBytes, listAll } from 'firebase/storage'
import db from '../../firebase1'
import { CForm } from '@coreui/react'

// import { forEach } from 'core-js/core/array'
const Review = (props) => {
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
  useEffect(() => {
    var d = ''
    if (Object.prototype.toString.call(location.state.date) === '[object Date]') {
      d = location.state.date.toLocaleDateString([], {
        year: 'numeric',
        day: '2-digit',
        month: '2-digit',
      })
    } else {
      d = String(date)
    }
    if (Object.prototype.toString.call(location.state.date) === '[object Date]') {
      d = d.substring(3, 5) + '/' + d.substring(0, 2) + '/' + d.substring(6, 10)
    }
    for (var i = 0; i < d.length; i++) {
      if (d[i] === '/') {
        d = d.replace(d[i], '-')
      }
    }
    setDate(d)
    console.log(location.state.crop)
    var crop_code = Crop_nameTOcode(location.state.crop)
    var path =
      'reviewed_kernels_updated_prod/' +
      crop_code +
      '/' +
      Company_NameToCode(location.state.company) +
      '/M1/' +
      location.state.number +
      '/' +
      d
    console.log(path)
    const all_files = ref(storage, path)
    setInitial_path(path)
    listAll(all_files).then((res) => {
      res.prefixes.forEach((folderRef) => {
        time_stamps.push(folderRef.name)
        listAll(folderRef).then((res2) => {
          res2.items.forEach((itemRef) => {
            var image_dict = {}
            if (itemRef.name.includes('.jpeg')) {
              getDownloadURL(itemRef).then((url) => {
                const xhr = new XMLHttpRequest()
                xhr.responseType = 'blob'
                xhr.onload = (event) => {
                  const blob = xhr.response
                }
                xhr.open('GET', url)
                xhr.send()
                image_dict['name'] = itemRef.name
                image_dict['url'] = url
                image_dict['time_stamp'] = folderRef.name
                image_dict['color'] = '#000000'
                image_dict['class_name'] = 'Select Class'
                all_image_info.push(image_dict)
              })
            }
          })
        })
      })
    })

    console.log(all_image_info)
  }, [])

  // The change_annotation function will update the annotation of the image by visiting the json file
  const change_annotation = (index, name, time_stamp) => {
    var f_name = name.substr(0, name.lastIndexOf('.'))
    f_name = f_name + '.json'
    console.log(f_name)
    var path = initial_path + '/' + time_stamp
    //console.log(path)
    const time_stamp_ref = ref(storage, path)
    listAll(time_stamp_ref).then((res) => {
      res.items.forEach((itemRef) => {
        if (itemRef.name === f_name) {
          //console.log(itemRef.name)
          getDownloadURL(itemRef).then((url) => {
            fetch(url).then((r) => {
              r.text().then((d) => {
                //console.log(d)
                var obj = JSON.parse(d)
                if (obj.annotation == 'wrong') {
                  obj.annotation = 'right'
                } else {
                  obj.annotation = 'wrong'
                }
                //console.log(obj)
                var jsonString = JSON.stringify(obj)
                var blob = new Blob([jsonString], { type: 'application/json' })
                var file_ref = ref(storage, path + '/' + f_name)
                uploadBytes(file_ref, blob)
                  .then((snapshot) => {
                    console.log('Updated annotation')
                    if (obj.annotation == 'wrong') {
                      document.getElementById(name).style.borderColor = '#FF0000'
                      all_image_info[index]['color'] = '#FF0000'
                    } else {
                      document.getElementById(name).style.borderColor = '#000000'
                      all_image_info[index]['color'] = '#000000'
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })

                // file_ref.put(blob).then(function (snapshot) {
                //   console.log('Uploaded a blob or file!')
                // })
              })
              //console.log(url)
            })
          })
        }
      })
    })
  }
  // When the save button is clicked, the function will save the updated class names of the images in the json file.
  const onSave = (time_stamp) => {
    all_image_info.map((item) => {
      console.log(item['name'] + ' : ' + item['class_name'])
    })
    var path = initial_path + '/' + time_stamp
    //console.log(path)
    const time_stamp_ref = ref(storage, path)
    listAll(time_stamp_ref).then((res) => {
      res.items.forEach((itemRef) => {
        if (itemRef.name.includes('.json')) {
          //console.log(itemRef.name)
          var f_name1 = itemRef.name
          f_name1 = String(f_name1).split('.')[0]
          console.log(f_name1)
          all_image_info.map((item) => {
            var f_name2 = item['name']
            f_name2 = String(f_name2).split('.')[0]
            if (f_name1 === f_name2 && item['class_name'] != 'Select Class') {
              console.log(f_name1 + ' : ' + item['class_name'])
              getDownloadURL(itemRef).then((url) => {
                fetch(url).then((r) => {
                  r.text().then((d) => {
                    console.log(d)
                    var obj = JSON.parse(d)
                    obj.changedClassName = item['class_name']
                    //console.log(obj)
                    var jsonString = JSON.stringify(obj)
                    var blob = new Blob([jsonString], { type: 'application/json' })
                    var file_ref = ref(storage, path + '/' + itemRef.name)
                    uploadBytes(file_ref, blob)
                      .then((snapshot) => {
                        console.log('Updated classname')
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  })
                  console.log(url)
                })
              })
            }
          })
        }
      })
    })
  }
  // The fucntion gets and stores the url of the full image a particular time stamp
  const get_full_image_url = (time_stamp) => {
    var path = initial_path + '/' + time_stamp
    console.log('Path for full image : ' + path)
    const time_stamp_ref = ref(storage, path)
    listAll(time_stamp_ref).then((res) => {
      res.items.forEach((itemRef) => {
        if (itemRef.name.includes('.json')) {
          getDownloadURL(itemRef).then((url) => {
            fetch(url).then((r) => {
              r.text().then((d) => {
                console.log(d)
                var obj = JSON.parse(d)
                setFull_image_url(obj.originalImageFirebasePath)
                //console.log(obj)
                console.log(obj.originalImageFirebasePath)
              })
            })
          })
        }
      })
    })
  }
  const newuserHandler = () => {
    console.log('load_button')
  }
  const clearuserHandler = () => {
    console.log('load_button')
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
          <CCard className="mb-4">
            <CCardBody>
              <h4>Phone number : {location.state.number}</h4>
              <h4>Company name : {location.state.company}</h4>
              <h4>Date : {proper_date}</h4>
              <h4>Crop : {location.state.crop}</h4>
            </CCardBody>
          </CCard>

          <CCard className="mb-4" width="50%">
            <CCardBody>
              <div className="mb-3 d-flex flex-row" align="center">
                <div className="w-50 mx-1">
                  <CButton
                    type="submit"
                    color="primary"
                    onClick={() => {
                      if (time_stamp_selected > 0) {
                        setShow_full_image(false)
                        get_full_image_url(time_stamps[time_stamp_selected - 1])
                        setTime_stamp_selected(time_stamp_selected - 1)
                      }
                    }}
                  >
                    Previous
                  </CButton>
                </div>
                <div className="w-50 mx-2">
                  <h4>Time Stamp : {time_stamps[time_stamp_selected]}</h4>
                </div>
                <div className="w-50 mx-3">
                  <CButton
                    type="submit"
                    color="primary"
                    align="right"
                    onClick={() => {
                      if (time_stamp_selected < time_stamps.length - 1) {
                        setShow_full_image(false)
                        get_full_image_url(time_stamps[time_stamp_selected + 1])
                        setTime_stamp_selected(time_stamp_selected + 1)
                      }
                    }}
                  >
                    Next
                  </CButton>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>Time Stamp : {time_stamps[time_stamp_selected]}</CCardHeader>
            <CCardBody>
              <div className="overflow-auto" style={{ height: '600px', width: '1000px' }}>
                <Box sx={{ width: '100%' }}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {all_image_info.map((item, index) => {
                      if (item['time_stamp'] === time_stamps[time_stamp_selected]) {
                        return (
                          <Grid item xs={6}>
                            <Item>
                              <img
                                src={item['url']}
                                alt={item['name']}
                                key={index}
                                style={{ width: '20%', height: '20%' }}
                                id={item['name']}
                                borderColor={item['color']}
                                border="4"
                                onLoad={() => {
                                  //console.log(item['color'])
                                  document.getElementById(item['name']).style.borderColor =
                                    item['color']
                                }}
                                onClick={() =>
                                  change_annotation(index, item['name'], item['time_stamp'])
                                }
                              />

                              <button
                                type="submit"
                                className="btn btn-outline-primary"
                                id={'A' + item['name']}
                                onClick={() => {
                                  all_image_info[index]['class_name'] = 'Class_A'
                                  document.getElementById(
                                    'A' + item['name'],
                                  ).style.backgroundColor = 'yellow'
                                  document.getElementById(
                                    'B' + item['name'],
                                  ).style.backgroundColor = 'white'
                                  document.getElementById(
                                    'C' + item['name'],
                                  ).style.backgroundColor = 'white'
                                }}
                              >
                                Class A
                              </button>
                              <button
                                type="submit"
                                className="btn btn-outline-primary"
                                id={'B' + item['name']}
                                onClick={() => {
                                  all_image_info[index]['class_name'] = 'Class_B'
                                  document.getElementById(
                                    'B' + item['name'],
                                  ).style.backgroundColor = 'yellow'
                                  document.getElementById(
                                    'A' + item['name'],
                                  ).style.backgroundColor = 'white'
                                  document.getElementById(
                                    'C' + item['name'],
                                  ).style.backgroundColor = 'white'
                                }}
                              >
                                Class B
                              </button>
                              <button
                                type="submit"
                                className="btn btn-outline-primary"
                                id={'C' + item['name']}
                                onClick={() => {
                                  all_image_info[index]['class_name'] = 'Class_C'
                                  document.getElementById(
                                    'C' + item['name'],
                                  ).style.backgroundColor = 'yellow'
                                  document.getElementById(
                                    'A' + item['name'],
                                  ).style.backgroundColor = 'white'
                                  document.getElementById(
                                    'B' + item['name'],
                                  ).style.backgroundColor = 'white'
                                }}
                              >
                                Class C
                              </button>
                            </Item>
                          </Grid>
                        )
                      }
                    })}
                  </Grid>
                </Box>
              </div>
              <CForm className="needs-validation">
                <CContainer className="d-flex my-4 justify-content-end">
                  <div className="mx-1" Style={'width: auto'}>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        onSave(time_stamps[time_stamp_selected])
                      }}
                    >
                      Save
                    </button>
                  </div>
                  <div className="mx-1" Style={'width: auto'}>
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      onClick={handleOpen}
                      onLoad={handleOpen}
                    >
                      Show Full Image
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        {show_load_message === true ? (
                          <>
                            <h6>
                              The page is loading. Please wait for at least 10 seconds and then
                              click anywhere on screen
                            </h6>
                          </>
                        ) : (
                          <img src={full_image_url} style={{ width: '100%', height: '100%' }} />
                        )}
                      </Box>
                    </Modal>
                  </div>
                </CContainer>
              </CForm>
            </CCardBody>
          </CCard>

          <br></br>
        </CCardBody>
      </CCard>
      <br></br>
      <br></br>
    </>
  )
}

export default Review
