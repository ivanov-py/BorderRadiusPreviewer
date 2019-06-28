const startRadiusMap = {
  l: {t: 50, b:50},
  t: {l: 50, r:50},
  r: {t: 50, b:50},
  b: {l: 50, r:50}
}
let sideSize;

function countRadiusValue(clientZ, offset) {
  let val = (clientZ- offset) * 100 / sideSize;
  val = val < 0 ? 0 : val > 100 ? 100 : val;
  return parseInt(val)
}

function redrawFigure(r,) {
  let borderRadiusValue = redrawBorderRadius(r);
  let text = `border-radius: ${borderRadiusValue};`
  changeRadiusInfo(r, text);
}

function redrawBorderRadius(r) {
  let radius_str = `
    ${r.t.l}% ${r.t.r}% ${r.b.r}% ${r.b.l}%
    \/
    ${r.l.b}% ${r.r.t}% ${r.r.b}% ${r.l.t}%`
  document.getElementById('figure').style.borderRadius = radius_str;
  return radius_str
}

function changeRadiusInfo(r, text) {
  document.getElementById('radius_info').innerHTML = text;
}

function listenSpans() {
  let spans = document.getElementsByTagName('SPAN');

  let r = Object.assign({}, startRadiusMap);

  for (let item of spans) {

    function roll(e) {
      e.preventDefault();
      if (item.id == 'left' || item.id == 'right') {
        let val = countRadiusValue(e.clientY, item.parentElement.offsetTop)
        item.style.top = `calc(${val}% - 2.5%)`;
        if (item.id == 'left') {
          r.l = {b: val, t: 100-val};
        } else {
          r.r = {b: 100-val, t: val};
        }
      } else {
        let val = countRadiusValue(e.clientX, item.parentElement.offsetLeft)
        item.style.left = `calc(${val}% - 2.5%)`;
        if (item.id == 'top') {
          r.t = {l: val, r: 100 - val};
        } else {
          r.b = {l: val, r: 100 - val};
        }
      }
      redrawFigure(r);
    }

    item.addEventListener('mousedown', () => {
      window.addEventListener('mousemove', roll);
    });

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', roll);
    });
  }
}

window.onload = function() {
  sideSize = 300;
  let figure = document.getElementById('figure');
  figure.style.width = `${sideSize}px`;
  figure.style.height = `${sideSize}px`;
  redrawFigure(startRadiusMap);
  listenSpans();
};
