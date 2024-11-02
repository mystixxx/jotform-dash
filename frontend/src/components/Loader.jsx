import React from "react";
import DotLoader from "react-spinners/DotLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

export const Loader = () => {
  return (
    <div>
      <DotLoader
        cssOverride={override}
        size={100}
        color={"#5932EA"}
        speedMultiplier={1.2}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
