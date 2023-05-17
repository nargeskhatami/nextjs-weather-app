import { City } from "@/types/City";
import { CityListItem } from "@/components/CityListItem";

export const CityList = ({
  searchLoading,
  cities,
  selectCity,
}: {
  searchLoading: boolean;
  cities: City[];
  selectCity: Function;
}) => {
    
  let content = null;
  if (searchLoading) content = <div className="m-auto spinner"></div>;
  else if (cities.length === 0)
    content = <span className="text-white/70 m-auto">No results found.</span>;
  else
    content = (
      <ul className="h-full w-full divide-y divide-white/20 overflow-auto max-h-[304px] pr-1">
        {cities.map((item) => (
          <CityListItem item={item} key={`${item.country}-${item.name}`} itemClicked={selectCity} />
        ))}
      </ul>
    );

  return content;
};
