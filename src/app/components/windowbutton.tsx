export default function WindowButton(props: { children: React.ReactNode }) {
  return <div className="flex justify-end">{props.children}</div>;
}
