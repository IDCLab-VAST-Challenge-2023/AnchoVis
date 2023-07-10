import "./style.scss";
import * as d3 from "d3";
import { AM } from "./src/AM";
import data from "./public/data/ocean_graphs.json";

async function main() {
  console.log(data);
  const main = d3.select("#app");
  const graphs = data.graphs;
  graphs.shift();
  graphs.forEach((graph, i) => {
    let am = AM();
    am.update(graph);
    console.log(main.node());
    main.node().appendChild(am.element);
  });
  // await d3
  //   .csv(
  //     "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv"
  //   )
  //   .then((data) => {
  //     console.log(data);
  //   });
}

main();
