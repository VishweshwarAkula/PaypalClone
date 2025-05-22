import { useState } from "react";
import { PaymentPopup } from "./PaymentPage";

export function Info({ array = [], session, userBalance, onPaymentComplete }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {array.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-xl font-medium text-blue-600 dark:text-blue-300">
                  {item.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.username}
                </h3>
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(item)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
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
          </div>
        ))}
      </div>

      {selectedUser && (
        <PaymentPopup
          user={selectedUser}
          currentUserEmail={session.user.email}
          currentBalance={userBalance}
          onClose={() => setSelectedUser(null)}
          onPaymentComplete={onPaymentComplete}
        />
      )}
    </div>
  );
}
