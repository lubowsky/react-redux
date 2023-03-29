import Cookies from 'js-cookie';


const SetCookie = (cookiename, posts) => {
  Cookies.set(cookiename, JSON.stringify(posts), {
    expires: 1,
    secure: true,
    sameSite: 'strict',
    path: '/'
  });
};

export default SetCookie;
