import React, { useEffect, useRef } from 'react'
import styles from './ChatBody.module.css'
import ChatMessage from './ChatMessage'
import ChatDateHeader from './ChatDateHeader'

const ChatBody = (props) => {
  const bottomRef = useRef('')
  const messages = props.messages

  useEffect(()=> {
    bottomRef.current.scrollIntoView();
  }, [props.messages])
  return (
    <div className={styles['main-container']}>
      { Object.keys(messages).length > 0 &&
        // If messages exist, render all the messages
        Object.keys(messages).map((dateKey, idx)=> {
          return (
          <React.Fragment key={dateKey}>
            <ChatDateHeader date={dateKey} />
            {messages[dateKey].map((message) => {
              return (<ChatMessage id={message._id} key={message._id} message={message} unread={props.unread} setUnread={props.setUnread} />)
            })}     
          </React.Fragment>) 
        })     
      }
      <div ref={bottomRef}></div>
    </div>
  )
}

export default ChatBody