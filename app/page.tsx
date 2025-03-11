import { Calculator } from "@/components/calculator"
import { MainHeader } from "@/components/main-header"
import { Breadcrumb } from "@/components/breadcrumb"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainHeader />
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: "Home" }]} />
          <Calculator />
        </div>
      </main>
    </div>
  )
}

