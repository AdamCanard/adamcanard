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

interface LookupContextType {
  locationLookup: Record<number, string>;
  userLookup: Record<number, string>;
  drinkLookup: Record<number, string>;
}
export const LookupContext = createContext({} as LookupContextType);

export default function LookupContextProvider(props: { children: ReactNode }) {
  const [locationLookup, setLocationLookup] = useState<Record<number, string>>(
    {},
  );
  const [userLookup, setUserLookup] = useState<Record<number, string>>({});
  const [drinkLookup, setDrinkLookup] = useState<Record<number, string>>({});

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

  useEffect(() => {
    getLocationLookup();
    getUserLookup();
    getDrinkLookup();
  }, [getLocationLookup, getUserLookup, getDrinkLookup]);

  return (
    <LookupContext.Provider value={{ locationLookup, userLookup, drinkLookup }}>
      {props.children}
    </LookupContext.Provider>
  );
}
