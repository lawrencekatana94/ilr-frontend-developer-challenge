'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import JSON data
import contractData from '../data/contract_detail_view.json';
import rolesData from '../data/roles.json';
import timelineData from '../data/time_line.json';
import componentsData from '../data/components.json';
import transactionsData from '../data/transactions.json';
import { EyeIcon } from 'lucide-react';

export default function ContractDashboard() {
  const [activeTab, setActiveTab] = useState('contract-movements');
  
  // Extract contract details from JSON
  const contractDetails = contractData.ttContractDetailsView[0];
  const contractRoles = rolesData.contractrolesview.ttContractRolesView;
  
  // Get premium value with fallback
  const premiumValue = contractDetails.actualRecurringCollection || '79.00';
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fc]">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b py-2 px-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and menu items */}
          <div className="flex items-center space-x-6">
            <div className="font-bold text-blue-600 text-xl">MIP</div>
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm">Financials</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm">One Client</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm">Insurance</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm">Rx Admin Menu</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm">Digital Stack</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm">WarpSpeed</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm">Insurance</a>
            </nav>
          </div>
          
          {/* Right side - Search */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Quick search" 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
      </header>
      
      {/* Secondary Navigation */}
      <div className="bg-green-800 text-white py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <a href="#" className="hover:bg-green-700 px-3 py-1 rounded text-sm">Contract Options</a>
            <a href="#" className="hover:bg-green-700 px-3 py-1 rounded text-sm">Policy Amendments</a>
            <a href="#" className="hover:bg-green-700 px-3 py-1 rounded text-sm">Transactions</a>
            <a href="#" className="hover:bg-green-700 px-3 py-1 rounded text-sm">Values</a>
            <a href="#" className="hover:bg-green-700 px-3 py-1 rounded text-sm">View Events</a>
          </div>
        </div>
      </div>
      
      {/* Contract Info Bar */}
      <div className="bg-green-700 text-white py-1 px-4 text-sm">
        <div className="flex items-center justify-center">
          <span>{contractDetails.contractNumber} | {contractDetails.contractStatus} | {contractDetails.productLabel} - {contractDetails.campaignLabel} | {contractDetails.commencementDateFormatted} | {premiumValue}</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Contract Movements</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Date Range Selector */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <input type="text" placeholder="yyyy/mm/dd" className="border border-gray-300 rounded px-2 py-1 text-sm w-28" />
                <input type="text" placeholder="yyyy/mm/dd" className="border border-gray-300 rounded px-2 py-1 text-sm w-28" />
              </div>
              
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Filter
                </Button>
              </div>
            </div>
            
            {/* Timeline Visualization */}
            <div className="relative py-8">
              {/* Timeline line */}
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200"></div>
              
              {/* Timeline points */}
              <div className="flex justify-between relative">
                {/* In-Force Point */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mb-2 z-10">
                    <span className="text-xs font-bold">NB</span>
                  </div>
                  <div className="text-center text-xs">
                    <div className="font-medium">In-Force</div>
                    <div className="text-gray-500">{contractDetails.commencementDateFormatted}</div>
                    <div className="text-gray-500">{premiumValue}</div>
                  </div>
                </div>
                
                {/* Today Point */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mb-2 z-10">
                    <span className="text-xs font-bold">T</span>
                  </div>
                  <div className="text-center text-xs">
                    <div className="font-medium">Today</div>
                    <div className="text-gray-500">{new Date().toLocaleDateString('en-ZA')}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Role Players Table */}
        <Tabs defaultValue="components">
          <div className="border-b">
            <TabsList className="bg-transparent h-10">
              <TabsTrigger value="rolePlayers" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                Role Players
              </TabsTrigger>
              <TabsTrigger value="contractDetails" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                Contract Details
              </TabsTrigger>
              <TabsTrigger value="historyStatus" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                History Status
              </TabsTrigger>
              <TabsTrigger value="escalations" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                Escalations
              </TabsTrigger>
              <TabsTrigger value="debicheckMandates" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                Debicheck Mandates
              </TabsTrigger>
              <TabsTrigger value="movementValues" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                Movement Values
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                Transactions
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="rolePlayers" className="pt-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium">Role</TableHead>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Relationship</TableHead>
                  <TableHead className="font-medium">Dep</TableHead>
                  <TableHead className="font-medium">Date of Birth</TableHead>
                  <TableHead className="font-medium">Identity Reference</TableHead>
                  <TableHead className="font-medium">Gender</TableHead>
                  <TableHead className="font-medium">Cellphone</TableHead>
                  <TableHead className="font-medium">Email</TableHead>
                  <TableHead className="font-medium">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractRoles.slice(0, 3).map((role, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{role.roleDescription}</TableCell>
                    <TableCell className="font-medium">{role.entityName}</TableCell>
                    <TableCell>{role.relationship}</TableCell>
                    <TableCell>{role.dependantCode || '0'}</TableCell>
                    <TableCell>{role.dateOfBirth}</TableCell>
                    <TableCell>{role.idNumber}</TableCell>
                    <TableCell>{role.gender}</TableCell>
                    <TableCell>{role.cellphone}</TableCell>
                    <TableCell>{role.email}</TableCell>
                    <TableCell><EyeIcon className="w-4 h-4" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
        
        {/* Components Section */}
        <div className="mt-4">
          <Tabs defaultValue="components">
            <div className="border-b">
              <TabsList className="bg-transparent h-10">
                <TabsTrigger value="components" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Components
                </TabsTrigger>
                <TabsTrigger value="insurer" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Insurer
                </TabsTrigger>
                <TabsTrigger value="incidents" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Incidents
                </TabsTrigger>
                <TabsTrigger value="units" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Units
                </TabsTrigger>
                <TabsTrigger value="requirements" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Requirements
                </TabsTrigger>
                <TabsTrigger value="case" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Case
                </TabsTrigger>
                <TabsTrigger value="escalation" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  EscalationDecline
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Notes
                </TabsTrigger>
                <TabsTrigger value="mandates" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Mandates
                </TabsTrigger>
                <TabsTrigger value="authRequest" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  AuthRequest
                </TabsTrigger>
                <TabsTrigger value="callLogs" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Call Logs
                </TabsTrigger>
                <TabsTrigger value="workflows" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Workflows
                </TabsTrigger>
                <TabsTrigger value="decisions" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Decisions
                </TabsTrigger>
                <TabsTrigger value="inOutBoundComms" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  InOutBoundComms
                </TabsTrigger>
                <TabsTrigger value="multimedia" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  MultiMedia
                </TabsTrigger>
                <TabsTrigger value="answerSheet" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  AnswerSheet
                </TabsTrigger>
                <TabsTrigger value="datasets" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2 h-10">
                  Datasets
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="components" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-medium">Component</TableHead>
                    <TableHead className="font-medium">On Movement</TableHead>
                    <TableHead className="font-medium">Off Movement</TableHead>
                    <TableHead className="font-medium">From Date</TableHead>
                    <TableHead className="font-medium">To Date</TableHead>
                    <TableHead className="font-medium">Term (Y/M)</TableHead>
                    <TableHead className="font-medium">Premium</TableHead>
                    <TableHead className="font-medium">Recurring Benefit</TableHead>
                    <TableHead className="font-medium">Single Benefit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">05 - Funeral Platinum (7005) / 1 (1)</TableCell>
                    <TableCell>In-Force</TableCell>
                    <TableCell></TableCell>
                    <TableCell>2023/03/01</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Whole Life</TableCell>
                    <TableCell>79.00</TableCell>
                    <TableCell>0.00</TableCell>
                    <TableCell>50000.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t text-gray-600 py-2 px-4 text-xs">
        <div className="flex justify-center">
          <span>Personal Finance Life Demo</span>
          <span className="ml-auto">Copyright © 2004-2025 MIP Holdings (Pty) Ltd. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
} 