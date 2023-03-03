import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { format } from "sql-formatter";
import { Result } from "../../Components/Result";
import Link from "next/link";

interface ResultInterface {
  [key: string]: any;
}

export default function Home() {
  const [sql, setSql] = useState("");
  const [editing, setEditing] = useState(true);
  const [formatResults, setFormatResults] = useState({} as ResultInterface);

  const validateSql = () => {
    const languages = [
      "snowflake",
      "sql",
      "bigquery",
      "db2",
      "hive",
      "mariadb",
      "mysql",
      "n1ql",
      "plsql",
      "postgresql",
      "redshift",
      "singlestoredb",
      "spark",
      "sqlite",
      "tsql",
      "trino",
    ];
    const results = {} as ResultInterface;
    languages.forEach((language) => {
      try {
        let langRes = format(sql, { language: language });
        results[language] = langRes;
      } catch (e: any) {
        results[language] = e;
        results[language]["message"] = e.message;
      }
    });
    console.log(results);
    setFormatResults(results);
  };
  return (
    <>
      <Head>
        <title>Quick SQL Validator</title>
        <meta name="description" content="Quick Sql Validator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen">
        <div className="flex flex-col items-center justify-center w-11/12 h-full mx-auto">
          <h2 className="my-4 text-xl font-light">SQL Validator</h2>
          <h6>
            Made possible by{" "}
            <Link href="https://www.npmjs.com/package/sql-formatter">
              <span className="font-mono underline">sql-formatter</span>
            </Link>
            .
          </h6>
          {editing && (
            <>
              <textarea
                id="message"
                rows={20}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Paste your sql."
                onChange={(e) => setSql(e.target.value)}
              />
              <h6>
                Quick SQL Validator doesn't run or store your sql, we just
                validate it.
              </h6>
              <button
                onClick={() => {
                  setEditing(false);
                  validateSql();
                }}
                className="px-4 py-2 my-2 text-white rounded cursor-pointer bg-slate-800"
              >
                {editing && "Submit"}
                {!editing && "Loading"}
              </button>
            </>
          )}
          {!editing && (
            <>
              <button
                className="px-4 py-2 my-2 text-white rounded cursor-pointer bg-slate-800"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Enter a different query
              </button>
              {Object.keys(formatResults).map((k) => {
                return <Result key={k} lang={k} result={formatResults[k]} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
