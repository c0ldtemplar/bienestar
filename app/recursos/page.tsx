"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Play, Clock, Star, BookOpen, Video, GraduationCap, ChefHat, Leaf, Filter } from "lucide-react"
import Link from "next/link"

export default function Recursos() {
  const [activeCategory, setActiveCategory] = useState<"all" | "recipes" | "videos" | "courses">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", label: "Todo", icon: BookOpen },
    { id: "recipes", label: "Recetas", icon: ChefHat },
    { id: "videos", label: "Videos", icon: Video },
    { id: "courses", label: "Cursos", icon: GraduationCap },
  ]

  const recipes = [
    {
      id: 1,
      title: "Bowl de Quinoa Antiinflamatorio",
      description: "Rica en omega-3 y antioxidantes",
      difficulty: "Fácil",
      time: "30 min",
      rating: 4.8,
      condition: "Antiinflamatorio",
      image: "/healthy-quinoa-bowl.png",
    },
    {
      id: 2,
      title: "Smoothie Verde Detox",
      description: "Perfecto para comenzar el día",
      difficulty: "Muy Fácil",
      time: "10 min",
      rating: 4.9,
      condition: "Sin Gluten",
      image: "/green-smoothie-detox.png",
    },
    {
      id: 3,
      title: "Pan Sin Gluten Casero",
      description: "Suave y esponjoso, libre de gluten",
      difficulty: "Intermedio",
      time: "2 horas",
      rating: 4.7,
      condition: "Sin Gluten",
      image: "/gluten-free-bread.png",
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Cómo usar la Cúrcuma en la Cocina",
      description: "Tips y beneficios de este superalimento",
      duration: "8 min",
      views: "12.5k",
      image: "/turmeric-cooking-tips.png",
    },
    {
      id: 2,
      title: "Preparación de Leches Vegetales",
      description: "Almendra, avena y coco caseras",
      duration: "12 min",
      views: "8.2k",
      image: "/placeholder-7h3ad.png",
    },
    {
      id: 3,
      title: "Fermentación: Kombucha Casera",
      description: "Paso a paso para principiantes",
      duration: "15 min",
      views: "15.7k",
      image: "/placeholder-io4of.png",
    },
  ]

  const courses = [
    {
      id: 1,
      title: "Alimentación Antiinflamatoria",
      description: "Aprende los fundamentos de una dieta que reduce la inflamación",
      duration: "4 semanas",
      lessons: 12,
      level: "Principiante",
      image: "/anti-inflammatory-diet-course.png",
    },
    {
      id: 2,
      title: "Cocina Sin Gluten Completa",
      description: "Domina las técnicas para cocinar sin gluten",
      duration: "6 semanas",
      lessons: 18,
      level: "Intermedio",
      image: "/gluten-free-cooking-course.png",
    },
    {
      id: 3,
      title: "Nutrición Vegana Equilibrada",
      description: "Planifica comidas veganas nutritivas y deliciosas",
      duration: "3 semanas",
      lessons: 9,
      level: "Principiante",
      image: "/placeholder-jel7y.png",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Muy Fácil":
        return "bg-green-100 text-green-800"
      case "Fácil":
        return "bg-emerald-100 text-emerald-800"
      case "Intermedio":
        return "bg-amber-100 text-amber-800"
      case "Avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-100 text-green-800"
      case "Intermedio":
        return "bg-amber-100 text-amber-800"
      case "Avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
              <h1 className="text-2xl font-bold text-emerald-800">Centro de Recursos</h1>
            </Link>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              Educativo
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Search and Categories */}
        <div className="mb-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Aprende y Mejora tu Bienestar</h2>
            <p className="text-gray-600 text-lg">Descubre recetas, videos educativos y cursos especializados</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar recetas, videos o cursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-emerald-200 focus:border-emerald-400"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`${
                    activeCategory === category.id
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Recipes Section */}
        {(activeCategory === "all" || activeCategory === "recipes") && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <ChefHat className="h-6 w-6 text-emerald-600" />
                <span>Recetas Saludables</span>
              </h3>
              {activeCategory === "all" && (
                <Button variant="outline" className="border-emerald-300 text-emerald-700 bg-transparent">
                  Ver todas
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="border-emerald-200 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className={`absolute top-3 right-3 ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-800 mb-1">{recipe.title}</CardTitle>
                        <CardDescription>{recipe.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{recipe.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.time}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {recipe.condition}
                      </Badge>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Ver Receta
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Videos Section */}
        {(activeCategory === "all" || activeCategory === "videos") && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <Video className="h-6 w-6 text-purple-600" />
                <span>Videos Educativos</span>
              </h3>
              {activeCategory === "all" && (
                <Button variant="outline" className="border-purple-300 text-purple-700 bg-transparent">
                  Ver todos
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card
                  key={video.id}
                  className="border-purple-200 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={video.image || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-purple-600 ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-3 right-3 bg-black/70 text-white">{video.duration}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">{video.views} visualizaciones</span>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Ver Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Courses Section */}
        {(activeCategory === "all" || activeCategory === "courses") && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <span>Cursos Especializados</span>
              </h3>
              {activeCategory === "all" && (
                <Button variant="outline" className="border-blue-300 text-blue-700 bg-transparent">
                  Ver todos
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="border-blue-200 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className={`absolute top-3 right-3 ${getLevelColor(course.level)}`}>{course.level}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <span>{course.lessons} lecciones</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Comenzar Curso
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
