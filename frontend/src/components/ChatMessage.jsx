import React, { useContext, useEffect, useState } from "react";
import styles from "./ChatMessage.module.css";
import UserContext from "../context/user";
import { fetchData } from "../helpers/common";

const ChatMessage = (props) => {
  const userDetails = useContext(UserContext);
  const messageDetails = props.message;
  const [read, setRead] = useState(false);
  const [fromUser, setFromUser] = useState(
    messageDetails.msg_senderId._id == userDetails.user._id
  ); // compares the sender's id (of the message) with the user's id (from useContext)

  const readMessage = async () => {
    const { ok, data } = await fetchData(
      "/api/chats/" + messageDetails._id,
      "PATCH",
      {
        msg_isRead: true,
      }
    );

    if (ok) {
      setRead(true);
      props.setUnread(props.unread - 1);
      console.log("set read");
    } else {
      console.log("failed to set read");
    }
  };

  // function to handle checkbox's change
  const handleClick = () => {
    if (
      !fromUser &&
      // user cannot change their own checkbox
      userDetails.role.slice(5) != messageDetails.role.toLowerCase().slice(5)
    ) {
      // user cannot change checkbox of the own role (staff cannot set messages from other staff as read)
      readMessage();
      console.log(props.unread)
    }
  };

  // function to convert Date() object to 12h clock
  const formatAMPM = (date) => {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // to handle inline conditional styling
  var messageBoxStyling = {};

  // conditionally adds styles to the above variable
  if (fromUser) {
    messageBoxStyling["marginLeft"] = "auto";
  } else {
    messageBoxStyling["marginRight"] = "auto";
  }

  if (messageDetails.msg_fromNurse) {
    messageBoxStyling["borderColor"] = "#337E97";
    messageBoxStyling["backgroundColor"] = "#CCDFE5";
  } else {
    messageBoxStyling["borderColor"] = "#652C30";
    messageBoxStyling["backgroundColor"] = "#FEE2E4";
  }

  useEffect(() => {
    setRead(messageDetails.msg_isRead);
  }, []);

  return (
    <div className={styles["main-container"]}>
      <div
        className={styles["message-details"]}
        style={fromUser ? { marginLeft: "auto" } : { marginRight: "auto" }}
      >
        {
          // name only shows if the sender is not the user
          !fromUser ? (
            <div className={styles["sender"]}>
              {messageDetails.msg_senderId.firstName}{" "}
              {messageDetails.msg_senderId.lastName}
            </div>
          ) : (
            <div className={styles["sender"]}></div>
          )
        }
        <div className={styles["message-text"]} style={messageBoxStyling}>
          {messageDetails.msg_content}
        </div>
        <div className={styles["time-stamp"]}>
          <input
            type="checkbox"
            value="read"
            // it will be checked if isRead is true
            checked={read}
            // if isRead is true, the input will also be disabled
            disabled={read}
            onChange={handleClick}
          />
          {`   `}
          {formatAMPM(new Date(messageDetails.msg_timeSent))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
