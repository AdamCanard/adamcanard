import AceS from "../../../../public/Cards/A-S.png";
import TwoS from "../../../../public/Cards/2-S.png";
import ThreeS from "../../../../public/Cards/3-S.png";
import FourS from "../../../../public/Cards/4-S.png";
import FiveS from "../../../../public/Cards/5-S.png";
import SixS from "../../../../public/Cards/6-S.png";
import SevenS from "../../../../public/Cards/7-S.png";
import EightS from "../../../../public/Cards/8-S.png";
import NineS from "../../../../public/Cards/9-S.png";
import TenS from "../../../../public/Cards/10-S.png";
import JackS from "../../../../public/Cards/J-S.png";
import QueenS from "../../../../public/Cards/Q-S.png";
import KingS from "../../../../public/Cards/K-S.png";

import AceC from "../../../../public/Cards/A-C.png";
import TwoC from "../../../../public/Cards/2-C.png";
import ThreeC from "../../../../public/Cards/3-C.png";
import FourC from "../../../../public/Cards/4-C.png";
import FiveC from "../../../../public/Cards/5-C.png";
import SixC from "../../../../public/Cards/6-C.png";
import SevenC from "../../../../public/Cards/7-C.png";
import EightC from "../../../../public/Cards/8-C.png";
import NineC from "../../../../public/Cards/9-C.png";
import TenC from "../../../../public/Cards/10-C.png";
import JackC from "../../../../public/Cards/J-C.png";
import QueenC from "../../../../public/Cards/Q-C.png";
import KingC from "../../../../public/Cards/K-C.png";

import AceH from "../../../../public/Cards/A-H.png";
import TwoH from "../../../../public/Cards/2-H.png";
import ThreeH from "../../../../public/Cards/3-H.png";
import FourH from "../../../../public/Cards/4-H.png";
import FiveH from "../../../../public/Cards/5-H.png";
import SixH from "../../../../public/Cards/6-H.png";
import SevenH from "../../../../public/Cards/7-H.png";
import EightH from "../../../../public/Cards/8-H.png";
import NineH from "../../../../public/Cards/9-H.png";
import TenH from "../../../../public/Cards/10-H.png";
import JackH from "../../../../public/Cards/J-H.png";
import QueenH from "../../../../public/Cards/Q-H.png";
import KingH from "../../../../public/Cards/K-H.png";

import AceD from "../../../../public/Cards/A-D.png";
import TwoD from "../../../../public/Cards/2-D.png";
import ThreeD from "../../../../public/Cards/3-D.png";
import FourD from "../../../../public/Cards/4-D.png";
import FiveD from "../../../../public/Cards/5-D.png";
import SixD from "../../../../public/Cards/6-D.png";
import SevenD from "../../../../public/Cards/7-D.png";
import EightD from "../../../../public/Cards/8-D.png";
import NineD from "../../../../public/Cards/9-D.png";
import TenD from "../../../../public/Cards/10-D.png";
import JackD from "../../../../public/Cards/J-D.png";
import QueenD from "../../../../public/Cards/Q-D.png";
import KingD from "../../../../public/Cards/K-D.png";
import { StaticImageData } from "next/image";

interface ICard {
  [key: string]: StaticImageData;
}

export const Deck: ICard = {
  "A:S": AceS,
  "2:S": TwoS,
  "3:S": ThreeS,
  "4:S": FourS,
  "5:S": FiveS,
  "6:S": SixS,
  "7:S": SevenS,
  "8:S": EightS,
  "9:S": NineS,
  "10:S": TenS,
  "J:S": JackS,
  "Q:S": QueenS,
  "K:S": KingS,
  "A:H": AceH,
  "2:H": TwoH,
  "3:H": ThreeH,
  "4:H": FourH,
  "5:H": FiveH,
  "6:H": SixH,
  "7:H": SevenH,
  "8:H": EightH,
  "9:H": NineH,
  "10:H": TenH,
  "J:H": JackH,
  "Q:H": QueenH,
  "K:H": KingH,
  "A:C": AceC,
  "2:C": TwoC,
  "3:C": ThreeC,
  "4:C": FourC,
  "5:C": FiveC,
  "6:C": SixC,
  "7:C": SevenC,
  "8:C": EightC,
  "9:C": NineC,
  "10:C": TenC,
  "J:C": JackC,
  "Q:C": QueenC,
  "K:C": KingC,
  "A:D": AceD,
  "2:D": TwoD,
  "3:D": ThreeD,
  "4:D": FourD,
  "5:D": FiveD,
  "6:D": SixD,
  "7:D": SevenD,
  "8:D": EightD,
  "9:D": NineD,
  "10:D": TenD,
  "J:D": JackD,
  "Q:D": QueenD,
  "K:D": KingD,
};
