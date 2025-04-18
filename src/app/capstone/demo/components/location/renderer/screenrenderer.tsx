"use client";

import { useContext } from "react";
import { RenderContext } from "./renderer";

export function ScreenRenderer() {
  const { windowToRender } = useContext(RenderContext);
  return <>{windowToRender}</>;
}
