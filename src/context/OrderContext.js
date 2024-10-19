import React, { createContext, useContext, useState } from "react";

// Create the OrderContext
const OrderContext = createContext();

// Create the OrderProvider
export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null); // State to hold order data

  // Function to set order data
  const setOrderData = (data) => {
    setOrder(data);
  };

  return (
    <OrderContext.Provider value={{ order, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to consume the context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
