import React from "react";
import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue, Image, SimpleGrid, ListItem, List, UnorderedList } from "@chakra-ui/react";

export default function Activities() {
  const academics = [
    {
      title: "Robotics Captain, Programmer, and Builder",
      institution: "VEX Robotics @ CHS",
      date: "2019-Present",
      description: ["Apply and expand expertise in C++, embedded systems, robot design and development, and physics", "Demonstrate skills in leadership, collaboration, and communication", "Build a robot capable of competing and completing an objective", "Use vision, inertial, and tracking algorithms to train the robot for autonomous movement", "Compete against other robotics teams at a high level in local, state, and international competitions"],
      imageUrl: "/VEXRobotics.jpeg",
    },
    {
      title: "AI4ALL Student",
      institution: "Carngie Mellon University",
      date: "2021",
      description: ["Attended free research program at CMU with a cohort of 25 students", "Worked with Carnegie Mellon AI professors and researchers to explore AI", "Learnt and used Python libraries such as Tensorflow, Matplotlib, Scikit-learn, and Numpy", "Gained valuable research experience from building AI models and working on projects with other students"],
      imageUrl: "/CarnegieMellon.png",
    },
    {
      title: "AI Scholar and Ambassador",
      institution: "Inspirit AI",
      date: "2021",
      description: ["Worked with Stanford graduates to learn more about AI", "Created AI projects using Python and Google ML tools under experts", "Explored fundamental AI concepts such as regression, NNs, and decision trees ", "Applied AI to use cases in healthcare, genomics, autonomous driving, and more", "Worked as an ambassador to teach AI concepts to students at my school"],
      imageUrl: "/InspiritAI.jpeg",
    },
    // {
    //     title: 'High School Student',
    //     institution: 'Calabasas High School',
    //     date: '2019-Present',
    //     description:
    //     ['GPA: 4.58',
    //     'Activities: VEX Robotics Team (Captain), App Design Team (Lead Developer), Speech & Debate Team (Secretary), and more',
    //     'AP STEM: Calculus, Physics, Statistics, Chemistry, Biology',
    //     'CTE: Web Design, Investments',

    //     ],
    //     imageUrl: '/CalabasasHS.jpeg',
    // },
    {
      title: "Founder and President",
      institution: "ByteClub",
      date: "2020-Present",
      description: ["Founded organization to increase STEM involvement by teaching students computer science", "Taught through collaborating on projects such as apps, websites, and games", "Pair students that are new to CS with more experienced students to run a peer-peer program", "Raised funds for the organization through donations and fundraisers", "Share resources with students to help them pursue CS further"],
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
    <Box w={"full"} bgColor="gray.100" borderRadius="10px" p={6} h="full">
      <Stack spacing={5}>
        <Stack direction={"row"} spacing={4} align={"center"}>
          <Avatar src={imageUrl} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600} fontSize="lg">
              {title}
            </Text>
            <Text color={"gray.700"} fontWeight={600} mt={"5"}>
              {institution} • {props.date}
            </Text>
          </Stack>
        </Stack>
        <UnorderedList px={3}>
          {description.map((desc: any) => (
            <ListItem key={desc} fontSize="0.9em">
              {desc}
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>
    </Box>
  );
}
