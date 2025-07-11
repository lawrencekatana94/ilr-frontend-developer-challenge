"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const {theme, setTheme } = useTheme()

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="relative rounded-full text-muted-foreground hover:bg-primary/20 hover:text-foreground hover:dark:bg-primary/20"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
