import { useState, useEffect } from "react";
import { Stack, FormLabel, Switch } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  SliderMark,
} from '@chakra-ui/react'

export default function DataTableFilter({ setNetworkFilter }) {
  const [isFish, setIsFish] = useState(false);
  const [minSimilarity, setMinSimilarity] = useState(0);
  const [showTooltip1, setShowTooltip1] = useState(false)
  const [minRevenue, setMinRevenue] = useState(0)
  const [showTooltip2, setShowTooltip2] = useState(false)
  useEffect(() => {
    setNetworkFilter({
      isFish: isFish,
      minSimilarity: minSimilarity,
      minRevenue: minRevenue,
    })
  }, [isFish, minSimilarity, minRevenue])
  return (
    <div className="w-full h-full p-3 ml-10">
      <div className="bg-gray-100 w-full h-full py-2 px-10 flex items-center rounded">
        <Stack align="center" direction="row">
          <FormLabel m="0">isFish:</FormLabel>
          <Switch size="md" onChange={() => setIsFish(!isFish)} value={isFish} />
        </Stack>
        <Stack align="center" direction="row">
          <FormLabel m="0" ml="4">Similarity:</FormLabel>
          <div className="ml-2 w-[200px]">
            <Slider
              aria-label='slider-ex-1'
              defaultValue={0}
              min={0}
              max={1}
              step={0.01}
              onChange={(x) => setMinSimilarity(x)}
              onMouseEnter={() => setShowTooltip1(true)}
              onMouseLeave={() => setShowTooltip1(false)}
            >
              <SliderTrack>
                <SliderFilledTrack w="200" />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg='teal.500'
                color='white'
                placement='top'
                isOpen={showTooltip1}
                label={minSimilarity}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </div>
        </Stack>
        <Stack align="center" direction="row">
          <FormLabel m="0" ml="4">Revenue:</FormLabel>
          <div className="ml-2 w-[200px]">
            <Slider
              aria-label='slider-ex-1'
              defaultValue={0}
              min={0}
              max={1000000}
              step={1000}
              onChange={(x) => setMinRevenue(x)}
              onMouseEnter={() => setShowTooltip2(true)}
              onMouseLeave={() => setShowTooltip2(false)}
            >
              <SliderTrack>
                <SliderFilledTrack w="200" />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg='teal.500'
                color='white'
                placement='top'
                isOpen={showTooltip2}
                label={minRevenue}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </div>
        </Stack>
      </div>
    </div>
  );
}
