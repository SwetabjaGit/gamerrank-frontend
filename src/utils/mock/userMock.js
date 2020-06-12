import uuid from 'uuid/v4';
import moment from 'moment';
import { colors } from '@material-ui/core';

import mock from '../mock';


mock.onGet('/api/users/1/connections').reply(200, {
  connections: [
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
  ]
});
