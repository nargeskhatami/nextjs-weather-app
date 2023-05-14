"use client";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { City } from "@/types/City";
import styles from "./search.module.scss";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";

export default function WeatherCardAdd({ onCitySelect, getDataStatus }: any) {
  const inputRef = useRef(null);
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
      (inputRef.current as any).focus();
    }
  }, [toggleSearchBar]);

  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=CITY&minPopulation=500000&limit=10&sort=+population&namePrefix=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "0a75f26d1dmshd4079b389b615d5p1cfd8cjsndfe4aeb86b85",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      )
        .then((res) => res.json())
        .then((items) => {
          // create a new array of objects that have unique combinations of name and country properties
          let unique: City[] = [];
          let seen = new Set();
          for (let obj of items.data) {
            let key = obj.name + "|" + obj.country;
            if (!seen.has(key)) {
              unique.push(obj);
              seen.add(key);
            }
          }
          setCities(unique);
          setSearchLoading(false);
        })
        .catch(() => {
          setCities([]);
          setSearchLoading(false);
        });
    } else {
      setCities([]);
      setSearchLoading(false);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: any) => {
    setSearchLoading(true);
    setSearchTerm(e.target.value);
  };

  const selectCity = (city: any) => {
    setSearchTerm("");
    (inputRef.current as any).value = null;
    onCitySelect(city);
  };

  return (
    <figure
      className={`flex flex-col items-center justify-${
        toggleSearchBar ? "center" : "start"
      } rounded-3xl bg-[#3c4a894d] h-[380px] w-[350px] p-4 mx-2`}
    >
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
              <span className="text-white/70 mt-2">
                Loading weather info ...
              </span>
            </div>
          ) : searchTerm ? (
            !searchLoading && cities.length ? (
              <ul className="h-full w-full divide-y divide-white/20 overflow-auto max-h-[304px] pr-1">
                {cities.map((item: any) => (
                  <li
                    key={item.id}
                    className="cursor-pointer transition-all p-3 flex flex-col hover:bg-white/10"
                    onClick={() => {
                      selectCity(item.city);
                    }}
                  >
                    <span className="text-white">{item.name}</span>
                    <span className="text-white/70 text-sm">
                      {item.region}, {item.country}
                    </span>
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
