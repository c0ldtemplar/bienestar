"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus, Trash2, Users, BookOpen, ShoppingCart, AlertCircle, CheckCircle, Leaf, Info } from "lucide-react"
import Link from "next/link"

export default function Carrito() {
  const [activeTab, setActiveTab] = useState<"current" | "create">("current")
  const [cooperativeMode, setCooperativeMode] = useState(false)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Quinoa Orgánica",
      price: 4500,
      quantity: 2,
      unit: "500g",
      available: true,
      alternatives: ["Quinoa Roja Orgánica", "Amaranto Orgánico"],
    },
    {
      id: 2,
      name: "Leche de Almendras",
      price: 2800,
      quantity: 1,
      unit: "1L",
      available: false,
      alternatives: ["Leche de Avena", "Leche de Coco"],
    },
    {
      id: 3,
      name: "Pan Sin Gluten",
      price: 3200,
      quantity: 1,
      unit: "400g",
      available: true,
      alternatives: [],
    },
  ])

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-800">Carrito Inteligente</h1>
            </Link>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              {cartItems.length} productos
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            variant={activeTab === "current" ? "default" : "outline"}
            onClick={() => setActiveTab("current")}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Mi Lista Actual
          </Button>
          <Button
            variant={activeTab === "create" ? "default" : "outline"}
            onClick={() => setActiveTab("create")}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Nueva Lista
          </Button>
        </div>

        {/* Current Cart */}
        {activeTab === "current" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-800">Lista de Compras</CardTitle>
                  <CardDescription>
                    Gestiona tus productos y encuentra alternativas cuando no estén disponibles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 bg-white/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <span className="text-sm text-gray-500">({item.unit})</span>
                            {!item.available && (
                              <Badge variant="destructive" className="text-xs">
                                No disponible
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-4 mb-2">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <span className="font-medium text-emerald-700">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>

                          {!item.available && item.alternatives.length > 0 && (
                            <div className="bg-amber-50 p-3 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <AlertCircle className="h-4 w-4 text-amber-600" />
                                <span className="text-sm font-medium text-amber-800">Alternativas disponibles:</span>
                              </div>
                              <div className="space-y-1">
                                {item.alternatives.map((alt, index) => (
                                  <Button
                                    key={index}
                                    variant="ghost"
                                    size="sm"
                                    className="text-amber-700 hover:bg-amber-100 h-auto p-1"
                                  >
                                    {alt}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cooperative Mode */}
              <Card className="border-blue-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2 text-blue-800">
                        <Users className="h-5 w-5" />
                        <span>Compra Comunitaria</span>
                      </CardTitle>
                      <CardDescription>Únete a otros usuarios para obtener mejores precios</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cooperative" checked={cooperativeMode} onCheckedChange={setCooperativeMode} />
                      <label htmlFor="cooperative" className="text-sm font-medium">
                        Activar
                      </label>
                    </div>
                  </div>
                </CardHeader>
                {cooperativeMode && (
                  <CardContent>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-800 font-medium mb-1">
                            ¿Cómo funciona la Compra Comunitaria?
                          </p>
                          <p className="text-sm text-blue-700">
                            Te conectamos con otros usuarios de tu zona que quieren comprar productos similares. Al
                            comprar en grupo, todos obtienen descuentos por volumen y pueden dividir los costos de
                            envío.
                          </p>
                          <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                            Buscar Grupo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-800">Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío:</span>
                      <span>$2.500</span>
                    </div>
                    {cooperativeMode && (
                      <div className="flex justify-between text-green-600">
                        <span>Descuento grupal:</span>
                        <span>-$1.200</span>
                      </div>
                    )}
                    <hr className="border-emerald-200" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-emerald-700">
                        ${(total + 2500 - (cooperativeMode ? 1200 : 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Proceder al Pago
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-amber-800">Productos Sugeridos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <h5 className="font-medium text-gray-800">Aceite de Coco Orgánico</h5>
                    <p className="text-sm text-gray-600">Complementa tu quinoa</p>
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      <Plus className="h-3 w-3 mr-1" />
                      Agregar
                    </Button>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <h5 className="font-medium text-gray-800">Semillas de Chía</h5>
                    <p className="text-sm text-gray-600">Rico en omega-3</p>
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      <Plus className="h-3 w-3 mr-1" />
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Create New List */}
        {activeTab === "create" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800">
                  <BookOpen className="h-5 w-5" />
                  <span>Crear desde Receta</span>
                </CardTitle>
                <CardDescription>
                  Selecciona una receta y generaremos automáticamente tu lista de compras
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Buscar recetas..." className="border-emerald-200" />
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <h5 className="font-medium">Bowl de Quinoa Antiinflamatorio</h5>
                    <p className="text-sm text-gray-600">6 ingredientes • 30 min</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                    <h5 className="font-medium">Smoothie Verde Detox</h5>
                    <p className="text-sm text-gray-600">4 ingredientes • 10 min</p>
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Ver Más Recetas</Button>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Users className="h-5 w-5" />
                  <span>Crear desde Plan Nutricional</span>
                </CardTitle>
                <CardDescription>Genera una lista basada en tu plan nutricional personalizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-purple-50 cursor-pointer">
                    <h5 className="font-medium">Plan Antiinflamatorio - Semana 1</h5>
                    <p className="text-sm text-gray-600">Desayuno, almuerzo y cena</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-purple-50 cursor-pointer">
                    <h5 className="font-medium">Plan Sin Gluten - Semana 2</h5>
                    <p className="text-sm text-gray-600">Incluye snacks saludables</p>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Ver Mis Planes</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
