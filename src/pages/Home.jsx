import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { PostCard } from '../components'
import { Loader } from 'lucide-react'
import { CarouselDemo } from '../components/TestCard'
import { Carousel } from '@/components/ui/carousel'
function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [appwriteService, setPosts])
   
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to BlogHub</h1>
                <p className="text-xl text-gray-600 mb-8">Start your blogging journey today!</p>
                <button 
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                    Login to Read Posts
                </button>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Latest Blog Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
<CarouselDemo /> 
            </div>
        </div>
    )
}

export default Home

