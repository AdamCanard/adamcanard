import { useState } from "react";
import { LabeledInputStr } from "../../components/labeledinputs";
import SecretForms from "./secretforms";

export default function Secret() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = await postData(formData);
    try {
      if (data.token !== "") {
        setAuthenticated(true);
      }
    } catch (error) {}
  };

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/admin/", {
        method: "POST",
        body: formData,
      });

      return response.json();
    } catch (err: unknown) {
      if (typeof err === "string") {
        console.log(err);
      } else if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          },
        );
      }
    }
  };
  return (
    <>
      {authenticated ? (
        <SecretForms />
      ) : (
        <div id="boxshadow">
          <h1 id="title">You shouldnt be here</h1>
          <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
            <LabeledInputStr
              title="email"
              type="email"
              state={email}
              setState={setEmail}
              required={true}
            />
            <LabeledInputStr
              title="password"
              type="password"
              state={password}
              setState={setPassword}
              required={false}
            />
            <div id="button-i">
              <input id="button" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
