import { Box, Button, Heading, Input, List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [items, setItems]= useState([])

  useEffect(() => {
    if(localStorage.getItem('data') && items.length < 1) {
      setItems(JSON.parse(localStorage.getItem('data')))
    }
    else {
      localStorage.setItem('data', JSON.stringify(items))
    }
  }, [items])

  const addItem = () => {
    setItems(() => [...items, {name: '', streak: 0}])
  }

  const handleChange = (e, idx) => {
    const { value } = e.target;
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[idx] = { ...updatedItems[idx], name: value };
      return updatedItems;
    });
  };

  const plusOne = (streak, idx) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[idx] = { ...updatedItems[idx], streak: streak++ };
      return updatedItems;
    });
  }


  return ( <Box display={'flex'} flexDir={'column'} alignItems={'center'}
   w={{sm: '100%', md: '50%', lg: '25%'}}
   borderWidth={'0px'} borderColor={'black'}>
    <Heading mb={'25px'}>Streaker</Heading>
    <List display={'flex'} flexDir={'column'} gap={'10px'}>
      {items.map((item, idx) => { return (
        <ListItem key={idx} display={'flex'} alignItems={'center'} gap={'10px'}>
         <Input value={item.name} onChange={(e) => handleChange(e, idx)}/> <Box>{item.streak}</Box> <Button onClick={() => plusOne(item.streak, idx)}>+</Button>
        </ListItem>
      )})}
    </List>
    <Button mt={'10px'} onClick={addItem}>+</Button>
  </Box> );
}
 
export default TodoList;