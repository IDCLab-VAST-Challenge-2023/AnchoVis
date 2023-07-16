import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function detailTable({ data, filter }) {
  console.log(data);
  const maxSrcSize = 200;
  const maxTrgSize = 200;
  const srcInfo = {};
  const src = {};
  const trg = {};
  const linkType = {};
  for (const node of data.graph.nodes) {
    srcInfo[node.id] = node;
  }
  for (const link of data.graph.links) {
    if (
      srcInfo[link.source].is_ocean >= 1 * filter.isFish &&
      srcInfo[link.source].similarity >= filter.minSimilarity &&
      srcInfo[link.source].total_revenue >= filter.minRevenue
    ) {
      if (link.source in src) src[link.source] += 1;
      else src[link.source] = 1;
      if (link.target in trg) trg[link.target] += 1;
      else trg[link.target] = 1;
      linkType[[link.source, link.target]] = link.type;
    }
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
  srcList = srcList.filter((x) => x[1] > 0);
  trgList = trgList.filter((x) => x[1] > 0);

  const matrixValue = [];
  for (let i = 0; i < Math.min(srcList.length, maxTrgSize); i++) {
    const tmp = [];
    for (let j = 0; j < Math.min(trgList.length, maxSrcSize); j++) {
      tmp.push({
        type: linkType[[srcList[i][0], trgList[j][0]]],
        src: srcList[i][0],
        trg: trgList[j][0],
      });
    }
    matrixValue.push(tmp);
  }
  function getSrcIndex(srcValue) {
    for (let i = 0; i < matrixValue.length; i++) {
      if (matrixValue[i].length > 0 && matrixValue[i][0].src === srcValue) {
        return i;
      }
    }
    return -1;
  }

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 sm:px-6 lg:px-8">
          <table className="text-center text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr key="column_row">
                <th
                  scope="col"
                  className="sticky left-0 bg-white z-10"
                  key="sourceID"
                >
                  <div className="px-6 py-4 w-full border-r">Source ID</div>
                </th>
                <th scope="col" className="px-6 py-4" key="fishing">
                  Fishing
                </th>
                <th scope="col" className="px-6 py-4" key="revenue">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-4" key="similarity">
                  Similarity
                </th>
                <th scope="col" className="px-6 py-4" key="country">
                  Country
                </th>
                {trgList.slice(0, maxTrgSize).map((x, i) => (
                  <th scope="col" className="px-6 py-4" key={`trg${i}`}>
                    {x[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {srcList
                .slice(0, maxSrcSize)
                .filter((x) => srcInfo[x[0]].is_ocean >= 1 * filter.isFish)
                .filter((x) => srcInfo[x[0]].similarity >= filter.minSimilarity)
                .filter((x) => srcInfo[x[0]].total_revenue >= filter.minRevenue)
                .map((x, i) => {
                  x = srcInfo[x[0]];

                  let idx = getSrcIndex(x.id);
                  return (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={`row${i}`}
                    >
                      <td
                        className="whitespace-nowrap font-medium fixed ticky left-0"
                        key={x.id}
                      >
                        <div className="px-6 py-4 w-full border-r">{x.id}</div>
                      </td>
                      <td
                        scope="col"
                        className="px-6 py-4"
                        key={`is_ocean${i}`}
                      >
                        {x.is_ocean ? (
                          <FontAwesomeIcon icon={faFish} />
                        ) : (
                          <FontAwesomeIcon icon={faXmark} />
                        )}
                      </td>
                      <td
                        scope="col"
                        className="px-6 py-4"
                        key={`total_revenue${i}`}
                      >
                        {x.total_revenue}
                      </td>
                      <td
                        scope="col"
                        className="px-6 py-4"
                        key={`similarity${i}`}
                      >
                        {x.similarity}
                      </td>
                      <td scope="col" className="px-6 py-4" key={`country${i}`}>
                        {x.country}
                      </td>
                      {matrixValue[idx].map((y, j) => {
                        function getColor(type) {
                          if (type === "Beneficial Owner")
                            return { background: "#4e79a7", color: "#ffffff" };
                          else if (type === "Company Contacts")
                            return { background: "#f28e2b", color: "#000000" };
                          else
                            return { background: "#f4f4f4", color: "#000000" };
                        }
                        const style = getColor(y.type);

                        return (
                          <td
                            scope="col"
                            className="px-6 py-4"
                            style={style}
                            key={`matrix${i}${j}`}
                          >
                            {y.type}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
