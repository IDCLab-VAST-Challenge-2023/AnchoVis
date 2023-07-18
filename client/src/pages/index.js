import DataTable from "@/components/dataTable";
import DataTableFilter from "@/components/dataTableFilter";
import DetailTable from "@/components/detailTable";
import Graph from "@/data/graphs.json";
import { useMemo, useState } from "react";

import { Footer, Header } from "@/components/layout";
import { Box, Center, Container, Flex } from "@chakra-ui/react";

Graph.graphs.forEach((x) => {
  x.maxSimilarity = 0;
  x.graph.nodes.forEach((y) => {
    if (y.similarity > x.maxSimilarity) x.maxSimilarity = y.similarity;
  });
});

// find maxSimilarity and memo to x.maxSimilarity

export default function Home() {
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [networkFilter, setNetworkFilter] = useState({
    isFish: false,
    minSimilarity: 0.2,
    minRevenue: 0,
  });
  const [sourceFilter, setSourceFilter] = useState({
    isFish: false,
    minSimilarity: 0.8,
    minRevenue: 0,
  });
  const graphOverviewData = useMemo(() => {
    const filteredGraphs = Graph.graphs.filter((graph) => {
      const maxSimilarity = Math.max(
        ...graph.graph.nodes.map((node) => node.similarity)
      );
      return (
        graph.num_ocean_nodes >= 1 * networkFilter.isFish &&
        maxSimilarity >= networkFilter.minSimilarity &&
        graph.average_revenue >= networkFilter.minRevenue
      );
    });
    return filteredGraphs;
  }, [networkFilter]);

  return (
    <>
      <Header />
      <Container maxW="full" px={4}>
        <Flex w={"full"} dir="column" gap={4}>
          <Box
            w={"fit-content"}
            p={4}
            bgColor={"white"}
            borderRadius={"md"}
            shadow={"sm"}
          >
            <DataTableFilter
              networkFilter={networkFilter}
              setNetworkFilter={setNetworkFilter}
            />
            <Box minW={100} h={"82vh"} overflow={"auto"} mt={4}>
              <DataTable
                data={graphOverviewData}
                selectedGraph={selectedGraph}
                setSelectGraph={setSelectedGraph}
              />
            </Box>
          </Box>
          <Box
            w={"full"}
            p={4}
            bgColor={"white"}
            borderRadius={"md"}
            shadow={"sm"}
            overflowX={"hidden"}
          >
            <DataTableFilter
              
              networkFilter={sourceFilter}
              setNetworkFilter={setSourceFilter}
              
            />
            <Box minW={100} h={"82vh"} overflow={"hidden"} mt={4}>
              {selectedGraph !== null ? (
                <DetailTable
                  data={Graph.graphs[selectedGraph - 1]}
                  filter={sourceFilter}
                ></DetailTable>
              ) : (
                <Center h="full">Please Select the Network</Center>
              )}
            </Box>
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
