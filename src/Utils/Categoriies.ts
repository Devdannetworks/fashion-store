import { BiSolidOffer } from "react-icons/bi";
import { CiRollingSuitcase } from "react-icons/ci";
import { FaChild } from "react-icons/fa";
import { GiClothes, GiConverseShoe } from "react-icons/gi";
import { MdMan, MdStorefront, MdWoman } from "react-icons/md";

export const Categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Shoes",
    icon: GiConverseShoe,
  },
  {
    label: "Suitcases",
    icon: CiRollingSuitcase,
  },
  {
    label: "Trousers",
    icon: GiClothes,
  },
  {
    label: "Children",
    icon: FaChild,
  },
  {
    label: "Women",
    icon: MdWoman,
  },
  {
    label: "Men",
    icon: MdMan,
  },
  {
    label: "Offers",
    icon: BiSolidOffer,
  },
];
