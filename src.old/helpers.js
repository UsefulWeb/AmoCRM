const delay = ms => new Promise( resolve => {
  setTimeout( resolve, ms );
});

export {
  delay
};
