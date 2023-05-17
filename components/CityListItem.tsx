import { City } from "@/types/City";

export const CityListItem = ({ item, itemClicked }: { item: City; itemClicked: Function }) => {
  return (
    <li
      className="cursor-pointer transition-all p-3 flex flex-col hover:bg-white/10"
      onClick={() => itemClicked(item.name)}
    >
      <span className="text-white">{item.name}</span>
      <span className="text-white/70 text-sm">{item.country}</span>
    </li>
  );
};
