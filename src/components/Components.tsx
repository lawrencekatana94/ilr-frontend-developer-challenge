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

interface ComponentsProps {
  componentsData: any;
}

export default function Components({ componentsData }: ComponentsProps) {
  const [expandedComponent, setExpandedComponent] = useState<number | null>(null);
  
  // Sample components data since the actual structure is not clear from the JSON
  const sampleComponents = [
    {
      id: 1,
      name: 'Funeral Platinum',
      code: '05 - Funeral Platinum (7005)',
      status: 'In-Force',
      startDate: '2023/03/01',
      endDate: null,
      premium: '79.00',
      recurringBenefit: '0.00',
      singleBenefit: '50000.00',
      term: 'Whole Life'
    },
    {
      id: 2,
      name: 'Extended Family Cover',
      code: '06 - Extended Family Cover (7006)',
      status: 'In-Force',
      startDate: '2023/03/01',
      endDate: null,
      premium: '35.00',
      recurringBenefit: '0.00',
      singleBenefit: '15000.00',
      term: 'Whole Life'
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Components</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>From Date</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleComponents.map((component, index) => {
                const isExpanded = expandedComponent === index;
                
                return (
                  <>
                    <TableRow key={component.id}>
                      <TableCell>
                        <div className="font-medium">{component.name}</div>
                        <div className="text-xs text-muted-foreground">{component.code}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={component.status === 'In-Force' ? "secondary" : "outline"} className={component.status === 'In-Force' ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>
                          {component.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{component.startDate}</TableCell>
                      <TableCell>{component.term}</TableCell>
                      <TableCell className="font-medium">R {component.premium}</TableCell>
                      <TableCell>
                        <Button 
                          variant="link"
                          onClick={() => setExpandedComponent(isExpanded ? null : index)}
                        >
                          {isExpanded ? 'Hide Details' : 'Show Details'}
                        </Button>
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded details row */}
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={6} className="bg-muted/50">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
                            <div>
                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Benefit Details</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Single Benefit:</span>
                                  <span className="text-sm font-medium">R {component.singleBenefit}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Recurring Benefit:</span>
                                  <span className="text-sm font-medium">R {component.recurringBenefit}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Term Details</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Start Date:</span>
                                  <span className="text-sm font-medium">{component.startDate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">End Date:</span>
                                  <span className="text-sm font-medium">{component.endDate || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Actions</h4>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button variant="secondary" size="sm">
                                  Edit Component
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
} 