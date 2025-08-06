"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Wheat, Milk, Heart, Apple, Leaf, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    restrictions: [] as string[],
    objectives: [] as string[],
    location: "",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const restrictions = [
    { id: "gluten", label: "Sin Gluten", icon: Wheat, color: "bg-amber-100 text-amber-700" },
    { id: "lactose", label: "Sin Lactosa", icon: Milk, color: "bg-blue-100 text-blue-700" },
    { id: "diabetes", label: "Diabetes", icon: Heart, color: "bg-red-100 text-red-700" },
    { id: "hypertension", label: "Hipertensión", icon: Heart, color: "bg-purple-100 text-purple-700" },
    { id: "allergies", label: "Alergias Alimentarias", icon: Apple, color: "bg-orange-100 text-orange-700" },
  ]

  const objectives = [
    { id: "vegan", label: "Vegano", icon: Leaf, color: "bg-green-100 text-green-700" },
    { id: "keto", label: "Keto", icon: Apple, color: "bg-yellow-100 text-yellow-700" },
    { id: "antiinflammatory", label: "Antiinflamatorio", icon: Heart, color: "bg-pink-100 text-pink-700" },
    { id: "weightloss", label: "Pérdida de Peso", icon: Heart, color: "bg-indigo-100 text-indigo-700" },
    { id: "muscle", label: "Ganancia Muscular", icon: Heart, color: "bg-emerald-100 text-emerald-700" },
  ]

  const handleRestrictionToggle = (restrictionId: string) => {
    setFormData((prev) => ({
      ...prev,
      restrictions: prev.restrictions.includes(restrictionId)
        ? prev.restrictions.filter((id) => id !== restrictionId)
        : [...prev.restrictions, restrictionId],
    }))
  }

  const handleObjectiveToggle = (objectiveId: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(objectiveId)
        ? prev.objectives.filter((id) => id !== objectiveId)
        : [...prev.objectives, objectiveId],
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-800">Plataforma de Bienestar</h1>
            </Link>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              Paso {currentStep} de {totalSteps}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso de Configuración</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Step 1: Restricciones Alimentarias */}
        {currentStep === 1 && (
          <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-emerald-800">Restricciones Alimentarias</CardTitle>
              <CardDescription className="text-lg">
                Cuéntanos sobre tus restricciones alimentarias para personalizar tu experiencia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restrictions.map((restriction) => {
                  const Icon = restriction.icon
                  const isSelected = formData.restrictions.includes(restriction.id)

                  return (
                    <div
                      key={restriction.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-gray-200 bg-white hover:border-emerald-200"
                      }`}
                      onClick={() => handleRestrictionToggle(restriction.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${restriction.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-800">{restriction.label}</span>
                        {isSelected && <CheckCircle className="h-5 w-5 text-emerald-600 ml-auto" />}
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">
                Puedes seleccionar múltiples opciones o ninguna si no aplica
              </p>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Objetivos de Salud */}
        {currentStep === 2 && (
          <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-emerald-800">Objetivos de Salud</CardTitle>
              <CardDescription className="text-lg">
                ¿Cuáles son tus objetivos de salud y preferencias alimentarias?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objectives.map((objective) => {
                  const Icon = objective.icon
                  const isSelected = formData.objectives.includes(objective.id)

                  return (
                    <div
                      key={objective.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-gray-200 bg-white hover:border-emerald-200"
                      }`}
                      onClick={() => handleObjectiveToggle(objective.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${objective.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-800">{objective.label}</span>
                        {isSelected && <CheckCircle className="h-5 w-5 text-emerald-600 ml-auto" />}
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">
                Selecciona los objetivos que mejor describan tus metas de bienestar
              </p>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Ubicación */}
        {currentStep === 3 && (
          <Card className="border-emerald-200 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-emerald-800">Ubicación</CardTitle>
              <CardDescription className="text-lg">
                Permítenos conocer tu ubicación para encontrar productos cerca de ti
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-10 w-10 text-emerald-600" />
                </div>
                <p className="text-gray-600 mb-6">
                  Activar la ubicación nos ayudará a mostrarte tiendas, mercados y emprendimientos locales que tengan
                  productos adecuados para tus necesidades.
                </p>
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                  onClick={() => {
                    // Simular activación de ubicación
                    setFormData((prev) => ({ ...prev, location: "Ubicación activada" }))
                  }}
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Activar Ubicación
                </Button>
              </div>

              {formData.location && (
                <div className="bg-emerald-50 p-4 rounded-lg text-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-emerald-800 font-medium">¡Ubicación activada correctamente!</p>
                  <p className="text-emerald-600 text-sm">Ya puedes usar el Localizador Inteligente</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Siguiente
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Link href="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Completar Configuración
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
