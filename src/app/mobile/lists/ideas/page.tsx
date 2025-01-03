import MobileList from "../mobilelist";

export default function Page() {
  return <MobileList api="/api/idea" open={false} title="Ideas" />;
}
