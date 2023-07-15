import { Box, Button, Heading, Input, List, ListItem } from "@chakra-ui/react";
import { listAtom } from "./state/atoms";
import { useRecoilState } from "recoil";
import ItemBtns from "./ItemBtns";
import { wait, today} from "./utils/functions";
import { WEEKDAYS } from "./utils/const";
const WeeklyItem = ({idx}) => {
  const [items, setItems] = useRecoilState(listAtom)



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


  return ( 
    <ListItem mb={'15px'} position={'relative'} id={`list-item-${idx}`} key={idx} display={'flex'} alignItems={'center'} gap={'10px'}>
        <Input w={'full'}  onKeyDown={(e) => handleEnter(e)} value={items[idx].name} onChange={(e) => handleChange(e, idx)}/>
        <Box className="weekdays" h={'1/2'} position={'absolute'} top={'42.5px'}
        display={'flex'} gap={'5px'}
        >
          {Array.from({ length: 7 }, (_, i) => 
            <Box className={`weekday ${items[idx].weekData.week[i] === 1 ? 'active' : ''}`} key={i} h='20px' w={'20px'} rounded={'full'}
            borderColor={WEEKDAYS.indexOf(today()) === i ? "blue.200" : 'gray.200'} borderWidth={'1px'}
            bg={ items[idx].weekData.week[i] === 1 ? 'green.200' : ''}
            />
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