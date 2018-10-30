var prevText = '';
var findRunning = false;
var jumpRunning = false;

var colors = {
  search: ["yellow", "orange"]
}
// find specific text and highlight it
function find(text, cl) {
  // no need to highlight as they are already
  if (text === prevText) return;
  // not intervene with "jump" process
  if (jumpRunning) return;

  // inform "jump" that it has to wait
  findRunning = true;

  let color = colors[cl][0];
  let input = $(".inputs").html();

  // find highlighted elements
  let regtext = '(?:<span class="' + cl +
    '" style="background-color: (?:(?:' + color +
    ')|(?:' + colors[cl][1] + '));">' + prevText +
    '<\/span>)';
  let regex = new RegExp(regtext, 'g');
  // remove highlighting spans
  let result = input.replace(regex, prevText);

  // highlight letter/word unless it's an empty string
  if (text.length !== 0) {
    let reg = new RegExp(text, 'g');
    result = result.replace(reg, `<span class="${cl}" style="background-color: ${color};">${text}</span>`);
    console.log("Bringing it back");
    // clean up jump memory
    jumpMemory[cl] = -1;
  }
  // register text change
  prevText = text;
  // reset input text
  $(".inputs").html(result);

  // inform "jump" that process has finished
  findRunning = false;
}

var jumpMemory = {
}

// jump to the next or to some specific word
function jump(cl, n) {
  jumpRunning = true
  // hold on until "find" is done
  if (findRunning) {
    setTimeout(function() {
      jump(cl);
    }, 20);
  } else {
    // get highlighted spans to choose from
    let all = $(`.${cl}`).not(".filter,.tool");
    // make new memory if it doesn't exist
    if (jumpMemory[cl] === undefined) {
      jumpMemory[cl] = 0;
      console.log("NOT DEFINED");
      console.log(cl);
    } else {
      // unhighlight previously highlighted elements
      if (jumpMemory[cl] > -1) {
        console.log(jumpMemory[cl]);
        all[jumpMemory[cl]].style.backgroundColor = colors[cl][0];
      }
      // go to the next item
      jumpMemory[cl]++;
      console.log(jumpMemory);
      if (jumpMemory[cl] >= all.length) {
        jumpMemory[cl] = 0;
      }
    }
    if (n) {
      jumpMemory[cl] = n;
    }
    // change color of highlighted element
    let el = all[jumpMemory[cl]];
    el.scrollIntoView();
    el.style.backgroundColor = colors[cl][1];
    jumpRunning = false;
  }
}

$(".inputs").html(`
3Blue1Brown
Animated math
Home  Videos  Store  Math Poetry  FAQ/Contact
The "Meta-formula" for 1n+2n+3n+...+xn
May 13, 2018
You’ve probably seen formulas such 1+2+3+…+x=x22+x2, 12+22+32+…+x2=x33+x22+x6, and so on before, and wondered where these come from, and if the same thing can be done for sums of powers of any degree.

Well, the answer (er, to the second question) is a resounding YES! Here is a general technique that will quite readily, quite easily give you the formula for the sum of consecutive values of any polynomial, as another polynomial. Indeed, here is a “meta-formula” for the desired formula.

Actually, I will explain this same underlying idea twice, in somewhat different ways. Once a little less abstractly, and once a little more abstractly. You may read whichever of these tickles your fancy best; whichever gives you the clearest understanding.

The less abstract presentation:

Suppose you already have a nice formula for R(x)=1n+2n+3n+…+xn (in other words, R(0)=0 and R(x)−R(x−1)=xn). How can we find a similar formula for (n+1)th powers instead of nth powers?

Well, xn+1 is what we get if we integrate xn (with an initial value of 0) and multiply by n+1. And if we do this to R, so that Q′=(n+1)R, this Q will ALMOST give us exactly what we need: we will then have that the derivative of Q(x)−Q(x−1) is (n+1)(R(x)−R(x−1))=(n+1)xn, which is the derivative of xn+1; it follows that Q(x)−Q(x−1) and xn+1 differ by at most a constant.

But we want them to match exactly! So to cancel out this constant, we can add an extra linear term to Q; as we add cx to Q, we end up adding c to Q(x)−Q(x−1), and so by using the appropriate c, we can get the exact equality we desire.

So that’s it, then. To get a formula for 1n+1+2n+1+3n+1+…+xn+1, we take a formula for 1n+2n+3n+…+xn, integrate it (with an initial value of 0) and multiply by n+1, then add cx where the constant c is chosen to ensure that we get the right values.

Thus, since we know that the formula for the sum of the first x many 0th powers 1+1+1+… is x , we find that the formula to sum the first x many 1st powers 1+2+3+…+x is x22+cx. What should we choose c to be? We should choose it to give a total of 1 when x=1; thus. c=12, and our formula when n=1 is x22+x2.

Next, to get the formula for 12+22+32+…+x2, we integrate, multiply by 2, and add an unknown linear term, to get x33+x22+cx. Again, we should choose c so that the total comes out to 1 when x=1; thus, c now must be 16.

Next, to get the formula for 13+23+33+…+x3, we do this all again, integrating, multiplying by 3, and adding an unknown linear term, to get x44+x32+x24+cx. In this case, to get the total to come out to 1 when x=1, we take c=0.

And so on and so on; continuing in this way, we get the formulas for any degree we like.

The more abstract presentation:

Consider the linear “forward difference” operator which sends the polynomial P(x) to the polynomial P(x+1)−P(x). Call this operator Δ. Given a polynomial P, our goal is to find some polynomial Q such that ΔQ=P. Then Q(a)−Q(b) will be P(b)+P(b+1)+P(b+2)+…+P(a−1), which will allow us to easily solve any problem of this sort. (We could just as well think about “backward differences” or any such thing, but my own idiosyncratic preference is to have to keep track of less minus signs…)

But how do we find such a Q, given P?

Well, let’s consider two other linear operators of note on polynomials, that are closely related to this difference operator. First of all, there’s “differentiation” (in the sense of taking the derivative), whose name already belies it closeness; this is the familiar operator from calculus which sends xn to nxn−1. We’ll call this operator δ. Secondly, there’s “integration” in the sense which sends each xn to xn+1n+1. We’ll call this operator ∫. Note that integrating followed by differentiating is the same as doing nothing at all (i.e., δ∫P=P).

Let’s make more explicit the sense in which differentiation and forward difference are related. In particular, let’s note that we have, by Taylor expansion, that P(x+1)=P(x)+δ1P(x)1!+δ2P(x)2!+δ3P(x)3!+…=eδP(x). That is ΔP(x)=P(x+1)−P(x)=(eδ−1)P(x), which is to say, Δ=eδ−1. Conversely, we must have δ=ln(1+Δ), which by Taylor series expansion again, comes out to Δ−Δ22+Δ33−Δ44+….

(For what it’s worth, though these are phrased as infinite series here, when applied to any particular polynomial, only finitely many terms are nonzero, as δ or Δ applied more than n times to a polynomial of degree n results in zero. So there are no convergence issues which can arise, and all the results which we know to hold for Taylor series as abstract formal objects (e.g., that ex−1 and ln(1+x) act as inverse functions) will necessarily work just as well for these series expansions in terms of our operators as applied to particular polynomials)

Let’s see how this helps us with our goal. We wanted to find a Q such that ΔQ=P. But we can rewrite this as ΔQ=δ∫P, which is to say, ΔQ=(Δ−Δ22+Δ33−Δ44+…)∫P.

Now it’s easy enough to solve. Factoring a Δ out, we see that it suffices to take Q=(1−Δ2+Δ23−Δ34+…)∫P=ln(1+Δ)Δ∫P. And as noted above, this is a finitary calculation for any particular P.

Actually, because δn is easier to compute for polynomials in standard representation than Δn (since δ takes monomials to monomials), it is often more convenient to rewrite ln(1+Δ)Δ as δeδ−1=1−δ2+δ212−δ4720+…. The Taylor series expansion here, as for any such symbolic expression, can be evaluated to any desired length by straightforward calculus, although there are cleverer ways as well. [The coefficients so produced happen to have been studied in their own right, in the theory of the closely related “Bernoulli numbers”, in case you care to read up more on these.]

So we have that Q=δeδ−1∫P=(1−δ2+δ212−δ4720+…)∫P =(∫−12+δ12−δ3720+…)P. And, remember, we can use this to calculate P(b)+P(b+1)+P(b+2)+…+P(a−1) as Q(a)−Q(b).

This completes our general technique. Let’s apply it to, for example, the particular question of a formula for 12+22+32+…+x2.

Suppose P(x)=x2. Applying (∫−12+δ12−δ3720+…) to this, we get x33−x22+x6+0+0+0+….

Taking this to be Q(x), we can now compute 12+22+32+…+x2 as Q(x+1)−Q(1). Eh, it’ll be slightly simpler in the terms we’ve put this in to think of this as 02+12+22+…+(x−1)2+x2=Q(x)−Q(0)+x2, which is x33+x22+x6. Ta-da! This is our final formula.

But the great value of the discussion in this post is that we do not need to apply new cleverness to solving this type of problem again for each new polynomial or degree of powers to be summed. We can mechanically produce the answers for each, simply applying δeδ−1∫=(∫−12+δ12−δ3720+…) to the given polynomial.

This technique is general enough that it even works for some functions which aren’t polynomials, producing answers as convergent infinite series, which then can be used to interpolate/extrapolate the corresponding “sum consecutive values” function to new contexts beyond where this sum would ordinarily be interpretable. For example, these kinds of ideas can be used to generalize the factorial to non-integer arguments (by generalizing the logarithmic factorial, which is a sum of consecutive logarithms; of course, we’ve seen already how to generalize the factorial anyway), and to extend the Riemann and Hurwitz zeta functions to arbitrary inputs (as with every topic I mention in passing, I promise I will write more on this in a later post...). It’s a very valuable idea to be aware of.

← The Fundamental Theorem of TelegraphyElementary Prime Counting →
Comments (0) Newest First  Subscribe via e-mail

Preview POST COMMENT…`);
