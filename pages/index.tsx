import { Box, Flex, Heading, HStack, Button, Icon, VStack, Text, Spacer, Show, Hide, Center } from "@chakra-ui/react";
import { IoSchoolOutline, IoGridOutline, IoMenuOutline, IoBasketballOutline, IoList, IoStarOutline, IoBriefcaseOutline, IoPersonOutline, IoMenu } from "react-icons/io5";
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import About from "../components/About";
import Experience from "../components/Experience";
import Activities from "../components/Activities";
import Honors from "../components/Honors";
import Hobbies from "../components/Hobbies";
import Projects from "../components/Projects";

import { NextSeo } from "next-seo";
import Head from "next/head";

const Home: NextPage = () => {
  const [menu, setMenu] = useState(false);

  const links = [
    {
      link: "about",
      title: "About",
      icon: IoPersonOutline,
    },
    // {
    //   link: "experience",
    //   title: "Experience",
    //   icon: IoBriefcaseOutline,
    // },
    {
      link: "projects",
      title: "Projects",
      icon: IoGridOutline,
    },
    // {
    //   link: "academic",
    //   title: "Activities",
    //   icon: IoList,
    // },


    // {
    //   link: "honors",
    //   title: "Honors",
    //   icon: IoStarOutline,
    // },

    {
      link: "hobbies",
      title: "Hobbies",
      icon: IoBasketballOutline,
    },
  ];

  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    element?.addEventListener("scroll", () => {});
  };

  return (
    <Flex maxH={"100vh"}>
      <Head>
        <link rel="icon" href="/icon.png"></link>
      </Head>

      <Flex w={"20vw"} flexDir="column" dir="column" maxH="100vh" bgColor={"#111"} p="5" pt={8} color={"white"} display={["none", "none", "inherit"]}>
        {/* <Heading fontSize={'3xl'} ml={4} mb="7" fontWeight={'900'}>Aryan Jain</Heading> */}
        <VStack spacing={3}>
          {links.map(({ link, title, icon }) => (
            // eslint-disable-next-line
            <Flex
              key={link}
              w="full"
              h="50px"
              _hover={{ backgroundColor: "white", color: "black" }}
              borderRadius="10px"
              align={"center"}
              onClick={() => {
                scrollIntoView(link);
              }}>
              <Icon as={icon} mx="4" boxSize={"1.5em"}></Icon>
              <Text fontSize="lg" fontWeight={"600"}>
                {title}
              </Text>
            </Flex>
          ))}
        </VStack>
        <Spacer />
        <a href="mailto:aryanj@andrew.cmu.edu">
          <Button bgColor={"gray.800"} color="white" w="100%" _hover={{ bgColor: "gray.600", color: "white" }}>
            Contact
          </Button>
        </a>
      </Flex>

      <Flex flex={1} h="100vh" bgColor="F1ECCE" flexDir={"column"} overflowY="scroll" overflowX={"hidden"}>
        <Show below="md">
          <Flex>
            <Center
              bgColor={"white"}
              borderRadius="50%"
              position="absolute"
              top={5}
              right={5}
              zIndex={1}
              onClick={() => {
                setMenu(!menu);
              }}>
              <Icon as={IoMenuOutline} boxSize={"2.5em"}></Icon>
            </Center>

            {menu ? (
              <Flex w={"70vw"} zIndex={1} position="absolute" top={0} left={0} flexDir="column" h="100vh" bgColor={"#111"} p="5" pt={8} color={"white"}>
                {/* <Heading fontSize={'3xl'} ml={4} mb="7" fontWeight={'900'}>Aryan Jain</Heading> */}
                <VStack spacing={3}>
                  {links.map(({ link, title, icon }) => (
                    <Flex
                      key={link}
                      w="full"
                      h="50px"
                      _hover={{ backgroundColor: "white", color: "black" }}
                      borderRadius="10px"
                      align={"center"}
                      onClick={() => {
                        setMenu(!menu);
                        scrollIntoView(link);
                      }}>
                      <Icon as={icon} mx="4" boxSize={"1.5em"}></Icon>
                      <Text fontSize="lg" fontWeight={"600"}>
                        {title}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
                <Spacer />
                <a href="mailto:ajain.mss@gmail.com">
                  <Button bgColor={"white"} color="black" w="100%" _hover={{ bgColor: "gray.600", color: "white" }}>
                    Contact
                  </Button>
                </a>
              </Flex>
            ) : null}
          </Flex>
        </Show>
        <div id="about">
          <About />
        </div>
        {/* <Box id="experience">
          <Experience></Experience>
        </Box> */}

<Box id="projects" backgroundColor={'black'} textColor="gray.100">
          <Projects></Projects>
        </Box>
{/* 
        <Box id="academic" backgroundColor={'black'} textColor="gray.100">
          <Activities></Activities>
        </Box>

        <Box id="honors" backgroundColor={'black'} textColor="gray.100">
          <Honors></Honors>
        </Box> */}

        <Box id="hobbies" backgroundColor={'black'} textColor="gray.100">
          <Hobbies></Hobbies>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
