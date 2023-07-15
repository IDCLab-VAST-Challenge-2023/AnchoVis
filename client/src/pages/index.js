import { useState } from "react";
import { useRouter } from "next/router";
import OverviewMatrix from "@/components/overviewMatrix";
import Matrix from "@/components/matrix";
import Graph from "@/data/graphs.json";
import DataTable from "@/components/dataTable";
import DetailTable from "@/components/detailTable";
export default function Home() {
  const [selectedGraph, setSelectedGraph] = useState(3);
  return (
    <main className="h-full bg-gray-100">
      <div className="flex-col h-full overflow-auto">
        <div className="flex flex-col block m-2 h-fit p-10 overflow-x-auto">
          <div className="w-full h-20 border-b-[1px] flex items-center text-xl">
            <h1 className="text-xl">Overview</h1>
          </div>
          <DataTable data={Graph.graphs.slice(0, 100)} selectedGraph={selectedGraph} setSelectGraph={setSelectedGraph}></DataTable>
        </div>
        <div className="flex flex-col block m-2 h-full p-10">
          <div className="w-full h-fit border-b-[1px] flex items-center text-xl">
            <h1 className="text-xl">Detail</h1>
          </div>
          <div className="h-fit">
            <div>
              <p>selectedGraphID: {selectedGraph}</p>
              <p>number of node: {Graph.graphs[selectedGraph - 1].num_nodes}</p>
              <p>
                number of edges: {Graph.graphs[selectedGraph - 1].num_links}
              </p>
            </div>
          </div>
          <DetailTable data={Graph.graphs.filter(x => x.id === selectedGraph)[0]}></DetailTable>
        </div>
      </div>
    </main>
  );
}
