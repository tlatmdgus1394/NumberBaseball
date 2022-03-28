import React, { PureComponent, memo } from "react";

const Try = memo(({ value }) => {
  return (
    <li>
      <div>{value.try}</div>
      <div>{value.result}</div>
    </li>
  );
});

export default Try;
