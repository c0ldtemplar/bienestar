"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, ShoppingCart, Users, BookOpen, Target, TrendingUp, MessageCircle, Star, Leaf } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [user] = useState({
    name: "María González",
    goals: ["Alimentación antiinflamatoria", "Productos locales"],
    weeklyProgress: 75,
    communityPoints: 1250,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-800">Plataforma de Bienestar</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                {user.communityPoints} puntos
              </Badge>
              <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-800">M</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Hola, {user.name}! 👋</h2>
          <p className="text-gray-600 text-lg">Tu bienestar es nuestra prioridad. Aquí tienes tu resumen semanal.</p>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 border-emerald-200 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-800">
              <Target className="h-5 w-5" />
              <span>Progreso de Mis Metas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progreso Semanal</span>
                  <span className="text-sm text-gray-600">{user.weeklyProgress}%</span>
                </div>
                <Progress value={user.weeklyProgress} className="h-3" />
              </div>
              <div className="flex flex-wrap gap-2">
                {user.goals.map((goal, index) => (
                  <Badge key={index} variant="outline" className="border-emerald-300 text-emerald-700">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/localizador">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-emerald-200 bg-white/70 backdrop-blur-sm hover:bg-emerald-50">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-800">Localizador</CardTitle>
                <CardDescription>Encuentra productos cerca de ti</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/carrito">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-amber-200 bg-white/70 backdrop-blur-sm hover:bg-amber-50">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                  <ShoppingCart className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-amber-800">Carrito</CardTitle>
                <CardDescription>Gestiona tus compras inteligentes</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/comunidad">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-blue-200 bg-white/70 backdrop-blur-sm hover:bg-blue-50">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">Comunidad</CardTitle>
                <CardDescription>Conecta con otros usuarios</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/recursos">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-purple-200 bg-white/70 backdrop-blur-sm hover:bg-purple-50">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">Recursos</CardTitle>
                <CardDescription>Aprende y mejora tu bienestar</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-emerald-800">
                <TrendingUp className="h-5 w-5" />
                <span>Productos Cercanos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Mercado Orgánico Verde</p>
                    <p className="text-sm text-gray-600">0.8 km • Abierto hasta 20:00</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Tienda Natural Vida</p>
                    <p className="text-sm text-gray-600">1.2 km • Abierto hasta 19:00</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.6</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <MessageCircle className="h-5 w-5" />
                <span>Actividad en la Comunidad</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-gray-800">Ana compartió una receta</p>
                  <p className="text-sm text-gray-600">"Smoothie antiinflamatorio con cúrcuma"</p>
                  <p className="text-xs text-gray-500 mt-1">Hace 2 horas</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-gray-800">Grupo: Alimentación Consciente</p>
                  <p className="text-sm text-gray-600">Nueva discusión sobre productos locales</p>
                  <p className="text-xs text-gray-500 mt-1">Hace 4 horas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
