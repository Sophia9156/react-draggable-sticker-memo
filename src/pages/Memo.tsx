import "@/styles/memo.scss";
import { useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "@/components/Draggable";

const Memo: React.FC<IMemo> = (props) => {
  const { content, x, y, width, height, zIndex } = props;
  const handleRef = useRef(null);
  const memoContainer = useRef(null);

  return (
    <Draggable handleRef={handleRef} defaultPosition={{ x, y }} zIndex={zIndex}>
      <div
        ref={memoContainer}
        className="memo-container"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="menu">
          <DragHandleIcon
            ref={handleRef}
            sx={{ cursor: "move", fontSize: "25px" }}
          />
          <CloseIcon
            sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
          />
        </div>
        <textarea
          className="memo-text-area"
          value={content}
          name="txt"
          placeholder="Enter memo here"
        ></textarea>
      </div>
    </Draggable>
  );
};

export default Memo;
