// import * as d3 from "d3";

// export function AM() {
//   const margin = { top: 70, right: 20, bottom: 20, left: 70 };
//   const [width, height] = [
//     800 - margin.left - margin.right,
//     800 - margin.top - margin.bottom,
//   ];
//   const svg = d3
//     .create("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom);

//   function update(graph, oceanNodes) {
//     const title = svg
//       .append("g")
//       .attr("transform", `translate(${width / 2}, ${margin.top / 2})`)
//       .append("text")
//       .attr("text-anchor", "middle")
//       .text(`Graph ID: ${graph.id}`);

//     const container = svg
//       .append("g")
//       .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     const nodes = graph.graph.nodes;
//     const links = graph.graph.links;

//     const xScale = d3
//       .scaleBand()
//       .padding(0.01)
//       .domain(nodes.map((d) => d.id))
//       .range([0, width]);
//     const yScale = d3
//       .scaleBand()
//       .padding(0.01)
//       .domain(nodes.map((d) => d.id))
//       .range([0, height]);

//     const xAxis = container
//       .append("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(${0}, ${0})`)
//       .call(d3.axisTop(xScale));
//     const yAxis = container
//       .append("g")
//       .attr("class", "y-axis")
//       .attr("transform", `translate(${0}, ${0})`)
//       .call(d3.axisLeft(yScale));

//     let matrix = [];
//     nodes.forEach((src) => {
//       nodes.forEach((trg) => {
//         matrix.push({
//           source: src.id,
//           target: trg.id,
//           value: -1,
//           ocean: false,
//         });
//       });
//     });
//     nodes.forEach((n, i) => {
//       matrix[i * nodes.length + i].value = n.is_source;
//       matrix[i * nodes.length + i].ocean = oceanNodes.includes(n.id);
//       console.log(oceanNodes.includes(n.id));
//     });
//     links.forEach((l) => {
//       let src = nodes.findIndex((n) => n.id === l.source);
//       let trg = nodes.findIndex((n) => n.id === l.target);
//       matrix[src * nodes.length + trg].value = l.type;
//       matrix[trg * nodes.length + src].value = l.type;
//     });

//     const cells = container
//       .append("g")
//       .selectAll("rect")
//       .data(matrix)
//       .join("rect")
//       .attr("x", (d) => xScale(d.source))
//       .attr("y", (d) => yScale(d.target))
//       .attr("width", xScale.bandwidth())
//       .attr("height", yScale.bandwidth())
//       .attr("fill", (d) =>
//         d.value === "Beneficial Owner"
//           ? "red"
//           : d.value === "Company Contacts"
//           ? "blue"
//           : d.value === 1
//           ? "green"
//           : d.value === 0
//           ? "yellow"
//           : "white"
//       )
//       .attr("stroke", (d) => (d.ocean ? "black" : "none"))
//       .attr("stroke-width", (d) => (d.ocean ? 8 : 0));
//   }
//   return {
//     element: svg.node(),
//     update,
//   };
// }

// 우리 버전
import * as d3 from "d3";

export function AM() {
  const margin = { top: 80, right: 20, bottom: 20, left: 40 };
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
      .attr("transform", `translate(${margin.left}, ${20})`)
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
      .attr("text-anchor", "end")
      .attr("font-size", "16px")
      .attr("transform", `translate(${0}, ${10})`);
    labels
      .append("text")
      .text("y: sources")
      .attr("text-anchor", "start")
      .attr("font-size", "16px")
      .attr("transform", `translate(${80}, ${40})`);

    const container = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const nodes = graph.graph.nodes;
    const links = graph.graph.links;
    const sourceNodes = nodes.filter((n) => n.is_source);
    const targetNodes = nodes.filter((n) => !n.is_source);

    const xScale = d3
      .scaleBand()
      .padding(0.02)
      .domain(targetNodes.map((_, i) => i + 1))
      .range([0, width]);
    const yScale = d3
      .scaleBand()
      .padding(0.02)
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
          ? d3.schemeTableau10[2]
          : d.value === "Company Contacts"
          ? d3.schemeTableau10[0]
          : "whitesmoke"
      );
  }
  return {
    element: svg.node(),
    update,
  };
}
