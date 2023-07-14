import { useState } from "react";
import { useRouter } from "next/router";
import OverviewMatrix from "../components/overviewMatrix";
import Matrix from "../components/matrix";
import Graph from "../data/graphs.json";
import DataTable from "@/components/datatable";
export default function Home() {
<<<<<<< HEAD
  const [selectedGraph, setSelectedGraph] = useState(3);
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
=======
  const router = useRouter();
  const numberOfOverview = 50;
  const [selectedGraph, setSelectedGraph] = useState(1);
  return (
    <main className="h-full">
      <div className="p-4 h-[calc(100vh-4rem)]">
        <h1 className="text-2xl ml-4">Overview</h1>
        <div className="overflow-auto h-full pb-8">
          {Graph.graphs.slice(0, numberOfOverview).map((x) => (
            <div
              className="w-1/4 hover:bg-sky-700 inline-block"
              onClick={() => {
                setSelectedGraph(x.id);
                router.push("/" + x.id);
              }}
            >
              <OverviewMatrix data={x}></OverviewMatrix>
>>>>>>> main
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
