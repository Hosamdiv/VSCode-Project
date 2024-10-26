import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../../interfaces";

interface IClickedFile {
  activeTabId: string | null;
  filename: string;
  filecontent: string | undefined;
}
interface IInitialState {
  openedFile: IFile[];
  clickedFile: IClickedFile;
}
const initialState: IInitialState = {
  openedFile: [],
  clickedFile: {
    activeTabId: null,
    filename: "",
    filecontent: "",
  },
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFileAction: (state, action: PayloadAction<IFile[]>) => {
      state.openedFile = action.payload;
    },
    setClickedFileAction: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
  },
});

export const { setOpenedFileAction, setClickedFileAction } =
  fileTreeSlice.actions;
export default fileTreeSlice.reducer;
