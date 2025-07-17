"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CreditCard, CheckCircle, Shield, AlertTriangle } from "lucide-react"

interface AddCardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddCardModal({ open, onOpenChange }: AddCardModalProps) {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    type: "",
  })
  const [isDefault, setIsDefault] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "")
    if (cleaned.startsWith("4")) return "visa"
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "mastercard"
    if (cleaned.startsWith("3")) return "amex"
    return ""
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    const match = cleaned.match(/.{1,4}/g)
    return match ? match.join(" ") : cleaned
  }

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value)
    if (formatted.replace(/\s/g, "").length <= 16) {
      setCardData((prev) => ({
        ...prev,
        number: formatted,
        type: detectCardType(formatted),
      }))
    }
  }

  const handleExpiryChange = (value: string) => {
    let formatted = value.replace(/\D/g, "")
    if (formatted.length >= 2) {
      formatted = formatted.substring(0, 2) + "/" + formatted.substring(2, 4)
    }
    if (formatted.length <= 5) {
      setCardData((prev) => ({ ...prev, expiry: formatted }))
    }
  }

  const handleAddCard = async () => {
    if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) return

    setIsProcessing(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsComplete(true)

    // Auto close after success
    setTimeout(() => {
      setIsComplete(false)
      setCardData({ number: "", name: "", expiry: "", cvv: "", type: "" })
      setIsDefault(false)
      onOpenChange(false)
    }, 3000)
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      case "amex":
        return "💳"
      default:
        return "💳"
    }
  }

  const isFormValid =
    cardData.number.replace(/\s/g, "").length >= 13 &&
    cardData.name.length > 0 &&
    cardData.expiry.length === 5 &&
    cardData.cvv.length >= 3

  if (isComplete) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Card Added Successfully!</h3>
            <p className="text-gray-600 mb-4">
              Your {cardData.type.toUpperCase()} card ending in {cardData.number.slice(-4)} has been added
            </p>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Card ID: CARD-{Math.random().toString(36).substr(2, 6).toUpperCase()}
            </Badge>
            <p className="text-sm text-gray-500 mt-4">Closing automatically...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
          <DialogDescription>Add a debit or credit card to your wallet for easy payments</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Card Preview */}
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div className="text-2xl">{getCardIcon(cardData.type)}</div>
                <div className="text-right">
                  <p className="text-xs opacity-75">WALLET CARD</p>
                  <p className="text-sm font-medium">{cardData.type.toUpperCase() || "CARD"}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-lg font-mono tracking-wider">{cardData.number || "•••• •••• •••• ••••"}</p>
                </div>

                <div className="flex justify-between">
                  <div>
                    <p className="text-xs opacity-75">CARDHOLDER NAME</p>
                    <p className="text-sm font-medium">{cardData.name || "YOUR NAME"}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">EXPIRES</p>
                    <p className="text-sm font-medium">{cardData.expiry || "MM/YY"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <div className="relative">
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                value={cardData.name}
                onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value.toUpperCase() }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Expiry Date</Label>
                <Input
                  id="card-expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-cvv">CVV</Label>
                <Input
                  id="card-cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    if (value.length <= 4) {
                      setCardData((prev) => ({ ...prev, cvv: value }))
                    }
                  }}
                  type="password"
                />
              </div>
            </div>

            {/* Card Settings */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Set as Default Card</Label>
                  <p className="text-sm text-gray-500">Use this card for future transactions</p>
                </div>
                <Switch checked={isDefault} onCheckedChange={setIsDefault} />
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Secure & Encrypted</p>
                <p className="text-sm text-blue-700">
                  Your card information is encrypted and stored securely using industry-standard security measures.
                </p>
              </div>
            </div>

            {!isFormValid && cardData.number && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Please complete all fields</p>
                  <p className="text-sm text-yellow-700">Make sure all card details are entered correctly.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddCard} disabled={!isFormValid || isProcessing} className="flex-1">
              {isProcessing ? "Adding Card..." : "Add Card"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
