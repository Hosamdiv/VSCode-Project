interface IProps {
  position: {
    x: number;
    y: number;
  };
}

const DropMenu = ({ position }: IProps) => {
  return (
    <div>
      <ul
        className="bg-white text-black w-fit px-7 py-2 rounded-md"
        style={{
          position: "absolute",
          left: position.x,
          right: position.y,
        }}
      >
        <li>Clos</li>
        <li>Clos all</li>
      </ul>
    </div>
  );
};

export default DropMenu;
