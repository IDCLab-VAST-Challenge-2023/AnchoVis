import {
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { GiCirclingFish } from "react-icons/gi";

const Header = () => {
  return (
    <Flex align="center" justifyContent="space-between" px={4} py={2}>
      <Flex alignItems={"center"}>
        <Icon as={GiCirclingFish} mr={2} boxSize={7} color="gray.500" />
        <Heading size="md" variant={"layout"} alignItems="center">
          AnchoVis
        </Heading>
      </Flex>
      <Link href="https://github.com/IDCLab-VAST-Challenge-2023/VAST-Challenge-2023-MC3" isExternal>
        <Button variant={"layout"} leftIcon={<AiFillGithub />}>
          GitHub
        </Button>
      </Link>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Flex>
      <Flex
        mt="auto"
        align={"center"}
        py={4}
        px={4}
        flexDir="column"
        alignItems="start"
      >
        <Link href="https://idclab.skku.edu" isExternal>
          <Flex>
            <Text
              variant={"layout"}
              fontFamily="Rajdhani"
              fontWeight={600}
              fontSize="2xl"
            >
              IDC
            </Text>
            <Text variant={"layout"} fontFamily="Rajdhani" fontSize="2xl">
              Lab
            </Text>
          </Flex>
        </Link>

        <Link href="https://skku.edu" isExternal>
          <Text variant={"layout"} fontSize="sm">
            Sungkyunkwan University
          </Text>
        </Link>
        <Link href="https://sw.skku.edu" isExternal>
          <Text variant={"layout"} fontSize="sm">
            College of Computing and Informatics
          </Text>
        </Link>
      </Flex>
      <Spacer />
      <Flex
        mt="auto"
        align="center"
        py={4}
        px={4}
        flexDir="column"
        alignItems="end"
      >
        <Link href="https://vast-challenge.github.io/2023/" isExternal>
          <Text
            variant={"layout"}
            fontWeight={600}
            fontSize="xl"
          >
            VAST Challenge 2023
          </Text>
        </Link>
        <Text variant={"layout"} fontSize="sm">
          IEEE VIS 2023
        </Text>
        <Flex gap={2}>
          <Link href="https://github.com/jjmmwon" isExternal>
            <Text variant={"layout"} fontSize="sm">
              Myeongwon Jung
            </Text>
          </Link>
          <Link href="https://github.com/sth49" isExternal>
            <Text variant={"layout"} fontSize="sm">
              Donghee Hong
            </Text>
          </Link>
          <Link href="https://github.com/st42597" isExternal>
            <Text variant={"layout"} fontSize="sm">
              Seonghyeon Cho
            </Text>
          </Link>
          <Link href="https://github.com/jason-choi" isExternal>
            <Text variant={"layout"} fontSize="sm">
              Jiwon Choi
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Footer, Header };
