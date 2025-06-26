'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface RolePlayersProps {
  rolesData: any[];
  fullView?: boolean;
}

export default function RolePlayers({ rolesData, fullView = false }: RolePlayersProps) {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  
  // Limit the number of roles shown in non-full view
  const displayRoles = fullView ? rolesData : rolesData.slice(0, 3);
  
  // Get initials from name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };
  
  // Get avatar background color based on role
  const getAvatarColor = (role: string) => {
    const roleColors: Record<string, string> = {
      'LifeA': 'bg-blue-500',
      'PolicyH': 'bg-green-500',
      'Payer': 'bg-purple-500',
      'default': 'bg-gray-500'
    };
    
    return roleColors[role] || roleColors.default;
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle>Role Players</CardTitle>
        {!fullView && rolesData.length > 3 && (
          <Button variant="link" size="sm">
            View all ({rolesData.length})
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {displayRoles.map((role, index) => {
            const isExpanded = expandedRole === index;
            
            return (
              <Card 
                key={index} 
                className="bg-muted/40 transition-all duration-200 hover:border-primary/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {/* Avatar and basic info */}
                    <div className="flex items-center">
                      <Avatar className={`${getAvatarColor(role.roleCode)}`}>
                        <AvatarFallback className="text-white">
                          {getInitials(role.firstName, role.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <h3 className="text-base font-medium">{role.entityName}</h3>
                        <p className="text-sm text-muted-foreground">{role.roleDescription}</p>
                      </div>
                    </div>
                    
                    {/* Expand button */}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setExpandedRole(isExpanded ? null : index)}
                      className="h-8 w-8 p-0"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Button>
                  </div>
                  
                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Personal details */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Personal Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ID Number:</span>
                            <span className="text-sm font-medium">{role.idNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Date of Birth:</span>
                            <span className="text-sm font-medium">{role.dateOfBirth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Gender:</span>
                            <span className="text-sm font-medium">{role.gender}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Relationship:</span>
                            <span className="text-sm font-medium">{role.relationship}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact details */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Cellphone:</span>
                            <span className="text-sm font-medium">{role.cellphone || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <span className="text-sm font-medium">{role.email || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Effective From:</span>
                            <span className="text-sm font-medium">{role.effectiveFromDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 