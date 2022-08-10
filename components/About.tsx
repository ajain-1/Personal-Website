import {
    Button,
    Flex,
    Heading,
    Image,

    Stack,
    Text,
 
  } from '@chakra-ui/react';
  
  export default function About() {
    return (
      <Stack direction={{ base: 'column', md: 'row' }} bgColor='gray.100' h={[null, null, "50vh"]}>
        <Flex p={8} align={'center'} justify={'center'} flex={1} justifyContent='start' minW={'50vw'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                
                >
                Aryan Jain
              </Text>
              <br />
              <Text  bgGradient="linear(to-r, blue.400,purple.900)" bgClip={'text'} mt={3} fontSize='2xl'>
                Student & Software Developer
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Passionate about AI, Robotics, and Entrepreneurship. Experienced in Cloud and Web Development. Always building something new.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <a href='mailto:ajain.mss@gmail.com?body=%0D%0A%0D%0A'>
              <Button
              width={'100%'}
                borderRadius={'10px'}
                bg={'blue.800'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
               Contact
              </Button>
              </a>
              
              <a href='https://www.linkedin.com/in/aryanjain1/'>
              <Button borderRadius={'10px'} bgColor='black' color={'white'} width="100%" _hover={{bgColor: 'white', color: 'black'}}>
                Linkedin
              </Button>
              </a>
              
    
            </Stack>
          </Stack>
        </Flex>
        <Flex p='12'>
        <Image src='/IMG_9066.jpg' alt='profile' borderRadius='20px' boxShadow={'dark-lg'} objectFit="contain" h='full'></Image>
        </Flex>
      </Stack>

    
    );
  }