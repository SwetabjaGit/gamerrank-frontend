import uuid from 'uuid/v4';
import moment from 'moment';

import mock from '../mock';


mock.onGet('/api/social-feed').reply(200, {
  collection: [
    {
      screamId: "QMIL4SgGpIGkKz0RNRhv",
      userHandle: 'Francisco Gibbs',
      userImage: '/images/avatars/avatar_13.png',
      body: 'Some of the best picturesque description of NITR. It has  been a half long decade time  over this place and these and many others shall remain etched forever as a part of some of the best lived times',
      contentImage: '/images/posts/post_3.png',
      liked: true,
      likeCount: 25,
      commentCount: 3,
      createdAt: moment().subtract(16, 'minutes'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "QMIL4SgGpIGkKz0RNRhv",
          userHandle: 'Shen Zhi',
          imageUrl: '/images/avatars/avatar_11.png',
          body: 'React is the best and most popular framework till date. No one can beat it.',
          createdAt: moment().subtract(15, 'hours')
        },
        {
          id: uuid(),
          screamId: "QMIL4SgGpIGkKz0RNRhv",
          userHandle: 'Tyler Anderson',
          imageUrl: '/images/avatars/avatar_4.png',
          body: 'Vue is a new baby',
          createdAt: moment().subtract(8, 'hours')
        },
        {
          id: uuid(),
          screamId: "QMIL4SgGpIGkKz0RNRhv",
          userHandle: 'Merrile Burgett',
          imageUrl: '/images/avatars/avatar_12.png',
          body: 'I\'ve been using Angular for the past 3 years',
          created_at: moment().subtract(3, 'hours')
        }
      ],
      
    },
    {
      screamId: "KNJkcOqUJbWK80VBQkpP",
      userHandle: 'Essie Bates',
      userImage: '/images/avatars/avatar_22.png',
      body: 'Richard Bass - Wonderful Days(Original Mix)[Progressive House Worldwide]',
      contentImage: '/images/posts/post_1.jpg',
      liked: true,
      likeCount: 16,
      commentCount: 3,
      createdAt: moment().subtract(16, 'minutes'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "KNJkcOqUJbWK80VBQkpP",
          userHandle: 'Merrile Burgett',
          imageUrl: '/images/avatars/avatar_2.png',
          body: 'I\'ve been using Angular for the past 3 years',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "KNJkcOqUJbWK80VBQkpP",
          userHandle: 'Shen Zhi',
          imageUrl: '/images/avatars/avatar_3.png',
          body: 'React is the best and most popular framework till date. No one can beat it.',
          createdAt: moment().subtract(15, 'hours')
        },
        {
          id: uuid(),
          screamId: "KNJkcOqUJbWK80VBQkpP",
          userHandle: 'Tyler Anderson',
          imageUrl: '/images/avatars/avatar_4.png',
          body: 'Vue is a new baby',
          createdAt: moment().subtract(8, 'hours')
        },
      ],
    },
    {
      screamId: "xAlJtYYZkty4iSiIh5Gc",
      userHandle: 'Louis Patrick',
      userImage: '/images/avatars/avatar_15.png',
      body: 'Sidesmokers - No More (Mango & Shoreliners Remix) [Enormous Tunes]',
      contentImage: '/images/posts/post_24.jpg',
      liked: true,
      likeCount: 25,
      commentCount: 3,
      createdAt: moment().subtract(16, 'minutes'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "xAlJtYYZkty4iSiIh5Gc",
          userHandle: 'Anje Keizer',
          imageUrl: '/images/avatars/avatar_5.png',
          body: 'React is the best and most popular framework till date. No one can beat it.',
          createdAt: moment().subtract(15, 'hours')
        },
        {
          id: uuid(),
          screamId: "xAlJtYYZkty4iSiIh5Gc",
          userHandle: 'Ava Gregoraci',
          imageUrl: '/images/avatars/avatar_6.png',
          body: 'I\'ve been using Angular for the past 3 years',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "xAlJtYYZkty4iSiIh5Gc",
          userHandle: 'Roger Mannekinn',
          imageUrl: '/images/avatars/avatar_7.png',
          body: 'Vue is a new baby',
          createdAt: moment().subtract(8, 'hours')
        },
      ],
    },
    {
      screamId: "idkYDHhVPLRHxtSYcdSS",
      userHandle: 'Kwak Seong-Min',
      userImage: '/images/avatars/avatar_10.png',
      body: 'Mongodb Express React Node. Add redux to react and materialUI for UI',
      contentImage: '/images/posts/post_28.jpg',
      liked: true,
      likeCount: 13,
      commentCount: 5,
      createdAt: moment().subtract(16, 'minutes'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "idkYDHhVPLRHxtSYcdSS",
          userHandle: 'Francisco Gibbs',
          imageUrl: '/images/avatars/avatar_13.png',
          body: 'Deno is coming.',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "idkYDHhVPLRHxtSYcdSS",
          userHandle: 'Della Garrett',
          imageUrl: '/images/avatars/avatar_14.png',
          body: 'React is the best and most popular framework till date. No one can beat it.',
          createdAt: moment().subtract(15, 'hours')
        },
        {
          id: uuid(),
          screamId: "idkYDHhVPLRHxtSYcdSS",
          userHandle: 'Essie Bates',
          imageUrl: '/images/avatars/avatar_22.png',
          body: 'Nodejs is probably the best backend framework.',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "idkYDHhVPLRHxtSYcdSS",
          userHandle: 'Maude Valdez',
          imageUrl: '/images/avatars/avatar_16.png',
          body: 'Vue is a new baby',
          createdAt: moment().subtract(8, 'hours')
        },
        {
          id: uuid(),
          screamId: "idkYDHhVPLRHxtSYcdSS",
          userHandle: 'Roger Mannekin',
          imageUrl: '/images/avatars/avatar_23.png',
          body: 'Lets talk about backend frameworks.',
          createdAt: moment().subtract(8, 'hours')
        },
      ],
    },
    {
      screamId: "9gymJGgDhhrKLj7YmnkH",
      userHandle: 'Lester Berry',
      userImage: '/images/avatars/avatar_16.png',
      body: 'As a human being, you are designed in a way that makes you incapable of experiencing any positive emotion unless you set an aim and progress towards it. What makes you happy is not, in fact, attaining it, but making progress towards it.',
      contentImage: '/images/posts/post_29.jpg',
      liked: true,
      likeCount: 39,
      commentCount: 4,
      createdAt: moment().subtract(16, 'minutes'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "9gymJGgDhhrKLj7YmnkH",
          userHandle: 'Peter Gregory',
          imageUrl: '/images/avatars/avatar_31.png',
          body: 'I\'m more of an old schooler with ember',
          createdAt: moment().subtract(21, 'hours')
        },
        {
          id: uuid(),
          screamId: "9gymJGgDhhrKLj7YmnkH",
          userHandle: 'Erlich Bachman',
          imageUrl: '/images/avatars/avatar_32.png',
          body: 'React is the best and most popular framework till date. No one can beat it.',
          createdAt: moment().subtract(15, 'hours')
        },
        {
          id: uuid(),
          screamId: "9gymJGgDhhrKLj7YmnkH",
          userHandle: 'Jared Dunn',
          imageUrl: '/images/avatars/avatar_33.png',
          body: 'I\'ve been using Angular for the past 3 years',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "9gymJGgDhhrKLj7YmnkH",
          userHandle: 'Richard Hendricks',
          imageUrl: '/images/avatars/avatar_34.png',
          body: 'Vue is a new baby',
          createdAt: moment().subtract(8, 'hours')
        },
      ],
    },
    {
      screamId: "bgRFdsOvMNxWZubSffqJ",
      userHandle: 'Cynthia Copeland',
      userImage: '/images/avatars/avatar_18.png',
      body: 'Nora En Pure - You Make Me Float (Dinka Remix) Enormous Tunes',
      contentImage: '/images/posts/post_30.jpg',
      liked: true,
      likeCount: 9,
      commentCount: 3,
      createdAt: moment().subtract(16, 'minutes'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "bgRFdsOvMNxWZubSffqJ",
          userHandle: 'Essie Bates',
          imageUrl: '/images/avatars/avatar_23.png',
          body: 'Nodejs is probably the best backend framework.',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "bgRFdsOvMNxWZubSffqJ",
          userHandle: 'Francisco Gibbs',
          imageUrl: '/images/avatars/avatar_22.png',
          body: 'React is the best and most popular framework till date. No one can beat it.',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "bgRFdsOvMNxWZubSffqJ",
          userHandle: 'Della Garrett',
          imageUrl: '/images/avatars/avatar_20.png',
          body: 'Deno is coming.',
          createdAt: moment().subtract(15, 'hours')
        },
      ],
    },
    {
      screamId: "IH63emI1yCfc2wt12mt6",
      userHandle: 'Essie Bates',
      userImage: '/images/avatars/avatar_22.png',
      body: 'Keisuke Hara & Keisuke Kimura - Kisaragi (Keisuke Kimura Mix) [Progressive House Worldwide]',
      contentImage: '/images/posts/post_31.jpg',
      liked: true,
      likeCount: 19,
      commentCount: 3,
      createdAt: moment().subtract(16, 'minutes'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "IH63emI1yCfc2wt12mt6",
          userHandle: 'Eula Osborne',
          imageUrl: '/images/avatars/avatar_27.png',
          body: 'Deno is coming.',
          createdAt: moment().subtract(15, 'hours')
        },
        {
          id: uuid(),
          screamId: "IH63emI1yCfc2wt12mt6",
          userHandle: 'Francisco Gibbs',
          imageUrl: '/images/avatars/avatar_26.png',
          body: 'React is the best and most popular framework till date. No one can beat it.',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "IH63emI1yCfc2wt12mt6",
          userHandle: 'Lester Berry',
          imageUrl: '/images/avatars/avatar_28.png',
          body: 'Nodejs is probably the best backend framework.',
          createdAt: moment().subtract(3, 'hours')
        },
      ],
    },
    {
      screamId: "S1rYYa5Z2xTSgF5mi77N",
      userHandle: 'Francisco Weber',
      userImage: '/images/avatars/avatar_20.png',
      body: 'Just made this home screen for a project, what-cha thinkin?',
      contentImage: '/images/posts/post_2.jpg',
      liked: true,
      likeCount: 24,
      commentCount: 2,
      createdAt: moment().subtract(4, 'hours'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "S1rYYa5Z2xTSgF5mi77N",
          userHandle: 'Anje Keizer',
          imageUrl: '/images/avatars/avatar_5.png',
          body: 'Could use some more statistics, but that’s me haha',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "S1rYYa5Z2xTSgF5mi77N",
          userHandle: 'Ava Gregoraci',
          imageUrl: '/images/avatars/avatar_8.png',
          body: 'Hmm, honestly this looks nice but I would change the shadow though',
          createdAt: moment().subtract(2, 'hours')
        }
      ],
    },
    {
      screamId: "LpefA9QvU1Gx6C6qwz1l",
      userHandle: 'Eula Osborne',
      userImage: '/images/avatars/avatar_21.png',
      body: 'As a human being, you are designed in a way that makes you incapable of experiencing any positive emotion unless you set an aim and progress towards it. What makes you happy is not, in fact, attaining it, but making progress towards it.',
      contentImage: '/images/posts/post_24.jpg',
      liked: false,
      likeCount: 65,
      commentCount: 3,
      createdAt: moment().subtract(7, 'hours'),
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
      comments: [
        {
          id: uuid(),
          screamId: "LpefA9QvU1Gx6C6qwz1l",
          userHandle: 'Sadie Dawson',
          imageUrl: '/images/avatars/avatar_22.png',
          body: 'Deno is Coming!!!',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "LpefA9QvU1Gx6C6qwz1l",
          userHandle: 'Clarke Gillebert',
          imageUrl: '/images/avatars/avatar_13.png',
          body: 'That’s actually deep. Thanks for the design, would you consider making an interaction?',
          createdAt: moment().subtract(3, 'hours')
        },
        {
          id: uuid(),
          screamId: "LpefA9QvU1Gx6C6qwz1l",
          userHandle: 'Alexa Richardson',
          imageUrl: '/images/avatars/avatar_36.png',
          body: 'Oh... so sentimental',
          createdAt: moment().subtract(2, 'hours')
        }
      ],
    }
  ]
});
