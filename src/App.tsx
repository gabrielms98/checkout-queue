import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const lines: string[] = ["a", "b", "c", "d", "e"];
  const [lineItems, setLineItems] = useState<number[][]>([
    [1],
    [1, 5, 2],
    [],
    [],
    [],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const copy = [...lineItems];
      for (let i = 0; i < copy.length; i++) {
        if (!copy[i].length) continue;

        copy[i][0]--;

        if (copy[i][0] === 0) copy[i].shift();
      }

      setLineItems(copy);
    }, 1000 * 2);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>
        <input type="number" placeholder="Enter quantity"></input>
        <button>Checkout</button>
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
