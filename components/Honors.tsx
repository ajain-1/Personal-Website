import React from "react";
import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue, Image, SimpleGrid, ListItem, List, UnorderedList } from "@chakra-ui/react";

export default function Honors() {
  const academics = [
    {
      title: "High School Student",
      institution: "Calabasas High School",
      date: "2019-Present",
      description: ["GPA: 4.58", "Activities: VEX Robotics Team (Captain), App Design Team (Lead Developer), Speech & Debate Team (Secretary), and more", "AP STEM: Calculus, Physics, Statistics, Chemistry, Biology", "CTE: Web Design, Investments"],
      imageUrl: "/CalabasasHS.jpeg",
    },
  ];

  const honors = [
    {
      title: "VEX World Championship Division Finalists",
      institution: "VEX Robotics",
      date: "2022 • Dallas, TX",
      description: ["Led team to VEX RC World Tournament as captain and programmer", "One of the top teams (#34 seed) out of over 11,000 teams worldwide"],
      imageUrl: "/VEXRobotics.jpeg",
    },
    {
      title: "VEX Robotics State Championship (2x)",
      institution: "VEX Robotics",
      date: "2019, 2022 • San Diego, CA",
      description: ["Qualified for the VEX Robotics State Championship in 2019 and 2022", "Won as state finalists and qualified for the World Championship"],
      imageUrl: "/VEXRobotics.jpeg",
    },
    {
      title: "STEAM Award",
      institution: "Calabasas High School",
      date: "2020",
      description: ["Received the school STEAM award for excellence in its fields"],
      imageUrl: "/CalabasasHS.jpeg",
    },
    {
      title: "AWS Certified Solutions Architect",
      institution: "Amazon Web Services",
      date: "2019-22",
      description: ["Passed the AWS Solutions Architect exam"],
      imageUrl: "/AWS.png",
    },
  ];

  return (
    <Box px={[5, 5, 10]} py={5}>
      <Heading fontSize={"2xl"} mb={5}>
        Honors and Academics
      </Heading>
      <Text fontSize={"lg"} pt={2} mb={4} fontWeight={500}>
        Honors
      </Text>
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {honors.map(({ title, institution, date, description, imageUrl }) => (
          <Box key={title} h="100%">
            <Card title={title} institution={institution} date={date} description={description} imageUrl={imageUrl}></Card>
          </Box>
        ))}
      </SimpleGrid>
      {/* <Text fontSize={'lg'} mt={5} mb={4} fontWeight={500}>Academics</Text>
            <SimpleGrid columns={[1, 1, 1]} spacing={4}>
            {academics.map(({ title, institution, date, description, imageUrl }) => (
                <Box key={title} h='100%'>
                    <Card title={title} institution={institution} date={date} description={description} imageUrl={imageUrl}></Card>
                </Box>
            ))}
            </SimpleGrid> */}
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
