"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Send,
  CreditCard,
  TrendingUp,
  Eye,
  EyeOff,
  MoreHorizontal,
  Filter,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TransferFlow from "@/components/transfer-flow"
import AddMoneyModal from "@/components/add-money-modal"
import AddCardModal from "@/components/add-card-modal"
import CardManagement from "@/components/card-management"

// Mock data
const mockTransactions = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Grocery Store",
    recipient: "Whole Foods Market",
    category: "Groceries",
    amount: -85.32,
    status: "Completed",
    type: "expense",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Salary Deposit",
    recipient: "Tech Corp Inc.",
    category: "Income",
    amount: 3500.0,
    status: "Completed",
    type: "income",
  },
  {
    id: "3",
    date: "2024-01-13",
    description: "Coffee Shop",
    recipient: "Blue Bottle Coffee",
    category: "Food & Dining",
    amount: -12.5,
    status: "Completed",
    type: "expense",
  },
  {
    id: "4",
    date: "2024-01-12",
    description: "Transfer to Sarah",
    recipient: "Sarah Johnson",
    category: "Transfer",
    amount: -200.0,
    status: "Pending",
    type: "transfer",
  },
  {
    id: "5",
    date: "2024-01-11",
    description: "Netflix Subscription",
    recipient: "Netflix",
    category: "Entertainment",
    amount: -15.99,
    status: "Completed",
    type: "expense",
  },
  {
    id: "6",
    date: "2024-01-10",
    description: "Freelance Payment",
    recipient: "Design Studio",
    category: "Income",
    amount: 750.0,
    status: "Completed",
    type: "income",
  },
]

const categorySpending = [
  { category: "Groceries", amount: 285.32, percentage: 35, color: "bg-blue-500" },
  { category: "Food & Dining", amount: 156.8, percentage: 19, color: "bg-green-500" },
  { category: "Entertainment", amount: 89.97, percentage: 11, color: "bg-purple-500" },
  { category: "Transportation", amount: 124.5, percentage: 15, color: "bg-orange-500" },
  { category: "Utilities", amount: 165.0, percentage: 20, color: "bg-red-500" },
]

export default function WalletDashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showTransferFlow, setShowTransferFlow] = useState(false)
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)
  const [showAddCardModal, setShowAddCardModal] = useState(false)

  // Saved cards state
  const [savedCards, setSavedCards] = useState([
    {
      id: "1",
      number: "4532123456789012",
      name: "JOHN DOE",
      expiry: "12/26",
      type: "visa",
      isDefault: true,
      addedDate: "Jan 10, 2024",
    },
    {
      id: "2",
      number: "5555444433332222",
      name: "JOHN DOE",
      expiry: "08/25",
      type: "mastercard",
      isDefault: false,
      addedDate: "Dec 15, 2023",
    },
  ])

  const totalBalance = 4247.89
  const monthlyIncome = 4250.0
  const monthlyExpenses = 813.58
  const netIncome = monthlyIncome - monthlyExpenses

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      filterCategory === "all" || transaction.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDeleteCard = (cardId: string) => {
    setSavedCards((prev) => prev.filter((card) => card.id !== cardId))
  }

  const handleSetDefault = (cardId: string) => {
    setSavedCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      })),
    )
  }

  const handleAddCard = (newCard: any) => {
    const card = {
      id: Date.now().toString(),
      number: newCard.number,
      name: newCard.name,
      expiry: newCard.expiry,
      type: newCard.type,
      isDefault: newCard.isDefault,
      addedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }
    setSavedCards((prev) => [...prev, card])
  }

  if (showTransferFlow) {
    return <TransferFlow onClose={() => setShowTransferFlow(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Personal Wallet</h1>
            <p className="text-gray-600 mt-1">Manage your finances with confidence</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Button variant="outline" size="sm" onClick={() => setShowAddCardModal(true)}>
              <CreditCard className="w-4 h-4 mr-2" />
              Add Card
            </Button>
            <Button size="sm" onClick={() => setShowAddMoneyModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Money
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="text-white hover:bg-white/20"
                  >
                    {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">
                  {balanceVisible ? `$${totalBalance.toLocaleString()}` : "••••••"}
                </div>
                <div className="flex gap-3">
                  <Button
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => setShowTransferFlow(true)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Money
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <ArrowDownLeft className="w-4 h-4 mr-2" />
                    Request
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Income vs Expenses */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Income</span>
                    </div>
                    <span className="font-semibold text-green-600">+${monthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Expenses</span>
                    </div>
                    <span className="font-semibold text-red-600">-${monthlyExpenses.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Net Income</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-bold text-green-600">+${netIncome.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Spending Categories */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Spending Breakdown</CardTitle>
                  <CardDescription>Your top spending categories this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categorySpending.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.category}</span>
                          <span className="text-gray-600">${item.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={item.percentage} className="flex-1" />
                          <span className="text-xs text-gray-500 w-8">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions Preview */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("transactions")}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTransactions.slice(0, 4).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "income"
                              ? "bg-green-100"
                              : transaction.type === "expense"
                                ? "bg-red-100"
                                : "bg-blue-100"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowDownLeft className="w-4 h-4 text-green-600" />
                          ) : transaction.type === "expense" ? (
                            <ArrowUpRight className="w-4 h-4 text-red-600" />
                          ) : (
                            <Send className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.recipient}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold text-sm ${
                            transaction.amount > 0 ? "text-green-600" : "text-gray-900"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <Badge variant="secondary" className={`text-xs ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="food & dining">Food & Dining</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Transactions List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Transaction History</CardTitle>
                <CardDescription>
                  {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            transaction.type === "income"
                              ? "bg-green-100"
                              : transaction.type === "expense"
                                ? "bg-red-100"
                                : "bg-blue-100"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowDownLeft className="w-5 h-5 text-green-600" />
                          ) : transaction.type === "expense" ? (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          ) : (
                            <Send className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.recipient}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
                            {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <Badge variant="secondary" className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <CardManagement
              savedCards={savedCards}
              onAddCard={() => setShowAddCardModal(true)}
              onDeleteCard={handleDeleteCard}
              onSetDefault={handleSetDefault}
            />
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <AddMoneyModal open={showAddMoneyModal} onOpenChange={setShowAddMoneyModal} />
        <AddCardModal open={showAddCardModal} onOpenChange={setShowAddCardModal} />
      </div>
    </div>
  )
}
