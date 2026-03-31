type DocsPropsRow = readonly [string, string];

type DocsPropsTableProps = {
  columns: readonly [string, string];
  rows: readonly DocsPropsRow[];
};

export function DocsPropsTable({ columns, rows }: DocsPropsTableProps) {
  return (
    <div className="docs-props-table">
      <div className="docs-props-row docs-props-row--head">
        <strong>{columns[0]}</strong>
        <strong>{columns[1]}</strong>
      </div>
      {rows.map(([label, description]) => (
        <div className="docs-props-row" key={label}>
          <span>{label}</span>
          <span>{description}</span>
        </div>
      ))}
    </div>
  );
}

export default DocsPropsTable;
