import cn from "classnames";

/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
const textVariantClasses = {
  header: "",
  title: "text-xl font-medium text-primary-200",
  subtitle1: "text-base text-gray-400",
  subtitle2: "text-sm text-gray-400",
};

interface TextProps {
  variant?: keyof typeof textVariantClasses;
  children?: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  span?: boolean;
}

const Text: React.FC<TextProps> = ({
  variant,
  clickable,
  span = false,
  onClick,
  children,
  className,
}) => {
  const textClassName = cn(
    clickable && "cursor-pointer hover:text-opacity-50",
    variant && textVariantClasses[variant],
    className
  );

  if (span) {
    return (
      <span className={textClassName} onClick={onClick}>
        {children}
      </span>
    );
  }

  return (
    <div className={textClassName} onClick={onClick}>
      {children}
    </div>
  );
};

export default Text;
