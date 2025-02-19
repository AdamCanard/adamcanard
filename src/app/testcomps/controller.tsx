import DPad from "./dpad";
import ActionButtons from "./actionbuttons";
import OptionButtons from "./optionbuttons";

export default function Controller() {
  return (
    <div className={"h-full flex flex-col"}>
      <div className={"flex flex-row justify-around items-center pt-8"}>
        <DPad />
        <ActionButtons />
      </div>
      <OptionButtons />
    </div>
  );
}
