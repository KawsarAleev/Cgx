"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PlusCircle,
  Trash2,
  Calculator,
  RotateCcw,
  ArrowLeft,
  Award,
  BookOpen,
  GraduationCap,
  BarChart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "@/components/ui/chart"

// Define grade points for UIU
const gradePoints = {
  A: 4.0,
  "A-": 3.67,
  "B+": 3.33,
  B: 3.0,
  "B-": 2.67,
  "C+": 2.33,
  C: 2.0,
  "C-": 1.67,
  "D+": 1.33,
  D: 1.0,
  F: 0.0,
}

type Course = {
  id: string
  credit: number
  grade: string
}

type RetakeCourse = {
  id: string
  credit: number
  previousGrade: string
  newGrade: string
}

type CalculationResult = {
  newCgpa: number
  currentCgpa: number
  completedCredit: number
  newCourseCredits: number
  newCoursePoints: number
  retakeCourseCredits: number
  retakeImprovementPoints: number
  totalCredits: number
}

export function CgpaCalculator() {
  const [completedCredit, setCompletedCredit] = useState<string>("")
  const [currentCgpa, setCurrentCgpa] = useState<string>("")
  const [courses, setCourses] = useState<Course[]>([])
  const [retakeCourses, setRetakeCourses] = useState<RetakeCourse[]>([])
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    credit: 3,
    grade: "A",
  })
  const [newRetakeCourse, setNewRetakeCourse] = useState<Partial<RetakeCourse>>({
    credit: 3,
    previousGrade: "C",
    newGrade: "B",
  })
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<boolean>(false)

  // Scroll to top when showing results
  useEffect(() => {
    if (showResults) {
      window.scrollTo(0, 0)
    }
  }, [showResults])

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        credit: newCourse.credit || 3,
        grade: newCourse.grade || "A",
      },
    ])
    setNewCourse({
      credit: 3,
      grade: "A",
    })
  }

  const addRetakeCourse = () => {
    setRetakeCourses([
      ...retakeCourses,
      {
        id: Date.now().toString(),
        credit: newRetakeCourse.credit || 3,
        previousGrade: newRetakeCourse.previousGrade || "C",
        newGrade: newRetakeCourse.newGrade || "B",
      },
    ])
    setNewRetakeCourse({
      credit: 3,
      previousGrade: "C",
      newGrade: "B",
    })
  }

  const removeCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const removeRetakeCourse = (id: string) => {
    setRetakeCourses(retakeCourses.filter((course) => course.id !== id))
  }

  const calculateCgpa = () => {
    if (!completedCredit || !currentCgpa) {
      setValidationError(true)
      return
    }

    const completedCreditNum = Number.parseFloat(completedCredit)
    const currentCgpaNum = Number.parseFloat(currentCgpa)

    // Calculate total quality points from current CGPA
    const currentQualityPoints = completedCreditNum * currentCgpaNum

    // Calculate quality points from new courses
    let newCourseCredits = 0
    let newCoursePoints = 0

    courses.forEach((course) => {
      newCourseCredits += course.credit
      newCoursePoints += course.credit * gradePoints[course.grade as keyof typeof gradePoints]
    })

    // Calculate quality points from retake courses
    let retakeCourseCredits = 0
    let retakeImprovementPoints = 0

    retakeCourses.forEach((course) => {
      retakeCourseCredits += course.credit
      const previousPoints = course.credit * gradePoints[course.previousGrade as keyof typeof gradePoints]
      const newPoints = course.credit * gradePoints[course.newGrade as keyof typeof gradePoints]
      retakeImprovementPoints += newPoints - previousPoints
    })

    // Calculate new CGPA
    const totalQualityPoints = currentQualityPoints + newCoursePoints + retakeImprovementPoints
    const totalCredits = completedCreditNum + newCourseCredits

    const newCgpa = totalQualityPoints / totalCredits

    setCalculationResult({
      newCgpa,
      currentCgpa: currentCgpaNum,
      completedCredit: completedCreditNum,
      newCourseCredits,
      newCoursePoints,
      retakeCourseCredits,
      retakeImprovementPoints,
      totalCredits,
    })

    setShowResults(true)
  }

  const resetCalculator = () => {
    setCompletedCredit("")
    setCurrentCgpa("")
    setCourses([])
    setRetakeCourses([])
    setCalculationResult(null)
    setShowResults(false)
    setValidationError(false)
  }

  const backToCalculator = () => {
    setShowResults(false)
  }

  if (showResults && calculationResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={backToCalculator}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold">CGPA Calculation Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - CGPA summary */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30 py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-4 w-4 text-amber-500" />
                Your Projected CGPA
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="text-5xl font-bold">{calculationResult.newCgpa.toFixed(2)}</div>

                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={
                      calculationResult.currentCgpa < calculationResult.newCgpa ? "text-green-500" : "text-red-500"
                    }
                  >
                    {calculationResult.currentCgpa < calculationResult.newCgpa ? "+" : ""}
                    {(calculationResult.newCgpa - calculationResult.currentCgpa).toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">from current CGPA</span>
                </div>

                <div className="w-full mt-3">
                  <div className="relative pt-1 w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-primary">CGPA Scale</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold inline-block text-primary">4.00</span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-3 text-xs flex rounded bg-muted">
                      <div
                        style={{ width: `${calculationResult.newCgpa * 25}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right column - Calculation breakdown */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart className="h-4 w-4 text-blue-500" />
                Calculation Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current CGPA:</span>
                  <span className="font-medium">{calculationResult.currentCgpa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completed Credits:</span>
                  <span className="font-medium">{calculationResult.completedCredit.toFixed(1)}</span>
                </div>
                <Separator />

                {courses.length > 0 && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">New Courses:</span>
                      <Badge variant="outline">{courses.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">New Course Credits:</span>
                      <span className="font-medium">{calculationResult.newCourseCredits.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">New Course Quality Points:</span>
                      <span className="font-medium">{calculationResult.newCoursePoints.toFixed(2)}</span>
                    </div>
                    <Separator />
                  </>
                )}

                {retakeCourses.length > 0 && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Retake Courses:</span>
                      <Badge variant="outline">{retakeCourses.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Retake Course Credits:</span>
                      <span className="font-medium">{calculationResult.retakeCourseCredits.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Quality Point Improvement:</span>
                      <span className="font-medium">{calculationResult.retakeImprovementPoints.toFixed(2)}</span>
                    </div>
                    <Separator />
                  </>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Credits After Completion:</span>
                  <span className="font-medium">{calculationResult.totalCredits.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grade Distribution */}
        {(courses.length > 0 || retakeCourses.length > 0) && (
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-green-500" />
                Grade Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {Object.keys(gradePoints).map((grade) => {
                  const courseCount = courses.filter((c) => c.grade === grade).length
                  const retakeCount = retakeCourses.filter((c) => c.newGrade === grade).length
                  const total = courseCount + retakeCount
                  const percentage =
                    courses.length + retakeCourses.length > 0
                      ? (total / (courses.length + retakeCourses.length)) * 100
                      : 0

                  return (
                    <div key={grade} className="flex flex-col items-center p-2 border rounded">
                      <span className="text-base font-bold">{grade}</span>
                      <span className="text-xs text-muted-foreground">{total}</span>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CGPA Progression Chart and Grade Distribution Chart side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CGPA Progression Chart */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <RechartsLineChart className="h-4 w-4 text-blue-500" />
                CGPA Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart
                  data={[
                    { semester: "Previous", cgpa: calculationResult.currentCgpa },
                    { semester: "Projected", cgpa: calculationResult.newCgpa },
                  ]}
                >
                  <XAxis dataKey="semester" />
                  <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cgpa" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Grade Distribution Chart */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <RechartsBarChart className="h-4 w-4 text-green-500" />
                Grade Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart
                  data={Object.keys(gradePoints).map((grade) => {
                    const courseCount = courses.filter((c) => c.grade === grade).length
                    const retakeCount = retakeCourses.filter((c) => c.newGrade === grade).length
                    return {
                      grade,
                      count: courseCount + retakeCount,
                    }
                  })}
                >
                  <XAxis dataKey="grade" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* CGPA interpretation */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4 text-purple-500" />
              CGPA Interpretation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">According to UIU grading system:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div
                className={`p-2 border rounded-md ${calculationResult.newCgpa >= 3.67 ? "bg-primary/10 border-primary" : ""}`}
              >
                <span className={calculationResult.newCgpa >= 3.67 ? "font-bold" : ""}>3.67-4.00: Excellent</span>
              </div>
              <div
                className={`p-2 border rounded-md ${calculationResult.newCgpa >= 3.0 && calculationResult.newCgpa < 3.67 ? "bg-primary/10 border-primary" : ""}`}
              >
                <span
                  className={calculationResult.newCgpa >= 3.0 && calculationResult.newCgpa < 3.67 ? "font-bold" : ""}
                >
                  3.00-3.66: Very Good
                </span>
              </div>
              <div
                className={`p-2 border rounded-md ${calculationResult.newCgpa >= 2.33 && calculationResult.newCgpa < 3.0 ? "bg-primary/10 border-primary" : ""}`}
              >
                <span
                  className={calculationResult.newCgpa >= 2.33 && calculationResult.newCgpa < 3.0 ? "font-bold" : ""}
                >
                  2.33-2.99: Good
                </span>
              </div>
              <div
                className={`p-2 border rounded-md ${calculationResult.newCgpa < 2.33 ? "bg-primary/10 border-primary" : ""}`}
              >
                <span className={calculationResult.newCgpa < 2.33 ? "font-bold" : ""}>
                  Below 2.33: Needs Improvement
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={backToCalculator} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Calculator
          </Button>
          <Button onClick={resetCalculator} variant="outline" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Calculator
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="py-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="h-4 w-4 text-purple-500" />
            Current Academic Status
          </CardTitle>
          <CardDescription>Enter your completed credit hours and current CGPA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="completedCredit">Completed Credit Hours</Label>
              <Input
                id="completedCredit"
                type="number"
                min="0"
                step="0.5"
                placeholder="e.g., 90"
                value={completedCredit}
                onChange={(e) => setCompletedCredit(e.target.value)}
                className={validationError && !completedCredit ? "border-red-500" : ""}
              />
              {validationError && !completedCredit && (
                <p className="text-xs text-red-500">Please enter completed credit hours</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="currentCgpa">Current CGPA</Label>
              <Input
                id="currentCgpa"
                type="number"
                min="0"
                max="4"
                step="0.01"
                placeholder="e.g., 3.50"
                value={currentCgpa}
                onChange={(e) => setCurrentCgpa(e.target.value)}
                className={validationError && !currentCgpa ? "border-red-500" : ""}
              />
              {validationError && !currentCgpa && (
                <p className="text-xs text-red-500">Please enter your current CGPA</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="new-courses" className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-courses">New Courses</TabsTrigger>
          <TabsTrigger value="retake-courses">Retake Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="new-courses">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-green-500" />
                Add New Courses
              </CardTitle>
              <CardDescription>Enter details for courses you are currently taking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <Label htmlFor="courseCredit" className="text-xs">
                    Credit Hours
                  </Label>
                  <Select
                    value={newCourse.credit?.toString()}
                    onValueChange={(value) => setNewCourse({ ...newCourse, credit: Number.parseFloat(value) })}
                  >
                    <SelectTrigger id="courseCredit" className="h-8">
                      <SelectValue placeholder="Credit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1.0</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2">2.0</SelectItem>
                      <SelectItem value="3">3.0</SelectItem>
                      <SelectItem value="4">4.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="courseGrade" className="text-xs">
                    Expected Grade
                  </Label>
                  <Select
                    value={newCourse.grade}
                    onValueChange={(value) => setNewCourse({ ...newCourse, grade: value })}
                  >
                    <SelectTrigger id="courseGrade" className="h-8">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({gradePoints[grade as keyof typeof gradePoints].toFixed(2)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={addCourse} className="w-full h-8 text-xs">
                <PlusCircle className="mr-2 h-3.5 w-3.5" /> Add Course
              </Button>

              {courses.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Added Courses</h3>
                  <ScrollArea className="h-[180px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Credit</TableHead>
                          <TableHead className="text-xs">Grade</TableHead>
                          <TableHead className="text-xs">Points</TableHead>
                          <TableHead className="text-xs"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="text-xs py-2">{course.credit}</TableCell>
                            <TableCell className="text-xs py-2">{course.grade}</TableCell>
                            <TableCell className="text-xs py-2">
                              {(course.credit * gradePoints[course.grade as keyof typeof gradePoints]).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center py-2">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeCourse(course.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retake-courses">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <RotateCcw className="h-4 w-4 text-orange-500" />
                Add Retake Courses
              </CardTitle>
              <CardDescription>Enter details for courses you are retaking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div>
                  <Label htmlFor="retakeCourseCredit" className="text-xs">
                    Credit Hours
                  </Label>
                  <Select
                    value={newRetakeCourse.credit?.toString()}
                    onValueChange={(value) =>
                      setNewRetakeCourse({ ...newRetakeCourse, credit: Number.parseFloat(value) })
                    }
                  >
                    <SelectTrigger id="retakeCourseCredit" className="h-8">
                      <SelectValue placeholder="Credit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1.0</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2">2.0</SelectItem>
                      <SelectItem value="3">3.0</SelectItem>
                      <SelectItem value="4">4.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="previousGrade" className="text-xs">
                    Previous Grade
                  </Label>
                  <Select
                    value={newRetakeCourse.previousGrade}
                    onValueChange={(value) => setNewRetakeCourse({ ...newRetakeCourse, previousGrade: value })}
                  >
                    <SelectTrigger id="previousGrade" className="h-8">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({gradePoints[grade as keyof typeof gradePoints].toFixed(2)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="newGrade" className="text-xs">
                    Expected Grade
                  </Label>
                  <Select
                    value={newRetakeCourse.newGrade}
                    onValueChange={(value) => setNewRetakeCourse({ ...newRetakeCourse, newGrade: value })}
                  >
                    <SelectTrigger id="newGrade" className="h-8">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({gradePoints[grade as keyof typeof gradePoints].toFixed(2)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={addRetakeCourse} className="w-full h-8 text-xs">
                <PlusCircle className="mr-2 h-3.5 w-3.5" /> Add Retake Course
              </Button>

              {retakeCourses.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Added Retake Courses</h3>
                  <ScrollArea className="h-[180px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Credit</TableHead>
                          <TableHead className="text-xs">Previous</TableHead>
                          <TableHead className="text-xs">New</TableHead>
                          <TableHead className="text-xs">Improvement</TableHead>
                          <TableHead className="text-xs w-[60px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {retakeCourses.map((course) => {
                          const previousPoints =
                            course.credit * gradePoints[course.previousGrade as keyof typeof gradePoints]
                          const newPoints = course.credit * gradePoints[course.newGrade as keyof typeof gradePoints]
                          const improvement = newPoints - previousPoints

                          return (
                            <TableRow key={course.id}>
                              <TableCell className="text-xs py-2">{course.credit}</TableCell>
                              <TableCell className="text-xs py-2">{course.previousGrade}</TableCell>
                              <TableCell className="text-xs py-2">{course.newGrade}</TableCell>
                              <TableCell
                                className={`text-xs py-2 ${improvement > 0 ? "text-green-500" : "text-red-500"}`}
                              >
                                {improvement.toFixed(2)}
                              </TableCell>
                              <TableCell className="py-2">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeRetakeCourse(course.id)}
                                  className="h-6 w-6 p-0"
                                  aria-label="Delete course"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-3">
        <Button onClick={calculateCgpa} className="flex-1 h-9 text-xs" size="sm">
          <Calculator className="mr-2 h-3.5 w-3.5" /> Calculate CGPA
        </Button>

        <Button onClick={resetCalculator} variant="outline" className="flex-1 h-9 text-xs" size="sm">
          <RotateCcw className="mr-2 h-3.5 w-3.5" /> Reset Calculator
        </Button>
      </div>
    </>
  )
}

