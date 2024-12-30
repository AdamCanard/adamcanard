import MobileList from "../mobilelist";

export default function Page() {
  return <MobileList api="/api/beer" open={false} />;
}
