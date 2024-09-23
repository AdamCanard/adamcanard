import ClientBody from "./clientbody";
import Window from "../semantics/window";

export default function ClientSheet() {
  return (
    <div className="flex flex-row w-full h-full justify-center">
      <div className="w-2/3">
        <Window title="ADAM DRINKS BEER">
          <ClientBody />
        </Window>
      </div>
    </div>
  );
}
