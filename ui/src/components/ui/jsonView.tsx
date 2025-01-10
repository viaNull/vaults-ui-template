/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HAiH2KmLrCn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export default function Component({ json }: { json: JsonObject }) {
  return (
    <pre className="bg-muted rounded-md p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-all">
      {JSON.stringify(json, null, 2)}
    </pre>
  );
}
