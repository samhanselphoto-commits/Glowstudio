/**
 * Centralized admin audit logger.
 * Mọi mutating admin hook PHẢI gọi qua đây để đảm bảo audit log đầy đủ.
 * Cap 2000 entries (FIFO).
 */

import { KEY, getJSON, setJSON } from "./storage";
import type { AdminAction, AdminActionType } from "./types";
import { makeId } from "./admin-seed";

const AUDIT_CAP = 2000;

export type LogInput = {
  adminId: string;
  adminName: string;
  type: AdminActionType;
  target?: string;
  details?: string;
};

export function logAdminAction(input: LogInput): void {
  if (typeof window === "undefined") return;
  const list = getJSON<AdminAction[]>(KEY.auditLog) ?? [];
  const entry: AdminAction = {
    id: makeId("a"),
    createdAt: Date.now(),
    ...input,
  };
  const next = [entry, ...list].slice(0, AUDIT_CAP);
  setJSON(KEY.auditLog, next);
}
