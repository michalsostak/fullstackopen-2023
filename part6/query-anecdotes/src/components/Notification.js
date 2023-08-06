import { useNotificationValue, useNotificationDispatch } from '../NotificationContext'
import { useEffect  } from 'react'


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const NotificationContent = useNotificationValue()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    if (NotificationContent !== null && NotificationContent !== '') {

    const timer = setTimeout(() => {
      dispatch({ type: 'clear' })
    }, 3000)

    return () => { clearTimeout(timer) }
  }
  }, [dispatch, NotificationContent])

  if (NotificationContent === null || NotificationContent === '') return null

  return (
    <div style={style}>
      {NotificationContent}
    </div>
  )
}

export default Notification
