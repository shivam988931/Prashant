
import './App.css';
// import { Button } from '@chakra-ui/react'
import {Route} from "react-router-dom";
import HomePages from "./pages/HomePages";
import ChatPages from "./pages/ChatPages";

function App() {
  
  return (
    <div className="App">
    
        <Route path="/" component={HomePages} exact/>
        <Route path="/chats" component={ChatPages}/>
       {/* <Button colorScheme='teal' variant='link' >button</Button> */}
     
    </div>
  );
}

export default App;
