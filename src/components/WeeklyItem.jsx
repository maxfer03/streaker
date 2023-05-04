import { Box, Button, Heading, Input, List, ListItem } from "@chakra-ui/react";
import { listAtom } from "./state/atoms";
import { useRecoilState } from "recoil";
import ItemBtns from "./ItemBtns";

const WeeklyItem = ({idx}) => {
  const [items, setItems] = useRecoilState(listAtom)
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function wait() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5);
    });
  }

  const handleEnter = async (e) => {
    if (e.keyCode === 13) {
      setItems(() => [...items, {name: '', streak: 0, type: 'daily', max: 0, lastUpdate: Date.now() }])
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

  const today = () => {
    const today = new Date();
    const dayOfWeek = weekdays[today.getDay()];
    return dayOfWeek
  }

  return ( 
    <ListItem mb={'15px'} position={'relative'} id={`list-item-${idx}`} key={idx} display={'flex'} alignItems={'center'} gap={'10px'}>
        <Input w={'full'}  onKeyDown={(e) => handleEnter(e)} value={items[idx].name} onChange={(e) => handleChange(e, idx)}/>
        <Box h={'1/2'} position={'absolute'} top={'42.5px'}
        display={'flex'} gap={'5px'}
        >
          {Array.from({ length: 7 }, (_, i) => 
            <Box key={i} h='20px' w={'20px'} rounded={'full'}
            borderColor={weekdays.indexOf(today()) === i ? "blue.200" : 'gray.200'} borderWidth={'1px'}/>
          )}
        </Box>
      <Box w={'100px'}
      textAlign={'center'}
      fontSize={'25px'}
      >{items[idx].weekData.weekStreak}/{items[idx].weekData.minObj}/{items[idx].streak}</Box> 
      <ItemBtns idx={idx} type='weekly'/>
    </ListItem>
   );
}
 
export default WeeklyItem;