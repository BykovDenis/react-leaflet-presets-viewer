/**
 * Created by Denis on 13.03.2017.
 */
/*eslint-disable */
export const ping = store => next => action => {
  console.log('ping')
  return next(action)
}
/*eslint-enable */
