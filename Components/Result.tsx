type SqlError = {
  offset: number;
  token: {
    type: string;
    raw: string;
    text: string;
    start: number;
  };
  message: string;
};
export const Result = ({
  lang,
  result,
}: {
  lang: string;
  result: string | SqlError;
}) => {
  return (
    <>
      {typeof result === "string" && !result.includes("error") && (
        <div className="flex flex-col w-full px-4 py-2 my-2 bg-green-300 rounded">
          <h2 className="text-lg font-bold">Valid {lang}</h2>
          <div className="px-2 py-2 my-2 font-mono text-white bg-green-700 rounded">
            {result.length < 500 && result}
            {result.length >= 500 &&
              "Query is too big paste, but it's valid. Way to go."}
          </div>
        </div>
      )}
      {typeof result !== "string" && (
        <div className="flex flex-col w-full px-4 py-2 my-2 bg-red-300 rounded">
          <h2 className="text-lg font-bold">Invalid {lang}</h2>
          <div className="px-2 py-2 my-2 font-mono text-white bg-red-700 rounded">
            {result.message.split("\n")[0]}
          </div>
        </div>
      )}
    </>
  );
};
