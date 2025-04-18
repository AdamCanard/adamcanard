import { usePathname, useRouter } from "next/navigation";

export default function HeaderButton(props: { title: string; route: string }) {
  const path = usePathname();
  const currentRoute = path.split("/")[2];
  const router = useRouter();
  return (
    <div
      id={props.route === currentRoute ? "MTabButtonPressed" : "MTabButton"}
      className={`flex w-full h-full justify-center items-center text-2xl xhover:cursor-pointer`}
      onClick={() => router.push("/capstone/" + props.route)}
    >
      {props.title}
    </div>
  );
}
