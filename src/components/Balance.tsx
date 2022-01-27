import { Button, Input, Progress } from "antd";
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
  const [balanceCount, setbalanceCount] = React.useState(3);

  let j = 0;
  const memo = (fun: any) => {
    let name = "";
    let result: string;
    return (args: string) => {
      if (name !== args) {
        result = fun(args);
        name = args;
      }
      return result;
    };
  };

  const hi = memo((name: string) => `${name} ${j++}`);
  console.log(hi("alex")); // alex 0
  console.log(hi("alex")); // alex 0
  console.log(hi("alex")); // alex 0
  console.log(hi("GLEB")); // GLEB 1
  console.log(hi("GLEB")); // GLEB 1
  console.log(hi("OLEG")); // OLEG 2

  let i = 0;

  function equalProportion(amount: number) {
    const arr = Object.entries(cripto).sort(([, a], [, b]) => b - a);
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
  const operation = (k: string, v: string) => {
    v === "+" ? (cripto[k] += 1) : (cripto[k] -= 1);
    setcripto({ ...cripto });
  };

  return (
    <div className={"balance"}>
      <Input
        type="number"
        value={balanceCount}
        onChange={(e: any) => setbalanceCount(e.target.value)}
      />
      <Button onClick={() => equalProportion(balanceCount)}>Balance</Button>
      {Object.entries(cripto).map(([k, v]) => (
        <div className="cripto" key={k}>
          <div>
            {k}
            <Button onClick={() => operation(k, "+")}>+</Button>
            {v}
            <Button onClick={() => operation(k, "-")}>-</Button>
            <Progress percent={percent(v, maxCount)} />
          </div>
        </div>
      ))}
      <Button onClick={defaults}>Defaults</Button>
    </div>
  );
};

export default Balance;
