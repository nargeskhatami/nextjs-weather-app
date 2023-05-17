"use client";

import axios from "axios";

import { useState, useEffect, useRef } from "react";

import { MagnifyingGlassIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

import { useDebounce } from "@/hooks/useDebounce";

import { City } from "@/types/City";

import { TextField } from "@/components/TextField";
import { AddButton } from "@/components/Button/AddButton";
import { CityList } from "@/components/City/CityList/CityList";

export const WeatherCardAdd = ({
  onCitySelect,
  getDataStatus,
}: {
  onCitySelect: Function;
  getDataStatus: string;
}) => {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!showSearchBar && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  const fetchData = async () => {
    try {
      const res = await axios(`api/city/search?namePrefix=${searchTerm}`);
      setCities(res.data);
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

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };

  let content: JSX.Element[] = [];

  if (showSearchBar)
    content = [<AddButton key="AddButton" btnClicked={toggleSearchBar} title="Add new location" />];
  else {
    content.push(
      <TextField
        key="TextField"
        placeholder="Search"
        prependClicked={toggleSearchBar}
        handleInputChange={handleInputChange}
        searchTerm={searchTerm}
        inputRef={inputRef}
        append={<MagnifyingGlassIcon className="text-white w-[24px] h-[24px]" />}
        prepend={<ChevronLeftIcon className="text-white w-[24px] h-[24px]" />}
      />
    );
    if (getDataStatus === "loadingCity") {
      content.push(
        <div className="m-auto flex flex-col items-center justify-center" key="Loading">
          <div className="spinner"></div>
          <span className="text-white/70 mt-2">Loading weather info ...</span>
        </div>
      );
    } else if (searchTerm) {
      content.push(
        <CityList
          key="CityList"
          searchLoading={searchLoading}
          cities={cities}
          selectCity={selectCity}
        />
      );
    } else {
      content.push(
        <span key="EnterLocation" className="text-white/70 m-auto">
          Enter a location name.
        </span>
      );
    }
  }
  return (
    <figure
      className={`flex flex-col items-center justify-${
        showSearchBar ? "center" : "start"
      } rounded-3xl bg-[#3c4a894d] h-[380px] w-[300px] lg:w-[350px] p-4 lg:mx-2 mb-4 lg:mb-0`}
    >
      {content}
    </figure>
  );
};
