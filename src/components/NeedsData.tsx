"use client";

import Link from "next/link";
import { copy } from "@/content/copy";
import { useAdMoney } from "@/lib/store";
import type { Analysis } from "@/lib/model";
import { Screen, buttonPrimary } from "./ui";

/** Renders children only once there's channel data; otherwise points to upload. */
export function NeedsData({ children }: { children: (a: Analysis) => React.ReactNode }) {
  const { analysis } = useAdMoney();
  if (!analysis) {
    return (
      <Screen>
        <div className="my-auto flex flex-col gap-4 text-center">
          <p className="text-soft">{copy.needsData.message}</p>
          <Link href="/upload" className={buttonPrimary}>
            {copy.needsData.cta}
          </Link>
        </div>
      </Screen>
    );
  }
  return <>{children(analysis)}</>;
}
