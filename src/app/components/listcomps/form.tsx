import { Dispatch, SetStateAction, createContext, useState } from "react";
import Input from "./input";

interface FormContextType {
  clear: boolean;
  setClear: Dispatch<SetStateAction<boolean>>;
}

//cast empty object to contexttype
export const FormContext = createContext<FormContextType>(
  {} as FormContextType,
);

export default function Form(props: {
  api: string;
  formElements: string[];
  refresher: Dispatch<SetStateAction<boolean>>;
}) {
  const [clear, setClear] = useState(false);

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch(props.api, {
        method: "POST",
        body: formData,
      });
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          },
        );
      } else {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await postData(formData);
    setClear(true);
    props.refresher(true);
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off"
    >
      <FormContext.Provider value={{ clear, setClear }}>
        {props.formElements.map((element: string, index: number) => {
          if (index < Object.keys(props.formElements).length - 1) {
            return <Input value={element} key={index} />;
          }
        })}
        <div id="button-i">
          <input id="button" type="submit" value="Submit" />
        </div>
      </FormContext.Provider>
    </form>
  );
}
