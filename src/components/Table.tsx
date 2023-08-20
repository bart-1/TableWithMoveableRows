import { MouseEvent, useEffect, useState } from "react";

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
        <th key={index} className="p-3">
          {element}
        </th>
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
      <tr key={"content" + index} className="p-3">
        <td className="p-3">
          <button onClick={(e) => handleGrabButton(e, element.id)} id="up">
            ^
          </button>
          <button
            onClick={(e) => handleGrabButton(e, element.id)}
            id="down"
            className="rotate-180 border-2 bg-gray-700 rounded-full w-5 h-5"
          >
            ^
          </button>
        </td>
        {Object.entries(element).map(([key, value], index) => {
          if (key !== "id")
            return (
              <td className="p-3" key={value + index}>
                {value}
              </td>
            );
        })}
      </tr>
    );
  });

  return (
    <div className="p-10">
      <table className="shadow-md border-2 p-10 text-md text-center">
        <thead className="bg-black text-white">
          <tr className="p-3">
            <th className="p-3">grab</th>
            {tabTitle}
          </tr>
        </thead>

        <tbody className="mt-2">{tabContent}</tbody>
      </table>
    </div>
  );
};

export default Table;
