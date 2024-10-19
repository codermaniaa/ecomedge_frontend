import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Drawer from 'rc-drawer';

//internal import
import { SidebarContext } from '@context/SidebarContext';
import NotificationSidebar from '@component/notification/NotificationSidebar';

const NotificationDrawer = () => {
  const { notificationDrawerOpen, closeNotificationDrawer } = useContext(SidebarContext);

  return (
    <Drawer
      open={notificationDrawerOpen}
      onClose={closeNotificationDrawer}
      parent={null}
      level={null}
      placement={'right'}
    >
      <NotificationSidebar />
    </Drawer>
  );
};
  export default dynamic(() => Promise.resolve(NotificationDrawer), { ssr: false });
