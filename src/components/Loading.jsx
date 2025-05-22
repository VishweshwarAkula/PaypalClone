import { useEffect, useState } from 'react';

export function Loading() {
    const [animationStarted, setAnimationStarted] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setAnimationStarted(true);
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (showContent) {
        return null;
    }

    return (
        <div className={`fixed inset-0 bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="relative">
                    <div className={`water-drop ${animationStarted ? 'animate-drop' : ''}`}></div>
                    <div className={`ripple-effect ${animationStarted ? 'animate-ripple' : ''}`}></div>
                    <div className={`ripple-effect delay-150 ${animationStarted ? 'animate-ripple' : ''}`}></div>
                    <div className={`ripple-effect delay-300 ${animationStarted ? 'animate-ripple' : ''}`}></div>
                </div>
                <div className={`water-spread ${animationStarted ? 'animate-spread' : ''}`}></div>
            </div>

            <style jsx="true">{`
                .water-drop {
                    width: 20px;
                    height: 20px;
                    background: #3B82F6;
                    border-radius: 50%;
                    position: absolute;
                    top: -100px;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .water-drop.animate-drop {
                    animation: dropFall 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }

                .ripple-effect {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: transparent;
                    border: 2px solid #3B82F6;
                    border-radius: 50%;
                    opacity: 0;
                }

                .ripple-effect.animate-ripple {
                    animation: ripple 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }

                .water-spread {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    width: 300vmax;
                    height: 300vmax;
                    background: #3B82F6;
                    border-radius: 50%;
                    opacity: 0;
                }

                .water-spread.animate-spread {
                    animation: spread 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
                }

                @keyframes dropFall {
                    0% {
                        top: -100px;
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        top: 0;
                        opacity: 1;
                    }
                }

                @keyframes ripple {
                    0% {
                        width: 20px;
                        height: 20px;
                        opacity: 1;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }

                @keyframes spread {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0;
                    }
                }

                .delay-150 {
                    animation-delay: 0.15s;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                }
            `}</style>
        </div>
    );
}