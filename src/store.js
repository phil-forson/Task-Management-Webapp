<div
  className="mt-4 bg-lightGrey dark:bg-veryDarkGrey flex h-[40px] items-center px-3"
  key={index}
  onClick={onClickHandler}
>
  <input
    type="checkbox"
    className="h-full checkbox dark:bg-darkGrey border-none"
    value={task.isCompleted}
  />
  <div
    className={
      "text-center ml-4  font-jakartaBold text-[12px] " +
      (task.isCompleted
        ? "line-through text-mediumGrey"
        : "text-black dark:text-white")
    }
  >
    {task.title}
  </div>
</div>;
