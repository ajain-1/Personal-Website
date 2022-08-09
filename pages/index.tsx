import { Box, Flex, Heading, HStack,Button, Icon, VStack, Text, Spacer, Show, Hide } from '@chakra-ui/react'
import {IoSchoolOutline, IoGridOutline, IoMenuOutline, IoList , IoStarOutline, IoBriefcaseOutline, IoPersonOutline, IoMenu} from 'react-icons/io5'
import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import About from '../components/About'
import Experience from '../components/Experience'
import Activities from '../components/Activities'


const Home: NextPage = () => {

  const [menu, setMenu] = useState(false)

  const links = [{
    link: 'about',
    title: 'About',
    icon: IoPersonOutline,
  },{
    link: 'experience',
    title: 'Experience',
    icon: IoBriefcaseOutline,
  },
  {
    link: 'academic',
    title: 'Activities',
    icon: IoList,
  }, 
  {
    link: 'projects',
    title: 'Projects',
    icon: IoGridOutline,
  },

  {
    link: 'honors',
    title: 'Honors & Academics',
    icon: IoStarOutline,
  } ]

  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
    <Flex maxH={'100vh'}>
      <Hide below='md'>
      <Flex w={'20vw'} flexDir='column' h='100vh' bgColor={'#1b2432'} p="5" pt={8} color={'white'}>
          {/* <Heading fontSize={'3xl'} ml={4} mb="7" fontWeight={'900'}>Aryan Jain</Heading> */}
          <VStack spacing={3}>
            {links.map(({ link, title, icon }) => (
            // eslint-disable-next-line
            <Flex key={link} w='full' h='50px' _hover={{ backgroundColor: 'white', color: 'black' }} borderRadius='10px' align={'center'} onClick={() => {scrollIntoView(link)}}>
              <Icon as={icon} mx="4" boxSize={'1.5em'}></Icon>
              <Text fontSize="lg" fontWeight={'600'}>{title}</Text>
            </Flex>
            ))}
          </VStack>
          <Spacer/>
          <a href='mailto:ajain.mss@gmail.com'>
            <Button bgColor={'white'} color='black' w='100%' _hover={{bgColor: 'gray.600', color:'white'}}>Contact</Button>
          </a>
      </Flex>
      </Hide>
      <Flex flex={1} h='100vh' bgColor='F1ECCE' flexDir={'column'} overflow='scroll'>
      <Show below='md'>
      <Box w='full' h='50px' pl={5}>
        <Icon as={IoMenuOutline} boxSize={'3em'} onClick={() => {
          setMenu(!menu);
          
        }}></Icon>

        {menu ? <Flex w={'70vw'} zIndex={1} position='absolute' top={0} left={0} flexDir='column' h='100vh' bgColor={'#1b2432'} p="5" pt={8} color={'white'}>
          {/* <Heading fontSize={'3xl'} ml={4} mb="7" fontWeight={'900'}>Aryan Jain</Heading> */}
          <VStack spacing={3}>
            {links.map(({ link, title, icon }) => (
            <Flex key={link} w='full' h='50px' _hover={{ backgroundColor: 'white', color: 'black' }} borderRadius='10px' align={'center'} onClick={() => {setMenu(!menu); scrollIntoView(link)}}>
              <Icon as={icon} mx="4" boxSize={'1.5em'}></Icon>
              <Text fontSize="lg" fontWeight={'600'}>{title}</Text>
            </Flex>
            ))}
          </VStack>
          <Spacer/>
          <a href='mailto:ajain.mss@gmail.com'>
            <Button bgColor={'white'} color='black' w='100%' _hover={{bgColor: 'gray.600', color:'white'}}>Contact</Button>
          </a>
      </Flex> : null}
      </Box>
      </Show>
        <Box id='about'>
          <About/>
        </Box>
        <Box id='experience'>
          <Experience></Experience>
        </Box>

        <Box id='academic'>
          <Activities></Activities>
        </Box>
             
      </Flex>
    </Flex>
  )
}

export default Home
