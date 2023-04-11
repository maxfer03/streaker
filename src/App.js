import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Home from './views/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Grid minH="100vh" p={10}>
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          <Home/>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
