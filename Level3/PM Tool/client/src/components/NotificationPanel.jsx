import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const data = [
  // Sample notification data
];

const ICONS = {
  alert: <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />,
  message: <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />,
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const readHandler = (id) => {
    // Mark the notification as read
    // Implement your logic to update the notification state here
  };

  const viewHandler = (item) => {
    // Implement view notification logic here
    readHandler(item._id);
    setSelected(item);
    setOpen(false); // Optionally close the popover after viewing
  };

  const callsToAction = [
    {
      name: "Mark All Read",
      onClick: () => {
        // Logic to mark all notifications as read
        data.forEach((item) => readHandler(item._id));
      },
    },
  ];

  return (
    <Popover className='relative'>
      <Popover.Button className='inline-flex items-center outline-none' aria-label="Notifications">
        <div className='w-8 h-8 flex items-center justify-center text-gray-800 relative'>
          <IoIosNotificationsOutline className='text-2xl' />
          {data.length > 0 && (
            <span className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
              {data.length}
            </span>
          )}
        </div>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-md px-4'>
          {({ close }) => (
            <div className='w-full flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
              <div className='p-4'>
                {data.length > 0 ? (
                  data.slice(0, 5).map((item) => (
                    <div
                      key={item._id}
                      className={`group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50 ${item.isRead ? "bg-gray-100" : ""}`}
                      onClick={() => viewHandler(item)} // Mark as read on click
                    >
                      <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                        {ICONS[item.notiType]}
                      </div>
                      <div>
                        <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                          <p>{item.notiType}</p>
                          <span className='text-xs font-normal lowercase'>
                            {moment(item.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className='line-clamp-1 mt-1 text-gray-600'>{item.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='p-4 text-center text-gray-500'>No notifications</p>
                )}
              </div>

              <div className='grid grid-cols-1 divide-y bg-gray-50'>
                {callsToAction.map((item) => (
                  <Link
                    key={item.name}
                    onClick={item.onClick ? () => item.onClick() : close}
                    className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NotificationPanel;
