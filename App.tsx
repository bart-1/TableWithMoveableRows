import * as React from 'react';
import './style.css';

type ListModel = {
  grab: string;
  item: string;
  category: string;
  position: number;
}[];

const listModel: ListModel = [
  { grab: '...', item: 'rower', category: 'sport', position: 0 },
  { grab: '...', item: 'chleb', category: 'pieczywo', position: 1 },
];
const sortFn = (arr: ListModel) => {
  return arr.sort((a, b) => a.position - b.position);
};

export default function App() {
  const [moveX, setMoveX] = React.useState(0);

  const tabTitle = Object.keys(listModel[0]).map((element) => (
    <th>{element}</th>
  ));
  const sortedListModel = sortFn(listModel);

  const handleRowMove = (e: React.MouseEvent<HTMLTableRowElement>) => {

    const elementPosition = e.currentTarget.offsetTop
    if (e.clientX > elementPosition) {
      setMoveX(prevState => prevState = 1);
    } else if (e.clientX < elementPosition) {
      setMoveX(prevState => prevState = -1);
    }
    console.log(moveX)
  };
  const tabContent = sortedListModel.map((element, index) => (
    <tr key={'content' + index} onMouseDown={(e) => handleRowMove(e)}>
      <td style={{userSelect: "none"}}>{element.grab}</td>
      <td>{element.item}</td>
      <td>{element.category}</td>
      <td>{element.position}</td>
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>{tabTitle}</tr>
        </thead>

        <tbody>{tabContent}</tbody>
      </table>
    </div>
  );
}
