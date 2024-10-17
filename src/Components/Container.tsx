import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className: string;
}

const ContainerCustom: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`flex flex-row items-center justify-center ${className}`}>
      <div className="max-w-[1380px]">{children}</div>
    </div>
  );
};

export default ContainerCustom;
