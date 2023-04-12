import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
const MDRender = () => {
  
  const [text, setText] = useState('')

  const getTodo = (text) => {
    const startIdx = text.indexOf('# TO DO:') + 8
    const endIdx = text.indexOf('# WARNING')
    return text.slice(startIdx, endIdx)
  }

  const getReadme = () => {
    fetch('https://api.github.com/repos/maxfer03/streaker/contents/README.md')
    .then(response => response.json())
    .then(data => {
      const content = atob(data.content);
      setText(getTodo(content));
    })
    .catch(error => console.error(error));
  }
  
  useEffect(() => {
    if(text.length < 1) {
      getReadme()
    }
  }, [text])
  
  

  return ( <Box position={'absolute'} left={0} 
  display={{sm: 'none', md: 'flex'}} flexDir={'column'}
  width={'250px'}>
    <Heading mb={'25px'}> To Do: </Heading>
    <ReactMarkdown>
      {text}
    </ReactMarkdown> 
  </Box>);
}
 
export default MDRender;