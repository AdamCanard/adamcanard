import { usePathname, useRouter } from "next/navigation";

export default function HeaderButton(props: { title: string; route: string }) {
  const path = usePathname();
  const currentRoute = path.split("/")[2];
  const router = useRouter();
  return (
    <div
      className={`flex w-full h-full justify-center items-center text-3xl ${currentRoute === props.route ? "bg-[#006eb8]" : "bg-[#E01828]"}  text-[#131D4E] hover:cursor-pointer`}
      onClick={() => router.push("/capstone/" + props.route)}
    >
      {props.title}
    </div>
  );
}
