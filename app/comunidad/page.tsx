"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Heart, Share2, Plus, Users, MapPin, Camera, Send, Leaf, Filter, Search } from "lucide-react"
import Link from "next/link"

export default function Comunidad() {
  const [activeTab, setActiveTab] = useState<"feed" | "groups" | "create">("feed")
  const [newPost, setNewPost] = useState("")

  const posts = [
    {
      id: 1,
      author: {
        name: "Ana García",
        avatar: "/woman-profile.png",
        location: "Santiago Centro",
      },
      content:
        "¡Acabo de preparar este smoothie antiinflamatorio con cúrcuma y jengibre! 🌟 La receta la encontré en la plataforma y es increíble. ¿Alguien más la ha probado?",
      image: "/turmeric-ginger-smoothie.png",
      likes: 24,
      comments: 8,
      timeAgo: "2 horas",
      tags: ["Antiinflamatorio", "Smoothie", "Receta"],
    },
    {
      id: 2,
      author: {
        name: "Carlos Mendoza",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Las Condes",
      },
      content:
        "Encontré una tienda increíble de productos sin gluten en mi barrio. Tienen pan casero que sabe igual al tradicional. ¡Recomendadísimo para quienes tienen celiaquía!",
      likes: 18,
      comments: 12,
      timeAgo: "4 horas",
      tags: ["Sin Gluten", "Recomendación", "Tienda Local"],
    },
    {
      id: 3,
      author: {
        name: "María Rodríguez",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Providencia",
      },
      content:
        "¿Alguien sabe dónde puedo conseguir quinoa orgánica a buen precio? Estoy empezando mi plan antiinflamatorio y necesito comprar en cantidad.",
      likes: 15,
      comments: 20,
      timeAgo: "6 horas",
      tags: ["Quinoa", "Orgánico", "Consulta"],
    },
  ]

  const groups = [
    {
      id: 1,
      name: "Alimentación Antiinflamatoria",
      members: 1247,
      description: "Compartimos recetas, tips y experiencias sobre alimentación antiinflamatoria",
      image: "/placeholder.svg?height=100&width=100",
      isJoined: true,
    },
    {
      id: 2,
      name: "Sin Gluten Santiago",
      members: 892,
      description: "Grupo local para personas con celiaquía y sensibilidad al gluten",
      image: "/placeholder.svg?height=100&width=100",
      isJoined: true,
    },
    {
      id: 3,
      name: "Veganos Conscientes",
      members: 2156,
      description: "Comunidad vegana enfocada en nutrición y bienestar",
      image: "/placeholder.svg?height=100&width=100",
      isJoined: false,
    },
    {
      id: 4,
      name: "Emprendimientos Locales",
      members: 634,
      description: "Apoyamos y promocionamos emprendimientos de alimentación saludable",
      image: "/placeholder.svg?height=100&width=100",
      isJoined: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-800">Comunidad de Bienestar</h1>
            </Link>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              Conectando personas
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            variant={activeTab === "feed" ? "default" : "outline"}
            onClick={() => setActiveTab("feed")}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Feed Principal
          </Button>
          <Button
            variant={activeTab === "groups" ? "default" : "outline"}
            onClick={() => setActiveTab("groups")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Users className="h-4 w-4 mr-2" />
            Mis Grupos
          </Button>
          <Button
            variant={activeTab === "create" ? "default" : "outline"}
            onClick={() => setActiveTab("create")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Publicación
          </Button>
        </div>

        {/* Feed Principal */}
        {activeTab === "feed" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Quick Post */}
              <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder="¿Qué quieres compartir con la comunidad?"
                      className="flex-1 border-emerald-200"
                      onClick={() => setActiveTab("create")}
                    />
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Posts */}
              {posts.map((post) => (
                <Card key={post.id} className="border-emerald-200 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{post.author.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span>{post.author.location}</span>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-800">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post content"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-emerald-100 text-emerald-800">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-emerald-100">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                          <Share2 className="h-4 w-4 mr-1" />
                          Compartir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Grupos Sugeridos */}
              <Card className="border-blue-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-800">Grupos Sugeridos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {groups.slice(2).map((group) => (
                    <div key={group.id} className="flex items-center space-x-3">
                      <img
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm text-gray-800">{group.name}</h5>
                        <p className="text-xs text-gray-600">{group.members} miembros</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Unirse
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Actividad Reciente */}
              <Card className="border-amber-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-amber-800">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">Nueva receta compartida</p>
                    <p className="text-gray-600">En "Alimentación Antiinflamatoria"</p>
                    <p className="text-xs text-gray-500">Hace 1 hora</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">Nuevo miembro</p>
                    <p className="text-gray-600">Se unió a "Sin Gluten Santiago"</p>
                    <p className="text-xs text-gray-500">Hace 3 horas</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Grupos */}
        {activeTab === "groups" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Buscar grupos..." className="pl-10 border-emerald-200" />
              </div>
              <Button variant="outline" className="border-emerald-300 text-emerald-700 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card
                  key={group.id}
                  className="border-emerald-200 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <img
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-800">{group.name}</CardTitle>
                        <p className="text-sm text-gray-600">{group.members} miembros</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{group.description}</CardDescription>
                    <Button
                      className={`w-full ${
                        group.isJoined ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {group.isJoined ? "Ver Grupo" : "Unirse"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Crear Publicación */}
        {activeTab === "create" && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-800">Crear Nueva Publicación</CardTitle>
                <CardDescription>Comparte tu experiencia, recetas o consejos con la comunidad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="¿Qué quieres compartir? Puedes hablar sobre recetas, productos que recomiendes, preguntas sobre alimentación saludable..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-32 border-emerald-200"
                />

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700 bg-transparent">
                    <Camera className="h-4 w-4 mr-1" />
                    Agregar Foto
                  </Button>
                  <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700 bg-transparent">
                    <MapPin className="h-4 w-4 mr-1" />
                    Ubicación
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Etiquetas (opcional)</label>
                  <Input placeholder="Ej: #Receta #SinGluten #Antiinflamatorio" className="border-emerald-200" />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setActiveTab("feed")}>
                    Cancelar
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Send className="h-4 w-4 mr-2" />
                    Publicar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
