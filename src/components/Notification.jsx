import React, { useEffect } from 'react';

export function Notification({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Notification will disappear after 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    const baseStyles = "fixed top-4 right-4 px-4 py-3 rounded shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0";
    const typeStyles = {
        success: "bg-green-100 border border-green-400 text-green-700",
        error: "bg-red-100 border border-red-400 text-red-700",
        info: "bg-blue-100 border border-blue-400 text-blue-700"
    };

    return (
        <div className={`${baseStyles} ${typeStyles[type]}`} role="alert">
            <div className="flex items-center">
                {type === 'success' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                )}
                {type === 'error' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                )}
                {type === 'info' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                )}
                <span className="block sm:inline">{message}</span>
                <button 
                    onClick={onClose}
                    className="ml-4 text-lg font-semibold leading-none"
                >
                    ×
                </button>
            </div>
            <div className="h-1 w-full bg-gray-200 absolute bottom-0 left-0 rounded-b">
                <div 
                    className={`h-1 ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} rounded-b transition-all duration-5000 ease-linear`}
                    style={{ width: '0%', animation: 'progress 5s linear' }}
                ></div>
            </div>
        </div>
    );
} 