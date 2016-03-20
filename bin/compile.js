var compiler = require('webpack')(require('../webpack/prod')());

compiler.run(function (err, stats) {
  var jsonStats = stats.toJson();

  console.log(stats.toString({
    chunks: false,
    colors: true
  }));

  if (err) {
    process.exit(1);
  }
});
