"use client"

import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel"
import { PHOTO_SLIDES } from "./photo-slides"
import { useState, useEffect } from "react"

export default function DemoPhotos() {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let count = 0
    const total = PHOTO_SLIDES.length
    const promises = PHOTO_SLIDES.map((slide) => {
      return new Promise<void>((resolve) => {
        if (!slide.image) {
          resolve()
          return
        }
        const img = new Image()
        img.onload = img.onerror = () => {
          count++
          setProgress(Math.round((count / total) * 100))
          resolve()
        }
        img.src = slide.image
      })
    })
    Promise.all(promises).then(() => setLoaded(true))
  }, [])

  if (!loaded) {
    return (
      <div style={{ 
        position: "fixed", 
        inset: 0, 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center", 
        background: "#efece6",
        color: "#161513",
        fontFamily: "ui-sans-serif, system-ui, sans-serif"
      }}>
        <div style={{ fontSize: "18px", fontWeight: 500, marginBottom: "12px" }}>
          Loading photos...
        </div>
        <div style={{ fontSize: "14px", color: "#666" }}>
          {progress}%
        </div>
      </div>
    )
  }

  return <PolaroidLineCarousel slides={PHOTO_SLIDES} cardWidth={160} />
}
