import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Home, BookOpen, PlusCircle, User, Menu } from 'lucide-react'
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      icon: <BookOpen className="w-5 h-5" />,
      protected: true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      icon: <PlusCircle className="w-5 h-5" />,
      protected: true,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/react.svg" alt="Logo" className="w-8 h-8" />
          <span className="font-bold">BlogHub</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => 
              (!item.protected || (item.protected && authStatus)) ? (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="hidden md:inline-flex"
                  onClick={() => navigate(item.slug)}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Button>
              ) : null
            )}
          </nav>
          {authStatus ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden md:inline-flex">
                  <User className="w-5 h-5 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <LogoutBtn />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              className="hidden md:inline-flex"
            >
              Login
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => 
                  (!item.protected || (item.protected && authStatus)) ? (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Button>
                  ) : null
                )}
                {authStatus ? (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => navigate('/profile')}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Profile
                    </Button>
                    <LogoutBtn />
                  </>
                ) : (
                  <Button
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header

