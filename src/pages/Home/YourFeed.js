import React, { useEffect } from 'react';
import axios from 'axios';
//import ArticleItem from '../../components/ArticleItem';


const YourFeed = () => {

  //const [notifications, setNotifications] = useState(null);

  const fetchNotifications = () => {
    axios.get('/notifications')
      .then(res => {
        console.log(res.data);
        //setNotifications(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* const notificationsList = notifications ? (
    notifications.map(notification => <ArticleItem key={notification.nId} notification={notification} ></ArticleItem>)
  ) : <p>Loading...</p> */

  return (
    <div>
      <h1>This will be rendered soon.</h1>
    </div>
  );
};

export default YourFeed;