import { useState, useEffect } from "react";
import Graph from "@/data/graphs.json";
import DataTable from "@/components/dataTable";
import DataTableFilter from "@/components/dataTableFilter";
import DetailTable from "@/components/detailTable";
export default function Home() {
  const [graphOverviewData, setGraphOverviewData] = useState(Graph.graphs);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [networkFilter, setNetworkFilter] = useState({
    isFish: false,
    minSimilarity: 0,
    minRevenue: 0,
  });
  const [sourceFilter, setSourceFilter] = useState({
    isFish: false,
    minSimilarity: 0,
    minRevenue: 0,
  });

  useEffect(() => {
    let tmp = Graph.graphs;
    tmp = tmp.filter((x) => x.num_ocean_nodes >= 1 * networkFilter.isFish);
    tmp = tmp.filter((x) => {
      let maxSimilarity = 0
      x.graph.nodes.forEach((y) => { if (y.similarity > maxSimilarity) maxSimilarity = y.similarity })
      return maxSimilarity >= networkFilter.minSimilarity
    });
    tmp = tmp.filter((x) => x.average_revenue >= networkFilter.minRevenue);
    setGraphOverviewData(tmp);
  }, [networkFilter]);

  return (
    <main className="h-full bg-gray-100">
      <div className="flex-col h-full overflow-auto">
        <div className="flex flex-col block m-2 h-fit p-10 overflow-x-auto">
          <div className="w-full h-20 border-b-[1px] flex items-center text-xl">
            <h1 className="text-xl ml-6">Overview</h1>
            <DataTableFilter setNetworkFilter={setNetworkFilter}></DataTableFilter>
          </div>
          <DataTable data={graphOverviewData} selectedGraph={selectedGraph} setSelectGraph={setSelectedGraph}></DataTable>
        </div>
        <div className="flex flex-col block m-2 h-full p-10">
          <div className="w-full h-20 border-b-[1px] flex items-center text-xl">
            <h1 className="text-xl mr-6 ml-6">Detail</h1>
            <DataTableFilter setNetworkFilter={setSourceFilter}></DataTableFilter>
          </div>
          {
            selectedGraph !== null ?
              <DetailTable data={Graph.graphs[selectedGraph - 1]} filter={sourceFilter}></DetailTable>
              :
              <div className="flex items-center justify-center w-full h-full p-24 text-2xl font-semibold">Please select a network</div>
          }

        </div>
      </div>
    </main>
  );
}
