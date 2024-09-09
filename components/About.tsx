import { Button, Flex, Heading, Image, Box, Stack, Text, AspectRatio, Spacer } from "@chakra-ui/react";

export default function About() {
  return (
    <Box bgColor="white" py={10} borderBottom={'1px'}>
      <Flex direction="row">
      <Flex px={8} pt={[10, 10, 0]} align={"start"} justify={"center"} width={"100%"} direction="column">
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
      </Flex> 
      {/* <Flex direction="column">
      <Image src="/IMG_4078.JPG" alt="profile" borderRadius="15px" boxShadow={"dark-lg"} m={10} mr={[null, null, 10]} mx="auto" width={"350px"}></Image>
      <Text>One of my favorite pictures, taken on a whale cruise from Newport Beach, LA</Text>
      
      </Flex> */}
      </Flex>
      </Box>
  );
}
