"use client";
import DraggableWindow from "../semantics/draggablewindow";
import ClientBody from "./clientbody";

export default function ClientPage() {
  return (
    <div className="flex flex-row w-full h-full justify-center">
      <div className="w-2/3">
        <DraggableWindow title="ADAM DRINKS BEER" width={"2/3"} heigth={"2/3"}>
          <ClientBody />
        </DraggableWindow>
      </div>
    </div>
  );
}
