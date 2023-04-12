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
  

  useEffect(() => {
    if(localStorage.getItem('data') && items.length < 1) {
      let storage = JSON.parse(localStorage.getItem('data'))
      console.log(storage.length)
      if (storage.length > 1) {
        setItems(storage)
      }
    }
    else {
      localStorage.setItem('data', JSON.stringify(items))
    }
  }, [items])

  const addItem = () => {
    setItems(() => [...items, {name: '', streak: 0}])
  }


  const handleEnter = async (e) => {
    if (e.keyCode === 13) {
      addItem()
      await wait();
      let lastIndex = items.length
      let lastItemInput = document.querySelector(`#list-item-${lastIndex} > input`)
      console.log(lastItemInput)
      lastItemInput.focus()
    }
  }

  const handleChange = (e, idx) => {
    const { value } = e.target;
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[idx] = { ...updatedItems[idx], name: value };
      return updatedItems;
    });
  };

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

  const remove = (idx) => {
    setItems((prevItems) => {
      if(prevItems.length > 1) {
        const updatedItems = [...prevItems];
        updatedItems.splice(idx, 1)
        return updatedItems;
      }
      localStorage.removeItem('data')
      return []
    });
  }


  return ( <Box display={'flex'} flexDir={'column'} alignItems={'center'}
   w={{sm: '100%', md: '50%', lg: '25%'}}
   borderWidth={'0px'} borderColor={'black'}>
    <Heading mb={'25px'}>Streaker</Heading>
    <List display={'flex'} flexDir={'column'} gap={'10px'}>
<<<<<<< HEAD
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
=======
      {items.map((item, idx) => { return (
        <ListItem id={`list-item-${idx}`} key={idx} display={'flex'} alignItems={'center'} gap={'10px'}>
         <Input onKeyDown={(e) => handleEnter(e)} value={item.name} onChange={(e) => handleChange(e, idx)}/> 
         <Box w={'100px'}
         textAlign={'center'}
         fontSize={'25px'}
         >{item.streak}</Box> 
         <Button onClick={() => plusOne(idx)}>+</Button>
         <Button onClick={() => remove(idx)}>x</Button>

        </ListItem>
      )})}
>>>>>>> d22dd77 (can remove items)
    </List>
    <Box mt={'10px'} display={'flex'} gap={'10px'} flexWrap={'wrap'} >
      <Button  onClick={() => addDaily()}>Daily</Button>
      <Button  onClick={() => addWeekly()}>Weekly</Button>
    </Box>
  </Box> );
}
 
export default TodoList;