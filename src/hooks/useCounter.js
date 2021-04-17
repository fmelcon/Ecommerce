import { useState } from "react";

export const useCounter = (initialCount = 0, max = 15) => {
const [count, setCount] = useState(initialCount);

const incCount = () => (max === 0 || count < max) && setCount(count + 1);
const decCount = () => count > 0 && setCount(count - 1);

return { count, incCount, decCount };
};