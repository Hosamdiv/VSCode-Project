import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setClickedFileAction,
  setOpenedFileAction,
} from "../../app/features/fileTreeSlice";

interface IProps {
  setShowMenu: (val: boolean) => void;
  position: {
    x: number;
    y: number;
  };
}

const DropMenu = ({ position: { x, y }, setShowMenu }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();


  const onRemove = () => {
    dispatch(setOpenedFileAction([]));
    dispatch(
      setClickedFileAction({
        activeTabId: null,
        filecontent: "",
        filename: "",
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (eve: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(eve.target as Node))
        setShowMenu(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div ref={menuRef}>
      <ul
        className="bg-white text-black w-fit px-7 py-2 rounded-md"
        style={{
          position: "absolute",
          left: x,
          right: y,
        }}
      >
        <li>
          <button className="p-1">Clos</button>
        </li>
        <li>
          <button onClick={onRemove} className="p-1">
            Clos all
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropMenu;
