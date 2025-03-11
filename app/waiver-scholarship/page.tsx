import { MainHeader } from "@/components/main-header"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function WaiverScholarship() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainHeader />
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: "Waiver & Scholarship Information" }]} />

          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold ml-2">Waiver & Scholarship Information</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tuition Fee Waiver</CardTitle>
              <CardDescription>
                UIU offers various tuition fee waivers based on academic performance and other criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-3">Merit-Based Waiver</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Criteria</TableHead>
                    <TableHead>Waiver Percentage</TableHead>
                    <TableHead>Requirements to Maintain</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">SSC & HSC GPA 5.00</TableCell>
                    <TableCell>50%</TableCell>
                    <TableCell>Maintain minimum CGPA of 3.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SSC & HSC GPA 4.50+</TableCell>
                    <TableCell>25%</TableCell>
                    <TableCell>Maintain minimum CGPA of 3.25</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Admission Test Top Performers</TableCell>
                    <TableCell>25-100%</TableCell>
                    <TableCell>Maintain minimum CGPA of 3.50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Separator className="my-6" />

              <h3 className="text-lg font-medium mb-3">Special Waivers</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Waiver Percentage</TableHead>
                    <TableHead>Eligibility</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Freedom Fighter's Children</TableCell>
                    <TableCell>25%</TableCell>
                    <TableCell>Valid documentation required</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Siblings</TableCell>
                    <TableCell>25%</TableCell>
                    <TableCell>For siblings studying at UIU simultaneously</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">UIU Employee's Children</TableCell>
                    <TableCell>50%</TableCell>
                    <TableCell>For children of permanent UIU employees</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Scholarships</CardTitle>
              <CardDescription>UIU offers various scholarships to support outstanding students</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-3">Performance-Based Scholarships</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Criteria</TableHead>
                    <TableHead>Scholarship Amount</TableHead>
                    <TableHead>Selection Process</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Dean's List Scholarship</TableCell>
                    <TableCell>25-50% tuition fee</TableCell>
                    <TableCell>Top performers in each department each semester</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vice-Chancellor's Scholarship</TableCell>
                    <TableCell>50-100% tuition fee</TableCell>
                    <TableCell>Top performers across the university</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Research Scholarship</TableCell>
                    <TableCell>Variable</TableCell>
                    <TableCell>Based on research contributions and publications</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
              <CardDescription>Key information about waivers and scholarships at UIU</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Students can only receive one type of waiver or scholarship at a time (the highest applicable one)
                </li>
                <li>Waivers and scholarships apply only to tuition fees, not to other fees</li>
                <li>Students must maintain the required CGPA to continue receiving waivers</li>
                <li>Scholarships are typically awarded on a semester basis and may require reapplication</li>
                <li>All waivers and scholarships are subject to the university's financial policies</li>
                <li>For the most accurate and up-to-date information, please contact the UIU Accounts Office</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

