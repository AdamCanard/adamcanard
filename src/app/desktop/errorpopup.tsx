import Window from "./semanticcomps/window";
import WindowInternal from "./semanticcomps/windowinternal";

import { IError } from "../types";
import { Dispatch, SetStateAction } from "react";

export default function ErrorPopup(props: {
  children?: React.ReactNode;
  error?: IError;
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      {/* popup enabled by drink button */}
      {props.trigger ? (
        <>
          <div className="flex justify-center items-center">
            <Window
              title="Error"
              close={() => {
                props.setTrigger(false);
              }}
            >
              <WindowInternal>
                <>
                  {props.error && (
                    <ul>
                      {Object.entries(props.error).map((error, index) => {
                        //display all errors with messages
                        return (
                          <li key={index}>
                            {error[1].message && (
                              <>
                                {error[0].charAt(0).toUpperCase() +
                                  error[0].slice(1)}
                                : {error[1].message}
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              </WindowInternal>
            </Window>
          </div>
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}
