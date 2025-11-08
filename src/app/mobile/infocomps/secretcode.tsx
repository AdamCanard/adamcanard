import { ChangeEvent, useContext, useState } from "react";
import { RenderContext } from "../renderer/renderer";

export default function SecretCode() {
  const { resetTabs } = useContext(RenderContext);
  return (
    <div id="boxshadow" className={"flex flex-col w-full h-36"}>
      <h1 id="title">Information</h1>
      <div id="boxshadowNP" className={"flex flex-col w-full h-full"}>
        <div className={"w-full h-full px-2 text-lg "}>
          Enter Secret Code:
          <SecretCodeInput />
        </div>
        <div className={"flex w-full gap-2 justify-around items-end pb-1 pr-1"}>
          <a href="https://www.instagram.com/adam_cunard/" id="button">
            Instagram
          </a>
          <a
            href="https://ca.linkedin.com/in/adam-cunard-3a4644287?trk=people-guest_people_search-card"
            id="button"
          >
            LinkedIn
          </a>
          <a href="https://github.com/AdamCanard" id="button">
            GitHub
          </a>
          <button onClick={resetTabs} id="button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function SecretCodeInput() {
  const { secretCodeInput } = useContext(RenderContext);
  const [secretCode, setSecretCode] = useState("");
  const [request, setRequest] = useState(false);

  const updateSecretCode = (e: ChangeEvent<HTMLInputElement>) => {
    setSecretCode(e.target.value);
  };

  const toggleRequest = () => {
    setSecretCode("");
    const newRequest = !request;
    setRequest(newRequest);
  };

  const handleSecretCode = () => {
    if (!secretCodeInput(secretCode)) {
      toggleRequest();
    }
  };
  return (
    <form
      className={"flex flex-row gap-2 justify-between items-end"}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {request ? (
        <>
          <p className={"text-center w-full"}>{"Invaild Code"}</p>
          <button id="button" className={"w-full"} onClick={toggleRequest}>
            Try Again
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            className={"w-full h-6"}
            value={secretCode}
            onChange={updateSecretCode}
          />
          <button id="button" className={"w-full"} onClick={handleSecretCode}>
            Submit
          </button>
        </>
      )}
    </form>
  );
}
