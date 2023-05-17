import { MouseEventHandler } from "react";

import { PlusIcon } from "@heroicons/react/24/solid";

export const AddButton = ({
  title,
  btnClicked,
}: {
  title: string;
  btnClicked: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button className="flex flex-col justify-center items-center group" onClick={btnClicked}>
      <div className="transition-all flex justify-center items-center rounded-full bg-white/20 h-[100px] w-[100px] text-white group-hover:bg-white/30">
        <PlusIcon className="text-white w-[72px] h-[72px]" />
      </div>
      <span className="text-white mt-4">{title}</span>
    </button>
  );
};
