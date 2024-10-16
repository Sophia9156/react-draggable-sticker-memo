import "@/styles/index.scss";
import Memo from "@/pages/Memo";
import AddIcon from "@mui/icons-material/Add";
import useMemoStore from "@/store/memoStore";

function App() {
  const memos = useMemoStore((state) => state.memos);
  const AddMemo = useMemoStore((state) => state.addMemo);

  return (
    <>
      {memos.map((memo) => (
        <Memo key={memo.id} {...memo} />
      ))}
      <AddIcon
        sx={{
          float: "right",
          backgroundColor: "#e4e4e4",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "30px",
          border: "1px solid black",
        }}
        onClick={AddMemo}
      />
    </>
  );
}

export default App;
