import { Box, Center, Flex, Icon, Spacer, Table, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { FaFish, FaInfoCircle } from "react-icons/fa"

import { schemeCategory10 } from "d3-scale-chromatic"

const colorMap = {
    "Beneficial Owner": schemeCategory10[0],
    "Company Contacts": schemeCategory10[1],
}

const makeRGBDarker = (color, ratio) => {
    if (!color) return color
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    const r1 = Math.round(r * ratio)
    const g1 = Math.round(g * ratio)
    const b1 = Math.round(b * ratio)
    return `rgb(${r1},${g1},${b1})`
}

const CELL_WIDTH = 18

const jcd = (a, b) => {
    const aSet = new Set(a)
    const bSet = new Set(b)
    const intersection = new Set([...aSet].filter((x) => bSet.has(x)))
    const union = new Set([...aSet, ...bSet])
    return intersection.size / union.size
}

export default function detailTable({ data, filter, tmp }) {
    const [selectedSource, setSelectedSource] = useState(null)
    const [selectedIdx, setSelectedIdx] = useState(-1)

    const { srcInfo, srcList, trgList, linkType } = useMemo(() => {
        const srcInfo = {}
        const src = {}
        const trg = {}
        const linkType = {}
        data.graph.nodes.forEach((node) => (srcInfo[node.id] = { ...node, targets: [] }))
        data.graph.links.forEach((link) => {
            const source = srcInfo[link.source]
            if (source.is_ocean >= 1 * filter.isFish && source.similarity >= filter.minSimilarity && source.total_revenue >= filter.minRevenue) {
                src[link.source] = (src[link.source] || 0) + 1
                trg[link.target] = (trg[link.target] || 0) + 1
                srcInfo[link.source].targets.push(link.target)
                linkType[[link.source, link.target]] = link.type
            }
        })
        let srcList = Object.entries(src).filter((x) => x[1] > 0)
        let trgList = Object.entries(trg).filter((x) => x[1] > 0)

        if (selectedSource && srcInfo[selectedSource]) {
            srcList.sort((a, b) => {
                const aInfo = srcInfo[a[0]]
                const bInfo = srcInfo[b[0]]
                const selectedInfo = srcInfo[selectedSource]
                const aJcd = jcd(aInfo.targets, selectedInfo.targets)
                const bJcd = jcd(bInfo.targets, selectedInfo.targets)
                return bJcd - aJcd
            })

            trgList = [...trgList.filter((x) => srcInfo[selectedSource].targets.includes(x[0])), ...trgList.filter((x) => !srcInfo[selectedSource].targets.includes(x[0]))]
        } else {
            setSelectedIdx(-1)
            setSelectedSource(null)
        }
        return { srcInfo, srcList, trgList, linkType }
    }, [data, filter, selectedSource])

    const matrixValue = useMemo(
        () =>
            srcList.map((src) =>
                trgList.map((trg) => ({
                    type: linkType[[src[0], trg[0]]],
                    src: src[0],
                    trg: trg[0],
                }))
            ),
        [srcList, trgList, linkType]
    )

    function getSrcIndex(srcValue) {
        return matrixValue.findIndex((row) => row[0]?.src === srcValue)
    }

    const rowRef = useRef([])

    useEffect(() => {
        if (selectedIdx >= 0) {
            rowRef.current[0].scrollIntoView({
                block: "center",
            })
        }
    }, [selectedIdx])

    return (
        <Box display={"block"} w={"full"}>
            <Box overflowY="scroll" h={"82vh"}>
                <Table variant="unstyled" size="sm" layout="fixed" w="fit-content">
                    <Thead>
                        <Tr bgColor={"white"} boxShadow={"0 -2px 0 #E3E7EF inset"} style={{ position: "sticky", top: 0 }} verticalAlign={"center"} zIndex={3}>
                            <Th w={200} style={{ left: 0, position: "sticky" }}>
                                Source ID
                            </Th>
                            {/* <Th>Revenue</Th> */}
                            <Th w={120} style={{ left: 200, position: "sticky" }}>
                                {"Max Pair Similarity"}
                            </Th>
                            <Th w={120} style={{ left: 200 + 120, position: "sticky" }}>
                                Country
                            </Th>
                            <Th colSpan={trgList.length} w={trgList.length * CELL_WIDTH} />
                        </Tr>
                    </Thead>
                    <Tbody zIndex={1}>
                        {srcList
                            .filter((x) => srcInfo[x[0]].is_ocean >= 1 * filter.isFish)
                            .filter((x) => srcInfo[x[0]].similarity >= filter.minSimilarity)
                            .filter((x) => srcInfo[x[0]].total_revenue >= filter.minRevenue)
                            .map((x, i) => {
                                x = srcInfo[x[0]]

                                let idx = getSrcIndex(x.id)
                                return (
                                    <Tr
                                        key={`row${i}`}
                                        h={12}
                                        ref={(el) => (rowRef.current[i] = el)}
                                        onClick={() => {
                                            if (selectedSource === x.id) {
                                                setSelectedSource(null)
                                                setSelectedIdx(-1)
                                            } else {
                                                setSelectedSource(x.id)
                                                setSelectedIdx(idx)
                                            }
                                        }}
                                        bgColor={selectedSource === x.id ? "gray.600" : null}
                                        color={selectedSource === x.id ? "white" : null}
                                    >
                                        <Td className="source-id" key={x.id} bgColor={selectedSource === x.id ? "gray.600" : "white"} style={{ left: 0, position: "sticky" }}>
                                            <Center gap={2}>
                                                <Box>{x.id}</Box>
                                                <Spacer />
                                                {x.is_ocean ? <Icon as={FaFish} p={0} /> : ""}
                                                <Tooltip hasArrow label={x.product_services} placement="auto">
                                                    <span>
                                                        <Icon as={FaInfoCircle} p={0} />
                                                    </span>
                                                </Tooltip>
                                            </Center>
                                        </Td>
                                        <Td isNumeric bgColor={selectedSource === x.id ? "gray.600" : "white"} style={{ left: 200, position: "sticky" }}>
                                            {x.similarity.toFixed(2)}
                                        </Td>
                                        <Td bgColor={selectedSource === x.id ? "gray.600" : "white"} style={{ left: 200 + 120, position: "sticky" }}>
                                            {x.country}
                                        </Td>
                                        {matrixValue[idx].map((y, j) => {
                                            return (
                                                <Td
                                                    className="mark"
                                                    bgColor={() => {
                                                        if (x.id === selectedSource) {
                                                            return makeRGBDarker(colorMap[y.type], 0.5)
                                                        } else {
                                                            return colorMap[y.type]
                                                        }
                                                    }}
                                                    key={`matrix${i}${j}`}
                                                >
                                                    {}
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })}
                    </Tbody>
                </Table>
                <Box py={2} bgColor={"white"} style={{ position: "sticky", bottom: 0 }} w="fit-content" borderTop={"2px"} borderColor={"gray.200"}>
                    <Table variant="unstyled" size="sm" layout="fixed" w="fit-content">
                        <Thead>
                            <Tr>
                                <Th colSpan={4} bgColor={"white"} w={200 + 120 + 120} style={{ left: 0, position: "sticky" }} verticalAlign={"top"} fontSize={"sm"}>
                                    <Box>
                                        <Flex gap={2} px={2} align="center">
                                            <Box w={12} h={6} bgColor={colorMap["Beneficial Owner"]}></Box>
                                            <Box mr={4}>Beneficial Owner</Box>
                                        </Flex>
                                        <Flex gap={2} px={2} align="center" my={2}>
                                            <Box w={12} h={6} bgColor={colorMap["Company Contacts"]}></Box>
                                            <Box>Company Contacts</Box>
                                        </Flex>
                                    </Box>
                                </Th>
                                {trgList.map((x, i) => (
                                    <Th
                                        w={CELL_WIDTH}
                                        p={0}
                                        m={0}
                                        lineHeight={"1px"}
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
        </Box>
    )
}
