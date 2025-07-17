"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Building2, Smartphone, CheckCircle, AlertCircle } from "lucide-react"

interface AddMoneyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddMoneyModal({ open, onOpenChange }: AddMoneyModalProps) {
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const paymentMethods = [
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      fee: "Free",
      time: "Instant",
      description: "Add money using your debit or credit card",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building2,
      fee: "Free",
      time: "1-3 business days",
      description: "Transfer from your bank account",
    },
    {
      id: "mobile",
      name: "Mobile Payment",
      icon: Smartphone,
      fee: "$0.50",
      time: "Instant",
      description: "Use Apple Pay, Google Pay, or Samsung Pay",
    },
  ]

  const handleAddMoney = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsProcessing(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsComplete(true)

    // Auto close after success
    setTimeout(() => {
      setIsComplete(false)
      setAmount("")
      onOpenChange(false)
    }, 3000)
  }

  const selectedMethodData = paymentMethods.find((method) => method.id === selectedMethod)

  if (isComplete) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Money Added Successfully!</h3>
            <p className="text-gray-600 mb-4">${amount} has been added to your wallet</p>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Transaction ID: ADD-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}
            </Badge>
            <p className="text-sm text-gray-500 mt-4">Closing automatically...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Money to Wallet</DialogTitle>
          <DialogDescription>Choose your preferred method to add funds to your wallet</DialogDescription>
        </DialogHeader>

        <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{method.name.split(" ")[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <TabsContent key={method.id} value={method.id} className="space-y-6 max-h-[60vh] overflow-y-auto">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Processing Fee</p>
                        <p className="font-semibold text-green-600">{method.fee}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Processing Time</p>
                        <p className="font-semibold">{method.time}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="add-amount">Amount (USD)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            $
                          </span>
                          <Input
                            id="add-amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-8 text-lg h-12"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {[25, 50, 100, 200].map((quickAmount) => (
                          <Button
                            key={quickAmount}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(quickAmount.toString())}
                          >
                            ${quickAmount}
                          </Button>
                        ))}
                      </div>

                      {method.id === "card" && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="card-name">Cardholder Name</Label>
                              <Input id="card-name" placeholder="John Doe" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-expiry">Expiry Date</Label>
                              <Input id="card-expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="card-cvv">CVV</Label>
                              <Input id="card-cvv" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}

                      {method.id === "bank" && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="space-y-2">
                            <Label htmlFor="bank-account">Bank Account Number</Label>
                            <Input id="bank-account" placeholder="Enter account number" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="routing-number">Routing Number</Label>
                            <Input id="routing-number" placeholder="Enter routing number" />
                          </div>
                        </div>
                      )}

                      {method.id === "mobile" && (
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg">
                            <div className="text-center">
                              <Smartphone className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                You'll be redirected to complete payment with your mobile wallet
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {method.fee !== "Free" && (
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Processing Fee</p>
                      <p className="text-sm text-yellow-700">
                        A {method.fee} fee will be charged for this payment method.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddMoney}
                    disabled={!amount || Number.parseFloat(amount) <= 0 || isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? "Processing..." : `Add $${amount || "0"}`}
                  </Button>
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
