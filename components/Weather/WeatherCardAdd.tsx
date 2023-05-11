"use client";
import { useState } from "react";
import styles from "./search.module.scss";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";

export default function WeatherCardAdd() {
  const [toggleSearchBar, setToggleSearchBar] = useState(true);
  const showSearchBar = () => {
    setToggleSearchBar(false);
  };
  return (
    <figure className="flex flex-col justify-center items-center rounded-3xl bg-[#3c4a894d] h-[380px] w-[350px] p-4 mx-2">
      {toggleSearchBar && (
        <button
          className="flex flex-col justify-center items-center group"
          onClick={showSearchBar}
        >
          <div className="transition-all flex justify-center items-center rounded-full bg-white/20 h-[100px] w-[100px] text-white group-hover:bg-white/30">
            <PlusIcon className="text-white w-[72px] h-[72px]" />
          </div>
          <span className="text-white mt-4">Add new location</span>
        </button>
      )}
      {!toggleSearchBar && (
        <div className={styles["input-group"]}>
          <div className={styles["input-group__append"]}>
            <MagnifyingGlassIcon className="text-white w-[24px] h-[24px]" />
          </div>
          <div className={styles["input-group__prepend"]}>
            <ChevronLeftIcon className="text-white w-[24px] h-[24px]" />
          </div>
          <input type="text" placeholder="Search" />
        </div>
      )}
    </figure>
  );
}
