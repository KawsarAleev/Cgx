import { MainHeader } from "@/components/main-header"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GradingSystem() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainHeader />
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: "Grading System" }]} />

          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold ml-2">UIU Grading System</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Letter Grade System</CardTitle>
              <CardDescription>
                United International University follows a letter grade system with a 4.00 scale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Letter Grade</TableHead>
                    <TableHead>Grade Point</TableHead>
                    <TableHead>Marks Range</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">A</TableCell>
                    <TableCell>4.00</TableCell>
                    <TableCell>90-100</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">A-</TableCell>
                    <TableCell>3.67</TableCell>
                    <TableCell>85-89</TableCell>
                    <TableCell>Very Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">B+</TableCell>
                    <TableCell>3.33</TableCell>
                    <TableCell>80-84</TableCell>
                    <TableCell>Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">B</TableCell>
                    <TableCell>3.00</TableCell>
                    <TableCell>75-79</TableCell>
                    <TableCell>Satisfactory</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">B-</TableCell>
                    <TableCell>2.67</TableCell>
                    <TableCell>70-74</TableCell>
                    <TableCell>Above Average</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">C+</TableCell>
                    <TableCell>2.33</TableCell>
                    <TableCell>65-69</TableCell>
                    <TableCell>Average</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">C</TableCell>
                    <TableCell>2.00</TableCell>
                    <TableCell>60-64</TableCell>
                    <TableCell>Below Average</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">D</TableCell>
                    <TableCell>1.00</TableCell>
                    <TableCell>50-59</TableCell>
                    <TableCell>Pass</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">F</TableCell>
                    <TableCell>0.00</TableCell>
                    <TableCell>0-49</TableCell>
                    <TableCell>Fail</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Academic Standing</CardTitle>
              <CardDescription>CGPA requirements for different academic standings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CGPA Range</TableHead>
                    <TableHead>Academic Standing</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">3.67-4.00</TableCell>
                    <TableCell>Excellent</TableCell>
                    <TableCell>Highest academic achievement</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">3.00-3.66</TableCell>
                    <TableCell>Very Good</TableCell>
                    <TableCell>Strong academic performance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2.33-2.99</TableCell>
                    <TableCell>Good</TableCell>
                    <TableCell>Satisfactory academic performance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2.00-2.32</TableCell>
                    <TableCell>Average</TableCell>
                    <TableCell>Minimum satisfactory performance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Below 2.00</TableCell>
                    <TableCell>Probation</TableCell>
                    <TableCell>Academic performance needs improvement</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Graduation Requirements</CardTitle>
              <CardDescription>Requirements for successful graduation from UIU</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Minimum CGPA of 2.00 is required for graduation</li>
                <li>All required courses must be completed with a passing grade</li>
                <li>Minimum grade of C is required for all major courses</li>
                <li>Completion of required credit hours for the specific program</li>
                <li>No pending disciplinary actions or financial dues</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

