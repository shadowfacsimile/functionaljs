const I = a => a; // I := λa.a  -- Idiot Bird Combinator --> Identity [id in Haskell]
console.log(I(1));
console.log(I(I));

const M = f => f(f);    // M := λf.ff  -- Mocking Bird Combinator --> Self application
console.log(M(I));

const K = a => b => a;  // K := λab.a  -- Kestrel Combinator [const 5 6 = 5 in Haskell]
console.log(K(I)(M));

// Why is named const in Haskell? Example below - a fixation to the number 5
const K5 = K(5);
console.log(K5);
console.log(K5(2));
console.log(K5(7));
console.log(K5(2000));

console.log(K(I)(2)(3)); // K(I)(x) --> I  --> K(I)(x)(y) = y  --> λab.b 

const KI = a => b => b;  // KI := λab.b  -- Kite Combinator [const id 5 6 = 6 in Haskell]
console.log(KI(I)(M));

const C = f => a => b => f(b)(a); // C := λfab.fba  -- Cardinal Combinator --> Reverse arguments  [flip const 5 6 = 6 in Haskell]
console.log(C(K)(I)(M));

const T = K;
const F = KI;
T.inspect = () => 'T / K';
F.inspect = () => 'F / KI';
console.log(T);
console.log(F);
const NOT = p => p(F)(T); // NOT := λp.pFT := C
console.log(NOT(T));
console.log(NOT(F));
console.log(C(T));

const AND = p => q => p(q)(p); // AND := λpq.pqF := λpq.pqp
console.log(AND(T)(F));
console.log(AND(F)(F));
console.log(AND(F)(T));
console.log(AND(T)(T));

const OR = p => q => p(p)(q); // OR := λpq.pTq := λpq.ppq := M* [Mocking Bird once removed]
console.log(OR(T)(F));
console.log(OR(F)(F));
console.log(OR(F)(T));
console.log(OR(T)(T));

console.log(M(T)(F));
console.log(M(F)(F));
console.log(M(F)(T));
console.log(M(T)(T));

const XOR = p => q => p(q)(NOT(q));
console.log(XOR(T)(F));
console.log(XOR(F)(F));
console.log(XOR(F)(T));
console.log(XOR(T)(T));

const zero = f => a => a;
const once = f => a => f(a);
const twice = f => a => f(f(a));
const thrice = f => a => f(f(f(a)));
const SUCC = n => f => a => f(n(f)(a));  // SUCC := λnfa.f(nfa) := λfab.B 
const jsnum = n => n(x => x + 1)(0);

console.log(jsnum(SUCC(zero)));
console.log(jsnum(SUCC(once)));
console.log(jsnum(SUCC(twice)));
console.log(jsnum(SUCC(thrice)));