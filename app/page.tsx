"use client"

import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel"
import { PHOTO_SLIDES } from "./photo-slides"

export default function DemoPhotos() {
  return <PolaroidLineCarousel slides={PHOTO_SLIDES} />
}
