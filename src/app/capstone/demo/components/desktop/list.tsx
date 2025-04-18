import ListData from "./listdata";
import { createContext, JSX, useCallback, useEffect, useState } from "react";
import ListHeader from "./listheader";

interface ListContextType {
  name: string;
  passId: (arg0: number) => void;
  valuesToDisplay: Record<string, string>;
  form?: JSX.Element;
  listValues: object[];
  flipForm: () => void;
}
export const ListContext = createContext({} as ListContextType);

export default function List(props: {
  name: string;
  api: string;
  passId: (arg0: number) => void;
  valuesToDisplay: Record<string, string>;
  form?: JSX.Element;
}) {
  const { name, form, passId, valuesToDisplay } = props;
  const [listValues, setListValues] = useState<object[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  const flipForm = () => {
    setFormVisible(!formVisible);
    getList();
  };

  const getList = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_URL}/api/` + props.api,
        {
          headers: {
            Authorization: "letmein",
          },
          method: "GET",
        },
      );

      const data = await response.json();
      setListValues(data);
    } catch (err) {
      console.log(err);
      return err as Error;
    }
  }, [props.api]);

  useEffect(() => {
    if (listValues.length === 0) {
      getList();
    }
  }, [listValues, getList]);

  useEffect(() => {
    getList();
  }, [getList, form]);
  return (
    <ListContext.Provider
      value={{
        name,
        form,
        passId,
        listValues,
        valuesToDisplay,
        flipForm,
      }}
    >
      {formVisible && <div className={"absolute z-10"}>{form || <></>}</div>}
      <div className={"flex flex-col h-full w-full"}>
        <div className={"flex h-20"}>
          <ListHeader
            keys={
              listValues.length !== 0
                ? Object.keys(listValues[0]).splice(1)
                : []
            }
          />
        </div>

        <ListData />
      </div>
    </ListContext.Provider>
  );
}
