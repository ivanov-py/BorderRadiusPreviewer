function listenSpans() {
  let spans = document.getElementsByTagName('SPAN');

  let l = 50;
  let t = 50;
  let r = 50;
  let b = 50;

  for (let item of spans) {
    let parent = item.parentElement;
    let val = null;

    function roll(e) {
      e.preventDefault();
      if (item.id == 'left' || item.id == 'right') {
        // x = e.clientX - parent.offsetLeft;
        val = (e.clientY - parent.offsetTop) * 100 / 300;
        val = val < 0 ? 0 : val > 100 ? 100 : val;
        item.style.top = `calc(${val}% - 2.5%)`;
        if (item.id == 'left') {
          l = val;
        } else {
          r = 100 - val;
        }
      } else {
        val = (e.clientX - parent.offsetLeft) * 100 / 300;
        val = val < 0 ? 0 : val > 100 ? 100 : val;
        item.style.left = `calc(${val}% - 2.5%)`;
        if (item.id == 'top') {
          t = 100 - val;
        } else {
          b = val;
        }
      }
      document.getElementById('figure').style.borderRadius = `${l}% ${t}% ${r}% ${b}%`;
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
  listenSpans();
};
