import * as React from 'react';
import './style.css';

type ListModel = {
  id: number;
  grab:string;
  item: string;
  category: string;
  position: number;
}[];

const listModel: ListModel = [
  { id: 0, grab:"", item: 'rower', category: 'sport', position: 2 },
  { id: 1, grab:"", item: 'chleb', category: 'pieczywo', position: 1 },
];
const sortFn = (arr: ListModel) => {
  return arr.sort((a, b) => a.position - b.position);
};

export default function App() {
  const [moveX, setMoveX] = React.useState(0);

  const tabTitle = Object.keys(listModel[0]).map((element) => {
    if (element !== 'id') {
      return <th>{element}</th>;
    }
  });
  const sortedListModel = sortFn(listModel);

  const handleGrabButton = (e:React.MouseEvent<HTMLButtonElement>, index:number) => {
if(e.currentTarget.id === "up") {
console.log("up"+index)
} else if (e.currentTarget.id) {
  console.log("down"+index)
}
  }
  const tabContent = sortedListModel.map((element, index) => {
        return (
        <tr key={'content' + index}>
          <td><button onClick={(e) => handleGrabButton(e, index)} id="up">^</button><button onClick={(e)=>handleGrabButton(e, index)} id="down"style={{rotate: 180+"deg"}}>^</button></td>
          <td>{element.item}</td>
          <td>{element.category}</td>
          <td>{element.position}</td>
        </tr>
        )
  });

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
