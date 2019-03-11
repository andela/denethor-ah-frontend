export const extractImageFromBody = (body) => {
  let start = `<img src='`;
  let startIndex = body.indexOf(start) + start.length;
    let endIndex = body.indexOf(`'`, startIndex);
    const imageUrlFormatted = body.substr(startIndex,endIndex - startIndex);
  return imageUrlFormatted;
}