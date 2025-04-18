"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getLocationNames } from "../serverfunctions/locations";
import { getUserNames } from "../serverfunctions/users";
import { getDrinkNames } from "../serverfunctions/drinks";
import { getNonAlcNames } from "../serverfunctions/nonalcoholic";

interface LookupContextType {
  locationLookup: Record<number, string>;
  userLookup: Record<number, string>;
  drinkLookup: Record<number, string>;
  nonAlcLookup: Record<number, string>;
}
export const LookupContext = createContext({} as LookupContextType);

export default function LookupContextProvider(props: { children: ReactNode }) {
  const [locationLookup, setLocationLookup] = useState<Record<number, string>>(
    {},
  );
  const [userLookup, setUserLookup] = useState<Record<number, string>>({});
  const [drinkLookup, setDrinkLookup] = useState<Record<number, string>>({});
  const [nonAlcLookup, setNonAlcLookup] = useState<Record<number, string>>({});

  const getLocationLookup = useCallback(async () => {
    const data = await getLocationNames("letmein");
    if (data instanceof Error) {
    } else {
      setLocationLookup(data);
    }
  }, []);

  const getUserLookup = useCallback(async () => {
    const data = await getUserNames("letmein");
    if (data instanceof Error) {
    } else {
      setUserLookup(data);
    }
  }, []);

  const getDrinkLookup = useCallback(async () => {
    const data = await getDrinkNames("letmein");
    if (data instanceof Error) {
    } else {
      setDrinkLookup(data);
    }
  }, []);

  const getNonAlcLookup = useCallback(async () => {
    const data = await getNonAlcNames("letmein");
    if (data instanceof Error) {
    } else {
      setNonAlcLookup(data);
    }
  }, []);

  useEffect(() => {
    getLocationLookup();
    getUserLookup();
    getDrinkLookup();
    getNonAlcLookup();
  }, [getLocationLookup, getUserLookup, getDrinkLookup, getNonAlcLookup]);

  return (
    <LookupContext.Provider
      value={{ locationLookup, userLookup, drinkLookup, nonAlcLookup }}
    >
      {props.children}
    </LookupContext.Provider>
  );
}
