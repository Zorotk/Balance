import { Button, Progress } from "antd";
import React, { useState } from "react";

const Balance = () => {
  const data = {
    Ethereum: 9,
    Bitcoin: 17,
    Cardano: 3,
    Chainlink: 14,
    Polkadot: 5,
  };
  const [cripto, setcripto] = useState<Record<string, number>>({ ...data });
  const [maxCount, setmaxCount] = React.useState(1);
  const arr = Object.entries(cripto).sort(([, a], [, b]) => b - a);
  let i = 0;

  function equalProportion(amount: number) {
    if (amount <= 0) return arr;
    while (amount !== 0) {
      setmaxCount(Math.max(arr[i][1]));
      if (i === arr.length - 1) {
        if (arr[i][1] > 0) arr[i][1] -= 1;
        break;
      }
      if (arr[i][1] < arr[i + 1][1] || arr[i][1] === 0) i++;
      else {
        if (arr[i][1] >= arr[i + 1][1]) arr[i][1] -= 1;
        if (arr[i][1] === arr[i + 1][1]) i = 0;
        amount--;
      }
    }
    arr.forEach(([k, v]) => {
      cripto[k] = v;
    });
    setcripto({ ...cripto });
    return arr;
  }
  const percent = (v: number, maxCount: number) =>
    +((v / maxCount) * 100).toFixed();

  const defaults = () => {
    setcripto({ ...data });
    setmaxCount(1);
  };

  return (
    <div className={"balance"}>
      <Button onClick={() => equalProportion(1)}>Balance</Button>
      {Object.entries(cripto).map(([k, v]) => (
        <div className="cripto" key={k}>
          {k} {v}
          <Progress percent={percent(v, maxCount)} />
        </div>
      ))}
      <Button onClick={defaults}>Defaults</Button>
    </div>
  );
};

export default Balance;
