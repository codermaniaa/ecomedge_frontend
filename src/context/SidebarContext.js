import useNotification from "@hooks/useNotification";
import React, { useState, useMemo, createContext } from "react";

// create context
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [askForPriceProduct, useAskForPriceProduct] = useState("");
  // console.log('askForPriceProduct side',askForPriceProduct);


  const { socket } = useNotification();

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);
  const closeCartDrawer = () => setCartDrawerOpen(false);
  const toggleNotificationDrawer = () => setNotificationDrawerOpen(!notificationDrawerOpen);
  const closeNotificationDrawer = () => setNotificationDrawerOpen(false);

  const toggleCategoryDrawer = () => setCategoryDrawerOpen(!categoryDrawerOpen);
  const closeCategoryDrawer = () => setCategoryDrawerOpen(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };

  const value = useMemo(
    () => ({
      cartDrawerOpen,
      toggleCartDrawer,
      closeCartDrawer,
      setCartDrawerOpen,
      categoryDrawerOpen,
      toggleCategoryDrawer,
      closeCategoryDrawer,
      isModalOpen,
      toggleModal,
      closeModal,
      currentPage,
      setCurrentPage,
      handleChangePage,
      isLoading,
      setIsLoading,
      askForPriceProduct,
      useAskForPriceProduct,
    //  notification
      notificationDrawerOpen,
      setNotificationDrawerOpen,
      toggleNotificationDrawer,
      closeNotificationDrawer,
    }),

    [cartDrawerOpen,notificationDrawerOpen, categoryDrawerOpen, isModalOpen, currentPage, isLoading,askForPriceProduct]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
