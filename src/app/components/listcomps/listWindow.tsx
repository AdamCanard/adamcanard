import DesktopWindow from "../sitecomps/desktopwindow";

export default function ListWindow(props: {
  api: string;
  data: object;
  id: string;
}) {
  const keys = Object.keys(props.data);
  return (
    <DesktopWindow
      title={Object.values(props.data)[0]}
      width={"16rem"}
      height={""}
    >
      {Object.values(props.data).map((data, index: number) => {
        if (!Omit.includes(keys[index])) {
          if ((data as string) !== "" && index !== 0) {
            return (
              <div
                id="border"
                className="flex w-full h-full justify-between items-center p-3"
                key={index + props.id}
              >
                <div>{keys[index]}:</div>
                <div>{data as string}</div>
              </div>
            );
          }
        }
      })}
      <div id="button-i">
        <div id="button">Update</div>

        <div id="button">Delete</div>
      </div>
    </DesktopWindow>
  );
}

const Omit = [
  "Start",
  "End",
  "collectionId",
  "collectionName",
  "id",
  "created",
  "updated",
  "Drank",
];
