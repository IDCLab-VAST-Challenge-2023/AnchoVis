import { useState, useEffect } from "react";
import Graph from "@/data/graphs.json";
import DataTable from "@/components/dataTable";
import DataTableFilter from "@/components/dataTableFilter";
import DetailTable from "@/components/detailTable";

import { Box, Container, Flex } from "@chakra-ui/react";



Graph.graphs.forEach((x) => {
  x.maxSimilarity = 0;
  x.graph.nodes.forEach((y) => {
    if (y.similarity > x.maxSimilarity) x.maxSimilarity = y.similarity;
  });
});



// find maxSimilarity and memo to x.maxSimilarity


export default function Home() {
  const [graphOverviewData, setGraphOverviewData] = useState(Graph.graphs);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [networkFilter, setNetworkFilter] = useState({
    isFish: true,
    minSimilarity: 0.5,
    minRevenue: 0,
  });
  const [sourceFilter, setSourceFilter] = useState({
    isFish: true,
    minSimilarity: 0.5,
    minRevenue: 0,
  });



  useEffect(() => {
    let a = Date.now();

    const filteredGraphs = Graph.graphs.filter((graph) => {
      const maxSimilarity = Math.max(...graph.graph.nodes.map((node) => node.similarity));
      return (
        graph.num_ocean_nodes >= 1 * networkFilter.isFish &&
        maxSimilarity >= networkFilter.minSimilarity &&
        graph.average_revenue >= networkFilter.minRevenue
      );
    });
    setGraphOverviewData(filteredGraphs);

    let b = Date.now();

    console.log(b-a)
  }, [networkFilter]);


  


  return (
    <Flex bgColor={"gray.50"} maxW="full" gap={4}>
      <Box>
        <DataTableFilter setNetworkFilter={setNetworkFilter}></DataTableFilter>
        <Box minW={600} h={1200} overflow={"auto"}>
          <DataTable
            data={graphOverviewData}
            selectedGraph={selectedGraph}
            setSelectGraph={setSelectedGraph}
          />
        </Box>
      </Box>
      <Box bgColor={"white"} w={2000} p={4} rounded="lg">
        <DataTableFilter setNetworkFilter={setSourceFilter}></DataTableFilter>
        {selectedGraph !== null ? (
          <DetailTable
            data={Graph.graphs[selectedGraph-1]}
            filter={sourceFilter}
          ></DetailTable>
        ) : (
          <div className="flex items-center justify-center w-full h-full p-24 text-2xl font-semibold">
            Please select a network
          </div>
        )}
      </Box>
    </Flex>
  );

  // return (
  //   <main className=" bg-gray-100">
  //     <div className="flex w-300 ">
  //       <div className="flex flex-col m-2 h-fit p-10 overflow-x-auto">
  //         <div className="w-full h-20 border-b-[1px] flex items-center text-xl">
  //           <h1 className="text-xl ml-6">Overview</h1>
  //           <DataTableFilter
  //             setNetworkFilter={setNetworkFilter}
  //           ></DataTableFilter>
  //         </div>
  //         <DataTable
  //           data={graphOverviewData}
  //           selectedGraph={selectedGraph}
  //           setSelectGraph={setSelectedGraph}
  //         ></DataTable>
  //       </div>
  //       <div className="flex flex-col m-2 w-full p-10">
  //         <div className="w-full h-20 border-b-[1px] flex items-center text-xl">
  //           <h1 className="text-xl mr-6 ml-6">Detail</h1>
  //           <DataTableFilter
  //             setNetworkFilter={setSourceFilter}
  //           ></DataTableFilter>
  //         </div>
  //         {selectedGraph !== null ? (
  //           <DetailTable
  //             data={Graph.graphs[selectedGraph - 1]}
  //             filter={sourceFilter}
  //           ></DetailTable>
  //         ) : (
  //           <div className="flex items-center justify-center w-full h-full p-24 text-2xl font-semibold">
  //             Please select a network
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </main>
  // );
}
