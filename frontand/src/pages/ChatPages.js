// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const ChatPages = () => {
//   const [chats, setChats] = useState([]);
//   const fetchChats = async () => {
//     const {data} = await axios.get("/api/chats");
//     setChats(data);
//     console.log(data);
//   };
//   useEffect(() => {
//     fetchChats();
//   }, []);
      
//   return (
//     <div >
//       {chats.map((chat) => {
//        return ( <div key={chat._id}>{chat.chatName}</div>) 
//       }
      
//       )}
      
//     </div>
//   );
// };

// export default ChatPages;



import { Box } from "@chakra-ui/layout";
import { useState } from "react";
// import Chatbox from "../components/Chatbox";
// import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false); 
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
     
      
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;

