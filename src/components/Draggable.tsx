import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "underscore";
import styles from "./draggable.module.scss";

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  handleRef: MutableRefObject<HTMLDivElement | null>;
  defaultPosition?: { x: number; y: number };
  zIndex?: number;
  onMove?: (x: number, y: number) => void;
}

const Draggable: React.FC<Props> = ({
  children,
  handleRef,
  zIndex,
  defaultPosition = { x: 0, y: 0 },
  onMove,
}) => {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const initialPosition = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({
    x: defaultPosition.x,
    y: defaultPosition.y,
  });

  const Move = useMemo(
    () => debounce((x: number, y: number) => onMove?.(x, y), 500),
    [onMove]
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      setPosition({
        x: event.clientX - initialPosition.current.x,
        y: event.clientY - initialPosition.current.y,
      });
      Move(
        event.clientX - initialPosition.current.x,
        event.clientY - initialPosition.current.y
      );
    },
    [Move]
  );

  const removeEvents = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.removeEventListener<any>("mousemove", onMouseMove);
    document.removeEventListener("mouseup", removeEvents);
    document.body.removeEventListener("mouseleave", removeEvents);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      const box = dragRef.current?.getBoundingClientRect();
      if (box) {
        initialPosition.current.x = event.clientX - box.left;
        initialPosition.current.y = event.clientY - box.top;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        document.addEventListener<any>("mousemove", onMouseMove);
        document.addEventListener("mouseup", removeEvents);
        document.body.addEventListener("mouseleave", removeEvents);
      }
    },
    [onMouseMove, removeEvents]
  );

  useEffect(() => {
    const handle = handleRef.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handle?.addEventListener<any>("mousedown", onMouseDown);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handle?.removeEventListener<any>("mousedown", onMouseDown);
      Move.cancel();
    };
  }, [handleRef, onMouseDown, Move]);

  return (
    <div
      ref={dragRef}
      className={styles.draggable}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex,
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
