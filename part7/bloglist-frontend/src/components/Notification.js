import {
  useNotificationValue,
  useNotificationDispatch
} from '../NotificationContext'
import { useEffect } from 'react'

const Notification = () => {
  const { content, messageType, timeout } = useNotificationValue()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    if (content !== null && content !== '') {
      const timer = setTimeout(() => {
        dispatch({ type: 'clear' })
      }, timeout)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [dispatch, content, messageType, timeout])

  if (content === null || content === '') return null

  return <div className={`notification ${messageType}`}>{content}</div>
}

export default Notification
