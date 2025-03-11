"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calculator,
  RotateCcw,
  ArrowLeft,
  CreditCard,
  Receipt,
  Percent,
  AlertCircle,
  Calendar,
  BookOpen,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

type CalculationResult = {
  newCredit: number
  retakeCredit: number
  totalCredit: number
  perCreditFee: number
  trimesterFee: number
  totalCreditFee: number
  waiverPercentage: number
  scholarshipPercentage: number
  appliedDiscount: number
  discountAmount: number
  lateRegistration: boolean
  lateRegistrationFee: number
  finalAmount: number
  firstInstallment: number
  secondInstallment: number
  thirdInstallment: number
  waiverInFirstInstallment: boolean
}

export function TuitionCalculator() {
  const [newCredit, setNewCredit] = useState<string>("")
  const [retakeCredit, setRetakeCredit] = useState<string>("")
  const [perCreditFee, setPerCreditFee] = useState<string>("6500")
  const [trimesterFee, setTrimesterFee] = useState<string>("6500")
  const [waiver, setWaiver] = useState<string>("0")
  const [scholarship, setScholarship] = useState<string>("0")
  const [lateRegistration, setLateRegistration] = useState<boolean>(false)
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<boolean>(false)
  // Add a new state variable for the waiver application toggle
  const [waiverInFirstInstallment, setWaiverInFirstInstallment] = useState<boolean>(false)

  // Scroll to top when showing results
  useEffect(() => {
    if (showResults) {
      window.scrollTo(0, 0)
    }
  }, [showResults])

  // Modify the calculateFee function to handle both installment calculation methods
  const calculateFee = () => {
    if (!newCredit || !perCreditFee || !trimesterFee) {
      setValidationError(true)
      return
    }

    const newCreditNum = Number.parseFloat(newCredit || "0")
    const retakeCreditNum = Number.parseFloat(retakeCredit || "0")
    const perCreditFeeNum = Number.parseFloat(perCreditFee)
    const trimesterFeeNum = Number.parseFloat(trimesterFee)
    const waiverPercentage = Number.parseFloat(waiver)
    const scholarshipPercentage = Number.parseFloat(scholarship)

    // Calculate total credit and credit fee
    const totalCredit = newCreditNum + retakeCreditNum
    const totalCreditFee = totalCredit * perCreditFeeNum

    // Determine which discount to apply (higher of waiver or scholarship)
    const appliedDiscount = Math.max(waiverPercentage, scholarshipPercentage)
    const discountAmount = (totalCreditFee * appliedDiscount) / 100

    // Calculate late registration fee
    const lateRegistrationFee = lateRegistration ? 500 : 0

    // Calculate final amount after discount
    const finalAmount = totalCreditFee - discountAmount + trimesterFeeNum + lateRegistrationFee

    // Calculate installments based on toggle setting
    let firstInstallment, secondInstallment, thirdInstallment

    if (waiverInFirstInstallment) {
      // If waiver applies to all installments (YES toggle)
      // Calculate installments based on already reduced amount
      firstInstallment = finalAmount * 0.4
      secondInstallment = finalAmount * 0.3
      thirdInstallment = finalAmount * 0.3
    } else {
      // If waiver doesn't apply to first installment (NO toggle)
      // First installment is 40% of full fee before waiver
      const fullFeeBeforeWaiver = totalCreditFee + trimesterFeeNum + lateRegistrationFee
      firstInstallment = fullFeeBeforeWaiver * 0.4

      // Remaining amount after applying waiver is split equally for 2nd and 3rd installments
      const remainingAfterWaiver = finalAmount - firstInstallment
      secondInstallment = remainingAfterWaiver / 2
      thirdInstallment = remainingAfterWaiver / 2
    }

    setCalculationResult({
      newCredit: newCreditNum,
      retakeCredit: retakeCreditNum,
      totalCredit,
      perCreditFee: perCreditFeeNum,
      trimesterFee: trimesterFeeNum,
      totalCreditFee,
      waiverPercentage,
      scholarshipPercentage,
      appliedDiscount,
      discountAmount,
      lateRegistration,
      lateRegistrationFee,
      finalAmount,
      firstInstallment,
      secondInstallment,
      thirdInstallment,
      waiverInFirstInstallment,
    })

    setShowResults(true)
  }

  const resetCalculator = () => {
    setNewCredit("")
    setRetakeCredit("")
    setPerCreditFee("6500")
    setTrimesterFee("6500")
    setWaiver("0")
    setScholarship("0")
    setLateRegistration(false)
    setWaiverInFirstInstallment(false)
    setCalculationResult(null)
    setShowResults(false)
    setValidationError(false)
  }

  const backToCalculator = () => {
    setShowResults(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Remove the automatic toggle activation
  const handleWaiverChange = (value: string) => {
    setWaiver(value)
  }

  const handleScholarshipChange = (value: string) => {
    setScholarship(value)
  }

  if (showResults && calculationResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={backToCalculator}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold">Tuition Fee Calculation Results</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-emerald-500" />
              Fee Summary
            </CardTitle>
            <CardDescription>Detailed breakdown of your tuition fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Credit Information */}
              <div>
                <h3 className="text-lg font-medium mb-2">Credit Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="text-sm text-muted-foreground">New Credits</div>
                    <div className="text-2xl font-bold">{calculationResult.newCredit}</div>
                  </div>
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="text-sm text-muted-foreground">Retake Credits</div>
                    <div className="text-2xl font-bold">{calculationResult.retakeCredit}</div>
                  </div>
                  <div className="p-4 border rounded-md bg-muted/30">
                    <div className="text-sm text-muted-foreground">Total Credits</div>
                    <div className="text-2xl font-bold">{calculationResult.totalCredit}</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Fee Breakdown */}
              <div>
                <h3 className="text-lg font-medium mb-2">Fee Breakdown</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Credit Fee</TableCell>
                      <TableCell>
                        {calculationResult.totalCredit} credits × {formatCurrency(calculationResult.perCreditFee)}
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(calculationResult.totalCreditFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Trimester Fee</TableCell>
                      <TableCell>Fixed fee (not affected by waiver/scholarship)</TableCell>
                      <TableCell className="text-right">{formatCurrency(calculationResult.trimesterFee)}</TableCell>
                    </TableRow>

                    {calculationResult.appliedDiscount > 0 && (
                      <TableRow>
                        <TableCell className="font-medium">
                          {calculationResult.waiverPercentage >= calculationResult.scholarshipPercentage
                            ? "Waiver"
                            : "Scholarship"}
                        </TableCell>
                        <TableCell>
                          {calculationResult.appliedDiscount}% of credit fee
                          {calculationResult.waiverPercentage > 0 && calculationResult.scholarshipPercentage > 0 && (
                            <span className="text-xs text-muted-foreground ml-2">(Higher discount applied)</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-red-500">
                          -{formatCurrency(calculationResult.discountAmount)}
                        </TableCell>
                      </TableRow>
                    )}

                    {calculationResult.lateRegistration && (
                      <TableRow>
                        <TableCell className="font-medium">Late Registration Fee</TableCell>
                        <TableCell>Additional charge</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(calculationResult.lateRegistrationFee)}
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow className="border-t-2">
                      <TableCell className="font-bold text-lg">Total Fee</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right font-bold text-lg">
                        {formatCurrency(calculationResult.finalAmount)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Separator />

              {/* Installment Plan */}
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Installment Plan
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {calculationResult.waiverInFirstInstallment
                    ? "Waiver/scholarship applied before calculating all installments"
                    : "First installment calculated before applying waiver/scholarship"}
                </p>
                <div className="overflow-hidden border rounded-lg">
                  <Table>
                    <TableHeader className="bg-muted">
                      <TableRow>
                        <TableHead>Installment</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">1st Installment</TableCell>
                        <TableCell>
                          {calculationResult.waiverInFirstInstallment ? "40% of discounted total" : "40% of full fee"}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(calculationResult.firstInstallment)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2nd Installment</TableCell>
                        <TableCell>
                          {calculationResult.waiverInFirstInstallment
                            ? "30% of discounted total"
                            : "50% of remaining after waiver"}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(calculationResult.secondInstallment)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">3rd Installment</TableCell>
                        <TableCell>
                          {calculationResult.waiverInFirstInstallment
                            ? "30% of discounted total"
                            : "50% of remaining after waiver"}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(calculationResult.thirdInstallment)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Note: Please check with the accounts department for exact installment due dates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-500" />
            Credit Information
          </CardTitle>
          <CardDescription>Enter your credit hours for this trimester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="newCredit">New Credit Hours</Label>
              <Input
                id="newCredit"
                type="number"
                min="0"
                step="1"
                placeholder="e.g., 12"
                value={newCredit}
                onChange={(e) => setNewCredit(e.target.value)}
                className={validationError && !newCredit ? "border-red-500" : ""}
              />
              {validationError && !newCredit && <p className="text-sm text-red-500">Please enter new credit hours</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="retakeCredit">Retake Credit Hours (if any)</Label>
              <Input
                id="retakeCredit"
                type="number"
                min="0"
                step="1"
                placeholder="e.g., 3"
                value={retakeCredit}
                onChange={(e) => setRetakeCredit(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-indigo-500" />
            Fee Information
          </CardTitle>
          <CardDescription>Enter the fee details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="perCreditFee">Per Credit Fee (Taka)</Label>
              <Input
                id="perCreditFee"
                type="number"
                min="0"
                step="100"
                placeholder="e.g., 6500"
                value={perCreditFee}
                onChange={(e) => setPerCreditFee(e.target.value)}
                className={validationError && !perCreditFee ? "border-red-500" : ""}
              />
              {validationError && !perCreditFee && <p className="text-sm text-red-500">Please enter per credit fee</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="trimesterFee">Trimester Fee (Taka)</Label>
              <Input
                id="trimesterFee"
                type="number"
                min="0"
                step="100"
                placeholder="e.g., 6500"
                value={trimesterFee}
                onChange={(e) => setTrimesterFee(e.target.value)}
                className={validationError && !trimesterFee ? "border-red-500" : ""}
              />
              {validationError && !trimesterFee && <p className="text-sm text-red-500">Please enter trimester fee</p>}
              <p className="text-xs text-muted-foreground">This fee is not affected by waiver/scholarship</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-amber-500" />
            Discounts & Additional Fees
          </CardTitle>
          <CardDescription>Select applicable discounts and additional fees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="waiver">Waiver</Label>
              <Select value={waiver} onValueChange={handleWaiverChange}>
                <SelectTrigger id="waiver">
                  <SelectValue placeholder="Select waiver percentage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% - No Waiver</SelectItem>
                  <SelectItem value="25">25% Waiver</SelectItem>
                  <SelectItem value="50">50% Waiver</SelectItem>
                  <SelectItem value="100">100% Waiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scholarship">Scholarship</Label>
              <Select value={scholarship} onValueChange={handleScholarshipChange}>
                <SelectTrigger id="scholarship">
                  <SelectValue placeholder="Select scholarship percentage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% - No Scholarship</SelectItem>
                  <SelectItem value="25">25% Scholarship</SelectItem>
                  <SelectItem value="50">50% Scholarship</SelectItem>
                  <SelectItem value="100">100% Scholarship</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Only the higher of waiver or scholarship will be applied</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="waiverInFirstInstallment" className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-blue-500" />
                  Apply waiver/scholarship in first installment
                </Label>
                <p className="text-xs text-muted-foreground">Usually waiver doesn't apply on 1st installment</p>
              </div>
              <Switch
                id="waiverInFirstInstallment"
                checked={waiverInFirstInstallment}
                onCheckedChange={setWaiverInFirstInstallment}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="lateRegistration" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  Late Registration
                </Label>
                <p className="text-xs text-muted-foreground">Additional fee of 500 Taka</p>
              </div>
              <Switch id="lateRegistration" checked={lateRegistration} onCheckedChange={setLateRegistration} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={calculateFee} className="flex-1" size="lg">
          <Calculator className="mr-2 h-5 w-5" /> Calculate Fee
        </Button>

        <Button onClick={resetCalculator} variant="outline" className="flex-1" size="lg">
          <RotateCcw className="mr-2 h-5 w-5" /> Reset Calculator
        </Button>
      </div>
    </>
  )
}

