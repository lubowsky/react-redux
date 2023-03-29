import moment from 'moment';


export const unixTimeStampToDate = (uts, format, timeZone = null) => {
  const date = moment(uts);
  if (timeZone) {
    date.utcOffset(timeZone);
  }

  return date.format(format);
};
