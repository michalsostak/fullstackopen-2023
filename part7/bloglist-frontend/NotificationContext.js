import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'clear':
      return ''
    case 'new':
      return `new anecdote: '${action.payload}'`
    case 'vote':
      return `anecdote '${action.payload}' voted`
    case 'error':
      return 'too short anecdote, must have length 5 or more'
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [anecdoteNotification, anecdoteNotificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider
      value={[anecdoteNotification, anecdoteNotificationDispatch]}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const anecdoteNotificationAndDispatch = useContext(NotificationContext)
  return anecdoteNotificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const anecdoteNotificationAndDispatch = useContext(NotificationContext)
  return anecdoteNotificationAndDispatch[1]
}

export default NotificationContext
