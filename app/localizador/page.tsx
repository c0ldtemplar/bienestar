"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, MapPin, Star, Clock, Phone, Navigation, Store, Leaf, Truck, X } from "lucide-react"
import Link from "next/link"

export default function Localizador() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [filters, setFilters] = useState({
    storeTypes: [] as string[],
    certifications: [] as string[],
    priceRange: "",
    delivery: false,
  })

  const storeTypes = [
    { id: "supermarket", label: "Supermercados" },
    { id: "natural", label: "Tiendas Naturales" },
    { id: "market", label: "Ferias" },
    { id: "local", label: "Emprendimientos" },
  ]

  const certifications = [
    { id: "organic", label: "Orgánico" },
    { id: "glutenfree", label: "Sin Gluten" },
    { id: "vegan", label: "Vegano" },
    { id: "local", label: "Producto Local" },
  ]

  const stores = [
    {
      id: 1,
      name: "Mercado Orgánico Verde",
      type: "Tienda Natural",
      distance: "0.8 km",
      rating: 4.8,
      reviews: 124,
      hours: "Abierto hasta 20:00",
      phone: "+56 9 1234 5678",
      address: "Av. Providencia 1234",
      certifications: ["Orgánico", "Vegano"],
      delivery: true,
      image: "/organic-store.png",
    },
    {
      id: 2,
      name: "Tienda Natural Vida",
      type: "Tienda Natural",
      distance: "1.2 km",
      rating: 4.6,
      reviews: 89,
      hours: "Abierto hasta 19:00",
      phone: "+56 9 8765 4321",
      address: "Calle Los Leones 567",
      certifications: ["Sin Gluten", "Producto Local"],
      delivery: false,
      image: "/natural-health-store.png",
    },
    {
      id: 3,
      name: "Feria Orgánica del Barrio",
      type: "Feria",
      distance: "2.1 km",
      rating: 4.9,
      reviews: 203,
      hours: "Sábados 8:00 - 14:00",
      phone: "+56 9 5555 1234",
      address: "Plaza San Martín",
      certifications: ["Orgánico", "Producto Local"],
      delivery: false,
      image: "/bustling-farmers-market.png",
    },
  ]

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    if (category === "storeTypes" || category === "certifications") {
      setFilters((prev) => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-800">Localizador Inteligente</h1>
            </Link>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Mapa
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Lista
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar productos, tiendas o ingredientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-emerald-200 focus:border-emerald-400"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-emerald-800">Filtros de Búsqueda</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Tipo de Establecimiento</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {storeTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={filters.storeTypes.includes(type.id)}
                          onCheckedChange={() => toggleFilter("storeTypes", type.id)}
                        />
                        <label htmlFor={type.id} className="text-sm text-gray-700">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Certificaciones</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={cert.id}
                          checked={filters.certifications.includes(cert.id)}
                          onCheckedChange={() => toggleFilter("certifications", cert.id)}
                        />
                        <label htmlFor={cert.id} className="text-sm text-gray-700">
                          {cert.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="delivery"
                    checked={filters.delivery}
                    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, delivery: checked as boolean }))}
                  />
                  <label htmlFor="delivery" className="text-sm text-gray-700">
                    Solo con envío a domicilio
                  </label>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map View */}
        {viewMode === "map" && (
          <div className="mb-6">
            <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="h-64 sm:h-80 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-emerald-600 mx-auto mb-2" />
                    <p className="text-emerald-800 font-medium">Mapa Interactivo</p>
                    <p className="text-emerald-600 text-sm">Mostrando tiendas cerca de tu ubicación</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Resultados ({stores.length} tiendas encontradas)</h3>

          {stores.map((store) => (
            <Card
              key={store.id}
              className="border-emerald-200 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Store Image */}
                  <div className="lg:w-1/3">
                    <img
                      src={store.image || "/placeholder.svg"}
                      alt={store.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Store Info */}
                  <div className="lg:w-2/3 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{store.name}</h4>
                        <p className="text-emerald-600 font-medium">{store.type}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="font-medium">{store.rating}</span>
                        <span className="text-gray-500">({store.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {store.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="bg-emerald-100 text-emerald-800">
                          {cert}
                        </Badge>
                      ))}
                      {store.delivery && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          <Truck className="h-3 w-3 mr-1" />
                          Envío
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {store.address} • {store.distance}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{store.hours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{store.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Navigation className="h-4 w-4 mr-2" />
                        Cómo llegar
                      </Button>
                      <Button
                        variant="outline"
                        className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                      >
                        <Store className="h-4 w-4 mr-2" />
                        Ver productos
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
