import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

import { BarChartExample } from "./bar-chart-example";
import { defaultMDXComponents } from "./registry";

type CustomMDXProps = MDXRemoteProps;

export function CustomMDX({ source, components, ...rest }: CustomMDXProps) {
  return (
    <MDXRemote
      source={source}
      components={{
        ...defaultMDXComponents,
        BarChartExample,
        ...(components ?? {}),
      }}
      {...rest}
    />
  );
}
