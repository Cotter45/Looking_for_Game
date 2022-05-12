
function isProductionImage() {

  if (process.env.NODE_ENV === 'production') {
    return window.location.origin
  }

  return 'http://localhost:5000'
}

export default isProductionImage;