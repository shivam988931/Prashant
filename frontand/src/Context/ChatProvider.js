// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// const ChatContext = createContext();
// const [user, setUser] = useState();
//   const history = useHistory();

// //   useEffect(() => {
// //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
// //     setUser(userInfo);
// // // if user is not logged in , it will redirected to the login page
// //     if (!userInfo) history.push("/");
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [history]);

// const ChatProvider = ({ children }) => {
//   return (
//         <ChatContext.Provider
//       value={{
//         // selectedChat,
//         // setSelectedChat,
//         user,
//         setUser,
//         // notification,
//         // setNotification,
//         // chats,
//         // setChats,
//       }}
//     >
     
//       {children}
//     </ChatContext.Provider>
//   );
// }
// export const ChatState = () => {
//     return useContext(ChatContext);
//   };
// export default ChatProvider;



import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
// if user is not logged in , it will redirected to the login page
    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
 