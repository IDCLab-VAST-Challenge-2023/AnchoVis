import {
  Box, Flex, FormLabel, Slider, SliderFilledTrack,
  SliderThumb, SliderTrack, Spacer, Stack, Switch, Tooltip
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function DataTableFilter({ networkFilter, setNetworkFilter }) {
  const [tmpSimilarity, setTmpSimilarity] = useState(0.5);
  const [showTooltip1, setShowTooltip1] = useState(false);
  return (
    <>
      {networkFilter ? (
        <Box w={"full"}>
          <Flex w={"full"} >
            <Stack align="center" direction="row">
              <FormLabel m="0">isFish:</FormLabel>
              <Switch
                size="md"
                defaultChecked={networkFilter.isFish}
                onChange={() => {
                  setNetworkFilter({
                    ...networkFilter,
                    isFish: !networkFilter.isFish,
                  })
                }}
              />
            </Stack>
            <Spacer />
            <Stack align="center" direction="row">
              <FormLabel m="0" ml="4">
                Similarity:
              </FormLabel>
              <Box className="ml-2 w-[200px]">
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={networkFilter.minSimilarity}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(x) => {
                    // set minSimilarity with debounce
                    setTmpSimilarity(x);
                    debounce(setNetworkFilter, 650)({
                      ...networkFilter,
                      minSimilarity: x,
                    });
                  }}
                  onMouseEnter={() => setShowTooltip1(true)}
                  onMouseLeave={() => setShowTooltip1(false)}
                >
                  <SliderTrack>
                    <SliderFilledTrack w="200" />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="blue.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip1}
                    label={tmpSimilarity}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
              </Box>
            </Stack>
          </Flex>
        </Box>
      ) : null}
    </>
  );
}
