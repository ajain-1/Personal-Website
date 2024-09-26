import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Hobbies() {
  return (
    <Box px={[5, 5, 10]} py={5}>
      <Heading fontSize={"2xl"} mb={5}>
        Hobbies
      </Heading>

      <Text fontSize={"lg"}>
        In my free time, I like to keep up with the NBA and play basketball. I've also played soccer for many years (7 seasons at AYSO). Outside of sports, I like to read sci-fi novels, play video games, and research investments. 
        <br />
        <br />
        Lastly, one of my favorite hobbies is exploring new tech frameworks and hunting for new tech ideas. I'm always developing some or the other project and on the lookout for new ideas to build.
      </Text>
    </Box>
  );
}
