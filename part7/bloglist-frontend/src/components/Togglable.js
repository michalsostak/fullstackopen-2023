import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Box mt={2} mb={2}>
          <Button variant="outlined" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </Box>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Box mt={2} mb={2}>
          <Button variant="outlined" onClick={toggleVisibility}>
            Cancel
          </Button>
        </Box>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
