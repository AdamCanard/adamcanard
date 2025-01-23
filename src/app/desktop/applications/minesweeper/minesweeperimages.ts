import { StaticImageData } from "next/image";
import zero from "../../../../../public/minesweeper/Minesweeper_0.png";
import one from "../../../../../public/minesweeper/Minesweeper_1.png";
import two from "../../../../../public/minesweeper/Minesweeper_2.png";
import three from "../../../../../public/minesweeper/Minesweeper_3.png";
import four from "../../../../../public/minesweeper/Minesweeper_4.png";
import five from "../../../../../public/minesweeper/Minesweeper_5.png";
import six from "../../../../../public/minesweeper/Minesweeper_6.png";
import seven from "../../../../../public/minesweeper/Minesweeper_7.png";
import eight from "../../../../../public/minesweeper/Minesweeper_8.png";
import bomb from "../../../../../public/minesweeper/bomb.png";

const minesweeperImages: Record<string, StaticImageData> = {
  "0": zero,
  "1": one,
  "2": two,
  "3": three,
  "4": four,
  "5": five,
  "6": six,
  "7": seven,
  "8": eight,
  F: bomb,
};

export default minesweeperImages;
