import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SPOT_MARKETS_LOOKUP } from "@/constants/environment";
import { SpotMarketConfig } from "@drift-labs/sdk";

// Base schema without name and spotMarketIndex
export const updateVaultSchema = z.object({
  redeemPeriod: z.object({
    days: z.number().min(0).lt(90),
    hours: z.number().min(0).max(23),
    minutes: z.number().min(0).max(59),
    seconds: z.number().min(0).max(59),
  }),
  maxTokens: z.number().min(0),
  minDepositAmount: z.number().min(0),
  managementFee: z.number().min(0).lt(100),
  profitShare: z.number().min(0).lt(100),
  hurdleRate: z.number().min(0),
  permissioned: z.boolean(),
});

// Schema for create form
export const createVaultSchema = updateVaultSchema.extend({
  name: z.string().min(1, "Name is required").max(32),
  spotMarketIndex: z.number().min(0),
});

export type CreateVaultSchema = z.infer<typeof createVaultSchema>;
export type UpdateVaultSchema = z.infer<typeof updateVaultSchema>;

const SecondaryInfo = ({ children }: { children: React.ReactNode }) => {
  return <span className="px-1 text-sm text-gray-500">{children}</span>;
};

type VaultFormFieldsProps =
  | {
      form: UseFormReturn<CreateVaultSchema>;
      mode: "create";
      spotMarketConfig: SpotMarketConfig;
    }
  | {
      form: UseFormReturn<UpdateVaultSchema>;
      mode: "update";
      spotMarketConfig: SpotMarketConfig;
    };

type FormControl = UseFormReturn<UpdateVaultSchema>["control"];

export const VaultParamsFormFields = ({
  form,
  mode,
  spotMarketConfig,
}: VaultFormFieldsProps) => {
  return (
    <>
      {mode === "create" && (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Vault Name
                  <SecondaryInfo>(max 32 characters)</SecondaryInfo>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  The on-chain name of the vault. This is the same name
                  reflected by the Drift UserAccount.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spotMarketIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spot Market Index</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  The index of the spot market to use for the vault.
                </FormDescription>
              </FormItem>
            )}
          />
        </>
      )}

      <div>
        <FormLabel>
          Withdrawal Waiting Period
          <SecondaryInfo>(cannot be increased in the future)</SecondaryInfo>
        </FormLabel>
        <div className="grid grid-cols-4 gap-4">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <FormField
              key={unit}
              control={form.control as FormControl}
              name={
                `redeemPeriod.${unit}` as
                  | "redeemPeriod.days"
                  | "redeemPeriod.hours"
                  | "redeemPeriod.minutes"
                  | "redeemPeriod.seconds"
              }
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{unit}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <FormDescription className="mt-2">
          The withdrawal waiting period is the time between when a user requests
          for a withdrawal and when they can actually withdraw their funds.
        </FormDescription>
      </div>

      <FormField
        control={form.control as FormControl}
        name="maxTokens"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Max Tokens ({spotMarketConfig.symbol})</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
            <FormDescription>
              The maximum number of tokens that can be deposited into the vault.
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control as FormControl}
        name="minDepositAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Minimum Deposit Amount ({spotMarketConfig.symbol})
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control as FormControl}
        name="managementFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Management Fee (%)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control as FormControl}
        name="profitShare"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profit Share (%)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control as FormControl}
        name="hurdleRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hurdle Rate</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control as FormControl}
        name="permissioned"
        render={({ field }) => (
          <FormItem className="flex items-center gap-4">
            <FormLabel>Permissioned</FormLabel>
            <FormControl>
              <Switch
                className="!mt-0"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
