import React from "react";
import { useSession } from "@/src/session-context";
import { TimelineAuthGate } from "@/src/features/timeline/components/TimelineAuthGate";
import { TimelineAuthenticatedBody } from "@/src/features/timeline/screens/TimelineAuthenticatedBody";

/**
 * Tab Dòng thời gian — route mỏng; logic tải list + list tuning nằm trong feature.
 */
export default function TimelineScreen() {
  const { isAuthenticated, session } = useSession();
  const isPaired = Boolean(session?.user?.coupleId);

  if (!isAuthenticated) {
    return <TimelineAuthGate isAuthenticated={false} isPaired={false} />;
  }

  if (!isPaired) {
    return <TimelineAuthGate isAuthenticated isPaired={false} />;
  }

  return <TimelineAuthenticatedBody />;
}
