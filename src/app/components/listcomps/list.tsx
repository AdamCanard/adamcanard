import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import { TaskbarContext } from "../sitecomps/toplevel";

export default function List(props: {
  title: string;
  api: string;
  handleClick: (arg0: string) => void;
}) {
  const { admin } = useContext(TaskbarContext);
  const [listElements, setListElements] = useState([]);
  const [formElements, setFormElements] = useState<string[]>([]);

  const getListElements = async () => {
    try {
      const response = await fetch(props.api, { method: "GET" });
      const listResponse = await response.json();

      setListElements(listResponse.items);
      setFormElements(Object.keys(listResponse.items[0]));
      return listResponse;
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

  const { isPending, isError, error, isSuccess } = useQuery({
    queryKey: [props.title],
    queryFn: getListElements,
  });

  if (isPending) {
  }

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    console.log(formElements);
    return (
      <DesktopWindow title={props.title} width={"20rem"} height={""}>
        <div className="w-full flex flex-col max-h-60 overflow-y-scroll">
          {listElements.map((listElement) => {
            const id: string = Object.values(listElement)[
              Object.keys(listElement).length - 1
            ] as string;
            return (
              <div
                id="border"
                className="flex w-full h-full justify-between items-center p-2 hover:cursor-pointer"
                key={id}
                onClick={() => props.handleClick(id)}
              >
                <>
                  {Object.values(listElement).map((data, index: number) => {
                    if (index < Object.keys(listElement).length - 1) {
                      if ((data as string) !== "") {
                        return <div key={index + id}>{data as string}</div>;
                      }
                    }
                  })}
                </>
              </div>
            );
          })}
        </div>
        {admin && <Form api={props.api} formElements={formElements} />}
      </DesktopWindow>
    );
  }
}

export function Form(props: { api: string; formElements: string[] }) {
  const { setRefreshBeers } = useContext(TaskbarContext);

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
    setRefreshBeers(true);
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off"
    >
      {props.formElements.map((element: string, index: number) => {
        if (index < Object.keys(props.formElements).length - 1) {
          return <Input value={element} key={index} />;
        }
      })}

      <div id="button-i">
        <input id="button" type="submit" value="Submit" />
      </div>
    </form>
  );
}

export function Input(props: { value: string }) {
  const [value, setValue] = useState("");
  return (
    <>
      <label id="border" className="flex justify-between w-full text-sm">
        Enter {props.value}:
        <input
          autoComplete="off"
          type="text"
          name={props.value}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </>
  );
}
