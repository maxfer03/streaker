import { Box, Button, Heading, Input, List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import WeeklyItem from "./WeeklyItem";
import DailyItem from "./DailyItem";
import { listAtom } from "./state/atoms";
import { useRecoilState } from "recoil";


const TodoList = () => {
  const [items, setItems] = useRecoilState(listAtom)

  function wait() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5);
    });
  }


  const addDaily = () => {
    setItems(() => [...items, {name: '', streak: 0, type: 'daily', max: 0, lastUpdate: Date.now() }])
  }

  const addWeekly = () => {
    setItems(() => [...items, 
      {
        name: '', 
        streak: 0, 
        type: 'weekly', 
        max: 0, 
        lastUpdate: Date.now(), 
        weekData: {
          week: [0,0,0,0,0,0,0],
          weekStreak: 0,
          minObj: 3
        } 
      }
    ])

  }


  return ( <Box display={'flex'} flexDir={'column'} alignItems={'center'}
   w={{sm: '100%', md: '50%', lg: '25%'}}
   borderWidth={'0px'} borderColor={'black'}>
    <Heading mb={'25px'}>Streaker</Heading>
    <List display={'flex'} flexDir={'column'} gap={'10px'}>
      {items.map((item, idx) => 
        { 
          if (item.type === 'daily') {
            return (
              <DailyItem idx={idx} />
            )
          } else if (item.type === 'weekly') {
            return (
              <WeeklyItem idx={idx}/>
            )
          }
        })
      }
    </List>
    <Box mt={'10px'} display={'flex'} gap={'10px'} flexWrap={'wrap'} >
      <Button  onClick={() => addDaily()}>Daily</Button>
      <Button  onClick={() => addWeekly()}>Weekly</Button>
    </Box>
  </Box> );
}
 
export default TodoList;