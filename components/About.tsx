import { Button, Flex, Heading, Image, Box, Stack, Text, AspectRatio, Spacer } from "@chakra-ui/react";

export default function About() {
  return (
    <Flex direction={{ base: "column", md: "row" }} bgColor="gray.100">
      <Flex px={8} pt={[10, 10, 0]} align={"start"} justify={"center"} width={"100%"} direction="column">
        <Heading fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}>
          <Text as={"span"}>Aryan Jain</Text>
          <br />
          <Text bgClip={"text"} mt={3} fontSize="xl">
            Student & Software Developer | Carnegie Mellon SCS '27
          </Text>{" "}
        </Heading>
        <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"} my={4} maxW="550px">
          Passionate about ML and Robotics. Experienced in Software Development. Always building something new.
        </Text>
        <Stack direction={"row"} spacing={4}>
          <a href="mailto:ajain.mss@gmail.com?body=%0D%0A%0D%0A">
            <Button
              width={"100%"}
              borderRadius={"10px"}
              bg={"blue.800"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}>
              Contact
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/aryanjain1/">
            <Button borderRadius={"10px"} bgColor="black" color={"white"} width="100%" _hover={{ bgColor: "white", color: "black" }}>
              Linkedin
            </Button>
          </a>
        </Stack>
      </Flex>
      <Image src="/pfp2.JPEG" alt="profile" borderRadius="15px" boxShadow={"dark-lg"} m={10} mr={[null, null, 10]} mx="auto" width={"350px"}></Image>
    </Flex>
  );
}
