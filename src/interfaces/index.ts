export interface IFile {
  id: string;
  name: string;
  isFolder: boolean;
  Children?: IFile[];
  content?: string;
}
