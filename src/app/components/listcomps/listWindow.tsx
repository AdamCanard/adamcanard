import DesktopWindow from "../sitecomps/desktopwindow";

export default function ListWindow(props: {
  api: string;
  data: object;
  id: string;
}) {
  console.log(props.data);
  return (
    <DesktopWindow title={props.id} width={"8rem"} height={""}>
      <></>
    </DesktopWindow>
  );
}
