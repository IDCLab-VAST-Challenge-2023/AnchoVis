import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, Tooltip } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

export default function Matrix({ data }) {
  ChartJS.register(MatrixController, MatrixElement, LinearScale, Tooltip);
  let src = {};
  let trg = {};
  let linkType = {};
  for (const link of data.graph.links) {
    if (link.source in src) src[link.source] += 1;
    else src[link.source] = 1;
    if (link.target in trg) trg[link.target] += 1;
    else trg[link.target] = 1;
    linkType[[link.source, link.target]] = link.type;
  }
  let srcList = [];
  let trgList = [];
  for (const s in src) {
    srcList.push([s, src[s]]);
  }
  for (const t in trg) {
    trgList.push([t, trg[t]]);
  }
  srcList.sort((a, b) => b[1] - a[1]);
  trgList.sort((a, b) => b[1] - a[1]);
  let matrixValue = [];
  for (let i = 0; i < Math.min(trgList.length, 20); i++) {
    for (let j = 0; j < Math.min(srcList.length, 20); j++) {
      matrixValue.push({
        x: i + 1,
        y: j + 1,
        type: linkType[[srcList[j][0], trgList[i][0]]],
        src: srcList[j][0],
        trg: trgList[i][0],
      });
    }
  }
  const config = {
    type: "matrix",
    data: {
      datasets: [
        {
          label: "Basic matrix",
          data: matrixValue,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.5)",
          backgroundColor(context) {
            if (
              context.dataset.data[context.dataIndex].type ===
              "Beneficial Owner"
            ) {
              return "red";
            } else if (
              context.dataset.data[context.dataIndex].type ===
              "Company Contacts"
            ) {
              return "blue";
            }
            return "gray";
          },
          width: ({ chart }) =>
            (chart.chartArea || {}).width / Math.min(trgList.length, 20) - 1,
          height: ({ chart }) =>
            (chart.chartArea || {}).height / Math.min(srcList.length, 20) - 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: false,
        tooltip: {
          displayColors: false,
          callbacks: {
            title() {
              return "";
            },
            label(context) {
              const v = context.dataset.data[context.dataIndex];
              return ["src: " + v.src, "trg: " + v.trg, "type: " + v.type];
            },
          },
        },
      },
      scales: {
        x: {
          position: "top",
          ticks: {
            stepSize: 1,
          },
          grid: {
            display: false,
          },
        },
        y: {
          offset: true,
          ticks: {
            stepSize: 1,
          },
          grid: {
            display: false,
          },
        },
      },
    },
  };

  return (
    <>
      <Chart
        type={config.type}
        data={config.data}
        options={config.options}
      ></Chart>
    </>
  );
}
