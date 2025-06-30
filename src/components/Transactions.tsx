"use client";

import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  description: string;
}

interface TransactionsProps {
  isLoading?: boolean;
  transactions?: Transaction[];
}

export function Transactions({ isLoading = true, transactions = [] }: TransactionsProps) {
  if (isLoading) {
    return (
      <div className="py-1 space-y-4">
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-base font-semibold">Transactions</h3>
                </div>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                key={i}
                className={cn(
                    "flex items-center space-x-4 rounded-lg p-4",
                    "bg-gradient-to-r from-transparent via-muted/10 to-transparent",
                    "animate-[shimmer_2s_infinite]",
                    "relative overflow-hidden",
                    "before:absolute before:inset-0",
                    "before:-translate-x-full",
                    "before:animate-[shimmer_2s_infinite]",
                    "before:bg-gradient-to-r",
                    "before:from-transparent before:via-muted/10 before:to-transparent"
                )}
                >
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-[60%] rounded-lg bg-muted" />
                    <div className="h-3 w-[40%] rounded-lg bg-muted" />
                </div>
                <div className="h-4 w-[15%] rounded-lg bg-muted" />
                </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Actual transactions list will go here - for now just showing placeholder */}
      <div className="text-center text-muted-foreground">No transactions to display</div>
    </div>
  );
}
