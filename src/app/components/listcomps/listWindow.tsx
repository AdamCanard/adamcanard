import DesktopWindow from "../sitecomps/desktopwindow";

export default function ListWindow(props: {
  api: string;
  data: object;
  id: string;
}) {
  console.log(props.data);
  return (
    <DesktopWindow title={props.id} width={"8rem"} height={""}>
      {Object.values(props.data).map((data, index: number) => {
        if ((data as string) !== "") {
          return (
            <div
              id="border"
              className="flex w-full h-full justify-between items-center p-3"
              key={index + props.id}
            >
              {data as string}
            </div>
          );
        }
      })}
    </DesktopWindow>
  );
}
