import Button from "../../Button/Button";

const Emptyboard = () => {
  return (
    <div className="flex flex-col justify-center h-[90vh] items-center font-semibold">
      <div className="text-jakartaBold text-mediumGrey">
        This board is empty. Create a new column to get started.
        <ul>
        </ul>
      </div>
      <div className="mt-5 h-[3rem]">
        <Button text="Add New Column" />
      </div>
    </div>
  );
};

export default Emptyboard;
