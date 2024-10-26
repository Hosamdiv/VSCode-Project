import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import OpenedFileBar from "./OpenedFileBar";
import { RootState } from "../app/store";

const Preview = () => {
  const {
    clickedFile: { filecontent },
  } = useSelector(({ tree }: RootState) => tree);
  return (
    <>
      <OpenedFileBar />
      <FileSyntaxHighlighter content={filecontent} />
    </>
  );
};

export default Preview;
