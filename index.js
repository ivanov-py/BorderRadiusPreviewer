function edit(a){
  let figure = document.getElementById('figure');

  let inputValue = a.value;

  let newRadius= `${parseInt(inputValue * figure.offsetWidth / 100)}px`;

  console.log(1, a.id, newRadius);

  switch (a.id) {
    case 'tl':
      figure.style.borderTopLeftRadius = newRadius;
      break;
    case 'tr':
      figure.style.borderTopRightRadius = newRadius;
      break;
    case 'br':
      figure.style.borderBottomRightRadius = newRadius;
      break;
    case 'bl':
      figure.style.borderBottomLeftRadius = newRadius;
      break;
    default:
      throw `Unknown element id ${element.id}`;
  }
}

function radiusVal(side, value) {

}

window.onload = function() {
  
};
