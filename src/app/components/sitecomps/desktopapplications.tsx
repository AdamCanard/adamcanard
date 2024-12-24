import Application from "./application";

export default function DesktopApplications() {
  return (
    <div
      className={
        "grid border-white border-2 w-full h-full grid-cols-9 grid-rows-5"
      }
    >
      <Application title="" src="" window={<></>} />
    </div>
  );
}
