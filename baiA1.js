let A1 = [1, 2, "a"];
let A2 = [1, 3, "b", "c", 1, 2, 3];

function returnDifferent(a, b) {
   var i, length_a = a.length,
      length_b = b.length,
      result = [];
   if (!length_a) return b;
   else if (!length_b) return a;
   for (i = 0; i < length_a; i++) {
      if (b.indexOf(a[i]) === -1) result.push(a[i]);
   }
   for (i = 0; i < length_b; i++) {
      if (a.indexOf(b[i]) === -1) result.push(b[i]);
   }
   return result;
}

console.log(returnDifferent(A1, A2))