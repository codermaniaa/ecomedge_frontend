import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IoClose, IoBagHandle } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
//internal import
import LoginModal from "@component/modal/LoginModal";
import { UserContext } from "@context/UserContext";
import { SidebarContext } from "@context/SidebarContext";
import SettingServices from "@services/SettingServices";
import NotificationServices from "@services/NotificationServices"
import useAsync from "@hooks/useAsync";
// import useAsync from "@hooks/useAsync";

const NotificationSidebar = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const { closeNotificationDrawer } = useContext(SidebarContext);
    // const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
    const { data } = useAsync(NotificationServices.getAllNotification);
    const { state: { userInfo }, } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);

    console.log("notifications data", data);
    return (
        <>
            {modalOpen && (
                <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            )}
            <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded cursor-pointer">
                <div className="w-full flex justify-between items-center relative px-5 py-4 border-b bg-indigo-50 border-gray-100">
                    <h2 className="font-semibold font-serif text-lg m-0 text-heading flex items-center">
                        <span className="text-xl mr-2 mb-1">
                            <IoNotificationsOutline />
                        </span>
                        Notification
                    </h2>
                    <button
                        onClick={closeNotificationDrawer}
                        className="inline-flex text-base items-center justify-center text-gray-500 p-2 focus:outline-none transition-opacity hover:text-red-400"
                    >
                        <IoClose />
                        <span className="font-sens text-sm text-gray-500 hover:text-red-400 ml-1">
                            Close
                        </span>
                    </button>
                </div>

                {/* body */}
                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
                    {/* Render notifications here */}
                    {data?.notificationDetails?.map((notification, index) => (
                        <div key={notification.id} className=" ml-4 notification-item cursor-pointer hover:bg-green-200 hover:text-gray-800 transition-colors duration-300 ease-in-out mb-2 flex items-center">
                            <span className="mr-2">{index + 1}.</span>
                            <span className="flex-grow">{notification?.notification?.notification_body}</span>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default NotificationSidebar;
