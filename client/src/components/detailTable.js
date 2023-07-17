import { faFish } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const colorMap = {
  "Beneficial Owner": "#4e79a7",
  "Company Contacts": "#f28e2b",
};

export default function detailTable({ data, filter }) {
  console.log("detailTable");
  // console.log(data);
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
  for (let i = 0; i < srcList.length; i++) {
    const tmp = [];
    for (let j = 0; j < trgList.length; j++) {
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
    <Box display={"block"} w={"full"}>
      <Box overflowY="scroll" maxH={"80vh"}>
        <Table variant="unstyled" size="sm" layout="fixed" w="fit-content">
          <Thead>
            <Tr
              style={{ position: "sticky", top: 0 }}
              bgColor={"gray.100"}
              verticalAlign={"center"}
              zIndex={3}
            >
              <Th w={200} h={12} style={{ left: 0, position: "sticky" }}>
                Source ID
              </Th>
              <Th w={90} style={{ left: 200, position: "sticky" }}>
                Fishing
              </Th>
              {/* <Th>Revenue</Th> */}
              <Th w={120} style={{ left: 290, position: "sticky" }}>
                Similarity
              </Th>
              <Th w={120} style={{ left: 410, position: "sticky" }}>
                Country
              </Th>
              {trgList.map((x, i) => (
                <Th
                  pb={10}
                  fontSize={8}
                  w={12}
                  style={{
                    writingMode: "vertical-lr",
                    textAlign: "end",
                    wordWrap: "break-word",
                  }}
                  key={`trg${i}`}
                >
                  {}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody zIndex={1}>
            {srcList
              .filter((x) => srcInfo[x[0]].is_ocean >= 1 * filter.isFish)
              .filter((x) => srcInfo[x[0]].similarity >= filter.minSimilarity)
              .filter((x) => srcInfo[x[0]].total_revenue >= filter.minRevenue)
              .map((x, i) => {
                x = srcInfo[x[0]];

                let idx = getSrcIndex(x.id);
                return (
                  <Tr key={`row${i}`} h={12}>
                    <Td
                      key={x.id}
                      bgColor={"white"}
                      style={{ left: 0, position: "sticky" }}
                    >
                      {x.id}
                    </Td>
                    <Td
                      bgColor={"white"}
                      style={{ left: 200, position: "sticky" }}
                    >
                      {x.is_ocean ? <FontAwesomeIcon icon={faFish} /> : ""}
                    </Td>
                    {/* <Td>{x.total_revenue}</Td> */}
                    <Td
                      isNumeric
                      bgColor={"white"}
                      style={{ left: 290, position: "sticky" }}
                    >
                      {x.similarity.toFixed(2)}
                    </Td>
                    <Td
                      bgColor={"white"}
                      style={{ left: 410, position: "sticky" }}
                    >
                      {x.country}
                    </Td>
                    {matrixValue[idx].map((y, j) => {
                      return (
                        <Td bgColor={colorMap[y.type]} key={`matrix${i}${j}`}>
                          {}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>

        <Table
          variant="unstyled"
          size="sm"
          layout="fixed"
          w="fit-content"
          style={{ position: "sticky", bottom: 0 }}
        >
          <Thead>
            <Tr>
              <Th
                bgColor={"gray.100"}
                w={200}
                style={{ left: 0, position: "sticky" }}
              ></Th>
              <Th
                bgColor={"gray.100"}
                w={90}
                style={{ left: 200, position: "sticky" }}
              ></Th>
              {/* <Th>Revenue</Th> */}
              <Th
                bgColor={"gray.100"}
                w={120}
                style={{ left: 290, position: "sticky" }}
              ></Th>
              <Th
                bgColor={"gray.100"}
                w={120}
                style={{ left: 410, position: "sticky" }}
              ></Th>
              {trgList.map((x, i) => (
                <Th
                  w={12}
                  bgColor={"gray.100"}
                  style={{
                    writingMode: "vertical-lr",
                    textAlign: "start",
                    wordWrap: "break-word",
                  }}
                  key={`trg${i}`}
                >
                  {x[0]}
                </Th>
              ))}
            </Tr>
          </Thead>
        </Table>
      </Box>
    </Box>
  );

  // return (
  //   <div className="flex flex-col overflow-y-auto">
  //     <div className="sm:-mx-6 lg:-mx-8">
  //       <div className="inline-block py-2 sm:px-1 lg:px-8">
  //         <table className="text-center text-sm font-light" layout="fixed">
  //           <thead className="border-b font-medium dark:border-neutral-500">
  //             <tr key="column_row">
  //               <th
  //                 scope="col"
  //                 className="sticky left-0 bg-white z-10"
  //                 key="sourceID"
  //               >
  //                 <div className="px-1 py-2 w-full border-r">Source ID</div>
  //               </th>
  //               <th scope="col" className="px-1 py-2" key="fishing">
  //                 Fishing
  //               </th>
  //               {/* <th scope="col" className="px-1 py-2" key="revenue">
  //                 Revenue
  //               </th> */}
  //               <th scope="col" className="px-1 py-2" key="similarity">
  //                 Similarity
  //               </th>
  //               <th scope="col" className="px-1 py-2" key="country">
  //                 Country
  //               </th>
  //               {trgList.slice(0, maxTrgSize).map((x, i) => (
  //                 <th scope="col" className="px-1 py-2" key={`trg${i}`}>
  //                   {x[0]}
  //                 </th>
  //               ))}
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {srcList
  //               .slice(0, maxSrcSize)
  //               .filter((x) => srcInfo[x[0]].is_ocean >= 1 * filter.isFish)
  //               .filter((x) => srcInfo[x[0]].similarity >= filter.minSimilarity)
  //               .filter((x) => srcInfo[x[0]].total_revenue >= filter.minRevenue)
  //               .map((x, i) => {
  //                 x = srcInfo[x[0]];

  //                 let idx = getSrcIndex(x.id);
  //                 return (
  //                   <tr
  //                     className="border-b dark:border-neutral-500"
  //                     key={`row${i}`}
  //                   >
  //                     <td
  //                       className="whitespace-nowrap font-medium fixed ticky left-0"
  //                       key={x.id}
  //                     >
  //                       <div className="px-1 py-2 w-full border-r">{x.id}</div>
  //                     </td>
  //                     <td
  //                       scope="col"
  //                       className="px-1 py-2"
  //                       key={`is_ocean${i}`}
  //                     >
  //                       {x.is_ocean ? (
  //                         <FontAwesomeIcon icon={faFish} />
  //                       ) : (
  //                         <FontAwesomeIcon icon={faXmark} />
  //                       )}
  //                     </td>
  //                     {/* <td
  //                       scope="col"
  //                       className="px-1 py-2"
  //                       key={`total_revenue${i}`}
  //                     >
  //                       {x.total_revenue}
  //                     </td> */}
  //                     <td
  //                       scope="col"
  //                       className="px-1 py-2 ticky"
  //                       key={`similarity${i}`}
  //                     >
  //                       {x.similarity}
  //                     </td>
  //                     <td scope="col" className="px-1 py-2" key={`country${i}`}>
  //                       {x.country}
  //                     </td>
  //                     {matrixValue[idx].map((y, j) => {
  //                       function getColor(type) {
  //                         if (type === "Beneficial Owner")
  //                           return { background: "#4e79a7", color: "#ffffff" };
  //                         else if (type === "Company Contacts")
  //                           return { background: "#f28e2b", color: "#000000" };
  //                         else
  //                           return { background: "#f4f4f4", color: "#000000" };
  //                       }
  //                       const style = getColor(y.type);

  //                       return (
  //                         <td
  //                           w={20}
  //                           scope="col"
  //                           className="px-1 py-2"
  //                           style={style}
  //                           key={`matrix${i}${j}`}
  //                         >
  //                           {/* {y.type} */}
  //                         </td>
  //                       );
  //                     })}
  //                   </tr>
  //                 );
  //               })}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
}
