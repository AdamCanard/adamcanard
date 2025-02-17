"use client";

import { useContext } from "react";
import { RenderContext } from "./renderer";

export function ScreenRenderer() {
  const { window } = useContext(RenderContext);
  return <>{window}</>;
}
