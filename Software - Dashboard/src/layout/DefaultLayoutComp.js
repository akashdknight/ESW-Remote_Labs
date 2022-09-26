import React from 'react'
import { AppContentComp, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = (props) => {
  return (
    <AppContentComp {...props} />
  )
}

export default DefaultLayout
