import {
  Box, Divider,
  FormLabel, HStack, Heading, Slider, SliderFilledTrack,
  SliderThumb, SliderTrack,
  Stack, Switch, Tooltip
} from "@chakra-ui/react";
import { useState } from "react";

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
    <HStack w={"full"}>
      <Heading as="h3" size={"sm"}>Filter by</Heading>
      <Divider orientation="vertical" h={5} />
      <Stack align="center" direction="row">
        <FormLabel m="0">isFish</FormLabel>
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
      
      <Stack align="center" direction="row">
        <FormLabel m="0">
          Similarity
        </FormLabel>
        <Box w={200} ml={2}>
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

    </HStack>
  );
}
