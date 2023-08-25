import { MouseEvent, useEffect, useState } from "react";
import Button from "./Button";
import Cell from "./Cell";

/**
 *
 * @param rowsArr - array with table rows, compatible with TableRow type.
 * @returns - new array, with rows sorted by "position" property.
 */
const sortTable = <T extends TableRow>(rowsArr: T[]) => {
  return rowsArr.sort((a, b) => a.position - b.position);
};

// obligatory properties for single table row
export type TableRow = { id: number; position: number };


/**
 * Table component with option to move each row up or down
*
* @param data - array to show in table, compatible with TableRow type.
* @param initialData - initial array with row that is showing in case of data problem
* @returns
*/

interface TableProps<T> {
  initialData: T[];
  data: T[];
}

const Table = <T extends TableRow>({ initialData, data }: TableProps<T>) => {
  const [list, setList] = useState(initialData);

  const tabTitle = Object.keys(data[0]).map((element, index) => {
    if (element !== "id") {
      return (
        <Cell tag="th" content={element} key={index} style="p-3" />
      );
    }
  });

  // it sort rows in incoming in props data and send it to state
  useEffect(() => {
    setList(sortTable(data));
  }, []);


// handle buttons actions (up & down) in each row in table
  const handleGrabButton = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    let newList: T[] = initialData;

    switch (true) {
      case e.currentTarget.id === "up":
        newList = list.map((el) => {
          if (el.id === id && el.position > 1) {
            const upperEl = list.filter(
              (upperEl) => upperEl.position === el.position - 1
            );
            upperEl[0] ? (upperEl[0].position += 1) : null;
            el.position -= 1;
            return el;
          } else {
            return el;
          }
        });
        break;

      case e.currentTarget.id === "down":
        newList = list.map((el) => {
          if (el.id === id && el.position < list.length) {
            const upperEl = list.filter(
              (upperEl) => upperEl.position === el.position + 1
            );
            upperEl[0] ? (upperEl[0].position -= 1) : null;
            el.position += 1;
            return el;
          } else {
            return el;
          }
        });
        break;
    }

    setList(sortTable(newList));
  };

  //if no proper data at component props - render Loading text
  if (!data) return <div className="w-full h-full text-center mt-28">Loading</div>;

  const tabContent = list.map((element, index) => {
    return (
      <tr key={"content" + index} className="p-3 odd:bg-slate-300 even:bg-slate-600 ">
        <Cell tag="td" style="p-3">
          <Button
            action={(e) => handleGrabButton(e, element.id)}
            style=" border-2 border-gray-700 bg-gray-700 text-gray-400 rounded-full w-5 h-5"
            name="^"
            id="up"
          />
          <Button
            action={(e) => handleGrabButton(e, element.id)}
            style="rotate-180 border-2 border-gray-700 bg-gray-700 text-gray-400 rounded-full w-5 h-5"
            name="^"
            id="down"
          />
        </Cell>
        {Object.entries(element).map(([key, value], index) => {
          if (key !== "id")
            return (
              <Cell tag="td" content={value} style="p-3" key={value + index}/>
            );
        })}
      </tr>
    );
  });

  return (
    <div className="p-10">
      <table className="shadow-md border-2 border-separate border-spacing-1 bg-black text-md text-center rounded-t-xl">
        <thead className="bg-black text-white border-spacing-0">
          <tr className="p-3">
           <Cell content={`up/down`} tag="th" initialSizeH={null} initialSizeW={null} style="" />
            {tabTitle}
          </tr>
        </thead>

        <tbody className="mt-2 border-spacing-0">{tabContent}</tbody>
      </table>
    </div>
  );
};

export default Table;
