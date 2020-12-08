import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRouter = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route { ...rest }
      component= {
        (props) => (
          (isAuthenticated)
          ? ( <Component { ...rest } /> )
          : ( <Redirect to='/auth' /> )
        )
      }
    />
  )
}



// PrivateRouter.PropTypes = {
//   isAuthenticated: PropTypes.bool.isRequired,
//   component: PropTypes.func.isRequired
// }
