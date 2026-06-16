"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SmartImage } from "@/components/smart-image"
import {
  LogOut, Mail, Trash2, Plus, Pencil, X, Save, ExternalLink,
  MessageSquare, Globe, ImageIcon, LayoutDashboard, User,
  Calendar, Home, RefreshCw, FolderOpen, Link2, Tag, Hash,
} from "lucide-react"
import { apiFetch, removeAuthToken } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

interface Project {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  live_url: string | null
  github_url: string | null
  tags: string[]
  sort_order: number
}

interface SiteImage {
  id: number
  name: string
  section: string
  url: string
  alt_text: string | null
  sort_order: number
}

type Tab = "messages" | "projects" | "images"

const emptyProject = {
  title: "", description: "", category: "web", image_url: "",
  live_url: "", tags: "", sort_order: 0,
}

const emptyImage = {
  name: "", section: "portfolio", url: "", alt_text: "", sort_order: 0,
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("messages")
  const [messages, setMessages] = useState<Message[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [images, setImages] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)
  const [projectForm, setProjectForm] = useState(emptyProject)
  const [imageForm, setImageForm] = useState(emptyImage)
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [editingImageId, setEditingImageId] = useState<number | null>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showImageForm, setShowImageForm] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const loadData = useCallback(async () => {
    const authRes = await apiFetch("/api/auth/me")
    if (!authRes.ok) { router.push("/login"); return }

    const [msgRes, projRes, imgRes] = await Promise.all([
      apiFetch("/api/messages"),
      apiFetch("/api/projects"),
      apiFetch("/api/images"),
    ])

    if (msgRes.ok) setMessages((await msgRes.json()).messages)
    if (projRes.ok) setProjects((await projRes.json()).projects)
    if (imgRes.ok) setImages((await imgRes.json()).images)
    setLoading(false)
  }, [router])

  useEffect(() => { loadData() }, [loadData])

  const handleLogout = () => { removeAuthToken(); router.push("/login") }

  const deleteMessage = async (id: number) => {
    if (!confirm("Delete this message?")) return
    const res = await apiFetch(`/api/messages?id=${id}`, { method: "DELETE" })
    if (res.ok) { setMessages((m) => m.filter((x) => x.id !== id)); toast({ title: "Message deleted" }) }
  }

  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return
    const res = await apiFetch(`/api/projects?id=${id}`, { method: "DELETE" })
    if (res.ok) { setProjects((p) => p.filter((x) => x.id !== id)); toast({ title: "Project deleted" }) }
  }

  const deleteImage = async (id: number) => {
    if (!confirm("Delete this image?")) return
    const res = await apiFetch(`/api/images?id=${id}`, { method: "DELETE" })
    if (res.ok) { setImages((i) => i.filter((x) => x.id !== id)); toast({ title: "Image deleted" }) }
  }

  const saveProject = async () => {
    if (!projectForm.title || !projectForm.image_url) {
      toast({ title: "Title and Image URL are required", variant: "destructive" })
      return
    }
    const body = {
      ...(editingProjectId ? { id: editingProjectId } : {}),
      title: projectForm.title,
      description: projectForm.description,
      category: projectForm.category,
      image_url: projectForm.image_url,
      live_url: projectForm.live_url || null,
      github_url: null,
      tags: projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      sort_order: Number(projectForm.sort_order),
    }
    const res = await apiFetch("/api/projects", {
      method: editingProjectId ? "PUT" : "POST",
      body: JSON.stringify(body),
    })
    if (res.ok) {
      toast({ title: "Project saved successfully!" })
      setShowProjectForm(false)
      setEditingProjectId(null)
      setProjectForm(emptyProject)
      loadData()
    } else {
      toast({ title: "Error saving project", variant: "destructive" })
    }
  }

  const saveImage = async () => {
    if (!imageForm.name || !imageForm.url) {
      toast({ title: "Name and Image URL are required", variant: "destructive" })
      return
    }
    const body = {
      ...(editingImageId ? { id: editingImageId } : {}),
      name: imageForm.name,
      section: imageForm.section,
      url: imageForm.url,
      alt_text: imageForm.alt_text || null,
      sort_order: Number(imageForm.sort_order),
    }
    const res = await apiFetch("/api/images", {
      method: editingImageId ? "PUT" : "POST",
      body: JSON.stringify(body),
    })
    if (res.ok) {
      toast({ title: "Image saved successfully!" })
      setShowImageForm(false)
      setEditingImageId(null)
      setImageForm(emptyImage)
      loadData()
    } else {
      toast({ title: "Error saving image", variant: "destructive" })
    }
  }

  const editProject = (p: Project) => {
    setProjectForm({
      title: p.title, description: p.description, category: p.category,
      image_url: p.image_url, live_url: p.live_url || "",
      tags: p.tags.join(", "), sort_order: p.sort_order,
    })
    setEditingProjectId(p.id)
    setShowProjectForm(true)
  }

  const editImage = (img: SiteImage) => {
    setImageForm({
      name: img.name, section: img.section, url: img.url,
      alt_text: img.alt_text || "", sort_order: img.sort_order,
    })
    setEditingImageId(img.id)
    setShowImageForm(true)
  }

  const navItems = [
    { id: "messages" as Tab, label: "Messages", icon: MessageSquare, count: messages.length },
    { id: "projects" as Tab, label: "Websites", icon: Globe, count: projects.length },
    { id: "images" as Tab, label: "Images", icon: ImageIcon, count: images.length },
  ]

  if (loading) {
    return (
      <div className="dark min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dark min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 sm:px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">Mohamed Barre Portfolio</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted" onClick={loadData}>
            <RefreshCw className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted" asChild>
            <a href="/" target="_blank"><Home className="h-4 w-4 sm:mr-1" /><span className="hidden sm:inline">View Site</span></a>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Flexbox */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">Menu</p>
          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  tab === item.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  tab === item.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {item.count}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/50">
              <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">Logged in</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Mobile tabs */}
          <div className="flex gap-2 mb-6 md:hidden overflow-x-auto">
            {navItems.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={tab === item.id ? "default" : "outline"}
                onClick={() => setTab(item.id)}
                className="shrink-0 gap-1"
              >
                <item.icon className="h-4 w-4" />
                {item.label} ({item.count})
              </Button>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {navItems.map((item) => (
              <Card
                key={item.id}
                className={`p-4 border-border cursor-pointer transition-all hover:border-primary/40 ${
                  tab === item.id ? "border-primary/50 bg-primary/5" : "bg-card"
                }`}
                onClick={() => setTab(item.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tab === item.id ? "bg-primary/20" : "bg-muted"}`}>
                    <item.icon className={`h-5 w-5 ${tab === item.id ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{item.count}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Messages Tab */}
          {tab === "messages" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Contact Messages</h2>
              </div>
              {messages.length === 0 ? (
                <Card className="p-12 text-center bg-card border-border">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No messages yet</p>
                </Card>
              ) : messages.map((m) => (
                <Card key={m.id} className="p-5 bg-card border-border hover:border-primary/30 transition-colors">
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-4 flex-1 min-w-0">
                      <div className="h-11 w-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground">{m.name}</p>
                        <a href={`mailto:${m.email}`} className="text-sm text-primary hover:underline flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3" />{m.email}
                        </a>
                        <p className="font-medium text-foreground mt-3">{m.subject}</p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.message}</p>
                        <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(m.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="destructive" size="icon" className="shrink-0" onClick={() => deleteMessage(m.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Projects Tab */}
          {tab === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Websites & Projects</h2>
                </div>
                <Button onClick={() => { setShowProjectForm(true); setEditingProjectId(null); setProjectForm(emptyProject) }}>
                  <Plus className="h-4 w-4 mr-2" />Add Project
                </Button>
              </div>

              {showProjectForm && (
                <Card className="p-6 mb-6 bg-card border-primary/30">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-primary" />
                      {editingProjectId ? "Edit Project" : "New Project"}
                    </h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowProjectForm(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Tag className="h-3 w-3" />Title</label>
                      <Input className="bg-background border-border" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Category</label>
                      <select className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground" value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}>
                        <option value="web">Web Development</option>
                        <option value="design">Graphic Design</option>
                        <option value="video">Video Editing</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><ImageIcon className="h-3 w-3" />Image URL</label>
                      <Input className="bg-background border-border" placeholder="https://... or /image.png" value={projectForm.image_url} onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Link2 className="h-3 w-3" />Website Link</label>
                      <Input className="bg-background border-border" placeholder="https://..." value={projectForm.live_url} onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                      <Textarea className="bg-background border-border" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} rows={3} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Tags (comma separated)</label>
                      <Input className="bg-background border-border" placeholder="Next.js, React" value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Hash className="h-3 w-3" />Sort Order</label>
                      <Input className="bg-background border-border" type="number" value={projectForm.sort_order} onChange={(e) => setProjectForm({ ...projectForm, sort_order: Number(e.target.value) })} />
                    </div>
                  </div>
                  {projectForm.image_url && (
                    <div className="mt-4 relative h-40 w-full max-w-sm rounded-xl overflow-hidden border border-border bg-muted">
                      <SmartImage src={projectForm.image_url} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <Button className="mt-4" onClick={saveProject}>
                    <Save className="h-4 w-4 mr-2" />Save Project
                  </Button>
                </Card>
              )}

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {projects.map((p) => (
                  <Card key={p.id} className="overflow-hidden bg-card border-border hover:border-primary/30 transition-all group">
                    <div className="relative h-44 bg-muted">
                      <SmartImage src={p.image_url} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 right-2 px-2 py-1 rounded-full bg-background/80 text-xs font-medium capitalize text-foreground backdrop-blur-sm">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                      <div className="flex gap-2 mt-4">
                        {p.live_url && p.live_url !== "#" && (
                          <Button size="sm" variant="outline" className="flex-1 border-border" asChild>
                            <a href={p.live_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />View
                            </a>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-border" onClick={() => editProject(p)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteProject(p.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Images Tab */}
          {tab === "images" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Images & Logos</h2>
                </div>
                <Button onClick={() => { setShowImageForm(true); setEditingImageId(null); setImageForm(emptyImage) }}>
                  <Plus className="h-4 w-4 mr-2" />Add Image
                </Button>
              </div>

              {showImageForm && (
                <Card className="p-6 mb-6 bg-card border-primary/30">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-primary" />
                      {editingImageId ? "Edit Image" : "New Image"}
                    </h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowImageForm(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                      <Input className="bg-background border-border" value={imageForm.name} onChange={(e) => setImageForm({ ...imageForm, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Section</label>
                      <select className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground" value={imageForm.section} onChange={(e) => setImageForm({ ...imageForm, section: e.target.value })}>
                        <option value="logo">Logo</option>
                        <option value="hero">Hero</option>
                        <option value="portfolio">Portfolio</option>
                        <option value="about">About</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground mb-1 block">Image URL</label>
                      <Input className="bg-background border-border" placeholder="https://... or /image.png" value={imageForm.url} onChange={(e) => setImageForm({ ...imageForm, url: e.target.value })} />
                    </div>
                  </div>
                  {imageForm.url && (
                    <div className="mt-4 relative h-32 w-32 rounded-xl overflow-hidden border border-border bg-muted">
                      <SmartImage src={imageForm.url} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <Button className="mt-4" onClick={saveImage}>
                    <Save className="h-4 w-4 mr-2" />Save Image
                  </Button>
                </Card>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map((img) => (
                  <Card key={img.id} className="overflow-hidden bg-card border-border hover:border-primary/30 transition-all">
                    <div className="relative h-32 bg-muted">
                      <SmartImage src={img.url} alt={img.name} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-foreground truncate">{img.name}</p>
                      <p className="text-xs text-primary capitalize mt-0.5">{img.section}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{img.url}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1 border-border" onClick={() => editImage(img)}>
                          <Pencil className="h-3 w-3 mr-1" />Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteImage(img.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  )
}
