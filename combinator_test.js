let I = (a) => a;

console.log(I(5));

let M = f => f(f);

let x = (a) => (y) => y + a;

console.log(M(x)(6));