export default {
  sSize: '1rem',
  mSize: '2rem',
  lSize: '3rem',
  xlSize: '4rem',
  overlayBackground: (overlay, imageUrl) => {
    return `background-image: linear-gradient(0deg, rgba(0,0,0,${overlay}), rgba(0,0,0,${overlay}))${imageUrl ? ', url(' + imageUrl + ')' : ''}`;
  }
}
