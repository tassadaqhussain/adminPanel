// import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineDocumentChartBar,

} from 'react-icons/hi2';
// import { IoSettingsOutline } from 'react-icons/io5';

export const menu = [
  {
    catalog: 'main',
    listItems: [
      {
        isLink: true,
        url: '/',
        icon: HiOutlineHome,
        label: 'homepage',
      },
      /*{
        isLink: true,
        url: '/profile',
        icon: HiOutlineUser,
        label: 'profile',
      },*/
    ],
  },
  {
    catalog: 'lists',
    listItems: [
      {
        isLink: true,
        url: '/users',
        icon: HiOutlineUsers,
        label: 'users',
      },
      {
        isLink: true,
        url: '/roles',
        icon: HiOutlineCube,
        label: 'roles',
      },
      {
        isLink: true,
        url: '/project-configurations',
        icon: HiOutlineCube,
        label: 'Project Configuration',
      },{
        isLink: true,
        url: '/manage-farms',
        icon: HiOutlineCube,
        label: 'Farm Management',
      },
      {
        isLink: true,
        url: '/investment-projects',
        icon: HiOutlineCube,
        label: 'Investment Projects',
      },
      {
        isLink: true,
        url: '/investor-accounts',
        icon: HiOutlineCube,
        label: 'Investor Accounts',
      },
      {
        isLink: true,
        url: '/transactions',
        icon: HiOutlineCube,
        label: 'Transactions',
      },
      {
        isLink: true,
        url: '/compliance-check',
        icon: HiOutlineCube,
        label:'Compliance Check',
      },
      {
        isLink: true,
        url: '/notifications-alerts',
        icon: HiOutlineCube,
        label:'Notifications & Alerts',
      },
      {
        isLink: true,
        url: '/helpdesk-support',
        icon: HiOutlineCube,
        label:'Helpdesk & Support',
      },
    ],
  },
  /* {
     catalog: 'general',
     listItems: [
       {
         isLink: true,
         url: '/notes',
         icon: HiOutlinePencilSquare,
         label: 'notes',
       },
       {
         isLink: true,
         url: '/calendar',
         icon: HiOutlineCalendarDays,
         label: 'calendar',
       },
     ],
   },
   /*{
     catalog: 'analytics',
     listItems: [
       {
         isLink: true,
         url: '/charts',
         icon: HiOutlinePresentationChartBar,
         label: 'charts',
       },
       {
         isLink: true,
         url: '/logs',
         icon: HiOutlineDocumentText,
         label: 'logs',
       },
     ],
   },*/
  /*{
    catalog: 'miscellaneous',
    listItems: [
      // {
      //   isLink: true,
      //   url: '/settings',
      //   icon: IoSettingsOutline,
      //   label: 'settings',
      // },
      {
        isLink: true,
        url: '/login',
        icon: HiOutlineArrowLeftOnRectangle,
        label: 'log out',
      },
    ],
  },*/
];
