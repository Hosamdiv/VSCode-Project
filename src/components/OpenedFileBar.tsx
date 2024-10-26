import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFileBarTab from "./OpenedFileBarTab";
import { useState } from "react";
import DropMenu from "./ui/ContexrtMene";

const OpenedFileBar = () => {
  const { openedFile } = useSelector(({ tree }: RootState) => tree);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  return (
    <div>
      <div
        className="flex items-center"
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuPosition({ x: e.clientX, y: e.clientY });
          setShowMenu(true);
        }}
      >
        {openedFile.map((file) => (
          <OpenedFileBarTab key={file.id} file={file} />
        ))}
      </div>
      {showMenu && (
        <DropMenu position={menuPosition} setShowMenu={setShowMenu} />
      )}
    </div>
  );
};

export default OpenedFileBar;
