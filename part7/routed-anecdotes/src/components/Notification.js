const Notification = ({ notificationContent }) => (
  <>
    {notificationContent !== '' &&
      <div>
        {notificationContent}
      </div>
    }
  </>
)

export default Notification