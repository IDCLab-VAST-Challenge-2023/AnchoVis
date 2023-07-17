import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
export default function DataTable({ data, selectedGraph, setSelectGraph }) {
  console.log("DataTable");
  const [hoveredGraph, setHoveredGraph] = useState(null);

  function hoverSelectHandler(id) {
    if (id === selectedGraph) return "rgb(148 163 184)";
    else if (id === hoveredGraph) return "rgb(226 232 240)";
    else return "white";
  }

  // find maxSimilarity and memo to x.maxSimilarity
  data.forEach((x) => {
    x.maxSimilarity = 0;
    x.graph.nodes.forEach((y) => {
      if (y.similarity > x.maxSimilarity) x.maxSimilarity = y.similarity;
    });
  });

  return (
    <Flex direction="column" overflowY="auto">
      <Table variant="simple" size="sm" p={0}>
        <Thead position={"sticky"} top={0}>
          <Tr>
            <Th>ID</Th>
            <Th>Fishing</Th>
            <Th>Max similarity</Th>
            {/* <Th>Revenue</Th> */}
            <Th># of Nodes</Th>
            <Th># of Links</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((x, i) => (
            <Tr
              key={i}
              style={{ backgroundColor: hoverSelectHandler(x.id) }}
              onClick={() => setSelectGraph(x.id)}
              onMouseOver={() => setHoveredGraph(x.id)}
              onMouseOut={() => setHoveredGraph(null)}
            >
              <Td p={0} isNumeric>{x.id}</Td>
              <Td>
                <FontAwesomeIcon icon={faFish} />{" "}
                <FontAwesomeIcon icon={faXmark} /> {x.num_ocean_nodes}
              </Td>
              <Td isNumeric>{x.maxSimilarity.toFixed(2)}</Td>
              {/* <Td isNumeric>{x.average_revenue}</Td> */}
              <Td isNumeric>{x.graph.nodes.length}</Td>
              <Td isNumeric>{x.graph.links.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );

  //               )

  //               return (
  //               <div className="flex flex-col overflow-y-auto">
  //                 <div className="sm:-mx-6 lg:-mx-8">
  //                   <div className="inline-block py-2 sm:px-6 lg:px-8">
  //                     <table className="text-center text-sm font-light">
  //                       <thead className="border-b font-medium dark:border-neutral-500">
  //                         <tr>
  //                           <th scope="col" className="sticky left-0 bg-white z-10">
  //                             <div className="px-6 py-4 w-full border-r">Network ID</div>
  //                           </th>
  //                           {data.map((x, i) => (
  //                             <th
  //                               scope="col"
  //                               className={"px-6 py-4 cursor-pointer"}
  //                               style={{ backgroundColor: hoverSelectHandler(x.id) }}
  //                               key={i}
  //                               onClick={() => setSelectGraph(x.id)}
  //                               onMouseOver={() => setHoveredGraph(x.id)}
  //                               onMouseOut={() => setHoveredGraph(null)}
  //                             >
  //                               {x.id}
  //                             </th>
  //                           ))}
  //                         </tr>
  //                       </thead>
  //                       <tbody>
  //                         <tr className="border-b dark:border-neutral-500">
  //                           <td className="whitespace-nowrap font-medium fixed ticky left-0">
  //                             <div className="px-6 py-4 w-full border-r">Fishing</div>
  //                           </td>
  //                           {data.map((x, i) => (
  //                             <td
  //                               scope="col"
  //                               className={"px-6 py-4 cursor-pointer"}
  //                               style={{ backgroundColor: hoverSelectHandler(x.id) }}
  //                               key={i}
  //                               onClick={() => setSelectGraph(x.id)}
  //                               onMouseOver={() => setHoveredGraph(x.id)}
  //                               onMouseOut={() => setHoveredGraph(null)}
  //                             >
  //                               <FontAwesomeIcon icon={faFish} />{" "}
  //                               <FontAwesomeIcon icon={faXmark} /> {x.num_ocean_nodes}
  //                             </td>
  //                           ))}
  //                         </tr>
  //                         <tr className="border-b dark:border-neutral-500">
  //                           <td className="whitespace-nowrap font-medium fixed">
  //                             <div className="px-6 py-4 w-full border-r">
  //                               Max similarity
  //                             </div>
  //                           </td>
  //                           {data.map((x, i) => (
  //                             <td
  //                               className={"whitespace-nowrap px-6 py-4 cursor-pointer"}
  //                               style={{ backgroundColor: hoverSelectHandler(x.id) }}
  //                               key={i}
  //                               onClick={() => setSelectGraph(x.id)}
  //                               onMouseOver={() => setHoveredGraph(x.id)}
  //                               onMouseOut={() => setHoveredGraph(null)}
  //                             >
  //                               {x.maxSimilarity}
  //                             </td>
  //                           ))}
  //                         </tr>
  //                         <tr className="border-b dark:border-neutral-500">
  //                           <td className="whitespace-nowrap font-medium fixed">
  //                             <div className="px-6 py-4 w-full border-r">Revenue</div>
  //                           </td>
  //                           {data.map((x, i) => (
  //                             <td
  //                               className={"whitespace-nowrap px-6 py-4 cursor-pointer"}
  //                               style={{ backgroundColor: hoverSelectHandler(x.id) }}
  //                               key={i}
  //                               onClick={() => setSelectGraph(x.id)}
  //                               onMouseOver={() => setHoveredGraph(x.id)}
  //                               onMouseOut={() => setHoveredGraph(null)}
  //                             >
  //                               {x.average_revenue}
  //                             </td>
  //                           ))}
  //                         </tr>
  //                         <tr className="border-b dark:border-neutral-500">
  //                           <td className="whitespace-nowrap font-medium fixed">
  //                             <div className="px-6 py-4 w-full border-r"># of Nodes</div>
  //                           </td>
  //                           {data.map((x, i) => (
  //                             <td
  //                               className={"whitespace-nowrap px-6 py-4 cursor-pointer"}
  //                               style={{ backgroundColor: hoverSelectHandler(x.id) }}
  //                               key={i}
  //                               onClick={() => setSelectGraph(x.id)}
  //                               onMouseOver={() => setHoveredGraph(x.id)}
  //                               onMouseOut={() => setHoveredGraph(null)}
  //                             >
  //                               {x.num_nodes}
  //                             </td>
  //                           ))}
  //                         </tr>
  //                         <tr className="border-b dark:border-neutral-500">
  //                           <td className="whitespace-nowrap font-medium fixed">
  //                             <div className="px-6 py-4 w-full border-r"># of Links</div>
  //                           </td>
  //                           {data.map((x, i) => (
  //                             <td
  //                               className={"whitespace-nowrap px-6 py-4  cursor-pointer"}
  //                               style={{ backgroundColor: hoverSelectHandler(x.id) }}
  //                               key={i}
  //                               onClick={() => setSelectGraph(x.id)}
  //                               onMouseOver={() => setHoveredGraph(x.id)}
  //                               onMouseOut={() => setHoveredGraph(null)}
  //                             >
  //                               {x.num_links}
  //                             </td>
  //                           ))}
  //                         </tr>
  //                       </tbody>
  //                     </table>
  //                   </div>
  //                 </div>
  //               </div>
  //               );
  // }
}
