import DesktopWindow from "../sitecomps/desktopwindow";

export default function ListWindow(props: { api: string; id: string }) {
  <DesktopWindow title={props.api} width={"8rem"} height={""}>
    {props.id}
  </DesktopWindow>;
}
