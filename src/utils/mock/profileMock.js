import uuid from 'uuid/v4';
import mock from '../mock';
import mockArticles from './articlesMock';


const connectionsList = [
  {
    id: uuid(),
    name: 'Ekaterina Tankova',
    avatar: '/images/avatars/avatar_2.png',
    common: 12,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Cao Yu',
    avatar: '/images/avatars/avatar_3.png',
    common: 10,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Alexa Richardson',
    avatar: '/images/avatars/avatar_4.png',
    common: 8,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Adam Denisov',
    avatar: '/images/avatars/avatar_7.png',
    common: 5,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Ava Gregoraci',
    avatar: '/images/avatars/avatar_8.png',
    common: 1,
    status: 'connected'
  },{
    id: uuid(),
    name: 'Ekaterina Tankova',
    avatar: '/images/avatars/avatar_1.png',
    common: 12,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Cao Yu',
    avatar: '/images/avatars/avatar_5.png',
    common: 10,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Alexa Richardson',
    avatar: '/images/avatars/avatar_6.png',
    common: 8,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Adam Denisov',
    avatar: '/images/avatars/avatar_9.png',
    common: 5,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Ava Gregoraci',
    avatar: '/images/avatars/avatar_10.png',
    common: 1,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Alexa Richardson',
    avatar: '/images/avatars/avatar_11.png',
    common: 8,
    status: 'connected'
  },
  {
    id: uuid(),
    name: 'Adam Denisov',
    avatar: '/images/avatars/avatar_12.png',
    common: 5,
    status: 'connected'
  }
];

let userCredentials = {
  website: "https://stabja.github.io",
  fullName: "Swetabja Hazra",
  email: "13stabjahazra@gmail.com",
  followerCount: 85,
  location: "San Francisco, California",
  followingCount: 57,
  handle: "stabja200",
  postCount: 49,
  imageUrl: "/images/avatars/avatar_4.png",
  coverUrl: "/images/covers/cover_2.jpg",
  createdAt: "2019-11-21T03:19:49.567Z",
  userId: "iCWSDzCGR1h04UnLMyzNfJMfUjE2",
  bio: "Software Engineer at Google"
};

mock.onGet('/api/user/1/profile').reply(200, {
  user: userCredentials,
  screams: mockArticles,
  likedScreams: mockArticles,
  connections: connectionsList,
  connection: {
    id: "zxlt6f78fv6cdxc23c4p",
    sender: "0PkEiY7drgqJIvYGSv4U",
    receiver: null,
    connected: true,
    status: 'Connected',
    createdAt: "2019-11-21T03:19:49.567Z",
  }
});

mock.onGet('/api/user/1/feed-articles').reply(200, {
  feedArticles: mockArticles
});

mock.onGet('/api/user/1/liked-articles').reply(200, {
  likedArticles: mockArticles
});

mock.onGet('/api/user/1/connections').reply(200, {
  connections: connectionsList
});
