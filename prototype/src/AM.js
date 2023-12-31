// 우리 버전
import * as d3 from "d3";

export function AM() {
  const margin = { top: 90, right: 20, bottom: 20, left: 40 };
  const [width, height] = [
    600 - margin.left - margin.right,
    320 - margin.top - margin.bottom,
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
      .append("text")
      .text("x: targets")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${0}, ${0})`);
    labels
      .append("text")
      .text("y: sources")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${70}, ${0})`);

    labels
      .append("rect")
      .attr("x", 0)
      .attr("y", 10)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", d3.schemeTableau10[0]);
    labels
      .append("text")
      .text("Beneficial Owner")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${15}, ${20})`);

    labels
      .append("rect")
      .attr("x", 150)
      .attr("y", 10)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", d3.schemeTableau10[1]);
    labels
      .append("text")
      .text("Company Contacts")
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("transform", `translate(${165}, ${20})`);

    const container = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const nodes = graph.graph.nodes;
    const links = graph.graph.links;
    const sourceNodes = nodes.filter((n) => n.is_source);
    const targetNodes = nodes.filter((n) => !n.is_source);

    const xScale = d3
      .scaleBand()
      .padding(0.03)
      .domain(targetNodes.map((_, i) => i + 1))
      .range([0, width]);
    const yScale = d3
      .scaleBand()
      .padding(0.03)
      .domain(sourceNodes.map((_, i) => i + 1))
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
    sourceNodes.forEach((s, i) => {
      targetNodes.forEach((t, j) => {
        matrix.push({
          source: s.id,
          target: t.id,
          value: 0,
          ocean: false,
          x: xScale(j + 1),
          y: yScale(i + 1),
        });
      });
    });

    // nodes.forEach((n, i) => {
    //   matrix[i * targetNodes.length + i].value = n.is_source;
    //   matrix[i * targetNodes.length + i].ocean = oceanNodes.includes(n.id);
    //   console.log(oceanNodes.includes(n.id));
    // });

    links.forEach((l) => {
      let src = sourceNodes.findIndex((n) => n.id === l.source);
      let trg = targetNodes.findIndex((n) => n.id === l.target);
      matrix[src * targetNodes.length + trg].value = l.type;
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
          ? d3.schemeTableau10[0]
          : d.value === "Company Contacts"
          ? d3.schemeTableau10[1]
          : "whitesmoke"
      );
  }
  return {
    element: svg.node(),
    update,
  };
}
