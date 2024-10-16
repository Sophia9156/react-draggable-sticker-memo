import { create } from "zustand";
import { v1 as uuidv1 } from "uuid";

type State = {
  memos: IMemo[];
};

type Actions = {
  addMemo: () => void;
};

const defaultMemoState: IMemo = {
  id: 1,
  x: 200,
  y: 200,
  content: "",
  width: 250,
  height: 300,
  zIndex: 1,
};

const useMemoStore = create<State & Actions>((set) => ({
  memos: [],
  addMemo: () =>
    set((state) => ({
      ...state,
      memos: [
        ...state.memos,
        { ...defaultMemoState, id: uuidv1(), zIndex: state.memos.length + 1 },
      ],
    })),
}));

export default useMemoStore;
