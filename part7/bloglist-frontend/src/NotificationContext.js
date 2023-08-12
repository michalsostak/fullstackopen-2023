import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  const defaultTimeout = 3000

  switch (action.type) {
    case 'clear':
      return { content: '', messageType: '', timeout: 0 }
    case 'notify':
      return {
        content: action.payload.content,
        messageType: action.payload.messageType,
        timeout:
          action.payload.timeout === null || action.payload.timeout === undefined
            ? defaultTimeout
            : action.payload.timeout
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [blogNotification, blogNotificationDispatch] = useReducer(
    notificationReducer,
    { content: '', messageType: '', timeout: 0 }
  )

  return (
    <NotificationContext.Provider
      value={[blogNotification, blogNotificationDispatch]}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const blogNotificationAndDispatch = useContext(NotificationContext)
  return blogNotificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const blogNotificationAndDispatch = useContext(NotificationContext)
  return blogNotificationAndDispatch[1]
}

export default NotificationContext
