"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CgpaCalculator } from "@/components/cgpa-calculator"
import { TuitionCalculator } from "@/components/tuition-calculator"

export function Calculator() {
  const [activeTab, setActiveTab] = useState("cgpa")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="cgpa" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cgpa">CGPA Calculator</TabsTrigger>
          <TabsTrigger value="tuition">Tuition Fee Calculator</TabsTrigger>
        </TabsList>
        <TabsContent value="cgpa">
          <CgpaCalculator />
        </TabsContent>
        <TabsContent value="tuition">
          <TuitionCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

