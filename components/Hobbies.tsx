import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

export default function Hobbies() {
  return (
    <Box px={[5, 5, 10]} py={5}>
        <Heading fontSize={'2xl'} mb={5}>Hobbies</Heading>
    
        <Text fontSize={'lg'}>In my free time, I like to keep up with the NBA (go Bucks!) and play basketball. I've also played AYSO soccer for 7 years. Outside of sports, I try to bake something new every few weeks and do some investing on the side. Lastly, one of my favorite hobbies (sorry, this might sound boring) is just exploring new tech frameworks, contributing to open source projects, and hunting for new tech startup ideas. I'm always developing some or the other project and on the lookout for new ideas to build.</Text>
    </Box>
  )
}
