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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import StarBorder from '@material-ui/icons/StarBorder';


const DashboardRoutes = [
  {
    ready: true,
    sidebarItem: true,
    path: "/welcome",
    name: "Welcome",
    icon: LockOpenIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    path: "/home",
    name: "Home",
    icon: HomeIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    path: "/tracks",
    name: "Tracks",
    icon: DashboardIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    path: "/newarticle",
    name: "New Article",
    icon: ReceiptIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    name: "NYT Articles",
    icon: FolderIcon,
    children: [
      {
        ready: false,
        path: "/nyt/subects",
        name: "Subjects",
        icon: ErrorIcon,
      },
      {
        ready: false,
        path: '/nyt/newsdesks',
        name: "Newsdesks",
        icon: ListAltIcon,
      },
      {
        ready: false,
        path: "/nyt/persons",
        name: "Persons",
        icon: PeopleIcon,
      },
      {
        ready: false,
        path: "/nyt/keywords",
        name: "Keywords",
        icon: PresentToAllIcon,
      }
    ]
  },
  {
    ready: false,
    sidebarItem: true,
    path: "/article",
    name: "Article",
    icon: MailIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    path: '/chat',
    name: "Chats",
    icon: ChatIcon
  },
  {
    ready: false,
    sidebarItem: true,
    name: "Todo Items",
    icon: BarChartIcon,
    children: [
      {
        ready: false,
        path: "/bookmarks",
        name: "Bookmarks",
        icon: CodeIcon,
      },
      {
        ready: false,
        path: '/playlists',
        name: "PlayLists",
        icon: CalendarTodayIcon,
      },
      {
        ready: false,
        path: "/explore",
        name: "Explore",
        icon: ViewModuleIcon,
      }
    ]
  },
  {
    ready: false,
    sidebarItem: true,
    path: "/profile",
    name: "Profile",
    icon: PersonIcon,
  },
  {
    ready: true,
    sidebarItem: true,
    path: "/settings",
    name: "Settings",
    icon: SettingsIcon,
  },
];

export default DashboardRoutes;