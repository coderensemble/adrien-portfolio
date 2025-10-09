"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

export default function TooltipWrapper({ children, text }: { children: ReactNode; text: string }) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            className="rounded-lg bg-gray-900 text-white px-3 py-2 text-sm shadow-lg max-w-xs animate-fade-in"
          >
            {text}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
