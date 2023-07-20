import { sliderValues } from "@/pages";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Icon,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import { format } from "d3-format";
import { useState, useCallback, useEffect } from "react";
import { FaFish } from "react-icons/fa";

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
  const [similarityTooltip, setSimilarityTooltip] = useState([0, 0]);
  const [revenueTooltip, setRevenueTooltip] = useState([0, 0]);

  useEffect(() => {
    setSimilarityTooltip(networkFilter.similarity);
    setRevenueTooltip(networkFilter.revenue);
  }, [networkFilter]);

  const handleShowMinSimilarityTooltip = useCallback(() => {
    setShowMinSimilarityTooltip(true);
  }, []);
  const handleHideMinSimilarityTooltip = useCallback(() => {
    setShowMinSimilarityTooltip(false);
  }, []);
  const handleShowMaxSimilarityTooltip = useCallback(() => {
    setShowMaxSimilarityTooltip(true);
  }, []);
  const handleHideMaxSimilarityTooltip = useCallback(() => {
    setShowMaxSimilarityTooltip(false);
  }, []);
  const handleShowMinRevenueTooltip = useCallback(() => {
    setShowMinRevenueTooltip(true);
  }, []);
  const handleHideMinRevenueTooltip = useCallback(() => {
    setShowMinRevenueTooltip(false);
  }, []);
  const handleShowMaxRevenueTooltip = useCallback(() => {
    setShowMaxRevenueTooltip(true);
  }, []);
  const handleHideMaxRevenueTooltip = useCallback(() => {
    setShowMaxRevenueTooltip(false);
  }, []);

  const [showMinSimiarityTooltip, setShowMinSimilarityTooltip] =
    useState(false);
  const [showMaxSimiarityTooltip, setShowMaxSimilarityTooltip] =
    useState(false);
  const [showMinRevenueTooltip, setShowMinRevenueTooltip] = useState(false);
  const [showMaxRevenueTooltip, setShowMaxRevenueTooltip] = useState(false);

  return (
    <Flex align="center" direction="row" gap={6}  mb={2}>
      <Flex align="center" gap={2}>
        <FormLabel m="0"></FormLabel>
        {/* <Switch
          size="md"
          defaultChecked={networkFilter.isFish}
          onChange={() => {
            setNetworkFilter({
              ...networkFilter,
              isFish: !networkFilter.isFish,
            });
          }}
        /> */}
        <Button
          size="sm"
          leftIcon={<Icon as={FaFish} />}
          colorScheme="blue"
          defaultChecked={networkFilter.isFish}
          variant={networkFilter.isFish ? "solid" : "outline"}
          onClick={() => {
            setNetworkFilter({
              ...networkFilter,
              isFish: !networkFilter.isFish,
            });
          }}
        >
          Show Fisheries Only
        </Button>
      </Flex>
      <Flex align="center" gap={2}>
        <FormLabel m="0">Max Pair Similarity</FormLabel>
        <Box w={150} ml={2}>
          <RangeSlider
            aria-label="Rangeslider-ex-1"
            defaultValue={networkFilter.similarity}
            min={sliderValues.similarity[0]}
            max={sliderValues.similarity[2]}
            step={0.01}
            onChange={(x) => {
              setSimilarityTooltip(x);
              debounce(
                setNetworkFilter,
                650
              )({
                ...networkFilter,
                similarity: x,
              });
            }}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack w="150" />
            </RangeSliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showMinSimiarityTooltip}
              label={format(".2f")(similarityTooltip[0])}
            >
              <RangeSliderThumb
                index={0}
                onMouseOver={handleShowMinSimilarityTooltip}
                onMouseLeave={handleHideMinSimilarityTooltip}
              />
            </Tooltip>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showMaxSimiarityTooltip}
              label={format(".2f")(similarityTooltip[1])}
            >
              <RangeSliderThumb
                index={1}
                onMouseOver={handleShowMaxSimilarityTooltip}
                onMouseLeave={handleHideMaxSimilarityTooltip}
              />
            </Tooltip>
          </RangeSlider>
        </Box>
      </Flex>
      <Flex align="center" gap={2}>
        <FormLabel m="0">Total Revenue</FormLabel>
        <Box w={150} ml={2}>
          <RangeSlider
            aria-label="Rangeslider-ex-1"
            defaultValue={networkFilter.revenue}
            min={sliderValues.revenue[0]}
            max={sliderValues.revenue[2]}
            step={0.01}
            onChange={(x) => {
              setRevenueTooltip(x);
              debounce(
                setNetworkFilter,
                650
              )({
                ...networkFilter,
                revenue: x,
              });
            }}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack w="150" />
            </RangeSliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showMinRevenueTooltip}
              label={format(".2~s")(revenueTooltip[0])}
            >
              <RangeSliderThumb
                index={0}
                onMouseOver={handleShowMinRevenueTooltip}
                onMouseLeave={handleHideMinRevenueTooltip}
              />
            </Tooltip>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showMaxRevenueTooltip}
              label={format(".2~s")(revenueTooltip[1])}
            >
              <RangeSliderThumb
                index={1}
                onMouseOver={handleShowMaxRevenueTooltip}
                onMouseLeave={handleHideMaxRevenueTooltip}
              />
            </Tooltip>
          </RangeSlider>
        </Box>
      </Flex>
      <Flex align="center" gap={2}>
        <FormLabel m="0">Company Nationality</FormLabel>
        <Box w={200} ml={2}>
          <Input
            placeholder="Search Natioanlity"
            onChange={(e) => {
              debounce(
                setNetworkFilter,
                650
              )({
                ...networkFilter,
                country: e.target.value,
              });
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
