import React from 'react'
import styles from './ChatDateHeader.module.css'

const ChatDateHeader = (props) => {
  return (
    <div className={styles['date-header']}>{props.date}</div>
  )
}

export default ChatDateHeader