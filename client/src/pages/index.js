import DataTable from "@/components/dataTable";
import DataTableFilter from "@/components/dataTableFilter";
import DetailTable from "@/components/detailTable";
import Graph from "@/data/graphs.json";
import { useMemo, useState } from "react";

import { Footer, Header } from "@/components/layout";
import { Box, Center, Container, Divider, Flex } from "@chakra-ui/react";

Graph.graphs.forEach((x) => {
  x.maxSimilarity = 0;
  x.graph.nodes.forEach((y) => {
    if (y.similarity > x.maxSimilarity) x.maxSimilarity = y.similarity;
  });
});

const MIN_FISHERIES = 1;
const MAX_FISHERIES = Graph.graphs.reduce((acc, x) => {
  if (x.num_ocean_nodes > acc) return x.num_ocean_nodes;
  return acc;
}, 0);
const MIN_SIMILARITY = 0.1;
const MAX_SIMILARITY = 1.0;
const MIN_REVENUE = 0;
const MAX_REVENUE = Graph.graphs.reduce((acc, x) => {
  if (x.average_revenue > acc) return x.average_revenue;
  return acc;
}, 0);
const MIN_NUM_NODES = 3;
const MAX_NUM_NODES = Math.max(
  ...Graph.graphs.map((x) => x.graph.nodes.length)
);
const MIN_NUM_LINKS = 1;
const MAX_NUM_LINKS = Math.max(
  ...Graph.graphs.map((x) => x.graph.links.length)
);


export const sliderValues = {
  fisheries : [0, MIN_FISHERIES, MAX_FISHERIES],
  similarity: [0, MIN_SIMILARITY, MAX_SIMILARITY],
  revenue: [0, MIN_REVENUE, MAX_REVENUE],
  num_nodes: [0, MIN_NUM_NODES, MAX_NUM_NODES],
  num_links: [0, MIN_NUM_LINKS, MAX_NUM_LINKS],
}


// find maxSimilarity and memo to x.maxSimilarity

export default function Home() {
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [networkFilter, setNetworkFilter] = useState({
    fisheries: [MIN_FISHERIES, MAX_FISHERIES],
    similarity: [MIN_SIMILARITY, MAX_SIMILARITY],
    revenue: [MIN_REVENUE, MAX_REVENUE],
    num_nodes: [MIN_NUM_NODES, MAX_NUM_NODES],
    num_links: [MIN_NUM_LINKS, MAX_NUM_LINKS],
    sortBy: "id", // id, fisheries, similarity, revenue, num_nodes, num_links
    sortOrder: "asc", // asc, desc
  });
  const [sourceFilter, setSourceFilter] = useState({
    isFish: false,
    similarity: [MIN_SIMILARITY, MAX_SIMILARITY],
    revenue: [MIN_REVENUE, MAX_REVENUE],
  });
  const graphOverviewData = useMemo(() => {
    const {
      fisheries,
      similarity,
      revenue,
      num_nodes,
      num_links,
      sortBy,
      sortOrder,
    } = networkFilter;
    const filteredGraphs = Graph.graphs
      .filter(
        ({
          num_ocean_nodes,
          maxSimilarity,
          average_revenue,
          graph: { nodes, links },
        }) =>
          num_ocean_nodes >= fisheries[0] &&
          num_ocean_nodes <= fisheries[1] &&
          maxSimilarity >= similarity[0] &&
          maxSimilarity <= similarity[1] &&
          average_revenue >= revenue[0] &&
          average_revenue <= revenue[1] &&
          nodes.length >= num_nodes[0] &&
          nodes.length <= num_nodes[1] &&
          links.length >= num_links[0] &&
          links.length <= num_links[1]
      )
      .sort((a, b) => {
        const sortFunc =
          sortOrder === "asc" ? (x, y) => x - y : (x, y) => y - x;
        switch (sortBy) {
          case "id":
            return sortFunc(a.id, b.id);
          case "fisheries":
            return sortFunc(a.num_ocean_nodes, b.num_ocean_nodes);
          case "similarity":
            return sortFunc(a.maxSimilarity, b.maxSimilarity);
          case "revenue":
            return sortFunc(a.average_revenue, b.average_revenue);
          case "num_nodes":
            return sortFunc(a.graph.nodes.length, b.graph.nodes.length);
          case "num_links":
            return sortFunc(a.graph.links.length, b.graph.links.length);
          default:
            return 0;
        }
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
            <Box minW={100} h={"77vh"} overflow={"auto"}>
              <DataTable
                data={graphOverviewData}
                selectedGraph={selectedGraph}
                setSelectGraph={setSelectedGraph}
                networkFilter={networkFilter}
                setNetworkFilter={setNetworkFilter}
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
            <Divider mt={4} />
            <Box minW={100} h={"77vh"} overflow={"hidden"} mt={4}>
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
