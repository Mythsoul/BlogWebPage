import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { Calendar, User } from 'lucide-react'

function PostCard({ $id, title, featuredImage, author, createdAt }) {
    return (
        <Link to={`/post/${$id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
                <img 
                    src={appwriteService.getFilePreview(featuredImage)} 
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>{author}</span>
                        </div>
                        {/* <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(createdAt).toLocaleDateString()}</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard

