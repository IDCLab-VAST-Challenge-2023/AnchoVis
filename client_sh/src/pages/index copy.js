import { useState } from "react";
import Header from "../components/header";
import OverviewMatrix from "../components/overviewMatrix";
import Matrix from "../components/matrix";
import Graph from "../data/graphs.json";

export default function Home() {
  const numberOfOverview = 50;
  const [selectedGraph, setSelectedGraph] = useState(1);
  return (
    <main className="h-full">
      <Header />
      <div className="flex h-full">
        <div className="w-1/2 m-2 h-full">
          <h1 className="text-xl">Overview</h1>
          <div className="overflow-auto h-full">
            {Graph.graphs.slice(0, numberOfOverview).map((x) => (
              <div
                className="w-1/2 hover:bg-sky-700 inline-block"
                onClick={() => setSelectedGraph(x.id)}
              >
                <OverviewMatrix data={x}></OverviewMatrix>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 m-2">
          <h1 className="text-xl">Detail</h1>
          <div className="w-full">
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
