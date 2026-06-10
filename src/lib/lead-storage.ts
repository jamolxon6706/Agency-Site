import path from "node:path";
import { promises as fs } from "node:fs";
import type { LeadRecord } from "@/src/lib/leads";

const dataFile = path.join(process.cwd(), "data", "leads.ndjson");

export async function persistLead(lead: LeadRecord) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.appendFile(dataFile, `${JSON.stringify(lead)}\n`, "utf-8");
}

