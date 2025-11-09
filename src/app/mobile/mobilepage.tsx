"use client";
import { Suspense, useEffect, useState } from "react";
//import GameContainer from "../testcomps/gamecontainer";
import Beer from "./beer";
import Info from "./info";
import StoreRecipe from "./recipe/storerecipe";
import { Renderer } from "./renderer/renderer";
import Loading from "../desktop/sitecomps/loading";

export default function MobilePage() {
  const [loading, setLoading] = useState(true);
  const [startingTabs, setStartingTabs] = useState(startingTab);
  useEffect(() => {
    const localTabs = localStorage.getItem("tabs");
    if (localTabs !== null) {
      const tabArray = JSON.parse(localTabs);
      const newTabs = { ...startingTabs };
      for (let i = 0; i < tabArray.length; i++) {
        newTabs[tabArray[i]] = tabLibrary[tabArray[i]];
      }
      setStartingTabs(newTabs);
      setLoading(false);
    } else {
      setLoading(false);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <Renderer startingTabs={startingTabs} />
    </Suspense>
  );
}

export const tabLibrary: Record<string, JSX.Element> = {
  Info: <Info key={"Info"} />,
  Adam: <Beer key={"Adam"} />,
  Recipe: <StoreRecipe key={"Recipe"} />,
};
export const startingTab: Record<string, JSX.Element> = {
  Info: <Info key={"Info"} />,
};
