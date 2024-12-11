import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { X, Loader2 } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import appwriteService from '../../appwrite/config'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

export default function PostForm({ post }) {
  const { toast } = useToast()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      image: null,
    },
  })

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.content || "",
    onUpdate: ({ editor }) => {
      form.setValue('content', editor.getHTML())
    },
  })

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")

    return ""
  }, [])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      let featuredImage = post?.featuredImage
      if (data.image) {
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage)
        }
        const uploadedFile = await appwriteService.uploadFile(data.image)
        featuredImage = uploadedFile.$id
      }

      const postData = {
        ...data,
        featuredImage,
        userId: userData.$id,
      }

      let dbPost
      if (post) {
        dbPost = await appwriteService.updatePost(post.$id, postData)
      } else {
        dbPost = await appwriteService.createPost(postData)
      }

      if (dbPost) {
        toast({
          title: post ? "Post Updated" : "Post Created",
          description: `Your post has been ${post ? "updated" : "created"} successfully.`,
        })
        navigate(`/post/${dbPost.$id}`)
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${post ? "update" : "create"} post. Please try again.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{post ? "Edit Post" : "Create New Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              rules={{ required: "Slug is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="post-slug"
                      {...field}
                      onChange={(e) => {
                        const value = slugTransform(e.target.value)
                        form.setValue("slug", value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The slug is used in the URL of your post. It is automatically generated from the title, but you can edit it.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <EditorContent editor={editor} className="min-h-[200px] border rounded-md p-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files[0])}
                        {...rest}
                      />
                      {post?.featuredImage && (
                        <div className="relative">
                          <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2"
                            onClick={() => form.setValue("image", null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a featured image for your post. If updating, uploading a new image will replace the existing one.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select post status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {post ? "Update Post" : "Create Post"}
        </Button>
      </CardFooter>
    </Card>
  )
}

