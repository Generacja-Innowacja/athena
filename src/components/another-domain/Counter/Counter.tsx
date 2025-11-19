import { useState } from "react";
import Button from "../../shared/Button/Button";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </Button>
  );
};

export default Counter;
