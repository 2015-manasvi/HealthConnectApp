import { Button, Container, IconButton, Stack, TextField } from "@mui/material";
import SendIcon from './Images/send.png';
import React, { useContext, useState } from "react";
import UserContext from "../context/user"
import styles from './ChatInput.module.css'
import { fetchData } from '../helpers/common'

const ChatInput = (props) => {
  const userCtx = useContext(UserContext)
  const [input, setInput] = useState('')

  const putChat = async() => {
    const { ok, data } = await fetchData('/api/chats/', "PUT", {
      chat_id: userCtx.patient._id,
      msg_senderId: userCtx.user._id,
      role: userCtx.role == 'staff' ? 'Staff' : 'Contacts',
      msg_fromNurse: userCtx.role == 'staff' ? true: false,
      msg_isRead: false,
      msg_timeSent: new Date(),
      msg_content: input,
    })

    if (ok) {
      console.log('chat added')
      props.getMessages()
      setInput('')
    } else {
      console.log('failed to send message')
    }
  }

  // only allows a message to be sent if all messages from the opposite role is read
  const handleSend = () => {
    if (props.unread == 0) {
      putChat()
    } else {
      console.log(props.unread)
      console.log('confirm read first')
    }
  }

  return (
    <div className={ styles['main-container'] }>
      <Stack direction="row" spacing={1} >
        {/* <Button
          variant="contained"
          sx={{
            width: 90,
            height: "3rem",
            color: "#FFFFFF",
            font: "Roboto",
            textTransform: "none",
            fontWeight: 100,
            fontSize: "0.75rem",
            lineHeight: "1rem",
            padding: 0,
            backgroundColor: "#004B64",
            flexGrow: 0
          }}
        >
          + Quick Text
        </Button> */}
        <TextField
          id="outlined-basic"
          placeholder="Type a message..."
          variant="outlined"
          multiline
          inputProps={{
            style: {
              // input box initial height
              minHeight: "1rem",
              lineHeight: "0.875rem",
              fontSize: "0.875rem",
            },
          }}
          sx={{
            // input box outline
            color: "#79747E",
            flexGrow: 1,
            backgroundColor: "#FFFFFF"
          }}
          value={input}
          onChange={(e)=> setInput(e.target.value)}
        />
        <IconButton size="small" sx={{ flexGrow: 0 }} onClick={handleSend}  > 
          <img src={SendIcon} />
        </IconButton>
      </Stack>
      { userCtx.role == 'contact' && (
        <p className={ styles['text-disclaimer'] }>We kindly request for your understanding that our staff may not be able to respond to your message immediately. Rest assured that we will respond as soon as we can. Thank you for your patience and support.</p>
      )}
    </div>
  );
};

export default ChatInput;
