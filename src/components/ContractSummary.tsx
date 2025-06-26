'use client';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContractSummaryProps {
  contractDetails: any;
}

export default function ContractSummary({ contractDetails }: ContractSummaryProps) {
  // Format currency values
  const formatCurrency = (value: string | number) => {
    if (typeof value === 'string') {
      return value.trim() || 'R 0.00';
    }
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(value || 0);
  };

  // Summary cards data
  const summaryCards = [
    {
      title: 'Contract Info',
      items: [
        { label: 'Contract Number', value: contractDetails.contractNumber },
        { label: 'Status', value: contractDetails.contractStatus, highlight: true },
        { label: 'Type', value: contractDetails.productLabel || 'N/A' },
        { label: 'Campaign', value: contractDetails.campaignLabel || 'N/A' },
      ]
    },
    {
      title: 'Important Dates',
      items: [
        { label: 'Commencement', value: contractDetails.commencementDateFormatted || 'N/A' },
        { label: 'Maturity', value: contractDetails.maturityDate || 'N/A' },
        { label: 'Term', value: `${contractDetails.contractTerm || 0} years` },
        { label: 'Next Collection', value: contractDetails.nextCollectionDate || 'N/A' },
      ]
    },
    {
      title: 'Financial Summary',
      items: [
        { label: 'Collection Method', value: contractDetails.collectionMethod || 'N/A' },
        { label: 'Collection Frequency', value: contractDetails.collectionFrequency || 'N/A' },
        { label: 'Next Collection Amount', value: formatCurrency(contractDetails.nextCollectionAmount) },
        { label: 'Arrears Amount', value: formatCurrency(contractDetails.arrearsAdvanceAmount) },
      ]
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle>Contract Summary</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaryCards.map((card, index) => (
            <Card key={index} className="bg-muted/40">
              <CardHeader className="py-3">
                <CardTitle className="text-sm text-muted-foreground">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2 space-y-3">
                {card.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{item.label}:</span>
                    <span className={`text-sm font-medium ${item.highlight ? 'text-green-600' : ''}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 