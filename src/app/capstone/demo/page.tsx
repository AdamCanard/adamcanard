"use client";

import { Renderer } from "../renderer/renderer";
import Desktop from "./components/desktop";
import Home from "./components/home";

export default function Page() {
  return (
    <Renderer
      toRender={{
        Home: <Home key={"Home"} />,
        Desktop: <Desktop key={"Desktop"} />,
      }}
    />
  );
}
