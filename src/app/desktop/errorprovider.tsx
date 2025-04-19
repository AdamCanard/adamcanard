"use client";
import Window from "./semanticcomps/window";
import WindowInternal from "./semanticcomps/windowinternal";

import { IError } from "../types";
import { createContext, useState } from "react";

interface ErrorContextType {
  raiseError: (arg0: IError) => void;
}

export const ErrorContext = createContext({} as ErrorContextType);

export default function ErrorProvider(props: { children: React.ReactNode }) {
  const [error, setError] = useState<IError>();
  const [popup, setPopup] = useState<boolean>(false);

  const raiseError = (error: IError) => {
    setError(error);
    setPopup(true);
  };

  return (
    <ErrorContext.Provider value={{ raiseError }}>
      {popup ? (
        <>
          <div className="flex justify-center items-center">
            <Window
              title="Error"
              close={() => {
                setPopup(false);
                setError(undefined);
              }}
            >
              <WindowInternal>
                <>
                  {error && (
                    <>
                      <div>Status: {error.status}</div>
                      <div>{error.message}</div>
                    </>
                  )}
                </>
              </WindowInternal>
            </Window>
          </div>
        </>
      ) : (
        <>{props.children}</>
      )}
    </ErrorContext.Provider>
  );
}
