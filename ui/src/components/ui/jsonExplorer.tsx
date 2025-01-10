"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export default function JsonExplorer({
  json,
  title,
}: {
  json: JsonObject;
  title: string;
}) {
  const [expandedPaths, setExpandedPaths] = useState<string[]>([]);

  const handleExpand = (path: string) => {
    if (expandedPaths.includes(path)) {
      setExpandedPaths(expandedPaths.filter((p) => p !== path));
    } else {
      setExpandedPaths([...expandedPaths, path]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(json, null, 2));
  };

  const renderNode = (obj: JsonValue, path: string = ""): JSX.Element => {
    return (
      <div key={path} className="border-b last:border-b-0">
        <div
          className={`flex items-center justify-between bg-muted px-4 py-2 cursor-pointer ${
            expandedPaths.includes(path)
              ? "bg-accent text-accent-foreground"
              : ""
          }`}
          onClick={() => handleExpand(path)}
        >
          <div className="flex items-center gap-2">
            {typeof obj === "object" && obj !== null ? (
              <CircleChevronDownIcon className="h-4 w-4 text-muted-foreground" />
            ) : null}
            <div className="font-medium">{path.split(".").pop()}</div>
          </div>
          <div className="text-muted-foreground">{JSON.stringify(obj)}</div>
        </div>
        {typeof obj === "object" &&
          obj !== null &&
          expandedPaths.includes(path) && (
            <div className="pl-4">
              {Object.entries(obj).map(([key, value]) =>
                renderNode(value, path ? `${path}.${key}` : key),
              )}
            </div>
          )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-auto">
        <div className="space-y-2">{renderNode(json)}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="outline" onClick={handleCopy}>
          <CopyIcon className="h-4 w-4 mr-2" />
          Copy JSON
        </Button>
      </CardFooter>
    </Card>
  );
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function ChevronDownIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CircleChevronDownIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16 10-4 4-4-4" />
    </svg>
  );
}

function CopyIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
