import moment from "moment-timezone";

const handlerCurrentDate = (
  date?: string | Date | undefined,
  format: string | undefined = 'YYYY-MM-DD HH:mm:ss',
  timezone: string | undefined = 'UTC') => {
  try {
    return date ? moment(date).tz(timezone).format(format) :
      moment().tz(timezone).format(format)
  } catch (error) {
    throw new Error('Could not format date')
  }
}

export default handlerCurrentDate