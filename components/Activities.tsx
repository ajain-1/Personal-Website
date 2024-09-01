import React from "react";
import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue, Image, SimpleGrid, ListItem, List, UnorderedList } from "@chakra-ui/react";

export default function Activities() {
  const academics = [
    {
      title: "Robotics Captain, Programmer, & Builder",
      institution: "VEX Robotics @ CHS",
      date: "2019-23",
      description: ["Apply and expand expertise in C++, embedded systems, robot design and development, and physics", "Build a robot capable of competing and completing an objective", "Use vision, inertial, and tracking algorithms to train the robot for autonomous movement (Vex AI Robotics Competition)", "Compete against other robotics teams at a high level in local, state, and international competitions"],
      imageUrl: "/VEXRobotics.jpeg",
    },
    {
      title: "AI4ALL Student",
      institution: "Carngie Mellon University",
      date: "2021",
      description: ["Attended free program at CMU with a cohort of 25 students", "Worked with Carnegie Mellon AI faculty to explore AI", "Used tools such as Tensorflow, PyTorch, and Scikit-Learn", "Gained valuable research experience from building AI models and working on projects with other students"],
      imageUrl: "/CarnegieMellon.png",
    },
    {
      title: "AI Scholar and Ambassador",
      institution: "Inspirit AI",
      date: "2021",
      description: ["Worked with graduate students to learn more about AI", "Built projects using Python and Google ML tools under experts", "Explored fundamental AI concepts such as regression and NNs", "Applied AI to use cases in healthcare, self-driving, and more", "Worked as an ambassador to teach AI concepts to other students"],
      imageUrl: "/InspiritAI.jpeg",
    },
    {
      title: "Founder and President",
      institution: "ByteClub",
      date: "2020-23",
      description: ["Founded org to increase STEM involvement & teach students CS", "Taught by working on projects such as apps, websites, & games", "Pair students across experience levels to run a peer-peer program", "Share resources with students to help them pursue CS further"],
      imageUrl: "/ByteClub.png",
    },
  ];

  return (
    <Box px={[5, 5, 10]} py={5}>
      <Heading fontSize={"2xl"} mb={5}>
        Activities
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {academics.map(({ title, institution, date, description, imageUrl }) => (
          <Box key={title} h="100%">
            <Card title={title} institution={institution} date={date} description={description} imageUrl={imageUrl}></Card>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export function Card(props: { date: string; title: string; institution: string; description: Array<String>; imageUrl: string }) {
  const { title, institution, description, imageUrl } = props;
  return (
    <Box w={"full"} bgColor="gray.900" borderRadius='0px' p={6} h="full">
      <Stack spacing={5}>
        <Stack direction={"row"} spacing={4} align={"center"}>
          <Avatar src={imageUrl} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600} fontSize="lg">
              {title}
            </Text>
            <Text color={"gray.100"} fontWeight={600} mt={"5"}>
              {institution}
            </Text>
          </Stack>
        </Stack>
        {/* <UnorderedList px={3}>
          {description.map((desc: any) => (
            <ListItem key={desc} fontSize="0.9em">
              {desc}
            </ListItem>
          ))}
        </UnorderedList> */}
      </Stack>
    </Box>
  );
}
