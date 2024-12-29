import { useContext, useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import { TaskbarContext } from "../sitecomps/toplevel";
import Input from "./input";

export default function ListWindow(props: {
  api: string;
  data: object;
  id: string;
}) {
  const [updating, setUpdating] = useState(false);
  const { windows, setWindows, admin } = useContext(TaskbarContext);
  const keys = Object.keys(props.data);

  const updateItem = () => {
    setUpdating(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await postData(formData);
    setUpdating(false);
  };

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch(props.api + props.id, {
        method: "PUT",
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

  const closeWindow = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == Object.values(props.data)[0]) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  const deleteItem = () => {
    deleteById(props.id);
    closeWindow();
  };

  const deleteById = async (id: string) => {
    try {
      const response = await fetch(props.api + id, {
        method: "DELETE",
      });
      const data: object = await response.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          { status: 500, headers: {} },
        );
      } else {
        console.log(err);
      }
    }
  };
  return (
    <DesktopWindow
      title={Object.values(props.data)[0]}
      width={"18rem"}
      height={""}
    >
      {!updating ? (
        <>
          {Object.values(props.data).map((data, index: number) => {
            if (!Omit.includes(keys[index])) {
              if ((data as string) !== "" && index !== 0) {
                return (
                  <div
                    id="border"
                    className="flex w-full h-full justify-between items-center p-3"
                    key={index + props.id}
                  >
                    <div>{keys[index]}:</div>
                    <div>{data as string}</div>
                  </div>
                );
              }
            }
          })}
          {admin && (
            <div id="button-i">
              <div onClick={updateItem} id="button">
                Update
              </div>

              <div onClick={deleteItem} id="button">
                Delete
              </div>
            </div>
          )}
        </>
      ) : (
        <form
          className="flex flex-col"
          onSubmit={(e) => handleSubmit(e)}
          autoComplete="off"
        >
          {Object.values(props.data).map((data, index: number) => {
            if (!Omit.includes(keys[index])) {
              return (
                <Input name={keys[index]} value={data} key={index + props.id} />
              );
            }
          })}
          <div id="button-i">
            <div
              onClick={() => {
                setUpdating(false);
              }}
              id="button"
            >
              Cancel
            </div>

            <input id="button" type="submit" value="Submit" />
          </div>
        </form>
      )}
    </DesktopWindow>
  );
}

const Omit = [
  "Start",
  "End",
  "collectionId",
  "collectionName",
  "id",
  "created",
  "updated",
  "Drank",
];
