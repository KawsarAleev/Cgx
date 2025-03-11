"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, Github, Youtube, Facebook, Mail, MapPin, Home, GraduationCap, Percent } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"

export function MainHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">UIU Calculator</span>
        </Link>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle>UIU Calculator</SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />

              {/* Navigation Links */}
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <Home className="h-4 w-4 text-blue-500" />
                  Home
                </Link>
                <Link
                  href="/grading-system"
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <GraduationCap className="h-4 w-4 text-green-500" />
                  Grading System
                </Link>
                <Link
                  href="/waiver-scholarship"
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <Percent className="h-4 w-4 text-amber-500" />
                  Waiver & Scholarship Information
                </Link>
              </div>

              {/* Spacer to push developer info to bottom */}
              <div className="flex-grow"></div>

              {/* Developer Information */}
              <div className="mt-auto pt-4">
                <Separator className="mb-4" />
                <div className="rounded-md border p-4 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 rounded-full border-2 border-primary overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Kawsar Ahmed"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Kawsar Ahmed</h3>
                      <p className="text-xs text-muted-foreground">CSE - United International University</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span>kawsar7t@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Dhaka, Bangladesh</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">Social Links:</p>
                    <div className="flex gap-3">
                      <Link
                        href="https://github.com/"
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://youtube.com/"
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="YouTube"
                      >
                        <Youtube className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://facebook.com/"
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

