import React from 'react'

const LoadingFallback = () => {
    return (
        <div className="flex justify-center items-center py-4">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
        </div>
    )
}

export default LoadingFallback
