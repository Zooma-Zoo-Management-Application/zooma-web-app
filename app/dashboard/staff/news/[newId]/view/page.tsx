"use client"
import React from "react";

type Character = {
  name: string;
};

interface PromiseWithCancel<T> extends Promise<T> {
  cancel: () => void;
}

function getCharacter(id: number) {
  const controller = new AbortController();
  const signal = controller.signal;
  const promise = new Promise(async (resolve) => {
    try {
      const response = await fetch("https://swapi.dev/api/people/" + id, {
        method: "get",
        signal,
      });
      const data = await response.json();
      assertIsCharacter(data);
      resolve(data);
    } catch (ex: unknown) {
      if (isAbortError(ex)) {
        console.log(ex.message);
      }
    }
  });
  (promise as PromiseWithCancel<Character>).cancel = () => controller.abort();
  return promise as PromiseWithCancel<Character>;
}

function assertIsCharacter(data: any): asserts data is Character {
  if (!("name" in data)) {
    throw new Error("Not character");
  }
}

function isAbortError(error: any): error is DOMException {
  if (error && error.name === "AbortError") {
    return true;
  }
  return false;
}

export default function NewViewPage() {
  const [status, setStatus] = React.useState<
    "loading" | "loaded" | "cancelled"
  >("loading");
  const [data, setData] = React.useState<Character | undefined>(undefined);
  const [query, setQuery] = React.useState<
    PromiseWithCancel<Character> | undefined
  >(undefined);
  React.useEffect(() => {
    const q = getCharacter(1);
    setQuery(q);
    q.then((character) => {
      setData(character);
      setStatus("loaded");
    });
  }, []);

  if (status === "loading") {
    return (
      <div>
        <div style={{ margin: "20px 0px 5px" }}>loading ...</div>
        <button
          onClick={() => {
            query?.cancel();
            setStatus("cancelled");
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
  if (status === "cancelled") {
    return <div>Cancelled</div>;
  }

  return (<div>{data && <h3>{data.name}</h3>}</div>)
}