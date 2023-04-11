import { Box, Flex } from "@chakra-ui/react";
import TodoList from "../components/TodoList";

const Home = () => {
  return ( <Box display={'flex'} justifyContent={'center'}
  h='100%' w='100%'>
    <TodoList/>
  </Box> );
}
 
export default Home;