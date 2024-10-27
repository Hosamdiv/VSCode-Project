import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedFileAction } from "../../app/features/fileTreeSlice";
import { RootState } from "../../app/store";

interface IProps {
  setShowMenu: (val: boolean) => void;
  position: {
    x: number;
    y: number;
  };
}

const DropMenu = ({ position: { x, y }, setShowMenu }: IProps) => {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  const { openedFile, tabIdToRemove } = useSelector(
    ({ tree }: RootState) => tree
  );

  const onCloseAll = () => {
    dispatch(setOpenedFileAction([]));
    setShowMenu(false);
  };
  const onClose = () => {
    const filtered = openedFile.filter((file) => file.id !== tabIdToRemove);
    dispatch(setOpenedFileAction(filtered));
    setShowMenu(false);
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
        className="z-10 w-fit origin-top-right divide-y divide-gray-100 rounded-md
        bg-white text-black  px-7 py-2 shadow-lg 
        ring-1 ring-opacity-5 focus:outline-none p-2"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        style={{
          position: "absolute",
          left: x,
          right: y,
        }}
      >
        <li
          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer
        hover:bg-gray-300 duration-300 rounded-sm"
          role="menuitem"
          onClick={onClose}
        >
          Clos
        </li>
        <li
          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer
        hover:bg-gray-300 duration-300 rounded-sm"
          role="menuitem"
          onClick={onCloseAll}
        >
          Clos all
        </li>
      </ul>
    </div>
  );
};

export default DropMenu;
