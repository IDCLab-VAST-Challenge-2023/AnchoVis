import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function detailTable({ data }) {
  return(
    <div className="flex flex-col overflow-y-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 sm:px-6 lg:px-8">
          <table className="text-center text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="sticky left-0 bg-white z-10">
                  <div className="px-6 py-4 w-full border-r">Source ID</div>
                </th>
                <th scope="col" className="px-6 py-4">
                  Fishing
                </th>
                <th scope="col" className="px-6 py-4">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-4">
                  Similarity
                </th>
                <th scope="col" className="px-6 py-4">
                  Country
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.graph.nodes.map((x, i) => (
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap font-medium fixed ticky left-0">
                      <div className="px-6 py-4 w-full border-r">{x.id}</div>
                    </td>
                    <td scope="col" className="px-6 py-4">
                      {
                        x.is_ocean ?
                          <FontAwesomeIcon icon={faFish} />
                        :
                          <FontAwesomeIcon icon={faXmark} />
                      }
                    </td>
                    <td scope="col" className="px-6 py-4">
                      {x.total_revenue}
                    </td>
                    <td scope="col" className="px-6 py-4">
                      {x.similarity}
                    </td>
                    <td scope="col" className="px-6 py-4">
                      {x.country}
                    </td>
                  </tr>
                ))
              }
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed ticky left-0">
                  <div className="px-6 py-4 w-full border-r">Fishing</div>
                </td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r">
                    Max similarity
                  </div>
                </td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r">Revenue</div>
                </td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r"># of Nodes</div>
                </td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r"># of Links</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
