"use client"

import { useState, useRef, ChangeEvent } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Download, Share2, Loader2, Upload, Play, Bot, Cpu, AlertCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { toast } from "sonner"

// API endpoints
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/generate_short"
const HEALTH_CHECK_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL.split('/generate_short')[0]}/health` : "http://localhost:8000/health"

interface VideoVariation {
  url: string
  platform: string
}

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [systemStatus, setSystemStatus] = useState<{status: string, message?: string} | null>(null)
  const [videoVariations, setVideoVariations] = useState<VideoVariation[]>([])
  
  // Form states
  const [description, setDescription] = useState("")
  const [voice, setVoice] = useState("male")
  const [music, setMusic] = useState("lofi")
  const [subtitles, setSubtitles] = useState(true)
  const [variations, setVariations] = useState([3])
  const logoRef = useRef<HTMLInputElement | null>(null)
  
  // Health check - runs once when component mounts
  const [didInit, setDidInit] = useState(false);
  
  if (!didInit) {
    setDidInit(true);
    
    // Run health check
    const checkHealth = async () => {
      try {
        const response = await fetch(HEALTH_CHECK_URL)
        const data = await response.json()
        
        if (data.status === "healthy") {
          setSystemStatus({
            status: "online",
            message: "System is online and ready"
          })
        } else {
          let message = "System is not fully operational: "
          if (!data.api_key) message += "API key missing. "
          if (!data.ffmpeg) message += "FFmpeg not available. "
          if (!data.static_dir) message += "Storage directory issue. "
          
          setSystemStatus({
            status: "degraded",
            message
          })
          console.warn("System health check failed:", data)
        }
      } catch (err) {
        setSystemStatus({
          status: "offline",
          message: "Cannot connect to the backend system"
        })
        console.error("Failed to perform health check:", err)
      }
    }
    
    // Execute immediately
    checkHealth();
  }

  const handleGenerate = async (e: any) => {
    e.preventDefault()
    
    if (!description.trim()) {
      toast.error("Please provide a description for your short video")
      return
    }
    
    setIsGenerating(true)
    setError(null)
    
    try {
      // Create form data
      const formData = new FormData()
      formData.append("description", description)
      formData.append("voice", voice)
      formData.append("music_tune", music)
      formData.append("subtitles", subtitles.toString())
      formData.append("variations", variations[0].toString())
      
      // Add logo if selected
      if (logoRef.current?.files && logoRef.current.files[0]) {
        formData.append("logo", logoRef.current.files[0])
      }
      
      // Call backend API
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to generate video")
      }
      
      const data = await response.json()
      
      // Transform data for UI
      const platforms = ["youtube", "instagram", "tiktok"]
      const videos: VideoVariation[] = []
      
      data.videos.forEach((video: string, index: number) => {
        platforms.forEach(platform => {
          videos.push({
            url: video,
            platform
          })
        })
      })
      
      setVideoVariations(videos)
      setIsGenerated(true)
      toast.success("Your shorts were generated successfully!")
    } catch (err) {
      console.error("Error generating video:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      toast.error("Failed to generate video")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Left Panel - Input Controls */}
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Create Your AI-Powered Short</h2>
              
              {systemStatus && systemStatus.status !== "online" && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{systemStatus.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Describe your Short in a single line</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Batman talking about AI" 
                    className="resize-none"
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice">AI Voice</Label>
                  <Select 
                    defaultValue="male"
                    onValueChange={(value: string) => setVoice(value)}
                  >
                    <SelectTrigger id="voice">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No voiceover</SelectItem>
                      <SelectItem value="male">Male AI voice</SelectItem>
                      <SelectItem value="female">Female AI voice</SelectItem>
                      <SelectItem value="ai">Custom AI voice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="music">Background Music</Label>
                  <Select 
                    defaultValue="lofi"
                    onValueChange={(value: string) => setMusic(value)}
                  >
                    <SelectTrigger id="music">
                      <SelectValue placeholder="Select music" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No music</SelectItem>
                      <SelectItem value="lofi">Lo-fi Chill</SelectItem>
                      <SelectItem value="epic">Epic Cinematic</SelectItem>
                      <SelectItem value="edm">Energetic EDM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="subtitles" 
                    checked={subtitles}
                    onCheckedChange={setSubtitles}
                  />
                  <Label htmlFor="subtitles">Include AI-Generated Subtitles</Label>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="logo">Logo (optional)</Label>
                    <span className="text-xs text-muted-foreground">PNG, JPG or SVG</span>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="logo-upload"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                      </div>
                      <input id="logo-upload" type="file" className="hidden" ref={logoRef} accept="image/*" />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="variations">Number of AI Variations</Label>
                    <span className="text-sm">{variations[0]}</span>
                  </div>
                  <Slider 
                    id="variations" 
                    value={variations} 
                    onValueChange={setVariations}
                    max={5} 
                    min={1} 
                    step={1} 
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit"
                  className="w-full button-glow" 
                  size="lg" 
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      AI Generating...
                    </>
                  ) : (
                    <>
                      <Bot className="mr-2 h-4 w-4" />
                      Generate AI Short
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            {!isGenerated ? (
              <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center min-h-[500px]">
                <div className="text-center space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Your AI-Generated Short Will Appear Here</h3>
                  <p className="text-muted-foreground max-w-md">
                    Fill out the form on the left and click "Generate AI Short" to create your content.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="youtube" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="youtube">YouTube Shorts</TabsTrigger>
                    <TabsTrigger value="instagram">Instagram Reels</TabsTrigger>
                    <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                  </TabsList>
                  <TabsContent value="youtube" className="mt-4">
                    <div className="glass-card rounded-xl overflow-hidden">
                      <div className="relative aspect-[9/16] w-full max-w-[350px] mx-auto">
                        {videoVariations.length > 0 && videoVariations[0].platform === "youtube" ? (
                          <video 
                            controls 
                            className="absolute inset-0 w-full h-full object-cover"
                            src={videoVariations[0].url}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                            <div className="text-center space-y-2">
                              <div className="mx-auto w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                              <p className="text-sm font-medium">YouTube Shorts Preview</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                          <div className="flex items-start space-x-2">
                            <div className="rounded-full bg-gray-500 h-8 w-8 flex items-center justify-center">
                              <span className="text-xs text-white">YT</span>
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium truncate">{description}</p>
                              <p className="text-white/70 text-xs">Your Channel</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between">
                        <Button variant="outline" size="sm" className="transition-all duration-200 hover:bg-muted">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm" className="button-glow">
                          <Share2 className="mr-2 h-4 w-4" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="instagram" className="mt-4">
                    <div className="glass-card rounded-xl overflow-hidden">
                      <div className="relative aspect-[9/16] w-full max-w-[350px] mx-auto">
                        {videoVariations.length > 0 && videoVariations.find((v: VideoVariation) => v.platform === "instagram") ? (
                          <video 
                            controls 
                            className="absolute inset-0 w-full h-full object-cover"
                            src={videoVariations.find((v: VideoVariation) => v.platform === "instagram")?.url}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-purple-500/20 to-pink-500/20 dark:from-purple-900/30 dark:to-pink-900/30">
                            <div className="text-center space-y-2">
                              <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                              <p className="text-sm font-medium">Instagram Reels Preview</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm">{description}</p>
                            <div className="flex space-x-2">
                              <div className="h-6 w-6 rounded-full bg-gray-500 flex items-center justify-center">
                                <span className="text-xs text-white">IG</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between">
                        <Button variant="outline" size="sm" className="transition-all duration-200 hover:bg-muted">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm" className="button-glow">
                          <Share2 className="mr-2 h-4 w-4" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="tiktok" className="mt-4">
                    <div className="glass-card rounded-xl overflow-hidden">
                      <div className="relative aspect-[9/16] w-full max-w-[350px] mx-auto">
                        {videoVariations.length > 0 && videoVariations.find((v: VideoVariation) => v.platform === "tiktok") ? (
                          <video 
                            controls 
                            className="absolute inset-0 w-full h-full object-cover"
                            src={videoVariations.find((v: VideoVariation) => v.platform === "tiktok")?.url}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                            <div className="text-center space-y-2">
                              <div className="mx-auto w-12 h-12 rounded-full bg-black flex items-center justify-center">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                              <p className="text-sm font-medium">TikTok Preview</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                          <p className="text-white text-sm font-medium">{description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="h-5 w-5 rounded-full bg-gray-500 flex items-center justify-center">
                              <span className="text-xs text-white">TT</span>
                            </div>
                            <p className="text-white/70 text-xs">@yourusername</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between">
                        <Button variant="outline" size="sm" className="transition-all duration-200 hover:bg-muted">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm" className="button-glow">
                          <Share2 className="mr-2 h-4 w-4" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/">© 2023 ReelForge AI</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
