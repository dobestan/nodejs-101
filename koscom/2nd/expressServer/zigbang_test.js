var zigbang = require("./utils/zigbang");


zigbang(6048466, function(error, data) {
  if (error) throw error;
  console.log(data);
});
