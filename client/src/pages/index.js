import { useState } from "react";
import Header from "../components/header";
import OverviewMatrix from "../components/overviewMatrix";
import Matrix from "../components/matrix";
import Graph from "../data/graphs.json";
import DataTable from "@/components/datatable";
export default function Home() {
  const [selectedGraph, setSelectedGraph] = useState(5);
  return (
    <main className="h-full bg-gray-100">
      <div className="block">
        <Header />
      </div>

      <div className="flex-col h-full overflow-y-auto overflow-x-auto">
        <div className="flex flex-col block m-2 h-1/3 p-10 overflow-x-auto">
          <div className="w-full h-20 border-b-[1px] flex items-center text-xl">
            <h1 className="text-xl">Overview</h1>
          </div>
          <DataTable></DataTable>
        </div>

        <div className="flex flex-col block m-2 h-2/5 p-10">
          <div className="w-full h-16 border-b-[1px] flex items-center text-xl">
            <h1 className="text-xl">Detail</h1>
          </div>
          <div className="overflow-auto h-full">
            <div>
              <p>selectedGraphID: {selectedGraph}</p>
              <p>number of node: {Graph.graphs[selectedGraph - 1].num_nodes}</p>
              <p>
                number of edges: {Graph.graphs[selectedGraph - 1].num_edges}
              </p>
            </div>
            <Matrix data={Graph.graphs[selectedGraph - 1]}></Matrix>
          </div>
        </div>
      </div>
    </main>
  );
}
