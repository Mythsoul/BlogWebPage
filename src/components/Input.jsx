import React, { useId, useState } from 'react'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    required = false,
    error,
    success,
    icon: Icon,
    variant = "default",
    ...props
}, ref) {
    const id = useId()
    const [showPassword, setShowPassword] = useState(false)


    const variants = {
        default: "border-gray-300 focus:border-blue-500",
        error: "border-red-500 focus:border-red-500",
        success: "border-green-500 focus:border-green-500"
    }

    const getVariant = () => {
        if (error) return variants.error
        if (success) return variants.success
        return variants[variant]
    }

    return (
        <div className='w-full mb-4 m-4'>
            {label && (
                <label 
                    className='block mb-2 text-sm font-medium text-gray-700' 
                    htmlFor={id}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                <input
                    type={type === "password" && showPassword ? "text" : type}
                    className={`
                        px-3 py-2 rounded-lg bg-white text-gray-900 outline-none
                        focus:ring-2 focus:ring-opacity-50 duration-200
                        w-full transition-all
                        ${Icon ? 'pl-10' : ''}
                        ${getVariant()}
          
                        ${className}
                    `}
                    ref={ref}
                    {...props}
                    id={id}
                 
      
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                )}
                {error && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                )}
                {success && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Check className="h-5 w-5 text-green-500" />
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {success && <p className="mt-1 text-sm text-green-500">{success}</p>}
        </div>
    )
})

export default Input

