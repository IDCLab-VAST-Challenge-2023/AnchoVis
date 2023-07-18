import { useState, useEffect } from "react";
import { Stack, FormLabel, Switch } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Box,
} from '@chakra-ui/react'


const debounce = (func, delay) => {
  let debounceTimer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(context, args), delay)
  }
}

export default function DataTableFilter({ setNetworkFilter }) {

  const [isFish, setIsFish] = useState(true);
  const [tmpSimilarity, setTmpSimilarity] = useState(0.5);
  const [minSimilarity, setMinSimilarity] = useState(0.5);
  const [showTooltip1, setShowTooltip1] = useState(false)
  const [minRevenue, setMinRevenue] = useState(0)

  useEffect(() => {
    setNetworkFilter({
      isFish: isFish,
      minSimilarity: minSimilarity,
      minRevenue: minRevenue,
    })
  }, [isFish, minSimilarity, minRevenue])

  return (
    <Box className="w-full p-3">
      <Box className="bg-gray-100 w-full h-full py-2 px-10 flex items-center rounded">
        <Stack align="center" direction="row">
          <FormLabel m="0">isFish:</FormLabel>
          <Switch size="md" onChange={() => setIsFish(!isFish)} isChecked={isFish} />
        </Stack>
        <Stack align="center" direction="row">
          <FormLabel m="0" ml="4">Similarity:</FormLabel>
          <Box className="ml-2 w-[200px]">
            <Slider
              aria-label='slider-ex-1'
              value={tmpSimilarity}
              min={0}
              max={1}
              step={0.01}
              onChange={(x) => {
                // set minSimilarity with debounce
                setTmpSimilarity(x)
                debounce(setMinSimilarity, 650)(x)
              }}
              onMouseEnter={() => setShowTooltip1(true)}
              onMouseLeave={() => setShowTooltip1(false)}
            >
              <SliderTrack>
                <SliderFilledTrack w="200" />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg='blue.500'
                color='white'
                placement='top'
                isOpen={showTooltip1}
                label={tmpSimilarity}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
