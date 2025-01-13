import { useCallback, useEffect, useState } from "react";
import { Collections } from "@/app/collections";
import Form from "@/app/desktop/listcomps/form";

export default function SecretForms() {
  const [formList, setFormList] = useState<string[][]>([]);

  const getForm = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/forms", {
        method: "GET",
      });
      const forms = await response.json();
      console.log(forms);
      setFormList(forms);
      return forms;
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
  }, []);

  const formGetter = useCallback(async () => {
    await getForm();
  }, [getForm]);

  useEffect(() => {
    formGetter();
  }, []);

  return (
    <>
      <div id={"border"} className={"flex flex-col overflow-y-scroll"}>
        {formList.map((form: string[], index: number) => {
          return (
            <Form
              key={index}
              title={Object.keys(Collections)[index]}
              formElements={form}
            />
          );
        })}
      </div>
    </>
  );
}
