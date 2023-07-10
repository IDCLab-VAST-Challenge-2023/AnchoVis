import { useState } from "react";
import Matrix from "../components/matrix";
import Graph from "../data/graphs.json";

export default function Home() {
  const [selectedGraph, setSelectedGraph] = useState(1);
  return (
    <main>
      <div className="flex">
        <ul className="h-[600px] overflow-auto">
          {Graph.graphs.map((x) => (
            <li
              className="p-2 cursor-pointer	hover:bg-sky-700"
              onClick={() => setSelectedGraph(x.id)}
            >
              <p>graph id: {x.id}</p>
              <p>number of node: {x.num_nodes}</p>
              <p>number of edges: {x.num_edges}</p>
            </li>
          ))}
        </ul>
        <div className="w-full p-10">
          <div>
            <p>selectedGraphID: {selectedGraph}</p>
            <p>number of node: {Graph.graphs[selectedGraph - 1].num_nodes}</p>
            <p>number of edges: {Graph.graphs[selectedGraph - 1].num_edges}</p>
          </div>
          <Matrix data={Graph.graphs[selectedGraph - 1]}></Matrix>
        </div>
      </div>
    </main>
  );
}
