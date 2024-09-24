import ClientBody from "./clientbody";
// import Window from "../semantics/window";
import DraggableWindow from "../semantics/draggablewindow";

export default function ClientSheet() {
  return (
    <div className="flex flex-row w-full h-full justify-center">
      <div className="w-2/3">
        <DraggableWindow title="ADAM DRINKS BEER" size="l">
          <ClientBody />
        </DraggableWindow>
      </div>
    </div>
  );
}
