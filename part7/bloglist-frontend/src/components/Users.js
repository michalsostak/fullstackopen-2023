import { useQuery } from 'react-query'
import { getAllUsers } from '../requests-users'
import { Link } from 'react-router-dom'

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
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Users
