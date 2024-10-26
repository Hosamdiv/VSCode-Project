import { IFile } from "../interfaces";
import { v4 as uuid } from "uuid";

export const fileTree: IFile = {
  id: uuid(),
  name: "VS Code Clone",
  isFolder: true,
  Children: [
    {
      id: uuid(),
      name: "node_modules",
      isFolder: true,
      Children: [
        {
          id: uuid(),
          name: ".vite",
          isFolder: true,
          Children: [
            {
              id: uuid(),
              name: "react.js",
              isFolder: false,
              content: `import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFileBarTab from "./OpenedFileBarTab";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";

const OpenedFileBar = () => {
  const { openedFile, clickedFile } = useSelector(
    ({ tree }: RootState) => tree
  );

  return (
    <div>
      <div className="flex items-center">
        {openedFile.map((file) => (
          <OpenedFileBarTab key={file.id} file={file} />
        ))}
      </div>
      <FileSyntaxHighlighter content={clickedFile.filecontent} />
    </div>
  );
};

export default OpenedFileBar;
`,
            },
          ],
        },
      ],
    },
    {
      name: "public",
      id: uuid(),
      isFolder: true,
      Children: [
        {
          id: uuid(),
          name: "index.html",
          isFolder: false,
          content: `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

`,
        },
      ],
    },
    {
      id: uuid(),
      name: "src",
      isFolder: true,
      Children: [
        {
          id: uuid(),
          name: "components",
          isFolder: true,
          Children: [
            {
              id: uuid(),
              name: "Button.tsx",
              isFolder: false,
              content: `import { useState } from "react";
import { IFile } from "../interfaces";
import { RightArrowIcon } from "./SVG/RightArrrowIcon";
import { BottonIcon } from "./SVG/BottonIcon";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setClickedFileAction,
  setOpenedFileAction,
} from "../app/features/fileTreeSlice";
import { doesFileObjectExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}
const RecursiveComponent = ({ fileTree }: IProps) => {
  const dispatch = useDispatch();
  const { openedFile } = useSelector(({ tree }: RootState) => tree);
  const [isOpen, setIsOpen] = useState(true);

  const { id, name, isFolder, Children, content } = fileTree;
  // ** Handlers
  const toggle = () => setIsOpen((prv) => !prv);

  const onFileClicked = () => {
    const exists = doesFileObjectExist(openedFile, id);

    dispatch(
      setClickedFileAction({
        filename: name,
        filecontent: content,
        activeTabId: id,
      })
    );
    if (exists) return;
    dispatch(setOpenedFileAction([...openedFile, fileTree]));
  };

  return (
    <div className="mb-2 ml-2 cursor-pointer">
      <div className="flex items-center mb-2 ">
        {isFolder ? (
          <div onClick={toggle} className="flex items-center ">
            {isOpen ? <BottonIcon /> : <RightArrowIcon />}
            <RenderFileIcon
              filename={name}
              isFolder={isFolder}
              isOpen={isOpen}
            />
            <span className="ml-2 text-xl">{name}</span>
          </div>
        ) : (
          <div onClick={onFileClicked} className="flex items-center mr-2 ">
            <RenderFileIcon filename={name} />

            <span className="ml-2 text-xl">{name}</span>
          </div>
        )}
      </div>

      {isOpen &&
        Children &&
        Children.map((file, idx) => (
          <RecursiveComponent key={idx} fileTree={file} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
`,
            },
            {
              id: uuid(),
              name: "NavBar.tsx",
              isFolder: false,
              content: `import { useState } from "react";
import { IFile } from "../interfaces";
import { RightArrowIcon } from "./SVG/RightArrrowIcon";
import { BottonIcon } from "./SVG/BottonIcon";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setClickedFileAction,
  setOpenedFileAction,
} from "../app/features/fileTreeSlice";
import { doesFileObjectExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}
const RecursiveComponent = ({ fileTree }: IProps) => {
  const dispatch = useDispatch();
  const { openedFile } = useSelector(({ tree }: RootState) => tree);
  const [isOpen, setIsOpen] = useState(true);

  const { id, name, isFolder, Children, content } = fileTree;
  // ** Handlers
  const toggle = () => setIsOpen((prv) => !prv);

  const onFileClicked = () => {
    const exists = doesFileObjectExist(openedFile, id);

    dispatch(
      setClickedFileAction({
        filename: name,
        filecontent: content,
        activeTabId: id,
      })
    );
    if (exists) return;
    dispatch(setOpenedFileAction([...openedFile, fileTree]));
  };

  return (
    <div className="mb-2 ml-2 cursor-pointer">
      <div className="flex items-center mb-2 ">
        {isFolder ? (
          <div onClick={toggle} className="flex items-center ">
            {isOpen ? <BottonIcon /> : <RightArrowIcon />}
            <RenderFileIcon
              filename={name}
              isFolder={isFolder}
              isOpen={isOpen}
            />
            <span className="ml-2 text-xl">{name}</span>
          </div>
        ) : (
          <div onClick={onFileClicked} className="flex items-center mr-2 ">
            <RenderFileIcon filename={name} />

            <span className="ml-2 text-xl">{name}</span>
          </div>
        )}
      </div>

      {isOpen &&
        Children &&
        Children.map((file, idx) => (
          <RecursiveComponent key={idx} fileTree={file} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
`,
            },
            {
              id: uuid(),
              name: "DataFile.tsx",
              isFolder: false,
              content: `import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

              `,
            },
            {
              id: uuid(),
              name: "FolderIcon.tsx",
              isFolder: false,
              content: `import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { setClickedFileAction } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const OpenedFileBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();
  const {
    clickedFile: { activeTabId },
  } = useSelector(({ tree }: RootState) => tree);

  // ** Handler
  const onclicked = () => {
    const { id, name, content } = file;
    dispatch(
      setClickedFileAction({
        filename: name,
        filecontent: content,
        activeTabId: id,
      })
    );
  };

  return (
    <div
      onClick={onclicked}
      className="flex items-center border-b-[1px] border-[#ffffff1f] w-s p-2"
      style={{
        borderTop:
          file.id === activeTabId
            ? "2px solid #cf6ccf"
            : "2px solid transparent",
      }}
    >
      <RenderFileIcon filename={file.name} />
      <span
        className="cursor-pointer duration-300 
      flex items-center w-fit mx-1 p-1 rounded-md"
      >
        {file.name}
      </span>
      <span
        className="cursor-pointer hover:bg-[#64646473]
      duration-300 flex items-center w-fit mx-1 p-1 rounded-md"
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFileBarTab;
`,
            },
          ],
        },
      ],
    },
  ],
};
