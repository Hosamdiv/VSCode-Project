import { extensionIconPaths } from "../constants/extensionIconPaths";
import IconImg from "./IconImg";
import { FileIcon } from "./SVG/FileIcon";
import { FolderIcon } from "./SVG/FolderIcon";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}


const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const extnsion = filename.split(".").pop();

  if (
    extnsion &&
    Object.prototype.hasOwnProperty.call(extensionIconPaths, extnsion)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${extensionIconPaths[extnsion]}-open.svg`
        : `${extensionIconPaths[extnsion]}.svg`
      : `${extensionIconPaths[extnsion]}.svg`;
    return <IconImg src={iconPath} />;
  }

  if (isFolder && isOpen) return <FolderIcon />;
  if (isFolder && !isOpen) return <FolderIcon />;

  return <FileIcon />;
};

export default RenderFileIcon;
