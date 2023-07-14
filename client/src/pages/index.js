import { useState } from "react";
import { useRouter } from "next/router";
import OverviewMatrix from "../components/overviewMatrix";
import Matrix from "../components/matrix";
import Graph from "../data/graphs.json";

export default function Home() {
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
