import userService from '../services/user'
import { Typography, Box } from '@mui/material'

const Header = () => {
  const userData = userService.getUser()

  return (
    <Box mb={2} mt={2}>
      <Typography variant="h4">{userData ? 'Blog app' : 'Login'}</Typography>
    </Box>
  )
}
export default Header
