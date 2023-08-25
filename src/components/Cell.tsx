import React, {
  ChangeEvent,
  EventHandler,
  FormEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface CellProps {
  content?: string | number;
  children?: ReactNode;
  initialSizeW?: number | null;
  initialSizeH?: number | null;
  key?: number | string;
  style?: string;
  tag: "th" | "td";
  sort?: () => void;
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
 * @param sort call sort action
 * @returns
 */

const Cell = ({
  content,
  children,
  initialSizeW,
  initialSizeH,
  tag = "td",
  style = "",
  sort,
}: CellProps) => {
  const [w, setW] = useState(30);
  const [h, setH] = useState(15);
  const [cellContent, setCellContent] = useState<typeof content>();
  const [editOn, setEditOn] = useState(false);

  useEffect(() => {
    initialSizeW && setW(initialSizeW);
    initialSizeH && setH(initialSizeH);
    content && setCellContent(content);
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (e.currentTarget.id === "cellBtn") setEditOn(true);
    if (e.currentTarget.id === "okBtn") {
      setEditOn(false);
      sort && sort();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCellContent(e.target.value);
  };

  const btnClassName = `ml-2 text-xxs border-2 border-black hover:bg-black hover:text-white rounded-md`;

  return (
    <>
      {tag === "th" && (
        <th onClick={handleClick} className={`${style} w-[${w}px] h-[${h}px]`}>
          {!editOn && cellContent}
          {editOn && !children ? (
            <input
              type={typeof content}
              value={cellContent}
              onChange={handleInput}
            />
          ) : (
            ""
          )}
          {children ? children : ""}
        </th>
      )}
      {tag === "td" && (
        <td className={`${style} w-[${w}px] h-[${h}px]`}>
          {!editOn && cellContent}
          {editOn && !children ? (
            <>
              <input
                type={typeof content}
                value={cellContent}
                onChange={handleInput}
              />
              <button id="okBtn" className={btnClassName} onClick={handleClick}>
                ok
              </button>
            </>
          ) : (
            ""
          )}
          {children ? children : null}
          {!editOn && !children ? (
            <button onClick={handleClick} id="cellBtn" className={btnClassName}>
              edit
            </button>
          ) : null}
        </td>
      )}
    </>
  );
};
export default Cell;
