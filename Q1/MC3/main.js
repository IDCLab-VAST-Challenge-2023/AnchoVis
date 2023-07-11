import "./style.scss";
import * as d3 from "d3";
import { AM } from "./src/AM";
import { BP } from "./src/BP";
import data from "./public/data/ocean_graphs.json";

async function main() {
  let oceanNodes;
  console.log(data);
  await d3.csv("./public/data/ocean_nodes.csv").then((data) => {
    oceanNodes = data;
  });
  console.log(oceanNodes);
  const main = d3.select("#app");
  const graphs = data.graphs;
  graphs.shift();
  graphs.forEach((graph, i) => {
    let am = AM();
    am.update(
      graph,
      oceanNodes.map((n) => n.id)
    );
    main.node().appendChild(am.element);
  });

  // const main = d3.select("#app");
  // const graphs = data.graphs;
  //graphs.shift();
  graphs.forEach((graph, i) => {
    let bp = BP();
    bp.update(
      graph,
      oceanNodes.map((n) => n.id)
    );
    main.node().appendChild(bp.element);
  });
}

main();
