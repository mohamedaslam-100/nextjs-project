import React from 'react'
import { Card as ShadcnCard } from "@/components/ui/card"

interface CustomCardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CustomCardProps) {
  return (
    <ShadcnCard className={className}>
      {children}
    </ShadcnCard>
  )
}

