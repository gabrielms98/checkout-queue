import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const lines: string[] = ["a", "b", "c", "d", "e"];

  const [quantity, setQuantity] = useState<number>(0);

  const [lineItems, setLineItems] = useState<number[][]>([
    [1],
    [2, 5, 2],
    [3, 4],
    [6, 1, 3, 5],
    [4, 5],
  ]);

  function addToLine() {
    if (quantity <= 0) return;

    setLineItems((prev) => {
      let leastAmount: number = Infinity;
      let lineIndex: number | undefined = undefined;

      // TODO: use heap instead for better performance
      prev.forEach((line, i) => {
        const sum = line.reduce((acc, v) => acc + v, 0);
        if (sum < leastAmount) {
          leastAmount = sum;
          lineIndex = i;
        }
      });

      if (!lineIndex) return prev;

      return prev.map((line, i) =>
        i === lineIndex ? [...line, quantity] : line
      );
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLineItems((prev) => {
        const copy = [...prev];
        for (const line of copy) {
          if (!line.length) continue;

          line[0] -= 1;

          if (line[0] === 0) {
            line.shift();
            continue;
          }
        }

        return copy;
      });
    }, 1000);

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
        <button onClick={addToLine}>Checkout</button>
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
