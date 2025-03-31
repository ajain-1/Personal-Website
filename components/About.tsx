import { Button, Flex, Heading, Image, Box, Stack, Text, AspectRatio, Spacer, Icon } from "@chakra-ui/react";
import { IoHomeOutline, IoLocationOutline, IoMail, IoMailOutline } from "react-icons/io5";

export default function About() {
  return (
    <Box bgColor="white" borderBottom={'1px'} p={10}>
      <Flex direction={{base: "column", md: "row"}} gap={7}>
      <Flex px={8} pt={[10, 10, 0]} align={"start"} pl={0} justify={"center"} width={"100%"} direction="column">
        <Heading fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}>
          <Text as={"span"} color='black'>Aryan Jain</Text>
          <br />
          <Text bgClip={"text"} mt={3} fontSize="xl" color="black">
            Student & Software Developer | CS @ CMU
          </Text>{" "}
        </Heading>
        <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.700"} mt={4} maxW="550px">
          Passionate about ML and Robotics. Experienced in Software Development. Always building something new.
        </Text>
        <Flex align="center" mt={6}>
          <Icon as={IoMailOutline} boxSize={"1.5em"} color="black"></Icon>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"blue.500"} ml={3}>
          <a href="mailto:aryanj@andrew.cmu.edu">aryanj@andrew.cmu.edu</a>
          </Text>
        </Flex>
        <Flex align="center" mt={2}>
          <Icon as={IoHomeOutline} boxSize={"1.5em"} color="black"></Icon>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.700"} ml={3}>Los Angeles, CA
          </Text>
        </Flex>
      </Flex> 

      <Image 
        src="/image3.png"  
        alt="profile" 
        borderRadius="0px" 
        mx="auto" 
        width={300} 
        objectFit={"cover"} 
        display={{ base: "none", md: "block" }} 
        mr={-7}
      />
      {/* <Image src="/IMG_20132.png" display={{ base: "none", md: "block" }}  alt="profile" borderRadius="0px" mx="auto" width={{md: "250px", base: "400px"}} objectFit={"cover"}></Image>
       */}
      </Flex>
      </Box>
  );
}
