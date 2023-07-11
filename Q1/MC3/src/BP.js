import * as d3 from "d3";

export function BP() {
  const margin = { top: 70, right: 20, bottom: 20, left: 70 };
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
      .attr("transform", `translate(${width / 2}, ${margin.top / 2})`)
      .append("text")
      .attr("text-anchor", "middle")
      .text(`Graph ID: ${graph.id}`);

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
      .attr("r", 3)
      .attr("fill", d3.schemeTableau10[0]);

    const trgCircles = container
      .append("g")
      .selectAll("circle")
      .data(targetNodes)
      .join("circle")
      .attr("cx", (d) => targetScale(d.id))
      .attr("cy", height)
      .attr("r", 3)
      .attr("fill", d3.schemeTableau10[1]);

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
      .attr("stroke", (l) => (l.type === "Beneficial Owner" ? "red" : "blue"))
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }
  return {
    element: svg.node(),
    update,
  };
}
