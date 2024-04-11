"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  className,
}) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} ${className}`}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-300 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
