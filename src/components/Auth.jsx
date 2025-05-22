import supabase from "../supabase-client";
import { useState, useEffect } from 'react';
import { Login } from "./Login";
import { SignupForm } from "./SignUp";
import { Notification } from "./Notification";
import '../styles/notifications.css';

export function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [notifications, setNotifications] = useState([]);

    // Listen for auth state changes (including email verification)
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
                // User has confirmed their email, now create their profile
                const { error: profileError } = await supabase
                    .from('users')
                    .insert([
                        {
                            email: session.user.email,
                            username: session.user.user_metadata.username,
                            balance: 5000, // Initialize balance to 5000
                            created_at: new Date().toISOString()
                        }
                    ]);

                if (profileError) {
                    addNotification("Error creating user profile: " + profileError.message, "error");
                } else {
                    addNotification("Your account is now active with ₹5000 balance!", "success");
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const addNotification = (message, type) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignUp) {
                // Create the auth user with email verification
                const { data: authData, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            username: username // Store username in auth metadata
                        },
                        emailRedirectTo: window.location.origin // Redirect back to our app after verification
                    }
                });

                if (signUpError) {
                    throw new Error(signUpError.message);
                }

                addNotification("Account created! Please check your email to verify your account.", "success");
                addNotification("Once verified, you'll receive ₹5000 as welcome bonus!", "info");
                
                // Clear form
                setEmail('');
                setPassword('');
                setUsername('');
            } else {
                // Handle login
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (signInError) {
                    throw new Error(signInError.message);
                }

                addNotification("Logged in successfully!", "success");
            }
        } catch (err) {
            addNotification(err.message, "error");
            console.error("Auth error:", err.message);
        }
    };

    return (
        <>
            {notifications.map(({ id, message, type }) => (
                <Notification
                    key={id}
                    message={message}
                    type={type}
                    onClose={() => removeNotification(id)}
                />
            ))}
            {isSignUp ?
                <SignupForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    username={username}
                    setUsername={setUsername}
                    handleSubmit={handleSubmit}
                    setIsSignUp={setIsSignUp}
                /> :
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                    setIsSignUp={setIsSignUp}
                />
            }
        </>
    );
}
