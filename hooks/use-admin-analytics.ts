"use client";

/**
 * Computed analytics tổng hợp từ các hook khác + raw storage.
 * Không persist — derived data.
 */

import { useEffect, useMemo, useState } from "react";
import { KEY, getJSON } from "@/lib/storage";
import type { AdminAction, CommunityPost, CreditLog, EndUser, Generation, LibraryItem, UserActivity } from "@/lib/types";

type RawState = {
  users: EndUser[];
  generations: Generation[];
  library: LibraryItem[];
  logs: CreditLog[];
  activity: UserActivity[];
  community: CommunityPost[];
  audit: AdminAction[];
  hydrated: boolean;
};

const day = 24 * 60 * 60 * 1000;

export function useAdminAnalytics() {
  const [state, setState] = useState<RawState>({
    users: [],
    generations: [],
    library: [],
    logs: [],
    activity: [],
    community: [],
    audit: [],
    hydrated: false,
  });

  useEffect(() => {
    setState({
      users: getJSON<EndUser[]>(KEY.endUsers) ?? [],
      generations: getJSON<Generation[]>(KEY.generations) ?? [],
      library: getJSON<LibraryItem[]>(KEY.library) ?? [],
      logs: getJSON<CreditLog[]>(KEY.creditLog) ?? [],
      activity: getJSON<UserActivity[]>(KEY.userActivity) ?? [],
      community: getJSON<CommunityPost[]>(KEY.communityPosts) ?? [],
      audit: getJSON<AdminAction[]>(KEY.auditLog) ?? [],
      hydrated: true,
    });
  }, []);

  useEffect(() => {
    function refresh() {
      setState((s) => ({
        ...s,
        users: getJSON<EndUser[]>(KEY.endUsers) ?? s.users,
        generations: getJSON<Generation[]>(KEY.generations) ?? s.generations,
        library: getJSON<LibraryItem[]>(KEY.library) ?? s.library,
        logs: getJSON<CreditLog[]>(KEY.creditLog) ?? s.logs,
        activity: getJSON<UserActivity[]>(KEY.userActivity) ?? s.activity,
        community: getJSON<CommunityPost[]>(KEY.communityPosts) ?? s.community,
        audit: getJSON<AdminAction[]>(KEY.auditLog) ?? s.audit,
      }));
    }
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  const analytics = useMemo(() => {
    const now = Date.now();
    const totalUsers = state.users.length;
    const activeUsers = state.users.filter((u) => u.status === "active").length;
    const bannedUsers = state.users.filter((u) => u.status === "banned").length;
    const suspendedUsers = state.users.filter((u) => u.status === "suspended").length;

    const totalGenerations = state.generations.length;
    const generationsLast7d = state.generations.filter((g) => g.createdAt > now - 7 * day).length;
    const generationsLast30d = state.generations.filter((g) => g.createdAt > now - 30 * day).length;

    const logsLast7d = state.logs.filter((l) => l.createdAt > now - 7 * day);
    const creditSpentLast7d = logsLast7d.filter((l) => l.delta < 0).reduce((s, l) => s + Math.abs(l.delta), 0);
    const creditSpentLast30d = state.logs
      .filter((l) => l.delta < 0 && l.createdAt > now - 30 * day)
      .reduce((s, l) => s + Math.abs(l.delta), 0);

    // 14-day generations chart
    const generationsByDay: number[] = [];
    for (let i = 13; i >= 0; i--) {
      const start = now - (i + 1) * day;
      const end = now - i * day;
      generationsByDay.push(state.generations.filter((g) => g.createdAt >= start && g.createdAt < end).length);
    }
    const chartLabels = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now - (13 - i) * day);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });

    // Top models
    const modelCounts = new Map<string, number>();
    state.generations.forEach((g) => {
      modelCounts.set(g.model, (modelCounts.get(g.model) ?? 0) + 1);
    });
    const topModels = Array.from(modelCounts.entries())
      .map(([model, count]) => ({
        label: model,
        count,
        percent: totalGenerations > 0 ? (count / totalGenerations) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const recentActivity = [...state.activity]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10);

    const recentSignups = [...state.users]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    const totalCommunityPosts = state.community.length;
    const hiddenContent =
      state.library.filter((i) => i.hidden).length +
      state.community.filter((p) => p.hidden).length;

    const totalCredits = state.users.reduce((s, u) => s + u.credits, 0);
    const totalSpent = state.users.reduce((s, u) => s + u.totalSpent, 0);

    return {
      totalUsers,
      activeUsers,
      bannedUsers,
      suspendedUsers,
      totalGenerations,
      generationsLast7d,
      generationsLast30d,
      creditSpentLast7d,
      creditSpentLast30d,
      generationsByDay,
      chartLabels,
      topModels,
      recentActivity,
      recentSignups,
      totalCommunityPosts,
      hiddenContent,
      totalCredits,
      totalSpent,
    };
  }, [state]);

  return { ...analytics, hydrated: state.hydrated };
}
