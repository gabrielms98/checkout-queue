import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const lines: string[] = ["a", "b", "c", "d", "e"];
  const lineSizes: number[] = Array.from({ length: lines.length }, () => 0);

  const [quantity, setQuantity] = useState<number>(0);

  const [lineItems, setLineItems] = useState<number[][]>([
    [1],
    [2, 5, 2],
    [3, 4],
    [6, 1, 3, 5],
    [4],
  ]);

  function addToLine() {
    if (quantity <= 0) return;

    const copy = [...lineItems];

    const minValue = Math.min(...lineSizes);
    const lineIndex = lineSizes.findIndex((v) => v === minValue);

    copy[lineIndex].push(quantity);

    setLineItems(copy);
  }

  useEffect(() => {
    lineItems.forEach((line, i) => {
      lineSizes[i] = line.reduce((acc, v) => acc + v, 0);
    });

    const interval = setInterval(() => {
      const copy = [...lineItems];
      for (let i = 0; i < copy.length; i++) {
        if (!copy[i].length) continue;

        if (--copy[i][0] === 0) copy[i].shift();

        lineSizes[i] = copy[i].reduce((acc, v) => acc + v, 0);
      }

      setLineItems(copy);
    }, 1000 * 2);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(+e.currentTarget.value)}
        ></input>
        <button onClick={addToLine}>
          Checkout
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        {lines &&
          lines.map((line, i) => (
            <div
              className="border border-gray-300 rounded-md w-12 h-12 flex justify-center items-center"
              key={i}
            >
              {line}
            </div>
          ))}
      </div>
      <div className="flex gap-2 mt-1">
        {lineItems &&
          lineItems.map((line, j) => {
            return (
              <div className="flex flex-col gap-1" key={lines[j]}>
                {line.length ? (
                  line.map((item, i) => (
                    <div
                      className="border-2 border-gray-300 rounded-full w-12 h-12 flex justify-center items-center"
                      key={i}
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="border-2 border-gray-300 rounded-full w-12 h-12 flex justify-center items-center invisible"></div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
