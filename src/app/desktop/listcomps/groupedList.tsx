import { Omit } from "@/app/omit";
import { useState } from "react";

export default function GroupedList(props: { data: Record<string, object[]> }) {
  const [opened, setOpened] = useState("");
  const keys = Object.keys(props.data);
  return (
    <>
      {keys.map((key) => {
        return (
          <>
            <div
              className="flex w-full h-full justify-center items-center p-2 hover:cursor-pointer"
              id={opened === key ? "border-pressed" : "border"}
              key={key}
              onClick={() => {
                if (opened === key) {
                  setOpened("");
                } else {
                  setOpened(key);
                }
              }}
            >
              {key === "" ? "Empty" : key}
            </div>{" "}
            {opened === key && (
              <>
                {Object.values(props.data[key as keyof object]).map(
                  (data, index) => {
                    return (
                      <div
                        className="flex w-full h-full justify-between items-center p-2"
                        key={index}
                        id="border"
                      >
                        {Object.values(data).map((value, index) => {
                          if (
                            !Omit.includes(Object.keys(data)[index]) &&
                            value + "" !== key
                          )
                            return <div key={value + index}>{value}</div>;
                        })}
                      </div>
                    );
                  },
                )}
              </>
            )}
          </>
        );
      })}
    </>
  );
}
