'use client';

import RolePlayers from "@/components/RolePlayers";
import PolicyBenefits from "@/components/PolicyBenefits";
import {
  Calendar, FileText, Shield,
  CalendarDays, Banknote, Tag, Landmark, Activity,
} from "lucide-react";

import contract_detail_view from '@/data/contract_detail_view.json';
import roles from '@/data/roles.json';
import movement_values from '@/data/movement_values.json';
import time_line from '@/data/time_line.json';
import components from '@/data/components.json';
import Timeline from "@/components/Timeline";
import TimelineGraph from "@/components/TimelineGraph";
import MovementChart from "@/components/MovementChart";

export default function Home() {
  const contractDetails = contract_detail_view.ttContractDetailsView[0];
  const contractRoles = roles.contractrolesview.ttContractRolesView;
  const contractMovements = movement_values.movementvaluesview.ttMovementValueView;
  const contractTimeline = time_line.Elements;
  const contractBenefits = components.contractcomponentview.ttContractComponentView;

  // Sort timeline items chronologically
  const sortedTimeline = [...contractTimeline].sort((a, b) =>
      new Date(b.Start).getTime() - new Date(a.Start).getTime()
  );



  // Prepare movement data for chart with month labels for the full year
  const generateFullYearData = () => {
    if (!contractMovements || contractMovements.length === 0) {
      return [];
    }

    return contractMovements.map(movement => {
      const date = new Date(movement.movementEffectiveDate);
      return {
        date: date,
        amount: movement.amount,
        movementDescription: movement.movementDescription,
        movementEffectiveDate: movement.movementEffectiveDate,
        formattedDate: date.toLocaleDateString('en-US', {
          month: 'short'
        }),
        fullDate: date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
    }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date descending
  };

  const movementData = generateFullYearData();

  return (
      <div className="min-h-screen space-y-6">
        {/* Top Bar - Contract Overview */}
        <div className="flex items-center justify-between rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 px-4 py-3">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-semibold text-primary dark:text-primary-foreground">
                #{contractDetails.contractNumber}
              </h1>
              <p className="text-sm text-muted-foreground">
                {contractDetails.productLabel}
              </p>
            </div>
            <div className="h-8 w-[1px] bg-border/30"></div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {contractDetails.contractStatus}
              </div>
              <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {contractDetails.collectionFrequency}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export Details
            </button>
            <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Manage Policy
            </button>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Role Players & Benefits */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="overflow-hidden rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 px-4 py-3">
              <RolePlayers rolesData={contractRoles} />
            </div>
            <div className="overflow-hidden rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 px-4 py-3">
              <PolicyBenefits benefitsData={contractBenefits} />
            </div>
          </div>

          {/* Middle Column - Movement Charts */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 hover:shadow-blue-500 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                    <Banknote className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Premium</p>
                    <p className="text-xl font-semibold mt-1">
                      R {contractMovements[0]?.amount.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 hover:shadow-emerald-500 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600">
                    <CalendarDays className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="text-xl font-semibold mt-1">
                      {new Date(contractDetails.commencementDate).toLocaleDateString('en-ZA', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Graph */}
            <div className="overflow-hidden rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 px-4 py-3">
              <TimelineGraph timelineData={sortedTimeline} />
            </div>

            {/* Timeline */}
            <div className="rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 px-4 py-3">
              <Timeline timelineData={sortedTimeline} />
            </div>

          </div>

          {/* Right Column - Timeline & Additional Info */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 hover:shadow-amber-500 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600">
                    <Tag className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="text-base font-semibold mt-1">{contractDetails.productCode}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{contractDetails.campaignCode}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 hover:shadow-purple-500 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-gradient-to-br from-purple-500 to-purple-600">
                    <Landmark className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Collection</p>
                    <p className="text-base font-semibold mt-1">{contractDetails.collectionMethod}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Next: {contractDetails.nextCollectionDate || 'Not scheduled'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Movement Chart */}
            <div className="rounded-xl bg-background border border-border/5 shadow-2xl/5  transition-all duration-300 hover:shadow-2xl/10 px-4 py-3">
              <MovementChart movementData={movementData} />
            </div>

          </div>
        </div>
      </div>
  );
}
