import React, {  useEffect } from "react";
import { Container, Box, Text ,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentications/Login"
import Signup from "../components/Authentications/Signup"


// import ChatPages from "./ChatPages";
import { useHistory } from "react-router-dom";

const HomePages = () => {
  const history=useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
 
    if (user) history.push("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  return (
    <>
   
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="works-sans" color="blue">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" pd={4} w="100%" borderRadius="lg" borderWidth="1px" color="black">
        <Tabs variant="soft-rounded" >
          <TabList mb="1em">
            <Tab width="50%" fontSize="2xl" fontFamily="works-sans"  color="black">Login</Tab>
            <Tab width="50%" fontSize="2xl" fontFamily="works-sans"  color="black" >Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Login/>
            </TabPanel>
            <TabPanel>
            <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </>
  );
};

export default HomePages;



