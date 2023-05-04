import { Button } from "@chakra-ui/react";
import { listAtom } from "./state/atoms";
import { useRecoilState } from "recoil";

const ItemBtns = ({idx, type}) => {
  
  const [items, setItems] = useRecoilState(listAtom)

  const plusOne = (idx, type) => {
    if (type === 'daily') {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        let updateEpoch = Date.now()
        // let timeDeltaEpoch = updateEpoch - updatedItems[idx].lastUpdate
        // let timeDelta = new Date(timeDeltaEpoch)
        // console.log(timeDelta.getSeconds())
        updatedItems[idx] = { ...updatedItems[idx], streak: updatedItems[idx].streak + 1, lastUpdate: updateEpoch };
        return updatedItems;
      });
    } else if (type === 'weekly') {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        let updateEpoch = Date.now()
        // let timeDeltaEpoch = updateEpoch - updatedItems[idx].lastUpdate
        // let timeDelta = new Date(timeDeltaEpoch)
        // console.log(timeDelta.getSeconds())
        if (updatedItems[idx].weekData.weekStreak === updatedItems[idx].weekData.minObj -1) {
        updatedItems[idx] = { ...updatedItems[idx], streak: updatedItems[idx].streak + 1, };
        }
        updatedItems[idx] = { ...updatedItems[idx],  
          weekData: { 
            ...updatedItems[idx].weekData,
            weekStreak: updatedItems[idx].weekData.weekStreak + 1,
          },
          lastUpdate: updateEpoch };

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
      console.log(timeDelta.getSeconds())
      updatedItems[idx] = { ...updatedItems[idx], streak: 0, lastUpdate: updateEpoch };
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
    <>
    <Button onClick={() => plusOne(idx, type)}>+</Button>
      {/* <Button onClick={() => reset(idx)}>O</Button> */}
      <Button onClick={() => remove(idx)}>x</Button>
    </>
   );
}
 
export default ItemBtns;