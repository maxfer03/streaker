import { Button, Box } from "@chakra-ui/react";
import { listAtom } from "./state/atoms";
import { useRecoilState } from "recoil";
import { wait, today} from "./utils/functions";
import { WEEKDAYS } from "./utils/const";
import { AddIcon, CloseIcon, RepeatIcon } from "@chakra-ui/icons";

const ItemBtns = ({idx, type}) => {
  
  const [items, setItems] = useRecoilState(listAtom)

  const plusOne = (idx, type) => {
    if (type === 'daily') {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        let updateEpoch = Date.now()
        // let timeDeltaEpoch = updateEpoch - updatedItems[idx].lastUpdate
        // let timeDelta = new Date(timeDeltaEpoch)
        updatedItems[idx] = { ...updatedItems[idx], streak: updatedItems[idx].streak + 1, lastUpdate: updateEpoch };
        return updatedItems;
      });
    } else if (type === 'weekly') {
      setItems((prevItems) => {
        let updatedItems = [...prevItems];
        let updateEpoch = Date.now()
        // let timeDeltaEpoch = updateEpoch - updatedItems[idx].lastUpdate
        // let timeDelta = new Date(timeDeltaEpoch)
        const weekStreak = updatedItems[idx].weekData.weekStreak
        const nextStreakVal = weekStreak + 1
        const weekMin = updatedItems[idx].weekData.minObj
        if (nextStreakVal % weekMin === 0) {
          updatedItems[idx] = { ...updatedItems[idx], streak: updatedItems[idx].streak + 1 };


        }
        const todayIndex = WEEKDAYS.indexOf(today())
        let updatedWeek = [...updatedItems[idx].weekData.week]
        updatedWeek[todayIndex] = 1
        const hasCompletedWeekMin = () => {
          if (weekStreak % weekMin === 0 && weekStreak !== 0) {
            let resetWeek = [0, 0, 0, 0, 0, 0, 0]
            resetWeek[todayIndex] = 1
            return resetWeek
          }
          return updatedWeek
        }
        updatedItems[idx] = { ...updatedItems[idx],  
          weekData: { 
            ...updatedItems[idx].weekData,
            weekStreak: updatedItems[idx].weekData.weekStreak + 1,
            week: hasCompletedWeekMin()
          },
          lastUpdate: updateEpoch 
        };
        

        return updatedItems;
      });
    }
  }

  const reset = (idx) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      let updateEpoch = Date.now()
      let timeDeltaEpoch = updateEpoch - updatedItems[idx].lastUpdate
      let timeDelta = new Date(timeDeltaEpoch)
      updatedItems[idx] = { ...updatedItems[idx], streak: 0, lastUpdate: updateEpoch };
      if(updatedItems[idx].type === 'weekly') {
        updatedItems[idx].weekData = {...updatedItems[idx].weekData, weekStreak: 0}
      }
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
  return ( 
    <Box pos={'relative'} display={'flex'} justifyContent={'space-between'}>
      <Button w={'10%'} onClick={() => plusOne(idx, type)}> <AddIcon/> </Button>
      <Button w={'10%'} onClick={() => remove(idx)}> <CloseIcon/> </Button>
      <Button w={'10%'} onClick={() => reset(idx)}
      pos={'absolute'} right={'-75px'}
      > <RepeatIcon/> </Button>
    </Box>
   );
}
 
export default ItemBtns;