import { Flex, Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FaFish } from "react-icons/fa";

export default function DataTable({ data, selectedGraph, setSelectGraph }) {
  return (
    <Flex direction="column">
      <Table variant="simple" size="sm" p={0}>
        <Thead
          position={"sticky"}
          top={0}
          boxShadow={"0 -2px 0 #E3E7EF inset"}
          bgColor={"white"}
        >
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
              className="data-table-row"
              key={i}
              color={x.id === selectedGraph ? "white" : null}
              bgColor={x.id === selectedGraph ? "gray.600" : null}
              onClick={() => {
                if (x.id === selectedGraph) {
                  setSelectGraph(null);
                } else {
                  setSelectGraph(x.id);
                }
              }}
            >
              <Td p={0} isNumeric>
                {x.id}
              </Td>
              <Td>
                <Icon as={FaFish} mr={2}/> 
                {x.num_ocean_nodes}
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
}
