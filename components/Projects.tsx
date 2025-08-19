import { Box, Center, Modal, ModalOverlay, Flex, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Heading, Text, Badge, Stack, Avatar, useColorModeValue, Image, SimpleGrid, ListItem, useDisclosure, List, UnorderedList, HStack, chakra, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import projects from "./projects.json";
import IMG from "next/legacy/image";
import { ChakraNextImage } from "./ChakraImg";

export default function Projects() {
  return (
  <Box px={[5, 5, 10]} py={5}>
      <Heading fontSize={"2xl"} mb={7}>
        Projects
      </Heading>
      {/* <Text fontSize={"xl"} mb={4} fontWeight={600} id="ai">
        Artificial Intelligence / Machine Learning
      </Text> */}
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {projects.ai.map(({ name, year, description, images, imageDescriptions }) => (
          <Box key={name} h="100%">
            <Project name={name} year={year} description={description} images={images} idesc={imageDescriptions}></Project>
          </Box>
        ))}
      </SimpleGrid>
      {/* <Text fontSize={"lg"} pt={5} mb={4} fontWeight={500} id="software">
        Software Development
      </Text>
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {projects.software.map(({ name, year, description, images, imageDescriptions, links }) => (
          <Box key={name} h="100%">
            <Project name={name} year={year} description={description} images={images} idesc={imageDescriptions} links={links}></Project>
          </Box>
        ))}
      </SimpleGrid> */}
      {/* <Text fontSize={"xl"} pt={10} mb={4} fontWeight={600} id="more">
        Software Development
      </Text> */}
      <SimpleGrid columns={[1, 1, 2]} spacing={4} mt={4}>
        {projects.cloud.map(({ name, year, description, images, imageDescriptions, links }) => (
          <Box key={name} h="100%">
            <Project name={name} year={year} description={description} images={images} idesc={imageDescriptions} links={links}></Project>
          </Box>
        ))}
      </SimpleGrid>
      {/* <Text fontSize={"xl"} pt={10} mb={4} fontWeight={600} id="robotics">
        Robotics
      </Text> */}
      <SimpleGrid columns={[1, 1, 2]} spacing={4} mt={4}>
        {projects.robotics.map(({ name, year, description, images, imageDescriptions }) => (
          <Box key={name} h="100%">
            <Project name={name} year={year} description={description} images={images} idesc={imageDescriptions}></Project>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

function Project(props: { name: string; year: string; description: Array<String>; images: Array<String>; idesc: Array<string>; links?: Array<string> }) {
  const { name, year, description, images, idesc, links } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setimage] = useState({
    src: "",
    desc: "",
  });

  function handleImageClick(e: React.MouseEvent) {
    let path: string = e.currentTarget.getAttribute("alt") || "";
    setimage({ src: path, desc: idesc[images.indexOf(path)] });
    onOpen();
  }

  return (
    <Box minH={"260px"} w={"full"} bgColor="gray.50" border="1px" p={6} h="full">
      <Stack spacing={4} direction="column">
        <Stack direction={"row"} spacing={0}>
          <Text fontWeight={600} fontSize="lg" textColor="black">
            {name}
          </Text>
          <Spacer />
          {/* {year ? (
            <Badge variant={"solid"} maxH="20px">
              {year}
            </Badge>
          ) : null} */}
          {/* <Text bgColor={'gray.900'} textColor='white' borderRadius='0px' px='2' py={1}>{year}</Text> */}
        </Stack>
        <UnorderedList px={3}>
          {description.map((desc?: any) => (
            <ListItem key={desc} fontSize={"sm"} textColor="black">
              {desc}
            </ListItem>
          ))}
        </UnorderedList>
        {images.length >= 1 ? (
          <Flex flexDirection={"row"} className={"container"} overflowX="scroll">
            {images.map((imageUrl: any) => (
              <Flex key={imageUrl} mr={3} minW="70px" minH={"70px"} border="5px" borderColor={"white"}>
                <IMG
                  src={imageUrl}
                  style={{ borderRadius: "0px" }}
                  objectFit="cover"
                  width={70}
                  height={70}
                  alt={imageUrl}
                  className="image"
                  onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
                    if (links?.[images.indexOf(imageUrl)]) {
                      window.open(links?.[images.indexOf(imageUrl)], "_blank");
                    } else {
                      handleImageClick(e);
                    }
                  }}></IMG>
              </Flex>
            ))}
          </Flex>
        ) : null}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} allowPinchZoom={true} size="2xl" isCentered={true} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent borderRadius='0px' bgClip={"content-box"} flexShrink={1}>
          <Box pt={5}>
            {/* <IMG quality={50} src={image.src} alt='project image' width='1000px' height='500px' priority objectFit='contain'></IMG>
             */}
            <ChakraNextImage src={image.src} alt="project image" width={700}  height={500}></ChakraNextImage>
            <Text p={5}>{image.desc}</Text>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
}
