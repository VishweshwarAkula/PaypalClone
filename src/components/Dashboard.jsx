import { Heading } from "./Heading";
import { Info } from "./Info";
import { Topbar } from "./Topbar";
import supabase from '../supabase-client'
import React, { useState, useEffect } from 'react';
import { Loading } from "./Loading";

export function Dashboard({ userBalance, session, logout }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select("*")
                .neq('email', session.user.email);

            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setUsers(data);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [session.user.email]);

    const handlePaymentComplete = async () => {
        setRefreshing(true);
        // Wait for a short delay to ensure the database updates are complete
        await new Promise(resolve => setTimeout(resolve, 500));
        window.location.reload();
    };

    if (loading || refreshing) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Topbar logout={logout} />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome, {session.user.user_metadata.username || 'User'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage your payments and transfers
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Available Balance
                        </div>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-500">
                            ₹{userBalance}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                        Send Money
                    </h2>
                    <Info 
                        array={users} 
                        session={session} 
                        userBalance={userBalance}
                        onPaymentComplete={handlePaymentComplete}
                    />
                </div>
            </div>
        </div>
    );
}