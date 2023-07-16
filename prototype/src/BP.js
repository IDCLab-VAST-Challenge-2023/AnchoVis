import * as d3 from "d3";

export function BP() {
  const margin = { top: 90, right: 20, bottom: 20, left: 20 };
  const [width, height] = [
    600 - margin.left - margin.right,
    300 - margin.top - margin.bottom,
  ];
  const svg = d3
    .create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  function update(graph, oceanNodes) {
    const title = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${15})`)
      .append("text")
      .attr("text-anchor", "start")
      .attr("font-size", "16px")
      .text(`Graph ID: ${graph.id}`);

    const labels = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top / 2})`);

    labels
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", d3.schemeCategory10[0]);
    labels
      .append("text")
      .text("Sources")
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .attr("font-size", "14px")
      .attr("transform", `translate(${10}, ${1})`);

    labels
      .append("circle")
      .attr("cx", 80)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", d3.schemeCategory10[1]);
    labels
      .append("text")
      .text("Targets")
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .attr("font-size", "14px")
      .attr("transform", `translate(${90}, ${1})`);

    labels
      .append("rect")
      .attr("x", -5)
      .attr("y", 13.5)
      .attr("width", 10)
      .attr("height", 3)
      .attr("fill", d3.schemeCategory10[2]);
    labels
      .append("text")
      .text("Beneficial Owner")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${10}, ${20})`);

    labels
      .append("rect")
      .attr("x", 140)
      .attr("y", 13.5)
      .attr("width", 10)
      .attr("height", 3)
      .attr("fill", d3.schemeCategory10[3]);
    labels
      .append("text")
      .text("Company Contacts")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${155}, ${20})`);

    const container = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const nodes = graph.graph.nodes;
    const links = graph.graph.links;
    const sourceNodes = nodes.filter((n) => n.is_source);
    const targetNodes = nodes.filter((n) => !n.is_source);

    const sourceScale = d3
      .scalePoint()
      .domain(sourceNodes.map((d) => d.id))
      .range([5, width - 5]);

    const targetScale = d3
      .scalePoint()
      .domain(targetNodes.map((d) => d.id))
      .range([5, width - 5]);

    const srcCircles = container
      .append("g")
      .selectAll("circle")
      .data(sourceNodes)
      .join("circle")
      .attr("cx", (d) => sourceScale(d.id))
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", d3.schemeCategory10[0]);

    const trgCircles = container
      .append("g")
      .selectAll("circle")
      .data(targetNodes)
      .join("circle")
      .attr("cx", (d) => targetScale(d.id))
      .attr("cy", height)
      .attr("r", 5)
      .attr("fill", d3.schemeCategory10[1]);

    const linkPath = container
      .append("g")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", (d) => {
        const src = sourceNodes.find((n) => n.id === d.source);
        const trg = targetNodes.find((n) => n.id === d.target);
        return `M ${sourceScale(src.id)} 0 L ${targetScale(trg.id)} ${height}`;
      })
      .attr("stroke", (l) =>
        l.type === "Beneficial Owner"
          ? d3.schemeCategory10[2]
          : d3.schemeCategory10[3]
      )
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("opacity", 0.5);
  }
  return {
    element: svg.node(),
    update,
  };
}
