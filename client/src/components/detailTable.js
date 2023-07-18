import { faFish } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const colorMap = {
  "Beneficial Owner": "#4e79a7",
  "Company Contacts": "#f28e2b",
};

export default function detailTable({ data, filter }) {
  console.log("detailTable");
  const srcInfo = {};
  const src = {};
  const trg = {};
  const linkType = {};
  data.graph.nodes.forEach(node => srcInfo[node.id] = node);
  data.graph.links.forEach(link => {
    const source = srcInfo[link.source];
    if (source.is_ocean >= 1 * filter.isFish && source.similarity >= filter.minSimilarity && source.total_revenue >= filter.minRevenue) {
      src[link.source] = (src[link.source] || 0) + 1;
      trg[link.target] = (trg[link.target] || 0) + 1;
      linkType[[link.source, link.target]] = link.type;
    }
  });
  let srcList = Object.entries(src).sort((a, b) => b[1] - a[1]).filter(x => x[1] > 0);
  let trgList = Object.entries(trg).sort((a, b) => b[1] - a[1]).filter(x => x[1] > 0);

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
      <Box overflowY="scroll" maxH={"80vh"}>
        <Table variant="unstyled" size="sm" layout="fixed" w="fit-content">
          <Thead>
            <Tr
              style={{ position: "sticky", top: 0 }}
              bgColor={"gray.100"}
              verticalAlign={"center"}
              zIndex={3}
            >
              <Th w={200} h={12} style={{ left: 0, position: "sticky" }}>
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
              {trgList.map((x, i) => (
                <Th
                  pb={10}
                  fontSize={8}
                  w={12}
                  style={{
                    writingMode: "vertical-lr",
                    textAlign: "end",
                    wordWrap: "break-word",
                  }}
                  key={`trg${i}`}
                >
                  {}
                </Th>
              ))}
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
                      {x.is_ocean ? <FontAwesomeIcon icon={faFish} /> : ""}
                    </Td>
                    {/* <Td>{x.total_revenue}</Td> */}
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
                        <Td bgColor={colorMap[y.type]} key={`matrix${i}${j}`}>
                          {}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>

        <Table
          variant="unstyled"
          size="sm"
          layout="fixed"
          w="fit-content"
          style={{ position: "sticky", bottom: 0 }}
        >
          <Thead>
            <Tr>
              <Th
                bgColor={"gray.100"}
                w={200}
                style={{ left: 0, position: "sticky" }}
              ></Th>
              <Th
                bgColor={"gray.100"}
                w={90}
                style={{ left: 200, position: "sticky" }}
              ></Th>
              {/* <Th>Revenue</Th> */}
              <Th
                bgColor={"gray.100"}
                w={120}
                style={{ left: 290, position: "sticky" }}
              ></Th>
              <Th
                bgColor={"gray.100"}
                w={120}
                style={{ left: 410, position: "sticky" }}
              ></Th>
              {trgList.map((x, i) => (
                <Th
                  w={12}
                  bgColor={"gray.100"}
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
  );
}
