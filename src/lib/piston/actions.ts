"use server";

import piston from "piston-client";
import {
  type Language,
  type ExecutionResult,
  type PistonClient,
  type Result,
  type Runtime,
} from "./piston";

const PISTON_API_HOST = "https://emkc.org" as const;

export async function execute(code: string, lang: Language) {
  const client: PistonClient = piston({
    server: PISTON_API_HOST,
  });

  const result: ExecutionResult = await client.execute(lang, code);
  return result;
}

export async function getRuntimes(): Promise<Result | Runtime[]> {
  const client: PistonClient = piston({
    server: PISTON_API_HOST,
  });

  const runtimes: Promise<Result | Runtime[]> = await client.runtimes();
  return runtimes;
}
