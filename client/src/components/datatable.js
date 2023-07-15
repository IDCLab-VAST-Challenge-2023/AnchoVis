import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function DataTable({ data, selectGraph, setSelectGraph }) {
  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 sm:px-6 lg:px-8">
          <table className="text-center text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="sticky left-0 bg-white z-10">
                  <div className="px-6 py-4 w-full border-r">Network ID</div>
                </th>
                {data.map((x, i) => (
                  <th scope="col" className="px-6 py-4 cursor-pointer hover:bg-slate-400" key={i} onClick={() => setSelectGraph(x.id)}>
                    {x.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed ticky left-0">
                  <div className="px-6 py-4 w-full border-r">Fishing</div>
                </td>
                {data.map((x, i) => (
                  <td scope="col" className="px-6 py-4" key={i}>
                    <FontAwesomeIcon icon={faFish} />{" "}
                    <FontAwesomeIcon icon={faXmark} /> {x.num_ocean_nodes}
                  </td>
                ))}
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r">
                    Max similarity
                  </div>
                </td>
                {data.map((x, i) => {
                    let maxSimilarity = 0
                    x.graph.nodes.forEach((y) => { if (y.similarity > maxSimilarity) maxSimilarity = y.similarity })
                    return <td className="whitespace-nowrap px-6 py-4" key={i}>{maxSimilarity}</td>
                  })
                }
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r">Revenue</div>
                </td>
                {data.map((x, i) => (
                    <td className="whitespace-nowrap px-6 py-4" key={i}>{x.average_revenue}</td>
                  ))
                }
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r"># of Nodes</div>
                </td>
                {data.map((x, i) => (
                    <td className="whitespace-nowrap px-6 py-4" key={i}>{x.num_nodes}</td>
                  ))
                }
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r"># of Links</div>
                </td>
                {data.map((x, i) => (
                    <td className="whitespace-nowrap px-6 py-4" key={i}>{x.num_links}</td>
                  ))
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
