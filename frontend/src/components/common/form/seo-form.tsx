'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SEOFormProps {
  imageSrc: string
  imageAlt: string
}

export function SEOForm({ imageSrc, imageAlt }: SEOFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [altText, setAltText] = useState(imageAlt)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (e.g., send data to server)
    console.log({ title, description, altText })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter SEO title" 
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter SEO description" 
        />
      </div>
      <div>
        <Label htmlFor="altText">Alt Text</Label>
        <Input 
          id="altText" 
          value={altText} 
          onChange={(e) => setAltText(e.target.value)} 
          placeholder="Enter alt text" 
        />
      </div>
      <Button type="submit">Save SEO Data</Button>
    </form>
  )
}

