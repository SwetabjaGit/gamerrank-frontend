import mock from '../mock';

mock.onGet('/api/main/articles').reply(200, {
  articles: [
    {
      screamId: "QMIL4SgGpIGkKz0RNRhv",
      userHandle: "sourav.sahoo",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/13199256784.png?alt=media",
      body: "This is my second post. Enjoy!!!!..........",
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/48505419320.png?alt=media",
      likeCount: 1,
      commentCount: 0,
      createdAt: "2020-04-22T15:49:21.316Z",
      tagList: [
        "android",
        "ios",
        "react",
        "usa"
      ],
    },
    {
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/16517875691.jpg?alt=media",
      createdAt: "2020-04-10T17:12:36.214Z",
      userHandle: "pradhan.swagto",
      likeCount: 1,
      commentCount: 1,
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/16027391546.png?alt=media",
      body: "With query cursors in Cloud Firestore, you can split data returned by a query into batches according to the parameters you define in your query.",
      tagList: [
        "android",
        "ios",
        "react",
        "firebase",
        "pagination"
      ],
      screamId: "KNJkcOqUJbWK80VBQkpP"
    },
    {
      tagList: [
        "android",
        "ios",
        "react",
        "pubg"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/97914994509.jpg?alt=media",
      createdAt: "2020-04-09T16:46:24.525Z",
      userHandle: "khushboo8249",
      likeCount: 1,
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/87283967242.png?alt=media",
      body: "Join the millions who trust Challonge to manage their tournaments. More than 21,003,456 brackets created around the world.\n",
      commentCount: 0,
      screamId: "xAlJtYYZkty4iSiIh5Gc",
    },
    {
      createdAt: "2020-01-26T14:47:25.008Z",
      userHandle: "pradhan.swagto",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/16027391546.png?alt=media",
      likeCount: 0,
      body: "This is my first post",
      commentCount: 0,
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      screamId: "idkYDHhVPLRHxtSYcdSS"
    },
    {
      tagList: [
        "training",
        "esports",
        "butt",
        "sugar",
        "pubg"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2020-01-11T14:27:27.273Z",
      userHandle: "salilhazra",
      likeCount: 5,
      commentCount: 6,
      body: "Phew, the app is finally deployed!!!",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/48420153616.jpg?alt=media",
      screamId: "9gymJGgDhhrKLj7YmnkH"
    },
    {
      tagList: [
        "gaming",
        "singapore",
        "happiness",
        "money",
        "esports",
        "cars"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-20T09:44:08.025Z",
      userHandle: "stabja200",
      likeCount: 2,
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/82826285219.jpg?alt=media",
      body: "Money Happiness Equation.",
      commentCount: 4,
      screamId: "bgRFdsOvMNxWZubSffqJ"
    },
    {
      tagList: [
        "cryptocurrency",
        "tourism",
        "cars",
        "butt"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-20T09:21:24.342Z",
      userHandle: "stabja100",
      likeCount: 3,
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/58734003414.jpg?alt=media",
      body: "What is the status of GamerRank ???. Is it ever gonna finish ???. Is there a timeline of completion ????",
      commentCount: 3,
      screamId: "IH63emI1yCfc2wt12mt6"
    },
    {
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-15T05:15:47.501Z",
      userHandle: "sourav.sahoo",
      likeCount: 1,
      commentCount: 4,
      body: "Mera kuch nahi hoga. Mera future bleak hai.",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/13199256784.png?alt=media",
      tagList: [
        "money",
        "butt",
        "happiness",
        "sushi",
        "happiness",
        "datascience"
      ],
      screamId: "S1rYYa5Z2xTSgF5mi77N"
    },
    {
      tagList: [
        "cookies",
        "esports",
        "sugar",
        "japan"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-15T05:10:23.428Z",
      userHandle: "stabja100",
      commentCount: 2,
      likeCount: 1,
      body: "This is for testing the working of PostScream Feature",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/58734003414.jpg?alt=media",
      screamId: "LpefA9QvU1Gx6C6qwz1l"
    },
    {
      tagList: [
        "cryptocurrency",
        "clean",
        "porsche",
        "tourism",
        "money",
        "pubg"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-03T00:21:50.405Z",
      userHandle: "khushboo8249",
      likeCount: 3,
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/87283967242.png?alt=media",
      body: "This is a test scream",
      commentCount: 2,
      screamId: "TmnAHk6P69BKJgL0xWgB"
    },
    {
      createdAt: "2019-12-02T12:25:59.819Z",
      userHandle: "tofiq.quadri",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/49169969070.png?alt=media",
      likeCount: 2,
      body: "That girl replies back to me.",
      commentCount: 2,
      tagList: [
        "gaming",
        "cookies",
        "datascience",
        "esports"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      screamId: "DgTfavyiKF200F1reUz9"
    },
    {
      userHandle: "tofiq.quadri",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/49169969070.png?alt=media",
      likeCount: 2,
      body: "Finally, I have started my own company.",
      commentCount: 6,
      tagList: [
        "happiness",
        "dragons",
        "training",
        "computerScience"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:23:34.957Z",
      screamId: "WMIv1BOWjBnVaRSpi4Qr"
    },
    {
      tagList: [
        "training",
        "cookies",
        "coffee",
        "datascience"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:21:48.731Z",
      userHandle: "sagarrajak858",
      likeCount: 2,
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/1754106780.jpg?alt=media",
      body: "TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript.",
      commentCount: 3,
      screamId: "Orwr8YSUO4vcnMuZaZ3M"
    },
    {
      tagList: [
        "sushi",
        "pubg",
        "esports",
        "butt",
        "butt",
        "gaming"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:21:04.372Z",
      userHandle: "sagarrajak858",
      likeCount: 2,
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/1754106780.jpg?alt=media",
      body: "JavaScript, often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification.",
      commentCount: 2,
      screamId: "waQ34F67GVXpQx3DrD9n"
    },
    {
      tagList: [
        "animation",
        "caramel",
        "money",
        "animation"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:17:28.597Z",
      userHandle: "stabja300",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/1403858426.jpg?alt=media",
      likeCount: 2,
      body: "The desire for data-science and machine learning (ML) skills will continue strongly into next year, according to developers surveyed by analyst firm SlashData.",
      commentCount: 2,
      screamId: "3ziF1FY9AEWaB4B856Uw"
    },
    {
      tagList: [
        "cookies",
        "computerScience",
        "tourism",
        "dragons"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:16:23.599Z",
      userHandle: "stabja300",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/1403858426.jpg?alt=media",
      likeCount: 1,
      body: "Data Science has garnered much attention from enterprises over the last few years as businesses need data to take and make effective business decisions. Applications in data science assist organizations to drive efficiency over customers’ engagement using scientific methods, algorithms and systems. Thus, the role of data scientists in companies is becoming more significant, making them big data wranglers and creating a new breed of analytical data experts.",
      commentCount: 1,
      screamId: "2jrAVRGafxpTbQ2zbQN6"
    },
    {
      tagList: [
        "esports",
        "computerScience",
        "esports",
        "pubg",
        "dragons"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:14:50.706Z",
      userHandle: "stabja300",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/1403858426.jpg?alt=media",
      likeCount: 1,
      body: "Data science is a multi-disciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.[1][2] Data science is related to data mining and big data.",
      commentCount: 3,
      screamId: "PtXmMMM1FhOM2qBgQJEr"
    },
    {
      tagList: [
        "happiness",
        "dragons",
        "singapore",
        "happiness"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:08:37.085Z",
      userHandle: "khushboo8249",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/87283967242.png?alt=media",
      likeCount: 1,
      body: "Meesho is in talks with Naspers for $120 million round",
      commentCount: 1,
      screamId: "JhG6gY0VxNkQKnJqgRLi"
    },
    {
      tagList: [
        "caramel",
        "animation",
        "gaming",
        "test"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:07:18.610Z",
      userHandle: "khushboo8249",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/87283967242.png?alt=media",
      likeCount: 1,
      body: "Bengaluru-based social commerce platform Meesho, which operates under its parent company Fashnear Technologies Private Limited has reported losses of Rs 100.42 crore for the fiscal year 2019. The company had reported a loss of Rs 4.9 crore in FY18.",
      commentCount: 2,
      screamId: "zs097RZKFQIt5etiK0xR"
    },
    {
      tagList: [
        "flowers",
        "training",
        "coffee",
        "gaming"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T12:00:38.360Z",
      userHandle: "stabja200",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/82826285219.jpg?alt=media",
      likeCount: 1,
      body: "The memo, sent by Google’s security and investigations team, told employees that the company had dismissed four employees for clear and repeated violations of our data security policies.",
      commentCount: 2,
      screamId: "WQAbZHFrAmR5bQq8bJ3s"
    },
    {
      tagList: [
        "singapore",
        "esports",
        "cryptocurrency",
        "dragons",
        "training",
        "pubg"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T11:57:46.196Z",
      userHandle: "stabja200",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/82826285219.jpg?alt=media",
      likeCount: 1,
      body: "The European Union investigators are conducting a preliminary investigation into Google’s data collection practices. This includes the data Google collects via search and its web services.",
      commentCount: 2,
      screamId: "ErO1aC7C6j9a4ZNR2oAE"
    },
    {
      tagList: [
        "test",
        "sushi",
        "cars",
        "tourism",
        "singapore"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T11:54:06.941Z",
      userHandle: "stabja100",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/58734003414.jpg?alt=media",
      likeCount: 1,
      body: "One Year of Spotify Premium Now at 50 Per Cent Discount. Here's How You Can Subscribe",
      commentCount: 1,
      screamId: "9pWfIxkzVojodmU0Rvco"
    },
    {
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T11:50:26.268Z",
      userHandle: "stabja100",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/58734003414.jpg?alt=media",
      likeCount: 1,
      body: "Spotify Technology S.A. is an international media services provider of Swedish origin. It is legally domiciled in Luxembourg and is headquartered in Stockholm, Sweden.",
      commentCount: 1,
      tagList: [
        "sugar",
        "gaming",
        "porsche",
        "pubg",
        "sushi"
      ],
      screamId: "uNXgTbW2ZulPLguVTyxG"
    },
    {
      tagList: [
        "training",
        "porsche",
        "computerScience",
        "cookies"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-12-02T11:46:50.494Z",
      userHandle: "stabja100",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/58734003414.jpg?alt=media",
      likeCount: 1,
      body: "What is the technology stack used by Spotify.",
      commentCount: 1,
      screamId: "zbed4u0zLYJL2K08Apbg"
    },
    {
      createdAt: "2019-12-01T05:52:38.338Z",
      userHandle: "13stabjahazra",
      commentCount: 3,
      likeCount: 1,
      body: "Hello World Android Program.",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/45383257464.jpg?alt=media&token=147abfb0-1349-4860-a58a-bd213219e699",
      tagList: [
        "training",
        "animation",
        "computerScience",
        "caramel",
        "coffee",
        "datascience"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      screamId: "pg91iTFr8mVZxWGlchzn"
    },
    {
      userHandle: "stabja200",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/82826285219.jpg?alt=media",
      likeCount: 2,
      body: "Lets continue this damn project.",
      commentCount: 2,
      tagList: [
        "money",
        "happiness",
        "butt",
        "clean"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-11-25T00:56:54.000Z",
      screamId: "egzkiU1qDIAJ6yh37h68"
    },
    {
      tagList: [
        "animation",
        "flowers",
        "cars",
        "datascience",
        "sugar"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-11-22T01:50:57.700Z",
      userHandle: "sagarrajak858",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/1754106780.jpg?alt=media",
      likeCount: 1,
      body: "I got freed from a massive depression today.",
      commentCount: 1,
      screamId: "mbPe7ochIL0IN68yWXfk"
    },
    {
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-11-21T22:10:25.353Z",
      userHandle: "13stabjahazra",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/45383257464.jpg?alt=media&token=147abfb0-1349-4860-a58a-bd213219e699",
      likeCount: 1,
      body: "Another Scream Submitted",
      commentCount: 2,
      tagList: [
        "cars",
        "sugar",
        "happiness",
        "cars"
      ],
      screamId: "SYLCTqtedzEqPwPcjsPU"
    },
    {
      tagList: [
        "flowers",
        "butt",
        "gaming",
        "animation"
      ],
      contentImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/51785643636.png?alt=media",
      createdAt: "2019-11-21T01:34:40.073Z",
      userHandle: "13stabjahazra",
      userImage: "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/45383257464.jpg?alt=media&token=147abfb0-1349-4860-a58a-bd213219e699",
      likeCount: 2,
      body: "I'm feeling awesome now",
      commentCount: 1,
      screamId: "txQdnV6rmmbhrWK7PXcx"
    }
  ]
})