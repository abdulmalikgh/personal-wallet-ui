"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreditCard, MoreVertical, Plus, Shield, Trash2, Edit, Star } from "lucide-react"

interface SavedCard {
  id: string
  number: string
  name: string
  expiry: string
  type: string
  isDefault: boolean
  addedDate: string
}

interface CardManagementProps {
  savedCards: SavedCard[]
  onAddCard: () => void
  onDeleteCard: (cardId: string) => void
  onSetDefault: (cardId: string) => void
}

export default function CardManagement({ savedCards, onAddCard, onDeleteCard, onSetDefault }: CardManagementProps) {
  const getCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
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

  const getCardColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return "from-blue-600 to-blue-700"
      case "mastercard":
        return "from-red-600 to-red-700"
      case "amex":
        return "from-green-600 to-green-700"
      default:
        return "from-gray-600 to-gray-700"
    }
  }

  if (savedCards.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Payment Cards</CardTitle>
          <CardDescription>Manage your saved payment cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cards added yet</h3>
            <p className="text-gray-500 mb-4">Add a payment card to get started with quick transactions</p>
            <Button onClick={onAddCard}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Card
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Payment Cards</CardTitle>
            <CardDescription>
              {savedCards.length} card{savedCards.length !== 1 ? "s" : ""} saved
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onAddCard}>
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedCards.map((card) => (
            <div key={card.id} className="relative">
              {/* Card Visual */}
              <Card className={`bg-gradient-to-r ${getCardColor(card.type)} text-white relative overflow-hidden`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-2xl">{getCardIcon(card.type)}</div>
                    <div className="text-right">
                      <p className="text-xs opacity-75">WALLET CARD</p>
                      <p className="text-sm font-medium">{card.type.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-base font-mono tracking-wider">•••• •••• •••• {card.number.slice(-4)}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-75">CARDHOLDER NAME</p>
                        <p className="text-sm font-medium">{card.name}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75">EXPIRES</p>
                        <p className="text-sm font-medium">{card.expiry}</p>
                      </div>
                    </div>
                  </div>

                  {/* Default Badge */}
                  {card.isDefault && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Star className="w-3 h-3 mr-1" />
                        Default
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Card Actions */}
              <div className="flex items-center justify-between mt-3 px-1">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={card.isDefault} onCheckedChange={() => onSetDefault(card.id)} size="sm" />
                    <span className="text-sm text-gray-600">Default</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Shield className="w-3 h-3" />
                    <span>Added {card.addedDate}</span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Card
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => onDeleteCard(card.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Card
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
