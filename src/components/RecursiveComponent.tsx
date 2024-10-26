import { useState } from "react";
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
