var prevText = '';
function find(text) {
  text.trim();
  if (text == prevText) return;
  let input = $(".inputs").html();
  let regex = /<span class="highlight".+<\/span>/g;
  input = input.replace(regex, prevText);
  if (text.length == 0) return;
  regex = new RegExp(text, 'g');
  input = input.replace(regex, `<span class="highlight">${text}</span>`);
  $(".inputs").html(input);
  $(".highlight").css("background-color", "yellow");
  prevText = text;
}

$(".inputs").html(`Stack Overflow

Search…


1
●3
By using our site, you acknowledge that you have read and understand our Cookie Policy, Privacy Policy, and our Terms of Service.

Home
PUBLIC
Stack Overflow
Tags
Users
Jobs
Teams
Q&A for work
Learn More

How to get the position of a typed letter in a textarea with Javascript?
Ask Question
up vote
1
down vote
favorite
I am creating a dropdown while typing in a textarea. How can I get the position of the typed letter given a keyup event?

javascript jquery
shareedit
asked May 26 '15 at 1:46

Some Guy
2,56473356
github.com/component/textarea-caret-position – Amadan May 26 '15 at 1:53
Can you elaborate on what you mean by position? Like the x and y coordinates of the character itself? Or the index of the character in the string in the textarea? – Danny Delott May 26 '15 at 2:12
Sorry, I meant the x and y coordinates on the screen, so I can position the dropdown in the right place. – Some Guy May 26 '15 at 5:34
That's tricky! I suggest you to use the attribute contenteditable instead of using an textarea. Using a div with contentediable you can wrap the last typed character into a span and get its offsetTop and offsetLeft to place your dropdown – João Mosmann May 26 '15 at 20:47
add a comment
2 Answers
active oldest votes
Не нашли ответ? Задайте вопрос на Stack Overflow на русском.

✕
up vote
1
down vote
Greg's answer seems to work. But if you want a more simpler way to get it, you can access the selectionStart property of the textarea.

For example

var myTextArea = $("#mytextarea");

myTextArea.keyup(function () {

 console.log("The last typed character is at: ", myTextArea.get(0).selectionStart - 1);

});
http://jsfiddle.net/wasjdhtu/

shareedit
edited May 26 '15 at 20:38
answered May 26 '15 at 2:37

João Mosmann
2,5131425
add a comment

up vote
1
down vote
var oldValue = '';
var keyup = function() {
  var value = document.getElementById('myTextArea').value;
  for(var i=0; i<value.length; i++) {
      if(i >= oldValue.length) {
          // letter typed at end
          oldValue = value;
          return; // not really necessary since we should be at the end of the loop anyway
      } else if(value.charAt(i) !== oldValue.charAt(i)) {
          // letter typed at i
          oldValue = value;
          return; // no need to keep searching
      }
  }
  // no new letters typed
}
shareedit
answered May 26 '15 at 2:22

Greg
79821332
Sorry, I meant the x and y coordinates on the screen, so I can position the dropdown in the right place. – Some Guy May 26 '15 at 5:34
Ah that's tricky. You'd need the pixel width of each character in the font you're using, and you'd likely run into problems across different browsers. I'd seriously consider doing something simpler. Most people just align the dropdown with the input box. – Greg May 26 '15 at 12:08
You could also try using something like stackoverflow.com/questions/118241/… – Greg May 26 '15 at 12:10
add a comment
Your Answer
Links Images Styling/Headers Lists Blockquotes Code HTML advanced help »


Post Your Answer
Not the answer you're looking for? Browse other questions tagged javascript jquery or ask your own question.
asked

3 years, 5 months ago

viewed

625 times

active

3 years, 5 months ago

FEATURED ON META
Should we burninate the [design] tag?
Happy 10th anniversary Stack Overflow! Commence … au festival!
HOT META POSTS
33 Comment with link to my library removed
10 Self-answered question where the problem came from a framework; should I put…
Work from anywhere
Front-End Design Engineer
ElasticNo office location
REMOTE
javascripttypescript
Software Engineer - San Francisco OR Remote - USA
HelloSignSan Francisco, CA
$125K - $200KREMOTE
securityphp
Front End Javascript Engineer (React/Redux)
ClevertechNo office location
REMOTE
javascriptsql
Node.js Developer (Remote)
X-TeamNo office location
REMOTE
javascriptnode.js
Work remotely - from home or wherever you choose.

Browse remote jobs
Linked
381
Calculate text width with JavaScript
Related
7654
How do JavaScript closures work?
5106
How do I remove a property from a JavaScript object?
3463
How do you get a timestamp in JavaScript?
2070
How to get the children of the $(this) selector?
4304
How do I include a JavaScript file in another JavaScript file?
3094
How do I make the first letter of a string uppercase in JavaScript?
2582
Get the current URL with JavaScript?
1428
Get selected value in dropdown list using JavaScript?
7435
How to check whether a string contains a substring in JavaScript?
6448
How do I remove a particular element from an array in JavaScript?
Hot Network Questions
The numbers, Mason, what do they mean?
Schedule the last day of every month
The first McDonald's restaurant on Mars
How to get three nested enumerations in LaTeX?
Why does Unity use reflection to get the update method?
Group of matrices form a manifold or euclidean space
Can I eat the rabbits my cat catches?
How do services with high uptime apply patches without rebooting?
Why doesn't current pass through a resistance if there is another path without resistance?
How should I fry onions without burning them?
After salary negotiations, Offer is rejected, But now HR is contacting again for more negotiations
Do you need to have a visa or visa free passport for every port of call when departing on a Carribean cruise?
Why don’t we use the term “scale signature”, rather than “key signature”?
How can you dispute a Chinese restaurant's charge practically, in Canada?
Use custom image icons in ArrayPlot?
Physical effort in outputting 5V 1–2A?
Limitation on external system calling Salesforce
How can the scp foundation retain it's secrecy in a technologically changing world?
Inactivate all occurrences of a symbol
I am in a EU country where it says on the socket 16 A / 250 volt. Can I charge my laptop which takes 100-240 volt / ~1 A?
more hot questions
question feed
STACK OVERFLOW
Questions
Jobs
Developer Jobs Directory
Salary Calculator
Help
Mobile
Disable Responsiveness
PRODUCTS
Teams
Talent
Engagement
Enterprise
COMPANY
About
Press
Work Here
Legal
Privacy Policy
Contact Us
STACK EXCHANGE
NETWORK
Technology
Life / Arts
Culture / Recreation
Science
Other
Blog
Facebook
Twitter
LinkedIn
site design / logo © 2018 Stack Exchange Inc; user contributions licensed under cc by-sa 3.0 with attribution required. rev 2018.10.29.31977

`)
