import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../supabase-client';
import { Loading } from "./Loading";

export function PaymentPopup({ user, currentUserEmail, currentBalance, onClose, onPaymentComplete }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setIsOpen(true);
    }
  }, [user]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handlePayment = async () => {
    setError("");
    setIsLoading(true);
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setError("Please enter a valid amount");
      setIsLoading(false);
      return;
    }
    if (paymentAmount > currentBalance) {
      setError("Insufficient balance");
      setIsLoading(false);
      return;
    }

    try {
      const { error: senderError } = await supabase
        .from('users')
        .update({ balance: currentBalance - paymentAmount })
        .eq('email', currentUserEmail);
      if (senderError) throw new Error(senderError.message);
      const { data: recipientData, error: recipientFetchError } = await supabase
        .from('users')
        .select('balance')
        .eq('email', user.email)
        .single();

      if (recipientFetchError) throw new Error(recipientFetchError.message);
      const { error: recipientError } = await supabase
        .from('users')
        .update({ balance: recipientData.balance + paymentAmount })
        .eq('email', user.email);

      if (recipientError) throw new Error(recipientError.message);
      handleClose();
      onPaymentComplete();
      navigate('/home', { replace: true });
    } catch (err) {
      setError("Failed to process payment. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-xl transform transition-all relative"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg z-10">
                <div className="w-32 h-32">
                  <Loading fullScreen={false} />
                </div>
              </div>
            )}
            
            {/* User Avatar and Name */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                <span className="text-2xl font-medium text-blue-600 dark:text-blue-300">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Send money to {user.username}
              </h2>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  disabled={isLoading}
                  className="w-full pl-8 pr-4 py-3 text-2xl font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {error}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className={`flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Send Money
              </button>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className={`flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
