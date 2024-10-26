import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import {
  setClickedFileAction,
  setOpenedFileAction,
} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const OpenedFileBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();


  const {
    openedFile,
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

  const onRemove = (selectedId: string) => {
    const filtered = openedFile.filter((file) => file.id !== selectedId);
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(setOpenedFileAction([]));
      dispatch(
        setClickedFileAction({
          activeTabId: null,
          filecontent: "",
          filename: "",
        })
      );
      return;
    }

    const { id, name, content } = lastTab;
    dispatch(setOpenedFileAction(filtered));
    dispatch(
      setClickedFileAction({
        activeTabId: id,
        filecontent: content,
        filename: name,
      })
    );
  };

  return (
    <div
      className={`max-w-screen-md flex items-center 
      p-2 border-t-2 ${
        file.id === activeTabId ? "border-[#cf6ccf]" : "border-transparent"
      } `}
      onClick={onclicked}

    >
      <RenderFileIcon filename={file.name} />
      <span
        className="cursor-pointer duration-300 
      flex items-center w-fit mx-1 p-1 rounded-md"
      >
        {file.name}
      </span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
        className="cursor-pointer hover:bg-[#64646473]
      duration-300 flex items-center w-fit mx-1 p-1 rounded-md"
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFileBarTab;
