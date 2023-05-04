import { Box, Button, Heading, Input, List, ListItem } from "@chakra-ui/react";
import { listAtom } from "./state/atoms";
import { useRecoilState } from "recoil";
import ItemBtns from "./ItemBtns";

const DailyItem = ({idx}) => {
  const [items, setItems] = useRecoilState(listAtom)

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

  return ( 
    <ListItem id={`list-item-${idx}`} key={idx} display={'flex'} alignItems={'center'} gap={'10px'}>
      <Input onKeyDown={(e) => handleEnter(e)} value={items[idx].name} onChange={(e) => handleChange(e, idx)}/> 
      <Box w={'100px'}
      textAlign={'center'}
      fontSize={'25px'}
      >{items[idx].streak}</Box> 
      <ItemBtns type='daily' idx={idx}/>
    </ListItem>
   );
}
 
export default DailyItem;