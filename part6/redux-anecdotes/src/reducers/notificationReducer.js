import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
      },
    clearNotification(state, action) {
      return ''
      }
  },
})

export const setNotification = (notificationContent, timeoutInSeconds) => {
  return dispatch => {
    dispatch(showNotification(notificationContent))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutInSeconds * 1000)
  }
}

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer