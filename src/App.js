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
      let storage = JSON.parse(localStorage.getItem('data'))
      if (storage.length > 0) {
        setList(storage)
      }
    }
    else {
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
    const today = new Date();
    const weekNumber = getWeek(today);
    if(localStorage.getItem('week') && localStorage.getItem('data') && list.length > 0) {
      // let storageWeek = localStorage.getItem('week')
      // let cleanWeeks = list.map(item => {
      //   if(item.type === 'weekly'){
      //     return {
      //       ...item,
      //       weekData: {
      //         ...item.weekData,
      //         week: [0,0,0,0,0,0,0]
      //       }
      //     }
      //   }
      //   return item;
      // })
      // return setList(cleanWeeks)
    } else {
      
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
      let twelveHrs = 60 * 60 * 24
      if(timeDelta > twelveHrs) {
        let idx = list.indexOf(item)
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
