type MDXComponentMap = Record<string, React.ComponentType<any>>;

export function useMDXComponents(components: MDXComponentMap): MDXComponentMap {
  return {
    h1: (props) => <h1 {...props} />,
    h2: (props) => <h2 {...props} />,
    p: (props) => <p {...props} />,
    ul: (props) => <ul {...props} />,
    ol: (props) => <ol {...props} />,
    li: (props) => <li {...props} />,
    code: (props) => <code {...props} />,
    table: (props) => <table {...props} />,
    ...components
  };
}
