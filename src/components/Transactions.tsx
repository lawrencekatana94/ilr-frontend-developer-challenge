'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TransactionsProps {
  transactionsData: any;
}

export default function Transactions({ transactionsData }: TransactionsProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Sample transactions data since the actual structure is not clear from the JSON
  const sampleTransactions = [
    {
      id: 1,
      date: '2023/03/15',
      type: 'Premium Payment',
      amount: '508.00',
      status: 'Successful',
      reference: 'PMT-20230315-001',
      description: 'Monthly premium payment'
    },
    {
      id: 2,
      date: '2023/02/15',
      type: 'Premium Payment',
      amount: '508.00',
      status: 'Successful',
      reference: 'PMT-20230215-001',
      description: 'Monthly premium payment'
    },
    {
      id: 3,
      date: '2023/01/15',
      type: 'Premium Payment',
      amount: '508.00',
      status: 'Failed',
      reference: 'PMT-20230115-001',
      description: 'Monthly premium payment - Insufficient funds'
    },
    {
      id: 4,
      date: '2023/01/20',
      type: 'Claim Payment',
      amount: '15000.00',
      status: 'Successful',
      reference: 'CLM-20230120-001',
      description: 'Claim payment - Hospital benefit'
    }
  ];
  
  // Filter transactions based on selected filter
  const filteredTransactions = selectedFilter === 'all' 
    ? sampleTransactions 
    : sampleTransactions.filter(t => t.type.toLowerCase().includes(selectedFilter));
  
  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Successful':
        return { variant: "outline" as const, className: "bg-green-100 text-green-800 hover:bg-green-100" };
      case 'Failed':
        return { variant: "outline" as const, className: "bg-red-100 text-red-800 hover:bg-red-100" };
      case 'Pending':
        return { variant: "outline" as const, className: "bg-amber-100 text-amber-800 hover:bg-amber-100" };
      default:
        return { variant: "outline" as const, className: "bg-gray-100 text-gray-800 hover:bg-gray-100" };
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle>Transactions</CardTitle>
        
        {/* Filters */}
        <div className="flex space-x-2">
          <Button 
            variant={selectedFilter === 'all' ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={selectedFilter === 'premium' ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter('premium')}
          >
            Premium
          </Button>
          <Button 
            variant={selectedFilter === 'claim' ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter('claim')}
          >
            Claims
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Transactions table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.type}</div>
                    <div className="text-xs text-muted-foreground">{transaction.description}</div>
                  </TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell className="font-medium">R {transaction.amount}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusBadgeVariant(transaction.status).variant}
                      className={getStatusBadgeVariant(transaction.status).className}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{filteredTransactions.length}</span> transactions
          </p>
          
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 