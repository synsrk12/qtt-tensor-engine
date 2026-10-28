"use client";

import type { TensorMatrixData } from '@/types';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface TensorMatrixProps {
  matrix: TensorMatrixData;
}

function getShape(data: any): number[] {
  const shape:number[]=[];
  let cur=data;
  while(Array.isArray(cur)){
    shape.push(cur.length);
    cur=cur[0];
  }
  return shape;
}

function cartesian(level:number): string[]{
  if(level<=0) return [""];
  let res=[""];
  for(let i=0;i<level;i++){
    const next:string[]=[];
    for(const p of res){
      for(const d of ["1","2","3"]){
        next.push(p+d);
      }
    }
    res=next;
  }
  return res;
}

function valueAt(data:any, idx:number[]):string{
  let cur=data;
  for(const i of idx) cur=cur[i];
  return String(cur);
}

export function TensorMatrix({matrix}:TensorMatrixProps){
  const shape=getShape(matrix.rows);
  const rank=shape.length;

  let rowLabels:string[]=[];
  let colLabels:string[]=[];
  let rowDepth=0,colDepth=0;

  if(rank===1){
    rowLabels=[""];
    colLabels=["1","2","3"];
    rowDepth=0; colDepth=1;
  }else if(rank===2){
    rowLabels=["1","2","3"];
    colLabels=["1","2","3"];
    rowDepth=1; colDepth=1;
  }else if(rank===3){
    rowLabels=cartesian(2);
    colLabels=["1","2","3"];
    rowDepth=2; colDepth=1;
  }else if(rank===4){
    rowLabels=cartesian(2);
    colLabels=cartesian(2);
    rowDepth=2; colDepth=2;
  }else{
    rowDepth=rank-2;
    colDepth=2;
    rowLabels=cartesian(rowDepth);
    colLabels=cartesian(2);
  }

  const parse = (s: string) => s.split("").map(x => parseInt(x) - 1);

  function makeCornerLabel(rank: number): string {
    if (rank === 1) return "∖ i";
    if (rank === 2) return "i ∖ j";
    if (rank === 3) return "ij ∖ k";
    if (rank === 4) return "ij ∖ kl";

    const alphabet = "ijklmnopqrstuvwxyz";

    const row = alphabet.slice(0, rank - 2);
    const col = alphabet.slice(rank - 2, rank);

    return `${row} ∖ ${col}`;
  }
  
  function makeTensorTitle(symbol: string, rank: number): React.ReactNode {
  const indices = ["i", "j", "k", "l", "m", "n", "o", "p"];

  return (
    <span className="font-serif text-3xl">
      <span className="italic">{symbol}</span>
      <sub className="text-xl align-sub">
        {indices.slice(0, rank).join("")}
      </sub>
    </span>
  );
}

const subscriptMap: Record<string, string> = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
};

function formatTensorEntry(value: string): React.ReactNode {
  if (value === "0") {
    return <span className="text-slate-600 dark:text-slate-400">0</span>;
  }

  let changed = false;
  const formatted = value.replace(/([A-Za-z]+)\[([\d,\s]+)\]/g, (_, symbol, indices) => {
    const sub = indices.replace(/[,\s]/g, '').split("").map((d: string) => subscriptMap[d] || d).join('');
    changed = true;
    return `${symbol}_{${sub}}`;
  });

  if (changed) {
    return (
      <span className="text-blue-700 dark:text-blue-300 font-semibold">
        <InlineMath math={formatted} />
      </span>
    );
  }

  return (
    <span className="text-blue-700 dark:text-blue-300 font-semibold">{formatted}</span>
  );
}

  return (
    <div className="space-y-4">
    <div className="flex justify-center">
    {makeTensorTitle(matrix.symbol, rank)}
    </div>

      <div className="overflow-auto max-h-[70vh] rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm">
        <table className="border border-slate-300-collapse text-sm font-mono">
          <thead>
           <tr>
    <th className="
    sticky top-0 left-0 z-20
    bg-slate-200/100 dark:bg-slate-800/100
    border border-slate-300 dark:border-slate-700
    min-w-[100px]
    h-14
    px-6 py-3
    text-center
    font-semibold
    text-slate-700 dark:text-slate-200
    whitespace-nowrap
  "
>
  {makeCornerLabel(rank)}
    </th>

    {colLabels.map((c) => (
      <th
        key={c}
        className="sticky top-0 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 text-center text-slate-700 dark:text-slate-200"
      >
        {c}
      </th>
    ))}
  </tr>
</thead>
          <tbody>
            {rowLabels.map(r=>(
              <tr key={r}>
                <th className="sticky left-0 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">{r||matrix.symbol}</th>
                {colLabels.map(c=>{
                  const idx=parse(r+c);
                  const v=valueAt(matrix.rows,idx);
                  return(
                    <td 
                      key={c}
                      className="
  border border-slate-400
  min-w-[90px]
  h-14
  px-5 py-2
  text-center
  align-middle
  whitespace-nowrap
  bg-white dark:bg-slate-900 dark:text-slate-200
"
>
  {formatTensorEntry(v)}
</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
