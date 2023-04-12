import { Box, Flex } from "@chakra-ui/react";
import TodoList from "../components/TodoList";
import MDRender from "../components/MDRender";

const Home = () => {
  return ( <Box position={'relative'} 
    display={'flex'} justifyContent={'center'}
  h='100%' w='100%'>
    <MDRender/>
    <TodoList/>
  </Box> );
}
 
export default Home;