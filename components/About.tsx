import { Button, Flex, Heading, Image, Box, Stack, Text, AspectRatio, Spacer } from "@chakra-ui/react";

export default function About() {
  return (
    <Flex direction={{ base: "column", md: "row" }} bgColor="#111" py={10} border={"5px"} borderEndColor={'white'}>
      <Flex px={8} pt={[10, 10, 0]} align={"start"} justify={"center"} width={"100%"} direction="column">
        <Heading fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}>
          <Text as={"span"} color='white'>Aryan Jain</Text>
          <br />
          <Text bgClip={"text"} mt={3} fontSize="xl" color="white">
            Student & Software Developer | Carnegie Mellon SCS
          </Text>{" "}
        </Heading>
        <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.200"} my={4} maxW="550px">
          Passionate about ML and Robotics. Experienced in Software Development. Always building something new.
        </Text>
        <Stack direction={"row"} spacing={4}>
          <a href="mailto:aryanj@andrew.cmu.edu?body=%0D%0A%0D%0A">
            <Button
              width={"100%"}
              borderRadius={"10px"}
              bg="gray.800"
              color="white"
              _hover={{
                bg: "gray.900"
              }}>
              Contact
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/aryanjain1/">
            <Button borderRadius={"10px"} width="100%" bg="gray.800"
              color="white"
              _hover={{
                bg: "gray.900"
              }}>
              Linkedin
            </Button>
          </a>
          <a href="https://www.github.com/ajain-1">
            <Button borderRadius={"10px"} width='100%' bg="gray.800"
              color="white"
              _hover={{
                bg: "gray.900"
              }}>
              Github
            </Button>
          </a>
        </Stack>
      </Flex>
      {/* <Image src="/IMG_7517.png" alt="profile" borderRadius="15px" boxShadow={"dark-lg"} m={10} mr={[null, null, 10]} mx="auto" width={"250px"}></Image> */}
    </Flex>
  );
}
