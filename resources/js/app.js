// Sass
require("../sass/app/app.scss");

// All .js files in app folder
// require.context('../../public/app', true, /\.js$/)

function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('../../public/app', true, /\.js$/));