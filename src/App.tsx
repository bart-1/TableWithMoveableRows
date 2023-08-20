import Table from "./components/Table";

export const initialShoppingListTable = [
  { id: 0, item: "-", category: "-", position: 1 },
];

const list = [
  { id: 1, item: "rower", category: "sport", position: 2 },
  { id: 2, item: "chleb", category: "pieczywo", position: 5 },
  { id: 3, item: "jabłko", category: "owoc", position: 4 },
  { id: 4, item: "motor", category: "moto", position: 3 },
  { id: 5, item: "marchew", category: "warzywo", position: 1 },
];


export default function App() {
  

 
  return (
    <div className="p-10">
      <Table initialData={initialShoppingListTable} data={list} />
    </div>
  );
}
