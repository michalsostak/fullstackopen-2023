interface INotificationProps {
  notificationContent: string
}

const Notification = ({ notificationContent }: INotificationProps) => (
  <>
    {notificationContent !== '' &&
      <p style={{ color: 'red' }}>
        {notificationContent}
      </p>
    }
  </>
)

export default Notification;