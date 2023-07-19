import { sliderValues } from "@/pages";
import {
  Box,
  Button,
  Flex,
  Icon,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { format } from "d3-format";
import { useState } from "react";
import { FaFilter, FaFish, FaSortNumericDown } from "react-icons/fa";

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

function TableHeader({
  w,
  label,
  columnKey,
  networkFilter,
  setNetworkFilter,
  selectedFilter,
  setSelectedFilter,
}) {
  return (
    <Th w={w}>
      <Box mb={2}>{label}</Box>
      <Flex w="full" justify="space-between">
        <Button
          mb={2}
          variant={networkFilter.sortBy === columnKey ? "solid" : "outline"}
          colorScheme="blue"
          size="xs"
          onClick={() => {
            console.log(columnKey, networkFilter.sortBy);

            if (networkFilter.sortBy === columnKey) {
              setNetworkFilter({
                ...networkFilter,
                sortBy: "id",
                sortOrder: "asc",
              });
            } else {
              setNetworkFilter({
                ...networkFilter,
                sortBy: columnKey,
                sortOrder: "desc",
              });
            }
          }}
        >
          <Icon as={FaSortNumericDown} />
        </Button>
        <Button
          mb={2}
          variant={selectedFilter === columnKey ? "solid" : "outline"}
          colorScheme="blue"
          size="xs"
          onClick={() => {
            if (selectedFilter === columnKey) {
              setSelectedFilter(null);
            } else {
              setSelectedFilter(columnKey);
            }
          }}
        >
          <Icon as={FaFilter} />
        </Button>
      </Flex>
    </Th>
  );
}

export default function DataTable({
  data,
  selectedGraph,
  setSelectGraph,
  networkFilter,
  setNetworkFilter,
}) {
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  return (
    <Flex direction="column">
      <Table variant="simple" size="sm" p={0} layout="fixed" w={"fit-content"}>
        <Thead
          position={"sticky"}
          top={0}
          boxShadow={"0 -2px 0 #E3E7EF inset"}
          bgColor={"white"}
        >
          <Tr>
            <Th w={45}>
              <Flex w="full" h="full" align="center" justify="center">
                ID
              </Flex>
            </Th>
            <TableHeader
              w={100}
              label={"# of Fisheries"}
              columnKey={"fisheries"}
              networkFilter={networkFilter}
              setNetworkFilter={setNetworkFilter}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <TableHeader
              w={110}
              label="Max Similarity"
              columnKey="similarity"
              networkFilter={networkFilter}
              setNetworkFilter={setNetworkFilter}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <TableHeader
              w={100}
              label="Average Revenue"
              columnKey={"revenue"}
              networkFilter={networkFilter}
              setNetworkFilter={setNetworkFilter}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <TableHeader
              w={100}
              label="# of Nodes"
              columnKey="num_nodes"
              networkFilter={networkFilter}
              setNetworkFilter={setNetworkFilter}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <TableHeader
              w={100}
              label="# of Links"
              columnKey="num_links"
              networkFilter={networkFilter}
              setNetworkFilter={setNetworkFilter}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </Tr>
          {selectedFilter ? (
            <Tr>
              <Th colSpan={6}>
                <Flex align={"center"} h={10}>
                  <Box w={110}>{keyLabel[selectedFilter]}</Box>
                  <Box w={"full"} ml={2}>
                    <RangeSlider
                      aria-label="slider-ex-1"
                      defaultValue={networkFilter[selectedFilter]}
                      min={0}
                      max={sliderValues[selectedFilter][2]}
                      step={0.01}
                      onChange={(x) => {
                        // set minSimilarity with debounce
                        debounce(
                          setNetworkFilter,
                          650
                        )({
                          ...networkFilter,
                          [selectedFilter]: x,
                        });
                      }}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack w="200" />
                      </RangeSliderTrack>
                      <Tooltip
                        hasArrow
                        bg="blue.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltip1}
                        label={format(".2f")(networkFilter[selectedFilter][0])}
                      >
                        <RangeSliderThumb
                          index={0}
                          onMouseEnter={() => setShowTooltip1(true)}
                          onMouseLeave={() => setShowTooltip1(false)}
                        />
                      </Tooltip>
                      <Tooltip
                        hasArrow
                        bg="blue.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltip2}
                        label={format(".2f")(networkFilter[selectedFilter][1])}
                      >
                        <RangeSliderThumb
                          index={1}
                          onMouseEnter={() => setShowTooltip2(true)}
                          onMouseLeave={() => setShowTooltip2(false)}
                        />
                      </Tooltip>
                    </RangeSlider>
                  </Box>
                </Flex>
              </Th>
            </Tr>
          ) : null}
        </Thead>
        <Tbody>
          {data.map((x, i) => (
            <Tr
              className="data-table-row"
              key={i}
              color={x.id === selectedGraph ? "white" : null}
              bgColor={x.id === selectedGraph ? "gray.600" : null}
              onClick={() => {
                if (x.id === selectedGraph) {
                  setSelectGraph(null);
                } else {
                  setSelectGraph(x.id);
                }
              }}
            >
              <Td p={0} w={"fit-content"}>
                <Flex w="full" h="full" align="center" justify="center">
                  {x.id}
                </Flex>
              </Td>
              <Td>
                <Icon as={FaFish} mr={2} />
                {x.num_ocean_nodes}
              </Td>
              <Td isNumeric>{x.maxSimilarity.toFixed(2)}</Td>
              <Td isNumeric>{format(".2~s")(x.average_revenue)}</Td>
              <Td isNumeric>{x.graph.nodes.length}</Td>
              <Td isNumeric>{x.graph.links.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}

const keyLabel = {
  id: "ID",
  fisheries: "# of Fisheries",
  similarity: "Max Similarity",
  revenue: "Average Revenue",
  num_nodes: "# of Nodes",
  num_links: "# of Links",
};
