const darkStyle = 'mapbox://styles/mapbox/dark-v9';
const steetStyle = 'mapbox://styles/mapbox/streets-v10';



mapboxgl.accessToken = 'pk.eyJ1IjoibHl2d2h5ciIsImEiOiJjaWVnYmFvbnMwMDFjczNtMWx3aTl2ZGFmIn0.VPXiN_gz9s_P1Tx1SvqIIw';

var map = new mapboxgl.Map({
  container: 'map',
  style: warGamesSytle
});


navigator.geolocation.getCurrentPosition(showPosition);
