import React from "react";
import { S } from "../../styles/theme";

interface ZebraRowProps {
  cells: any[];
  index: number;
}

export const ZebraRow: React.FC<ZebraRowProps> = ({ cells, index }) => (
  <tr>
    {cells.map((cell, ci) => (
      <td key={ci} style={index % 2 ? S.tdAlt : S.td}>
        {cell}
      </td>
    ))}
  </tr>
);
