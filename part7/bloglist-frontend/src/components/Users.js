import { useQuery } from 'react-query'
import { getAllUsers } from '../requests-users'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Typography
} from '@mui/material'

const Users = () => {
  const { isLoading, isError, data, error } = useQuery('users', getAllUsers, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (isLoading) {
    return <span>Users are loading...</span>
  }

  const users = data

  return (
    <div>
      <Typography variant="h5">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User name</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Users
