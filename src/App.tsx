import { useRef } from "react";
import Draggable from "./components/Draggable";
import "./styles/draggable.scss";

function App() {
  const ref = useRef(null);
  return (
    <div>
      <Draggable
        handleRef={ref}
        x={500}
        y={500}
        onMove={(x, y) => console.log(x, y)}
      >
        <div
          style={{ width: "50px", height: "50px", backgroundColor: "yellow" }}
        >
          <button ref={ref}>Move</button>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
