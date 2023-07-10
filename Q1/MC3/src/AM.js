import * as d3 from "d3";

export function AM() {
  const margin = { top: 70, right: 20, bottom: 20, left: 70 };
  const [width, height] = [
    800 - margin.left - margin.right,
    800 - margin.top - margin.bottom,
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

    const xScale = d3
      .scaleBand()
      .padding(0.01)
      .domain(nodes.map((d) => d.id))
      .range([0, width]);
    const yScale = d3
      .scaleBand()
      .padding(0.01)
      .domain(nodes.map((d) => d.id))
      .range([0, height]);

    const xAxis = container
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${0}, ${0})`)
      .call(d3.axisTop(xScale));
    const yAxis = container
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${0}, ${0})`)
      .call(d3.axisLeft(yScale));

    let matrix = [];
    nodes.forEach((src) => {
      nodes.forEach((trg) => {
        matrix.push({
          source: src.id,
          target: trg.id,
          value: -1,
          ocean: false,
        });
      });
    });
    nodes.forEach((n, i) => {
      matrix[i * nodes.length + i].value = n.is_source;
      matrix[i * nodes.length + i].ocean = oceanNodes.includes(n.id);
      console.log(oceanNodes.includes(n.id));
    });
    links.forEach((l) => {
      let src = nodes.findIndex((n) => n.id === l.source);
      let trg = nodes.findIndex((n) => n.id === l.target);
      matrix[src * nodes.length + trg].value = l.type;
      matrix[trg * nodes.length + src].value = l.type;
    });

    const cells = container
      .append("g")
      .selectAll("rect")
      .data(matrix)
      .join("rect")
      .attr("x", (d) => xScale(d.source))
      .attr("y", (d) => yScale(d.target))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) =>
        d.value === "Beneficial Owner"
          ? "red"
          : d.value === "Company Contacts"
          ? "blue"
          : d.value === 1
          ? "green"
          : d.value === 0
          ? "yellow"
          : "white"
      )
      .attr("stroke", (d) => (d.ocean ? "black" : "none"))
      .attr("stroke-width", (d) => (d.ocean ? 8 : 0));
  }
  return {
    element: svg.node(),
    update,
  };
}
