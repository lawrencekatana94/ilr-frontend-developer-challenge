'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search,
  Bell,
  ChevronDown,
  FileText,
  Settings,
  LogOut,
  User,
  ExternalLink
} from "lucide-react";

import contractDetails from "@/data/contract_detail_view.json";
import { ModeToggle } from '../theme/mode-toggle';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const contractNumber = contractDetails.ttContractDetailsView[0].contractNumber;
  
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/5 sticky top-0 z-10">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Side - Contract Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Contract #{contractNumber}</p>
                  <p className="text-xs text-muted-foreground">Active Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {/* mode-toggle */}
          <ModeToggle />

          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="absolute right-0 top-0 w-64 md:w-80">
                <Input
                  type="text"
                  placeholder="Search contract..."
                  className="pr-8"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-0 top-0 h-full text-muted-foreground hover:text-foreground"
                  onClick={() => setShowSearch(false)}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSearch(true)}
                className="text-muted-foreground hover:bg-primary/20 hover:text-foreground rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-primary/20 hover:text-foreground rounded-full">
                <Bell className="h-4 w-4 " />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="text-xs font-medium">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer space-y-1 focus:bg-accent/5">
                  <div className="font-medium text-sm">Premium payment due</div>
                  <div className="text-xs text-muted-foreground">Your next premium payment of R 508.00 is due in 3 days.</div>
                  <div className="text-[10px] text-muted-foreground">2 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer space-y-1 focus:bg-accent/5">
                  <div className="font-medium text-sm">Contract updated</div>
                  <div className="text-xs text-muted-foreground">Your contract terms have been updated.</div>
                  <div className="text-[10px] text-muted-foreground">Yesterday</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2">
                <Button 
                  variant="ghost" 
                  className="w-full h-8 text-xs font-medium text-primary hover:text-primary/80"
                >
                  View all notifications
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full hover:bg-primary/20">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs ">A</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs font-medium">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:bg-accent/5">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-accent/5">
                <Settings className="h-4 w-4 mr-2" />
                <span className="text-sm">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:bg-accent/5">
                <LogOut className="h-4 w-4 mr-2" />
                <span className="text-sm">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 