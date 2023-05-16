"use client";
import { useState, useEffect, useRef } from "react";

import { MagnifyingGlassIcon, PlusIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

import styles from "./search.module.scss";

import { useDebounce } from "@/hooks/useDebounce";

import { City } from "@/types/City";

export default function WeatherCardAdd({
  onCitySelect,
  getDataStatus,
}: {
  onCitySelect: Function;
  getDataStatus: string;
}) {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const [toggleSearchBar, setToggleSearchBar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const showSearchBar = () => {
    setToggleSearchBar(false);
  };
  const hideSearchBar = () => {
    setToggleSearchBar(true);
  };
  useEffect(() => {
    if (!toggleSearchBar && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleSearchBar]);

  const fetchData = async () => {
    try {
      const res = await fetch(`api/city/search?namePrefix=${searchTerm}`);
      const items = await res.json();
      setCities(items);
      setSearchLoading(false);
    } catch (error) {
      setCities([]);
      setSearchLoading(false);
    }
  };
  useEffect(() => {
    if (searchTerm) {
      fetchData();
    } else {
      setCities([]);
      setSearchLoading(false);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLoading(true);
    setSearchTerm(e.target.value);
  };

  const selectCity = (city: string) => {
    setSearchTerm("");
    onCitySelect(city);
  };

  return (
    <figure
      className={`flex flex-col items-center justify-${
        toggleSearchBar ? "center" : "start"
      } rounded-3xl bg-[#3c4a894d] h-[380px] w-[350px] p-4 mx-2`}
    >
      {toggleSearchBar && (
        <button className="flex flex-col justify-center items-center group" onClick={showSearchBar}>
          <div className="transition-all flex justify-center items-center rounded-full bg-white/20 h-[100px] w-[100px] text-white group-hover:bg-white/30">
            <PlusIcon className="text-white w-[72px] h-[72px]" />
          </div>
          <span className="text-white mt-4">Add new location</span>
        </button>
      )}
      {!toggleSearchBar && (
        <>
          <div className={styles["input-group"]}>
            <div className={styles["input-group__append"]}>
              <MagnifyingGlassIcon className="text-white w-[24px] h-[24px]" />
            </div>
            <div className={styles["input-group__prepend"]}>
              <ChevronLeftIcon
                onClick={hideSearchBar}
                className="cursor-pointer text-white w-[24px] h-[24px]"
              />
            </div>
            <input
              value={searchTerm}
              onChange={handleInputChange}
              ref={inputRef}
              type="text"
              placeholder="Search"
            />
          </div>
          {getDataStatus === "loadingCity" ? (
            <div className="m-auto flex flex-col items-center justify-center">
              <div className="spinner"></div>
              <span className="text-white/70 mt-2">Loading weather info ...</span>
            </div>
          ) : searchTerm ? (
            !searchLoading && cities.length ? (
              <ul className="h-full w-full divide-y divide-white/20 overflow-auto max-h-[304px] pr-1">
                {cities.map((item) => (
                  <li
                    key={`${item.country}-${item.name}`}
                    className="cursor-pointer transition-all p-3 flex flex-col hover:bg-white/10"
                    onClick={() => {
                      selectCity(item.name);
                    }}
                  >
                    <span className="text-white">{item.name}</span>
                    <span className="text-white/70 text-sm">{item.country}</span>
                  </li>
                ))}
              </ul>
            ) : searchLoading ? (
              <div className="m-auto spinner"></div>
            ) : (
              <span className="text-white/70 m-auto">No results found.</span>
            )
          ) : (
            <span className="text-white/70 m-auto">Enter a location name.</span>
          )}
        </>
      )}
    </figure>
  );
}
