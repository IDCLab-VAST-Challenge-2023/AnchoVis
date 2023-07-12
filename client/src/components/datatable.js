import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function DataTable({ data }) {
  const data2 = [
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["1", "2", "3", "4", "5", "6", "7", "8"],
  ];
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
                {data2[0].map((x, i) => (
                  <th scope="col" className="px-6 py-4 " key={i}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed ticky left-0">
                  <div className="px-6 py-4 w-full border-r">Fishing</div>
                </td>
                {data2[1].map((x, i) => (
                  <td scope="col" className="px-6 py-4" key={i}>
                    <FontAwesomeIcon icon={faFish} />{" "}
                    <FontAwesomeIcon icon={faXmark} /> {x}
                  </td>
                ))}
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r">
                    Max similarity
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                <td className="whitespace-nowrap px-6 py-4">@fat</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r">Revenue</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">Larry</td>
                <td className="whitespace-nowrap px-6 py-4">Wild</td>
                <td className="whitespace-nowrap px-6 py-4">@twitter</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r"># of Nodes</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">Larry</td>
                <td className="whitespace-nowrap px-6 py-4">Wild</td>
                <td className="whitespace-nowrap px-6 py-4">@twitter</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap font-medium fixed">
                  <div className="px-6 py-4 w-full border-r"># of Links</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">Larry</td>
                <td className="whitespace-nowrap px-6 py-4">Wild</td>
                <td className="whitespace-nowrap px-6 py-4">@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
