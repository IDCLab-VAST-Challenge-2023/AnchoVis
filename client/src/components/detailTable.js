import { FaFish } from "react-icons/fa";
import { Box, Table, Tbody, Td, Th, Thead, Tr, Flex, Icon } from "@chakra-ui/react";

const colorMap = {
  "Beneficial Owner": "#4e79a7",
  "Company Contacts": "#f28e2b",
};

const CELL_WIDTH = 39;

export default function detailTable({ data, filter }) {
  const srcInfo = {};
  const src = {};
  const trg = {};
  const linkType = {};
  data.graph.nodes.forEach((node) => (srcInfo[node.id] = node));
  data.graph.links.forEach((link) => {
    const source = srcInfo[link.source];
    if (
      source.is_ocean >= 1 * filter.isFish &&
      source.similarity >= filter.minSimilarity &&
      source.total_revenue >= filter.minRevenue
    ) {
      src[link.source] = (src[link.source] || 0) + 1;
      trg[link.target] = (trg[link.target] || 0) + 1;
      linkType[[link.source, link.target]] = link.type;
    }
  });
  let srcList = Object.entries(src)
    .sort((a, b) => b[1] - a[1])
    .filter((x) => x[1] > 0);
  let trgList = Object.entries(trg)
    .sort((a, b) => b[1] - a[1])
    .filter((x) => x[1] > 0);

  const matrixValue = srcList.map((src) =>
    trgList.map((trg) => ({
      type: linkType[[src[0], trg[0]]],
      src: src[0],
      trg: trg[0],
    }))
  );
  function getSrcIndex(srcValue) {
    return matrixValue.findIndex((row) => row[0]?.src === srcValue);
  }

  return (
    <Box display={"block"} w={"full"}>
      <Box overflowY="scroll" h={"82vh"}>
        <Table variant="unstyled" size="sm" layout="fixed" w="fit-content">
          <Thead>
            <Tr
              bgColor={"white"}
              boxShadow={"0 -2px 0 #E3E7EF inset"}
              style={{ position: "sticky", top: 0 }}
              verticalAlign={"center"}
              zIndex={3}
            >
              <Th w={200} style={{ left: 0, position: "sticky" }}>
                Source ID
              </Th>
              <Th w={90} style={{ left: 200, position: "sticky" }}>
                Fishing
              </Th>
              {/* <Th>Revenue</Th> */}
              <Th w={120} style={{ left: 290, position: "sticky" }}>
                Similarity
              </Th>
              <Th w={120} style={{ left: 410, position: "sticky" }}>
                Country
              </Th>
              <Th colSpan={trgList.length} w={trgList.length * CELL_WIDTH} />
            </Tr>
          </Thead>
          <Tbody zIndex={1}>
            {srcList
              .filter((x) => srcInfo[x[0]].is_ocean >= 1 * filter.isFish)
              .filter((x) => srcInfo[x[0]].similarity >= filter.minSimilarity)
              .filter((x) => srcInfo[x[0]].total_revenue >= filter.minRevenue)
              .map((x, i) => {
                x = srcInfo[x[0]];

                let idx = getSrcIndex(x.id);
                return (
                  <Tr key={`row${i}`} h={12}>
                    <Td
                      key={x.id}
                      bgColor={"white"}
                      style={{ left: 0, position: "sticky" }}
                    >
                      {x.id}
                    </Td>
                    <Td
                      bgColor={"white"}
                      style={{ left: 200, position: "sticky" }}
                    >
                      {x.is_ocean ? <Icon as={FaFish} p={0}  />  : ""}
                    </Td>
                    <Td
                      isNumeric
                      bgColor={"white"}
                      style={{ left: 290, position: "sticky" }}
                    >
                      {x.similarity.toFixed(2)}
                    </Td>
                    <Td
                      bgColor={"white"}
                      style={{ left: 410, position: "sticky" }}
                    >
                      {x.country}
                    </Td>
                    {matrixValue[idx].map((y, j) => {
                      return (
                        <Td
                          className="mark"
                          bgColor={colorMap[y.type]}
                          key={`matrix${i}${j}`}
                        >
                          { }
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        <Box
          pt={2}
          bgColor={"white"}
          style={{ position: "sticky", bottom: 0 }}
          w="fit-content"
          borderTop={"2px"}
          borderColor={"gray.200"}
        >
          <Table variant="unstyled" size="sm" layout="fixed" w="fit-content">
            <Thead>
              <Tr>
                <Th
                  colSpan={4}
                  bgColor={"white"}
                  w={200 + 90 + 120 + 120}
                  style={{ left: 0, position: "sticky" }}
                  verticalAlign={"top"}
                  fontSize={"sm"}
                >
                  <Box>
                    <Flex gap={2} px={2} align="center">
                      <Box w={12} h={6} bgColor={colorMap["Beneficial Owner"]}></Box>
                      <Box mr={4}>Beneficial Owner</Box>
                    </Flex>
                    <Flex gap={2} px={2} align="center" my={2}>
                      <Box w={12} h={6} bgColor={colorMap["Company Contacts"]}></Box>
                      <Box>Company Contacts</Box>
                    </Flex>
                  </Box>

                </Th>
                {trgList.map((x, i) => (
                  <Th
                    w={CELL_WIDTH}
                    p={0}
                    m={0}
                    lineHeight={"1px"}
                    style={{
                      writingMode: "vertical-lr",
                      textAlign: "start",
                      wordWrap: "break-word",
                    }}
                    key={`trg${i}`}
                  >
                    {x[0]}
                  </Th>
                ))}
              </Tr>
            </Thead>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
