type PreviewLinkProps = {
  href: string;
  label?: string;
};

export function PreviewLink({ href, label = "Open interactive preview" }: PreviewLinkProps) {
  return (
    <a className="preview-link" href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

export default PreviewLink;
