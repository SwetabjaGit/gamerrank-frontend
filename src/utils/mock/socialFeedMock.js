import mock from '../mock';
import mockArticles from './articlesMock';


mock.onGet('/api/social-feed').reply(200, {
  collection: mockArticles
});
