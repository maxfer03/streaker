import React, { useEffect } from 'react';
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
import { useRecoilState } from 'recoil';
import { listAtom } from './components/state/atoms';

function App() {

  const [list, setList] = useRecoilState(listAtom)

  useEffect(() => {
    if(localStorage.getItem('data') && list.length === 0) {
      console.log('faffer')
      let storage = JSON.parse(localStorage.getItem('data'))
      console.log(storage.length)
      if (storage.length > 0) {
        setList(storage)
      }
    }
    else {
      console.log(list)
      checkTimes()
      localStorage.setItem('data', JSON.stringify(list))
    }

    checkWeek()
  })

  const getWeek = (date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  }

  const checkWeek = () => {
    if(localStorage.getItem('week')) {
      console.log('olis')
    } else {
      const today = new Date();
      const weekNumber = getWeek(today);
      console.log('Week number:', weekNumber);
      localStorage.setItem('week', weekNumber)
    }
  }
  

  const checkTimes = () => {
    for(let item of list) {
      let lastUpdate = item.lastUpdate
      let now = Date.now()
      // let timeDeltaEpoch = new Date(now - lastUpdate)
      let timeDeltaEpoch = now - lastUpdate
      let timeDelta = timeDeltaEpoch / 1000
      console.log('segundos pasados: ', timeDelta)
      let twelveHrs = 60 * 60 * 24
      if(timeDelta > twelveHrs) {
        let idx = list.indexOf(item)
        console.log(idx)
        const updatedItems = [...list];
        updatedItems[idx] = { ...updatedItems[idx], streak: 0, lastUpdate: Date.now() };
        setList(updatedItems)
      }
    }
  }

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
