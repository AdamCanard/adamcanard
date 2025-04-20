import Link from "next/link";

export default function Page() {
  return (
    <div className={"h-full w-full"}>
      <p id="border" className={"text-xl"}>
        References:{" "}
      </p>
      <div id="border" className={"h-full"}>
        <div
          id="border"
          className={"flex flex-row justify-between text-center "}
        >
          <span className={"font-bold text-start"}>Sait PNG:</span> SAIT
          Catalyst Symbol. [Online image]. (n.d.). SAIT Our Brand.
          <Link
            className={"text-blue-600 text-wrap"}
            href={"https://www.sait.ca/about-sait/our-brand"}
          >
            https://www.sait.ca/about-sait/our-brand
          </Link>
        </div>{" "}
        <div
          id="border"
          className={"flex flex-row justify-between text-center "}
        >
          <span className={"font-bold text-start"}>C# PNG:</span> imgbin.com.
          (n.d.). C programming language logo Microsoft Visual Studio .NET
          Framework [PNG image]. ImgBin.
          <Link
            className={"text-blue-600 text-wrap"}
            href={
              "https://imgbin.com/png/BTmFxA0c/c-programming-language-logo-microsoft-visual-studio-net-framework-png"
            }
          >
            https://imgbin.com/png/BTmFxA0c/c-programming-language-logo-microsoft-visual-studio-net-framework-png
          </Link>
        </div>
        <div
          id="border"
          className={"flex flex-row justify-between text-center "}
        >
          <span className={"font-bold text-start"}>.NET PNG:</span> Wikimedia
          Commons. (n.d.). File: .NET Core Logo.svg. Wikimedia Foundation.{" "}
          <Link
            className={"text-blue-600 text-wrap"}
            href={"https://commons.wikimedia.org/wiki/File:.NET_Core_Logo.svg"}
          >
            https://commons.wikimedia.org/wiki/File:.NET_Core_Logo.svg{" "}
          </Link>
        </div>
        <div
          id="border"
          className={"flex flex-row justify-between text-center "}
        >
          <span className={"font-bold text-start"}>Next JS PNG:</span> Iconduck.
          (n.d.). Next.js icon.
          <Link
            className={"text-blue-600 text-wrap"}
            href={"https://iconduck.com/icons/94662/nextjs"}
          >
            https://iconduck.com/icons/94662/nextjs{" "}
          </Link>
        </div>
        <div
          id="border"
          className={"flex flex-row justify-between text-center "}
        >
          <span className={"font-bold text-start"}>React PNG:</span> Wikipedia.
          (n.d.). File: React-icon.svg. Wikimedia Foundation.
          <Link
            className={"text-blue-600 text-wrap"}
            href={"https://en.m.wikipedia.org/wiki/File:React-icon.svg"}
          >
            https://en.m.wikipedia.org/wiki/File:React-icon.svg{" "}
          </Link>
        </div>
        <div
          id="border"
          className={"flex flex-row justify-between text-center "}
        >
          <span className={"font-bold text-start"}>PostgreSQL PNG:</span>{" "}
          CleanPNG. (n.d.). PostgreSQL transparent background PNG.{" "}
          <Link
            className={"text-blue-600 text-wrap"}
            href={"https://www.cleanpng.com/free/postgresql.html"}
          >
            https://www.cleanpng.com/free/postgresql.html
          </Link>
        </div>
        <div
          id="border"
          className={"flex flex-row justify-between text-center "}
        >
          <span className={"font-bold text-start"}>EF Core PNG:</span> McKenzie,
          D. (2020, May 18). Porting to Entity Framework Core. CodeOpinion.
          <Link
            className={"text-blue-600 text-wrap"}
            href={"https://codeopinion.com/porting-to-entity-framework-core/"}
          >
            https://codeopinion.com/porting-to-entity-framework-core/
          </Link>
        </div>
      </div>
    </div>
  );
}
