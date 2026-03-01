"use client";

import { useContext } from "react";
import { RenderContext } from "./simplerenderer";

export function SimpleRender() {
  const { window } = useContext(RenderContext);
  return <>{window}</>;
}
