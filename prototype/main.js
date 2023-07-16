import "./style.scss";
import * as d3 from "d3";
import { AM } from "./src/AM";
import { BP } from "./src/BP";
import { symAM } from "./src/symAM";
import data from "./public/data/graphs.json";

async function main() {
  let oceanNodes;
  console.log(data);
  await d3.csv("./public/data/ocean_nodes.csv").then((d) => {
    oceanNodes = d;
  });
  console.log(oceanNodes);

  const main = d3.select("#app");
  const mainDiv = main.append("div").attr("id", "main");
  // const amDiv = main.append("div").attr("id", "am");
  // const bpDiv = main.append("div").attr("id", "bp");

  const graphs = data.graphs.filter((g) => g.graph.nodes.length > 10);
  graphs.shift();
  graphs.forEach((graph, i) => {
    let am = AM();
    am.update(
      graph,
      oceanNodes.map((n) => n.id)
    );
    mainDiv.node().appendChild(am.element);
  });

  graphs.forEach((graph, i) => {
    let bp = BP();
    bp.update(
      graph,
      oceanNodes.map((n) => n.id)
    );
    mainDiv.node().appendChild(bp.element);
  });

  graphs.forEach((graph, i) => {
    let symAm = symAM();
    symAm.update(
      graph,
      oceanNodes.map((n) => n.id)
    );
    mainDiv.node().appendChild(symAm.element);
  });

  const modeSelector = d3.select("#mode");
  modeSelector.on("click", () => {
    if (modeSelector.classed("btn-primary")) {
      modeSelector.classed("btn-primary", false);
      modeSelector.classed("btn-secondary", true);
      modeSelector.text("BP");
      amDiv.style("display", "none");
      bpDiv.style("display", "block");
    } else {
      modeSelector.classed("btn-primary", true);
      modeSelector.classed("btn-secondary", false);
      modeSelector.text("AM");
      amDiv.style("display", "block");
      bpDiv.style("display", "none");
    }
  });
}

main();
