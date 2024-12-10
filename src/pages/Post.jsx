import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Edit, Trash2, ArrowLeft } from 'lucide-react';

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return post ? (
        <div className="py-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                    
                    <div className="flex items-center text-gray-600 mb-6">
                        <span className="mr-4">By {post.author}</span>
                        <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                    </div>

                    {isAuthor && (
                        <div className="flex space-x-4 mb-6">
                            <Link 
                                to={`/edit-post/${post.$id}`}
                                className="flex items-center text-blue-600 hover:text-blue-800"
                            >
                                <Edit className="w-5 h-5 mr-1" />
                                Edit
                            </Link>
                            <button 
                                onClick={deletePost}
                                className="flex items-center text-red-600 hover:text-red-800"
                            >
                                <Trash2 className="w-5 h-5 mr-1" />
                                Delete
                            </button>
                        </div>
                    )}

                    <div className="prose max-w-none">
                        {parse(post.content)}
                    </div>

                    <Link 
                        to="/"
                        className="inline-flex items-center mt-8 text-indigo-600 hover:text-indigo-800"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    ) : null;
}

