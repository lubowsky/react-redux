import Cookies from 'js-cookie';


const SetCookie = (cookiename, data) => {
  Cookies.set(cookiename, JSON.stringify(data), {
    expires: 7,
    secure: true,
    sameSite: 'strict',
    path: '/'
  });
};

export default SetCookie;
