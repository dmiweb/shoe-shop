import { ReactNode } from "react";

type SectionProps = {
  className?: string;
  children?: ReactNode;
}

const Section = ({className, children}: SectionProps) => {
  return (
    <section className={className}>
      {children}
    </section>
  );
}

export default Section;