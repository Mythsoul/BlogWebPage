import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, GitlabIcon as GitHub } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <Card className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CardContent className="space-y-4">
            <Logo width="100px" />
            <p className="text-sm text-gray-600">
              Explore our blog and share your thoughts with the community.
              Make Share and see Blogs 
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon">
                <GitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
    </CardContent>
    </CardContent>
      </Card>
    </footer>
  )
}

export default Footer

