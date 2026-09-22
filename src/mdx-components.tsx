import type { MDXComponents } from "mdx/types";
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    table: ({ children }) => (
      <div className="table-scroll">
        <table>{children}</table>
      </div>
    ),
    ...components,
  };
}
