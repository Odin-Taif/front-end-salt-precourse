import React from "react";

type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-3 py-10">
      {children}
    </div>
  );
}

export default Container;
