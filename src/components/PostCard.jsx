import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import appwriteService from "../appwrite/config"

function PostCard({ $id, title, featuredImage, author, createdAt }) {
    return (
        <Link to={`/post/${$id}`} className="block">
            <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="p-0">
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                </CardHeader>
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h2>
                    <Badge variant="secondary" className="mb-2">
                        Blog
                    </Badge>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${author}`} alt={author} />
                            <AvatarFallback>{author}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                 
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default PostCard

