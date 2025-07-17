"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Search, User, CheckCircle, AlertCircle, Send } from "lucide-react"

interface TransferFlowProps {
  onClose: () => void
}

const mockContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "@sarah_j",
    phone: "+1 (555) 123-4567",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isFrequent: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    username: "@mike_c",
    phone: "+1 (555) 987-6543",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isFrequent: true,
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "@emma_w",
    phone: "+1 (555) 456-7890",
    email: "emma@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isFrequent: false,
  },
]

export default function TransferFlow({ onClose }: TransferFlowProps) {
  const [step, setStep] = useState(1)
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [transferComplete, setTransferComplete] = useState(false)

  const [showAddRecipient, setShowAddRecipient] = useState(false)
  const [newRecipient, setNewRecipient] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
  })

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRecipientSelect = (contact: any) => {
    setSelectedRecipient(contact)
    setStep(2)
  }

  const handleAmountSubmit = () => {
    if (amount && Number.parseFloat(amount) > 0) {
      setStep(3)
    }
  }

  const handleTransferConfirm = () => {
    setTransferComplete(true)
    setTimeout(() => {
      onClose()
    }, 3000)
  }

  const handleAddRecipient = () => {
    if (newRecipient.name && (newRecipient.username || newRecipient.phone || newRecipient.email)) {
      const recipient = {
        id: Date.now().toString(),
        name: newRecipient.name,
        username: newRecipient.username || `@${newRecipient.name.toLowerCase().replace(/\s+/g, "_")}`,
        phone: newRecipient.phone,
        email: newRecipient.email,
        avatar: "/placeholder.svg?height=40&width=40",
        isFrequent: false,
      }
      mockContacts.push(recipient)
      setSelectedRecipient(recipient)
      setShowAddRecipient(false)
      setNewRecipient({ name: "", username: "", phone: "", email: "" })
      setStep(2)
    }
  }

  if (transferComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transfer Successful!</h3>
            <p className="text-gray-600 mb-4">
              ${amount} has been sent to {selectedRecipient?.name}
            </p>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Transaction ID: TXN-2024-001
            </Badge>
            <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Send Money</h1>
            <p className="text-gray-600">Step {step} of 3</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Select Recipient */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Recipient</CardTitle>
              <CardDescription>Choose who you want to send money to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Frequent Contacts */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <span>Frequent Contacts</span>
                  <Badge variant="secondary" className="text-xs">
                    {mockContacts.filter((c) => c.isFrequent).length}
                  </Badge>
                </h4>
                <div className="space-y-2">
                  {filteredContacts
                    .filter((contact) => contact.isFrequent)
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleRecipientSelect(contact)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.username}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Select
                        </Button>
                      </div>
                    ))}
                </div>
              </div>

              {/* All Contacts */}
              {filteredContacts.filter((contact) => !contact.isFrequent).length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">All Contacts</h4>
                  <div className="space-y-2">
                    {filteredContacts
                      .filter((contact) => !contact.isFrequent)
                      .map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleRecipientSelect(contact)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-gray-500">{contact.username}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Select
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Add New Recipient */}
              <div className="pt-4 border-t">
                {!showAddRecipient ? (
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowAddRecipient(true)}>
                    <User className="w-4 h-4 mr-2" />
                    Add New Recipient
                  </Button>
                ) : (
                  <Card className="border-dashed">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Add New Recipient</CardTitle>
                      <CardDescription>Enter recipient details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient-name">Full Name *</Label>
                        <Input
                          id="recipient-name"
                          placeholder="Enter full name"
                          value={newRecipient.name}
                          onChange={(e) => setNewRecipient((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipient-username">Username</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
                          <Input
                            id="recipient-username"
                            placeholder="username"
                            value={newRecipient.username}
                            onChange={(e) => setNewRecipient((prev) => ({ ...prev, username: e.target.value }))}
                            className="pl-8"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipient-phone">Phone Number</Label>
                        <Input
                          id="recipient-phone"
                          placeholder="+1 (555) 123-4567"
                          value={newRecipient.phone}
                          onChange={(e) => setNewRecipient((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipient-email">Email Address</Label>
                        <Input
                          id="recipient-email"
                          type="email"
                          placeholder="email@example.com"
                          value={newRecipient.email}
                          onChange={(e) => setNewRecipient((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowAddRecipient(false)
                            setNewRecipient({ name: "", username: "", phone: "", email: "" })
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleAddRecipient}
                          disabled={
                            !newRecipient.name || (!newRecipient.username && !newRecipient.phone && !newRecipient.email)
                          }
                          className="flex-1"
                        >
                          Add Recipient
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Enter Amount */}
        {step === 2 && selectedRecipient && (
          <Card>
            <CardHeader>
              <CardTitle>Enter Amount</CardTitle>
              <CardDescription>How much do you want to send?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Recipient */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar>
                  <AvatarImage src={selectedRecipient.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedRecipient.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedRecipient.name}</p>
                  <p className="text-sm text-gray-500">{selectedRecipient.username}</p>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
                  <Input
                    id="amount"
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

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map((quickAmount) => (
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

              {/* Note */}
              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input
                  id="note"
                  placeholder="What's this for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* Available Balance */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">Available Balance</span>
                <span className="font-semibold text-blue-700">$4,247.89</span>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleAmountSubmit}
                  className="flex-1"
                  disabled={!amount || Number.parseFloat(amount) <= 0}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && selectedRecipient && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Transfer</CardTitle>
              <CardDescription>Review the details before sending</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transfer Summary */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Recipient</span>
                  <div className="text-right">
                    <p className="font-medium">{selectedRecipient.name}</p>
                    <p className="text-sm text-gray-500">{selectedRecipient.username}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Amount</span>
                  <span className="text-2xl font-bold">${amount}</span>
                </div>

                {note && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Note</span>
                    <span className="font-medium">{note}</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Transfer Fee</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <span className="font-medium text-blue-700">Total</span>
                  <span className="text-xl font-bold text-blue-700">${amount}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Security Notice</p>
                  <p className="text-sm text-yellow-700">
                    This transfer cannot be reversed. Please verify the recipient details are correct.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleTransferConfirm} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Money
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
