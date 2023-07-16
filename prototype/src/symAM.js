import * as d3 from "d3";

export function symAM() {
  const margin = { top: 80, right: 20, bottom: 20, left: 40 };
  const [width, height] = [
    600 - margin.left - margin.right,
    600 - margin.top - margin.bottom,
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
      .attr("transform", `translate(${margin.left}, ${25})`);

    labels
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", d3.schemeCategory10[0]);
    labels
      .append("text")
      .text("Sources")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${15}, ${10})`);
    labels
      .append("rect")
      .attr("x", 90)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", d3.schemeCategory10[1]);
    labels
      .append("text")
      .text("Targets")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${105}, ${10})`);
    labels
      .append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", d3.schemeCategory10[2]);
    labels
      .append("text")
      .text("Beneficial Owner")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${15}, ${30})`);

    labels
      .append("rect")
      .attr("x", 150)
      .attr("y", 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", d3.schemeCategory10[3]);
    labels
      .append("text")
      .text("Company Contacts")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${165}, ${30})`);

    const container = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const nodes = graph.graph.nodes;
    const links = graph.graph.links;

    const xScale = d3
      .scaleBand()
      .padding(0.03)
      .domain(nodes.map((_, i) => i + 1))
      .range([0, width]);
    const yScale = d3
      .scaleBand()
      .padding(0.03)
      .domain(nodes.map((_, i) => i + 1))
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
    nodes.forEach((src, i) => {
      nodes.forEach((trg, j) => {
        matrix.push({
          source: src.id,
          target: trg.id,
          value: -1,
          ocean: false,
          x: xScale(i + 1),
          y: yScale(j + 1),
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
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) =>
        d.value === "Beneficial Owner"
          ? d3.schemeCategory10[2]
          : d.value === "Company Contacts"
          ? d3.schemeCategory10[3]
          : d.value === 1
          ? d3.schemeCategory10[0]
          : d.value === 0
          ? d3.schemeCategory10[1]
          : "white"
      )
      .attr("stroke", (d) => (d.ocean ? "black" : "none"))
      .attr("stroke-width", (d) => (d.ocean ? 4 : 0));
  }
  return {
    element: svg.node(),
    update,
  };
}
