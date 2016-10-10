



var arr = [];

for (var i=0; i<5; i++) {
  arr.push(function (n) {return n * i} );
  arr.push(
    (function(myI) {
      return function(n) {
        return n * myI;
      }
    })(i);
  )
}


console.log(arr[0](10));
