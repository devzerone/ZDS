type DocsPropertyItem = readonly [string, string];

type DocsPropertyListProps = {
  items: readonly DocsPropertyItem[];
};

export function DocsPropertyList({ items }: DocsPropertyListProps) {
  return (
    <div className="docs-property-list">
      {items.map(([label, description]) => (
        <div className="docs-property-item" key={label}>
          <strong>{label}</strong>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}

export default DocsPropertyList;
