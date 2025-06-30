'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Shield, 
  Banknote, 
  Calendar, 
  Briefcase, 
  AlertCircle, 
  ChevronDown,
  BadgeCheck,
  Clock,
  Info,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import router from "next/router";

interface PolicyBenefitsProps {
  benefitsData: any[];
}

export default function PolicyBenefits({ benefitsData }: PolicyBenefitsProps) {
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  
  // Get icon based on benefit
  const getBenefitStyle = (label: string) => {
    const styles = {
      'life cover': {
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        icon: <Shield className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-blue-500/25',
        text: 'text-blue-600 dark:text-blue-200',
        lightBg: 'bg-blue-50 dark:bg-blue-900'
      },
      'illness': {
        bg: 'bg-gradient-to-br from-rose-500 to-rose-600',
        icon: <Heart className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-rose-500/25',
        text: 'text-rose-600 dark:text-rose-200',
        lightBg: 'bg-rose-50 dark:bg-rose-900'
      },
      'payout': {
        bg: 'bg-gradient-to-br from-green-500 to-green-600',
        icon: <Banknote className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-green-500/25',
        text: 'text-green-600 dark:text-green-200',
        lightBg: 'bg-green-50 dark:bg-green-900'
      },
      'portfolio': {
        bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
        icon: <Briefcase className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-amber-500/25',
        text: 'text-amber-600 dark:text-amber-200',
        lightBg: 'bg-amber-50 dark:bg-amber-900'
      },
      'default': {
        bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
        icon: <AlertCircle className="h-4 w-4 text-white" />,
        hover: 'group-hover:shadow-gray-500/25',
        text: 'text-gray-600 dark:text-gray-200',
        lightBg: 'bg-gray-50 dark:bg-gray-900'
      }
    };
    
    const type = Object.keys(styles).find(key => label.toLowerCase().includes(key)) || 'default';
    return styles[type as keyof typeof styles];
  };

  // Format currency amount
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get badge color based on movement label
  const getMovementStyle = (label: string) => {
    if (label.toLowerCase().includes('add')) {
      return "bg-emerald-50 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-200";
    } else if (label.toLowerCase().includes('rerate')) {
      return "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200";
    } else if (label.toLowerCase().includes('remove')) {
      return "bg-rose-50 text-rose-600 dark:bg-rose-900 dark:text-rose-200";
    } else {
      return "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-primary/10">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Policy Benefits</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {benefitsData.length} Active Benefits
            </p>
          </div>
        </div>
      </div>

      {/* Benefits List */}
      <div className="space-y-6">
        {benefitsData.map((benefit, index) => {
          const isExpanded = expandedBenefit === index;
          const isHovered = hoveredBenefit === index;
          const benefitName = benefit.component_label.split('(')[0].trim();
          const style = getBenefitStyle(benefit.component_label);
          
          return (
            <div 
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredBenefit(index)}
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              {/* Benefit Content */}
              <motion.div 
                className={`relative rounded-xl border-border bg-gradient-to-br from-background to-background/90 py-2 shadow-lg/5 transition-all duration-300 group-hover:shadow-xl/20 ${style.hover} pr-2`}
                initial={false}
                animate={{
                  y: isHovered ? -2 : 0,
                  transition: { duration: 0.2 }
                }}
              >
                
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedBenefit(isExpanded ? null : index)}
                >
                  <div className="flex items-center space-x-2">
                    {/* Benefit Icon */}
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
                        <h4 className="text-sm font-medium">{benefitName}</h4>
                        {benefit.HasChildRecords && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${style.lightBg} ${style.text} font-medium`}>
                            Sub-benefits
                          </span>
                        )}
                      </div>
                      {benefit.on_movement_label && (
                        <div className="flex items-center mt-1 space-x-3 text-xs">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${getMovementStyle(benefit.on_movement_label)}`}>
                            {benefit.on_movement_label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {benefit.single_payment_amount > 0 && (
                      <div className="flex items-center text-xs font-medium">
                        <Banknote className="h-3 w-3 mr-1 text-primary" />
                        {formatCurrency(benefit.single_payment_amount)}
                      </div>
                    )}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  </div>
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
                                <span className="text-xs text-muted-foreground">Start Date</span>
                                <p className="text-sm font-medium">{benefit.contract_component_start_date || 'N/A'}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-3">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <span className="text-xs text-muted-foreground">Term</span>
                                <p className="text-sm font-medium">{benefit.contract_component_term || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            {benefit.contract_component_premium > 0 && (
                              <div className="flex items-center space-x-2">
                                <Banknote className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <span className="text-xs text-muted-foreground">Premium</span>
                                  <p className="text-sm font-medium">{formatCurrency(benefit.contract_component_premium)}</p>
                                </div>
                              </div>
                            )}
                            {benefit.HasChildRecords && (
                              <div className="flex items-center space-x-2 mt-3">
                                <BadgeCheck className="h-4 w-4 text-primary" />
                                <div>
                                  <span className="text-xs text-muted-foreground">Sub-benefits</span>
                                  <p className="text-sm font-medium">Available</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Info className="h-3 w-3 mr-1" />
                            Last updated: {benefit.contract_component_start_date}
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
      <div className="flex justify-center mt-2">
        <button 
          className="flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
          onClick={() => router.push('/role-players')}
        >
          View all {benefitsData.length} benefits
          <ChevronRight className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
} 