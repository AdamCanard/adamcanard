export default function WindowButton(props: { children: React.ReactNode }) {
  return <div className="flex justify-end w-full">{props.children}</div>;
}
