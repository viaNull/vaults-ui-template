import { TOKEN_ICON_S3_OBJECT_URL } from "@/constants/misc";
import { twMerge } from "tailwind-merge";

export const MarketIcon = (props: {
  marketSymbol: string;
  className?: string;
}) => {
  return (
    <img
      src={`${TOKEN_ICON_S3_OBJECT_URL}/${props.marketSymbol.toLowerCase()}.svg`}
      alt={props.marketSymbol}
      className={twMerge("w-4 h-4", props.className)}
    />
  );
};
