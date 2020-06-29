const I = a => a; // I := λa.a  -- Idiot Bird Combinator --> Identity [id in Haskell]
console.log("<---- Idiot Bird Combinator ---->")
console.log(I(1)); // 1
console.log(I(I)); // [Function: I]

console.log("<---- Mocking Bird Combinator ---->")
const M = f => f(f);    // M := λf.ff  -- Mocking Bird Combinator --> Self application
console.log(M(I)); // [Function: I]

console.log("<---- Kestrel Combinator ---->")
const K = a => b => a;  // K := λab.a  -- Kestrel Combinator [const 5 6 = 5 in Haskell]
console.log(K(I)(M)); // [Function: I]

console.log("<---- Why const? ---->")
// Why is it named const in Haskell? Example below - a fixation to the number 5
const K5 = K(5); // [Function]
console.log(K5); // 5
console.log(K5(2)); // 5
console.log(K5(7)); // 5
console.log(K5(2000)); // 5

console.log(K(I)(2)(3)); // K(I)(x) --> I  --> K(I)(x)(y) = y  --> λab.b 

console.log("<---- Kite Combinator ---->")
const KI = a => b => b;  // KI := λab.b  -- Kite Combinator [const id 5 6 = 6 in Haskell]
console.log(KI(I)(M)); // [Function: M]

console.log("<---- Cardinal Combinator ---->")
const C = f => a => b => f(b)(a); // C := λfab.fba  -- Cardinal Combinator --> Reverse arguments  [flip const 5 6 = 6 in Haskell]
console.log(C(K)(I)(M)); // [Function: M]

console.log("<---- Boolean: True/False ---->")
const T = K;
const F = KI;
T.inspect = () => 'T / K';
F.inspect = () => 'F / KI';
console.log(T); // T / K
console.log(F); // F / KI

console.log("<---- Boolean: NOT ---->")
const NOT = p => p(F)(T); // NOT := λp.pFT := C
console.log(NOT(T)); // F / KI
console.log(NOT(F)); // T / K
console.log(C(T)); // [Function]

console.log("<---- Boolean: AND ---->")
const AND = p => q => p(q)(p); // AND := λpq.pqF := λpq.pqp
console.log(AND(T)(F)); // F / KI
console.log(AND(F)(F)); // F / KI
console.log(AND(F)(T)); // F / KI
console.log(AND(T)(T)); // T / K

console.log("<---- Boolean: OR ---->")
const OR = p => q => p(p)(q); // OR := λpq.pTq := λpq.ppq := M* [Mocking Bird once removed]
console.log(OR(T)(F)); // T / K
console.log(OR(F)(F)); // F / KI
console.log(OR(F)(T)); // T / K
console.log(OR(T)(T)); // T / K

console.log(M(T)(F)); // T / K
console.log(M(F)(F)); // F / KI
console.log(M(F)(T)); // T / K
console.log(M(T)(T)); // T / K

console.log("<---- Boolean: XOR ---->")
const XOR = p => q => p(q)(NOT(q));
console.log(XOR(T)(F)); // F / KI
console.log(XOR(F)(F)); // T / K
console.log(XOR(F)(T)); // F / KI
console.log(XOR(T)(T)); // T / K

console.log("<---- Numbers + SUCC ---->")
const zero = f => a => a;
const once = f => a => f(a);
const twice = f => a => f(f(a));
const thrice = f => a => f(f(f(a)));
const SUCC = n => f => a => f(n(f)(a));  // SUCC := λnfa.f(nfa) := λfab.B 
const jsnum = n => n(x => x + 1)(0);

console.log(jsnum(SUCC(zero))); // 1
console.log(jsnum(SUCC(once))); // 2
console.log(jsnum(SUCC(twice))); // 3
console.log(jsnum(SUCC(thrice))); // 4