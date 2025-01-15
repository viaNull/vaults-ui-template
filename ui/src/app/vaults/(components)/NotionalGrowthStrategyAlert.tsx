import { Alert, AlertDescription } from "@/components/ui/alert";

export const NotionalGrowthStrategyAlert = () => {
  return (
    <Alert>
      <AlertDescription>
        This vault focuses on the USDC value of your deposits.
      </AlertDescription>
    </Alert>
  );
};
