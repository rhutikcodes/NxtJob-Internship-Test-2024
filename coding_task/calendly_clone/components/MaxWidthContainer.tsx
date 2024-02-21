import React, { ReactNode } from "react";

export const MaxWidthContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className="mx-auto w-full max-w-screen px-2.5 md:px-20">
      {children}
    </div>
  );
};

export default MaxWidthContainer;
