import validator from 'validator';

export const extractImageFromBody = (body) => {
  body = validator.unescape(body);
  /**
   * the img tag can be structured as <img src="" /> ie using double quotes
   * or could be structured as <img src='' /> ie using double quotes
   * So, we determine whether to use double or single quotes in the algorithm
   */
  const quotationSymbol = body.indexOf('<img src="') !== -1 ? '"' : "'";
  let start = `<img src=${quotationSymbol}`;
  let startIndex = body.indexOf(start) + start.length;
	let endIndex = body.indexOf(`${quotationSymbol}`, startIndex);
  const imageUrlFormatted = body.substr(startIndex,endIndex - startIndex);
  return imageUrlFormatted;
}

export default extractImageFromBody;