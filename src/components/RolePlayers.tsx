'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  User, 
  UserCheck, 
  ChevronDown,
  ChevronRight,
  Shield,
  CreditCard,
  Info,
  ArrowRight
} from "lucide-react";
import { useRouter } from 'next/navigation';

interface RolePlayersProps {
  rolesData: any[];
  fullView?: boolean;
}

export default function RolePlayers({ rolesData, fullView = false }: RolePlayersProps) {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [hoveredRole, setHoveredRole] = useState<number | null>(null);
  const router = useRouter();
  
  // use only the first 4 roles
  const displayRoles = fullView ? rolesData : rolesData.slice(0, 5);
  
  // Get role icon and style based on role
  const getRoleStyle = (role: string) => {
    const styles = {
      'LifeA': {
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        icon: <Shield className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-blue-500/25',
        text: 'text-blue-600 dark:text-blue-200',
        lightBg: 'bg-blue-50 dark:bg-blue-900',
        label: "Life Assured"
      },
      'PolicyH': {
        bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        icon: <UserCheck className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-emerald-500/25',
        text: 'text-emerald-600 dark:text-emerald-200',
        lightBg: 'bg-emerald-50 dark:bg-emerald-900',
        label: "Policy Holder"
      },
      'PolicyP': {
        bg: 'bg-gradient-to-br from-violet-500 to-violet-600',
        icon: <CreditCard className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-violet-500/25',
        text: 'text-violet-600 dark:text-violet-200',
        lightBg: 'bg-violet-50 dark:bg-violet-900',
        label: "Policy Payer"
      },
      'Bene': {
        bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
        icon: <User className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-amber-500/25',
        text: 'text-amber-600 dark:text-amber-200',
        lightBg: 'bg-amber-50 dark:bg-amber-900',
        label: "Beneficiary"
      },
      'default': {
        bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
        icon: <User className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-gray-500/25',
        text: 'text-gray-600 dark:text-gray-200',
        lightBg: 'bg-gray-50 dark:bg-gray-900',
        label: "Other"
      }
    };
    
    return styles[role as keyof typeof styles] || styles.default;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-primary/10">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Role Players</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {rolesData.length} Associated Parties
            </p>
          </div>
        </div>
      </div>

      {/* Roles List */}
      <div className="space-y-6">
        {displayRoles.map((role, index) => {
          const isExpanded = expandedRole === index;
          const isHovered = hoveredRole === index;
          const style = getRoleStyle(role.roleCode);
          
          return (
            <div 
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredRole(index)}
              onMouseLeave={() => setHoveredRole(null)}
            >
              {/* Role Content */}
              <motion.div 
                className={`relative rounded-xl border border-border/5 bg-gradient-to-br from-background to-background/90 py-2 shadow-lg/5 transition-all duration-300 group-hover:shadow-xl/20 ${style.hover} pr-2`}
                initial={false}
                animate={{
                  y: isHovered ? -2 : 0,
                  transition: { duration: 0.2 }
                }}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedRole(isExpanded ? null : index)}
                >
                  <div className="flex items-center space-x-2">
                    {/* Role Icon */}
                    <motion.div 
                      className={`w-10 h-10 rounded-full ${style.bg} flex items-center justify-center z-10 shadow-lg transition-shadow duration-300 ${style.hover}`}
                      initial={false}
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {style.icon}
                    </motion.div>

                    {/* Main content */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium">{role.entityName}</h4>
                      </div>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1 ${style.lightBg} ${style.text}`}>
                        {style.label}
                      </span>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-border/10">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <span className="text-xs text-muted-foreground">Date of Birth</span>
                                <p className="text-sm font-medium">{role.dateOfBirth || 'N/A'}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-3">
                              <Info className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <span className="text-xs text-muted-foreground">ID Number</span>
                                <p className="text-sm font-medium">{role.idNumber || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            {role.cellphone && (
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <span className="text-xs text-muted-foreground">Phone</span>
                                  <p className="text-sm font-medium">{role.cellphone}</p>
                                </div>
                              </div>
                            )}
                            {role.email && (
                              <div className="flex items-center space-x-2 mt-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <span className="text-xs text-muted-foreground">Email</span>
                                  <p className="text-sm font-medium">{role.email}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Info className="h-3 w-3 mr-1" />
                            Last updated: {role.dateOfBirth}
                          </div>
                          <button className="flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                            View Details
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* View more link */}
      {!fullView && rolesData.length > 4 && (
        <div className="flex justify-center mt-4">
          <button 
            className="flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
            onClick={() => router.push('/role-players')}
          >
            View all {rolesData.length} role players
            <ChevronRight className="h-3 w-3 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
} 