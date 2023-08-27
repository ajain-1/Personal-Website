import React from "react";
import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue, Image, SimpleGrid, ListItem, List, UnorderedList } from "@chakra-ui/react";

export default function Experience() {
  const experiences = [
    {
      title: "Software Developer",
      company: "Machina Labs",
      date: "2022",
      description: ["Developed web stack for executing and visualizing computational design scripts", "Implemented a system to run Bayesian optimization models for aligning 3D models to a scan", "Created crucial robot path-planning tools", "Worked with industry experts in artificial intelligence, robotics, and manufacturing"],
      imageUrl: "/MachinaLabs.jpeg",
    },
    {
      title: "Systems Engineer",
      company: "United Talent Agency",
      date: "2022",
      description: ["Developed creative solutions to addressing critical cybersecurity threats", "Maintained Github, Docker, and Azure workflows", "Learnt from DevOps and Cybersecurity industry experts", "Gained exposure to the talent management and recruiting industry"],
      imageUrl: "/UTA.png",
    },
    {
      title: "CAD Engineer",
      company: "Martin Bros",
      date: "2021",
      description: ["Worked with BIM and engineering teams to build construction models", "Utilized software such as Bluebeam, Revit, AutoCAD, and more", "Learned from industry experts in construction, engineering, and management", "Analyzed and interpreted architectural, structural, mechanical and other plans"],
      imageUrl: "/MartinBros.png",
    },
    {
      title: "Developer & Consultant",
      company: "Allay Tax",
      date: "2021",
      description: ["Designed and developed client website at allaytax.com", "Managed online presence including SEO and marketing", "Advised regarding improvements in systems, client experience, and engagement", "Resulted in 2x faster website and a more client-friendly design"],
      imageUrl: "/AllayTax.png",
    },
    {
      title: "Co-Founder",
      company: "Hirezz",
      date: "2019-20",
      description: ["Co-founded social platform for discovering and hiring home contractors", "Developed MVP using Flutter and Firebase", "Conducted user surveys and iterated based on feedback"],
      imageUrl: "/Hirezz.png",
    },
  ];

  return (
    <Box px={[5, 5, 10]} py={5}>
      <Heading fontSize={"2xl"} mb={5}>
        Experience
      </Heading>
      <SimpleGrid columns={[1, 1, 3]} spacing={4}>
        {experiences.map(({ title, company, date, description, imageUrl }) => (
          <Box key={title} h="100%">
            <Card title={title} company={company} date={date} description={description} imageUrl={imageUrl}></Card>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export function Card(props: { date: string; title: string; company: string; description: Array<String>; imageUrl: string }) {
  const { title, company, description, imageUrl } = props;
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
              {company} • {props.date}
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
