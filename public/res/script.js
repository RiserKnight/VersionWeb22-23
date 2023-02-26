var animation = bodymovin.loadAnimation({
    container: document.getElementById('anim'),
    rederer: 'svg',
    loop: true,
    autoplay: true,
    path: "/res/data.json"
});

const welcome = document.getElementById('welcome').innerHTML;
console.log(welcome.length);

const typewriter = document.querySelector('.typewriter');
typewriter.style.animation = 'typing '+0.175*parseInt(welcome.length)+'s steps('+parseInt(welcome.length)+', end), blink-caret 0.65s step-end infinite';

let stylesheet = null;
for (let i = 0; i < document.styleSheets.length; i++) {
  let rules = document.styleSheets[i].cssRules;
  for (let j = 0; j < rules.length; j++) {
    if (rules[j] instanceof CSSKeyframesRule && rules[j].name === 'typing') {
      stylesheet = document.styleSheets[i];
      break;
    }
  }
  if (stylesheet) {
    break;
  }
}

// Access the individual keyframes
if (stylesheet) {
  let keyframes = null;
  for (let i = 0; i < stylesheet.cssRules.length; i++) {
    let rule = stylesheet.cssRules[i];
    if (rule instanceof CSSKeyframesRule && rule.name === 'typing') {
      keyframes = rule;
      break;
    }
  }
  if (keyframes) {
    let fromRule = keyframes.findRule('from');
    let toRule = keyframes.findRule('to');
  
    toRule.style.width=parseInt(welcome.length)*2.5+'%';
  }
}