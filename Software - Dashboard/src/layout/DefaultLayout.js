/* eslint-disable react/prop-types */
import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = (props) => {
  return (
    <div>
      <AppSidebar type="tech" />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader mail={props.mail} />
        <div className="body flex-grow-1 px-3">
          <AppContent mail={props.mail} />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
