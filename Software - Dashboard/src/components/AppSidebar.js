/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import logo from 'src/assets/brand/logo.png'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import logoUpjao from '../assets/brand/logoUpjao.png'

// sidebar nav config

import navigationComp from '../_navComp'

const AppSidebar = (props) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // const isCompany = props.company
  var navlinks

  if (props.type === 'company') {
    navlinks = navigationComp
  }
  return (
    <CSidebar
      position="fixed"
      // unfoldable={false}
      unfoldable={unfoldable}
      visible={sidebarShow}
      // visible={true}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={`${logoUpjao}`} alt="hmm" height={40} />
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        {/* /* <h1>Upjao</h1> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navlinks} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

// AppSidebar.propTypes = {
//   company: PropTypes.bool.isRequired,
// }

export default React.memo(AppSidebar)
