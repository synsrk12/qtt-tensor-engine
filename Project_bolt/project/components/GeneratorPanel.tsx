import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import operationsData from '@/data/operations.json';

interface Props {
  operations: any[];
}

export function GeneratorPanel({ operations }: Props) {
  return (
    <div className="space-y-5">

      <div className="rounded-md border p-3 text-sm">
        <span className="font-semibold text-red-600">
          Red matrices
        </span>{" "}
        indicates that the corresponding symmetry operation is combined with
        time-reversal symmetry (𝒯).
      </div>

      {operations.map((op, i) => {

        const magnetic = op.type === "magnetic";

        // determine label: prefer op.latex, else lookup by id in operations.json
        let labelNode: React.ReactNode = op.displayName;
        if (op.latex) {
          labelNode = <InlineMath math={op.latex} />;
        } else if (op.id) {
          const found = (operationsData as any[]).find((o) => o.id === op.id);
          if (found) {
            labelNode = found.latex ? <InlineMath math={found.latex} /> : found.displayName;
          }
        }

        return (
          <div
            key={i}
            className="rounded-lg border p-4"
          >

            <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
  {labelNode}

  {magnetic && (
    <span>· 𝒯</span>
  )}
</h3>

            <table
              className={`border-collapse ${
                magnetic ? "text-red-600" : ""
              }`}
            >
              <tbody>
                {op.matrix.map((row: string[], r: number) => (
                  <tr key={r}>
                    {row.map((v: string, c: number) => (
                      <td
                        key={c}
                        className="border border-slate-400 w-12 h-12 text-center font-mono"
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        );
      })}
    </div>
  );
}
