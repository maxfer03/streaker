import { Box, Button, Heading, Input, List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [items, setItems]= useState([])

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

  const plusOne = (idx) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[idx] = { ...updatedItems[idx], streak: updatedItems[idx].streak + 1 };
      return updatedItems;
    });
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
    </List>
    <Button mt={'10px'} onClick={addItem}>+</Button>
  </Box> );
}
 
export default TodoList;