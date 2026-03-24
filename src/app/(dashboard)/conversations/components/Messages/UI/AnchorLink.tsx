interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  newTab?: boolean;
  download?: string;
}

export const AnchorLink = ({
  href,
  children,
  className,
  newTab,
  download,
}: AnchorLinkProps) => (
  <a
    href={href}
    className={className}
    download={download}
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : undefined}
  >
    {children}
  </a>
);
