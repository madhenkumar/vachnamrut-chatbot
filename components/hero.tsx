"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroSectionProps = {
  targetId?: string
}

export function HeroSection({ targetId = "chat" }: HeroSectionProps) {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
  <header className="w-full text-center">
      <div
        className={cn(
          "min-h-[50svh] flex items-center",
          // base container
          "container mx-auto px-4",
        )}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {"AI for Scripture Understanding: A Gujarati RAG-based QA System on the Vachanamrut."}
          </h1>

          <p className="mt-4 text-pretty text-base leading-6 text-muted-foreground sm:text-lg">
            {
              "An AI system that answers questions from the sacred scripture ‘Vachanamrut’ in Gujarati, preserving authenticity and accessibility for all."
            }
          </p>

          <p className="mt-3 text-sm text-muted-foreground/80">
            {
              "Developed independently using Retrieval-Augmented Generation (RAG) architecture for vernacular religious text analysis."
            }
          </p>

          <div className="mt-8">
            <Button
              aria-label="Try it live - scroll to chat"
              onClick={handleScroll}
              className={cn(
                "group",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "px-8 py-6 text-base md:text-lg font-medium rounded-xl",
                "shadow-lg hover:shadow-xl transition-transform duration-200",
                "hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring",
              )}
              size="lg"
            >
              <span>Try it live</span>
            </Button>
            <div className="mt-3 text-xs text-muted-foreground">{"Scrolls to the chat experience below"}</div>
          </div>
        </div>
      </div>
    </header>
    </div>
  )
}
