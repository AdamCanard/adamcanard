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

import SevenSeg0 from "../../../../../public/minesweeper/timer/7Seg0.png";
import SevenSeg1 from "../../../../../public/minesweeper/timer/7Seg1.png";
import SevenSeg2 from "../../../../../public/minesweeper/timer/7Seg2.png";
import SevenSeg3 from "../../../../../public/minesweeper/timer/7Seg3.png";
import SevenSeg4 from "../../../../../public/minesweeper/timer/7Seg4.png";
import SevenSeg5 from "../../../../../public/minesweeper/timer/7Seg5.png";
import SevenSeg6 from "../../../../../public/minesweeper/timer/7Seg6.png";
import SevenSeg7 from "../../../../../public/minesweeper/timer/7Seg7.png";
import SevenSeg8 from "../../../../../public/minesweeper/timer/7Seg8.png";
import SevenSeg9 from "../../../../../public/minesweeper/timer/7Seg9.png";

export const minesweeperImages: Record<string, StaticImageData> = {
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

export const timerListImages = [
  SevenSeg0,
  SevenSeg1,
  SevenSeg2,
  SevenSeg3,
  SevenSeg4,
  SevenSeg5,
  SevenSeg6,
  SevenSeg7,
  SevenSeg8,
  SevenSeg9,
];
