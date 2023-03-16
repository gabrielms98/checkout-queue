import "./App.css";

function App() {
  const lines: string[] = ["a", "b", "c", "d", "e"];
  const lineItems: number[][] = [
    [1],
    [4, 5, 6],
    [7, 8, 9, 10],
    [4, 5],
    [7, 8, 9],
  ];

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
          lineItems.map((line) => {
            return (
              <div className="flex flex-col gap-1">
                {line.map((item, i) => (
                  <div
                    className="border-2 border-gray-300 rounded-full w-12 h-12 flex justify-center items-center"
                    key={i}
                  >
                    {item}
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
