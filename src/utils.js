module.exports= {
  sleep: async ms => new Promise(res => setTimeout(res, ms))
};
