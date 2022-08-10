import { Box,
    Center,
    Modal,
    ModalOverlay,
    Flex,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Text,
    Badge,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
    SimpleGrid,
    ListItem,
    useDisclosure,
    List,
    UnorderedList, 
    HStack,
    Spacer} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import projects from './projects.json'

export default function Projects() {

  return (
    <Box px={10} py={5}>
        <Heading fontSize={'2xl'} mb={5}>Projects</Heading>
        <Text fontSize={'lg'} pt={0} mb={4} fontWeight={500}>Robotics</Text>
            <SimpleGrid columns={[1, 1, 2]} spacing={4}>
                {projects.robotics.map(({ name, year, description, images, imageDescriptions }) => (
                    <Box key={name} h='100%'>
                        <Project name={name} year={year} description={description} images={images} idesc={imageDescriptions}></Project>
                    </Box>
                ))}
            </SimpleGrid>
        <Text fontSize={'lg'} pt={5} mb={4} fontWeight={500}>Artificial Intelligence</Text>
        <SimpleGrid columns={[1, 1, 2]} spacing={4}>
                {projects.ai.map(({ name, year, description, images, imageDescriptions }) => (
                    <Box key={name} h='100%'>
                        <Project name={name} year={year} description={description} images={images} idesc={imageDescriptions}></Project>
                    </Box>
                ))}
            </SimpleGrid>
        <Text fontSize={'lg'} pt={5} mb={4} fontWeight={500}>Software Development</Text>
        <Text fontSize={'lg'} pt={5} mb={4} fontWeight={500}>Cloud Development</Text>
   </Box>
  )
}

function Project(props: { name: string; year: string; description: Array<String>; images: Array<String>; idesc: Array<string> }) {
    const { name, year, description, images, idesc } = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [image, setimage] = useState({
        src: '',
        desc: ''
    })

    function handleImageClick(e: React.MouseEvent) {
        let path : string = e.currentTarget.getAttribute('src') || ''
        setimage({src: path, desc: idesc[images.indexOf(path)]})
        onOpen()
    }

    return (
        
        <Box
        w={'full'}
        bgColor='gray.100'
        borderRadius='10px'
        p={6}
        h='full'
        >
        <Stack spacing={4} direction='column'>
          <Stack direction={'row'} spacing={0}>
            <Text fontWeight={600} fontSize='lg'>{name}</Text>
            <Spacer />
            <Badge variant={'solid'} maxH='20px'>{year}</Badge>
            {/* <Text bgColor={'gray.900'} textColor='white' borderRadius='10px' px='2' py={1}>{year}</Text> */}
          </Stack>
        <UnorderedList px={3}>
        
        {
            description.map((desc?: any) => (
                <ListItem key={desc} fontSize='0.9em'>{desc}</ListItem>
            ))
        }
        </UnorderedList>
        <HStack spacing={3} w='100%' overflowX='scroll' overflowY={'visible'} h={'80px'}>
        {
            images.map((imageUrl: any) => (
                <Image style={{borderRadius: '10px'}} key={imageUrl} src={imageUrl} width='70px' height={'70px'} objectFit='initial' alt='project image' className='image' onClick={(e) => {handleImageClick(e)}}></Image>
            ))
        }
        </HStack>
        </Stack>
        

        <Modal isOpen={isOpen} onClose={onClose} allowPinchZoom={true}>
        <ModalOverlay />
        <ModalContent borderRadius={'10px'}>
        <Image src={image.src} alt='project image' style={{borderRadius: 'inherit'}} objectFit='contain'></Image>
        <Text p={5}>{image.desc}</Text>
        </ModalContent>
       
      </Modal>
      </Box>
      
    )
}
