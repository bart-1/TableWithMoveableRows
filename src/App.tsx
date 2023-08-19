import * as React from "react";

type ListModel = {
  id: number;
  grab: string;
  item: string;
  category: string;
  position: number;
}[];

const initialListModel = [
  { id: 0, grab: "", item: "-", category: "-", position: 1 },
];
const listModel: ListModel = [
  { id: 1, grab: "", item: "rower", category: "sport", position: 2 },
  { id: 2, grab: "", item: "chleb", category: "pieczywo", position: 5 },
  { id: 3, grab: "", item: "jabłko", category: "owoc", position: 4 },
  { id: 2, grab: "", item: "motor", category: "moto", position: 3 },
  { id: 2, grab: "", item: "marchew", category: "warzywo", position: 1 },
];
const sortFn = (arr: ListModel) => {
  return arr.sort((a, b) => a.position - b.position);
};

export default function App() {
  const [moveX, setMoveX] = React.useState(0);
  const [list, setList] = React.useState<ListModel>(initialListModel);

  const tabTitle = Object.keys(listModel[0]).map((element, index) => {
    if (element !== "id") {
      return <th key={index}>{element}</th>;
    }
  });

  React.useEffect(() => {
    setList(sortFn(listModel));
  }, []);

  const handleGrabButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    let newList: ListModel = initialListModel;

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

    setList(sortFn(newList));
  };

  if (!list) return <div>Loading</div>;

  const tabContent = list.map((element, index) => {
    return (
      <tr key={"content" + index}>
        <td>
          <button onClick={(e) => handleGrabButton(e, element.id)} id="up">
            ^
          </button>
          <button
            onClick={(e) => handleGrabButton(e, element.id)}
            id="down"
            style={{ rotate: 180 + "deg" }}
          >
            ^
          </button>
        </td>
        <td>{element.item}</td>
        <td>{element.category}</td>
        <td>{element.position}</td>
      </tr>
    );
  });

  return (
    <div className="p-10">
      <table>
        <thead>
          <tr>{tabTitle}</tr>
        </thead>

        <tbody>{tabContent}</tbody>
      </table>
    </div>
  );
}
