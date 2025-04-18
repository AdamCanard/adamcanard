"use client";

import LookupContextProvider from "../contexts/lookupcontext";
import { Renderer } from "../renderer/renderer";
import Desktop from "./components/desktop";
import Home from "./components/home";
import Location from "./components/location";

export default function Page() {
  return (
    <LookupContextProvider>
      {" "}
      <Renderer
        toRender={{
          Home: <Home key={"Home"} />,
          Desktop: <Desktop key={"Desktop"} />,
          Location: <Location key={"Location"} />,
        }}
      />
    </LookupContextProvider>
  );
}
