import React, { MouseEvent, ReactNode, useEffect, useState } from "react";

interface CellProps {
  content?: string | number;
  children?: ReactNode;
  initialSizeW?: number | null;
  initialSizeH?: number | null;
  key?: number | string;
  style?: string;
  tag: "th" | "td";
}
/**
 *Single cell component for tsx table.
 *
 * @param content - text/number content to place inside cell
 * @param children - component/jsx as content to place inside cell
 * @param initialSizeW - initial width in px
 * @param initialSizeW - initial height in px
 * @param key - if this is result of iteration
 * @param tag - set if this is tag "td" or "th"
 * @param style add tailwind classNames
 * @returns
 */

const Cell = ({
  content,
  children,
  initialSizeW,
  initialSizeH,
  tag = "td",
  style = "",
}: CellProps) => {
  const [w, setW] = useState(30);
  const [h, setH] = useState(15);

  useEffect(() => {
    initialSizeW && setW(initialSizeW);
    initialSizeH && setH(initialSizeH);
  }, []);

  return (
    <>
      {tag === "th" && (
        <th className={`${style} w-[${w}px] h-[${h}px]`}>
          {content}
          {children ? children : ""}
        </th>
      )}
      {tag === "td" && (
        <td className={`${style} w-[${w}px] h-[${h}px]`}>
          {content}
          {children ? children : ""}
        </td>
      )}
    </>
  );
};
export default Cell;
