interface IProps {
  src: string;
  classname?: string;
}

const IconImg = ({ src, classname = "w-8 h-8" }: IProps) => {
  return (
    <div>
      <img src={src} className={classname} />
    </div>
  );
};

export default IconImg;
