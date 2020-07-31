let f = (x) => x + 2;

console.log(f(5));

let g = (x) => x + 3;

console.log(f(g(5)));

let xs = [1, 2, 3, 4, 5, 6];

let temp = 0;

for (let i = 0; i < xs.length; i++) {
    temp += xs[i];
}

console.log(temp);

let head = (xs) => xs[0];
let tail = (xs) => xs.slice(1);

console.log(head(xs));
console.log(tail(xs));

let sum = (x) => {
    if (!head(x)) return 0;
    else return head(x) + sum(tail(x));
}

let sum_tailcall = (x, acc = 0) => {
    if (!head(x)) return acc;
    else return sum_tailcall(tail(x), head(x) + acc);
}

console.log(sum(xs));
console.log(sum_tailcall(xs));
