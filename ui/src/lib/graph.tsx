import { NEGATIVE_RED_COLOR } from "@/constants/style";

import { POSITIVE_GREEN_COLOR } from "@/constants/style";

/**
 * The color of the area under the graph/line of graph works as such:
 *
 * The highest point (y-axis) of the graph is 0%, the lowest point is 100%.
 * We set the colors to change at X% of the height of the graph.
 * Since we want the colors to change at the x-axis (0 line), we find
 * the percentage of the graph from the top of the graph to the x-axis,
 * and set the colors to change at this offset.
 */
export const getAreaStops = (
  min: number,
  max: number,
  { endOpacity = 1, startOpacity = 1 } = { endOpacity: 1, startOpacity: 1 },
  { topColor = POSITIVE_GREEN_COLOR, bottomColor = NEGATIVE_RED_COLOR } = {
    topColor: POSITIVE_GREEN_COLOR,
    bottomColor: NEGATIVE_RED_COLOR,
  },
) => {
  if (min >= 0) {
    return (
      <>
        <stop offset="0%" stopColor={topColor} stopOpacity={startOpacity} />
        <stop offset="100%" stopColor={topColor} stopOpacity={endOpacity} />
      </>
    );
  }

  if (max <= 0) {
    return (
      <>
        <stop offset="0%" stopColor={bottomColor} stopOpacity={endOpacity} />
        <stop
          offset="100%"
          stopColor={bottomColor}
          stopOpacity={startOpacity}
        />
      </>
    );
  }

  const zeroOffset = (max / (max - min)) * 100;

  return (
    <>
      <stop offset="0%" stopColor={topColor} stopOpacity={1} />
      <stop
        offset={`${zeroOffset}%`}
        stopColor={topColor}
        stopOpacity={endOpacity}
      />
      <stop
        offset={`${zeroOffset}%`}
        stopColor={bottomColor}
        stopOpacity={endOpacity}
      />
      <stop offset="100%" stopColor={bottomColor} stopOpacity={1} />
    </>
  );
};
