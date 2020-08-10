import uuid from 'uuid/v4';
import moment from 'moment';
import mock from '../mock';

const credentials = {
  imageUrl: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/87283967242.png?alt=media",
  postCount: 49,
  createdAt: "2019-11-22T01:59:44.213Z",
  userId: "mZ8Sx9Cc3xaYhcBf2jJRYLE0Ys52",
  bio: "I'm a Bitch Lasagnya",
  website: "http://magi.bitch.com",
  email: "khushboo8249@gmail.com",
  followerCount: 325,
  location: "Phatkagawa, Patna",
  followingCount: 211,
  handle: "khushboo8249"
};

const likes = [
  {
    screamId: "PtXmMMM1FhOM2qBgQJEr",
    userHandle: "khushboo8249"
  },
  {
    screamId: "ODxvVFBqeCaT41hRiyOS",
    userHandle: "khushboo8249"
  },
  {
    screamId: "3ziF1FY9AEWaB4B856Uw",
    userHandle: "khushboo8249"
  },
  {
    screamId: "WMIv1BOWjBnVaRSpi4Qr",
    userHandle: "khushboo8249"
  },
  {
    userHandle: "khushboo8249",
    screamId: "lFdmlGMmf0Ka1dNBBaMV"
  }
];

const followers = [
  {
    sender: "khushboo8249",
    receiver: "stabja200",
    connected: true,
    status: 'Connected',
    connectionId: "0PkEiY7drgqJIvYGSv4U"
  },
  {
    sender: "khushboo8249",
    receiver: "13stabjahazra",
    connected: false,
    status: 'Pending',
    connectionId: "H0zPtUbpMCXsNV45vdWB"
  },
  {
    sender: "tofiq.quadri",
    receiver: "khushboo8249",
    connected: true,
    status: 'Connected',
    connectionId: "4g5wlx5mxvTPlrRNT5SO"
  },
  {
    sender: "stabja300",
    receiver: "khushboo8249",
    connected: false,
    status: 'Pending',
    connectionId: "9G7HfmQwZrrUiqzdicB2"
  },
  {
    sender: "sagarrajak858",
    receiver: "khushboo8249",
    connected: false,
    status: 'Disconnected',
    connectionId: "TIWcfh5EfvoxieP6LAXs"
  }
];

const notifications = [
  {
    type: "like",
    read: false,
    sender: "sagarrajak858",
    recipient: "khushboo8249",
    screamId: "xAlJtYYZkty4iSiIh5Gc",
    createdAt: "2020-06-11T17:13:38.668Z",
    notificationId: "AtPUAMYiwX6ukvb3uPUR"
  },
  {
    createdAt: "2020-04-29T00:14:40.450Z",
    type: "like",
    read: false,
    sender: "pradhan.swagto",
    recipient: "khushboo8249",
    screamId: "TmnAHk6P69BKJgL0xWgB",
    notificationId: "RLl1eKemy2fbygT1Fkbi"
  },
  {
    type: "like",
    read: false,
    sender: "pradhan.swagto",
    recipient: "khushboo8249",
    screamId: "xAlJtYYZkty4iSiIh5Gc",
    createdAt: "2020-04-29T00:13:58.276Z",
    notificationId: "cywz0Mmg079oZtvggcqZ"
  },
  {
    type: "comment",
    read: false,
    sender: "stabja100",
    recipient: "khushboo8249",
    screamId: "zs097RZKFQIt5etiK0xR",
    createdAt: "2020-01-09T15:56:55.576Z",
    notificationId: "BGYFXJUA3g7zYiiigUd6"
  }
];


mock.onGet('/api/auth/user').reply(200, {
  credentials,
  likes,
  followers,
  notifications, 
});