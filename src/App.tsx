import "@/styles/index.scss";
import Memo from "@/pages/Memo";
import Fab from "@mui/material/Fab";
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
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "absolute", right: 40, bottom: 40 }}
        onClick={AddMemo}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default App;
