import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import type { MDXComponentMap } from "../mdx/registry";

export type DeckSlide = {
  id: string;
  label: string;
  source: MDXRemoteSerializeResult;
  components?: MDXComponentMap;
};
