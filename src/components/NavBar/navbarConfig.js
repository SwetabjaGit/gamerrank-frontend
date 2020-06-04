// Icons
import BarChartIcon from '@material-ui/icons/BarChart';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
/* import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import StarBorder from '@material-ui/icons/StarBorder'; */


const DashboardRoutes = [
  {
    ready: true,
    sidebarItem: true,
    title: "Welcome",
    href: "/welcome",
    icon: LockOpenIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    title: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    title: "Tracks",
    href: "/tracks",
    icon: DashboardIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    title: "New Article",
    href: "/newarticle",
    icon: ReceiptIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    title: "NYT Articles",
    href: '/nyt',
    icon: FolderIcon,
    children: [
      {
        ready: false,
  
        title: "Subjects",
        href: "/nyt/subects",
        icon: ErrorIcon,
      },
      {
        ready: false,
  
        title: "Newsdesks",
        href: '/nyt/newsdesks',
        icon: ListAltIcon,
      },
      {
        ready: false,
  
        title: "Persons",
        href: "/nyt/persons",
        icon: PeopleIcon,
      },
      {
        ready: false,
  
        title: "Keywords",
        href: "/nyt/keywords",
        icon: PresentToAllIcon,
      }
    ]
  },
  {
    ready: false,
    sidebarItem: true,
    title: "Article",
    href: "/article",
    icon: MailIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    title: "Chats",
    href: '/chat',
    icon: ChatIcon
  },
  {
    ready: false,
    sidebarItem: true,
    title: "Todo Items",
    href: '/todo',
    icon: BarChartIcon,
    children: [
      {
        ready: false,
  
        title: "Bookmarks",
        href: "/todo/bookmarks",
        icon: CodeIcon,
      },
      {
        ready: false,
  
        title: "PlayLists",
        href: '/todo/playlists',
        icon: CalendarTodayIcon,
      },
      {
        ready: false,
  
        title: "Explore",
        href: "/todo/explore",
        icon: ViewModuleIcon,
      }
    ]
  },
  {
    ready: false,
    sidebarItem: true,
    title: "Profile",
    href: "/profile",
    icon: PersonIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];

export default DashboardRoutes;