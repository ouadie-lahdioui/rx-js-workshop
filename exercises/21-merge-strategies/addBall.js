(function () {
  const { Observable } = Rx;
  const easeLinear = x => x;

  function animationTime(duration = 1000) {
    return new Observable(observer => {
      const start = Date.now();
      let id;
      const animate = () => {
        id = requestAnimationFrame(() => {
          const diff = Date.now() - start;
          if (diff < duration) {
            observer.next(diff / duration);
          } else {
            observer.next(1);
            observer.complete();
          }
          animate();
        });
      };

      animate();

      return () => {
        if (id) {
          cancelAnimationFrame(id);
        }
      };
    });
  };

  function easeOutBounce(pos) {
    if ((pos) < (1/2.75)) {
      return (7.5625*pos*pos);
    } else if (pos < (2/2.75)) {
      return (7.5625*(pos-=(1.5/2.75))*pos + 0.75);
    } else if (pos < (2.5/2.75)) {
      return (7.5625*(pos-=(2.25/2.75))*pos + 0.9375);
    } else {
      return (7.5625*(pos-=(2.625/2.75))*pos + 0.984375);
    }
  }

  const addBall = (svg) =>
    Observable.defer(() => {
      const elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      elem.style = 'fill: red; stroke: none;';
      svg.appendChild(elem);
      elem.setAttribute('r', 20);

      return animationTime(2000)
        .map(t => ({
          t,
          x: easeLinear(t) * 600,
          y: easeOutBounce(t) * 500
        }))
        .do(({x, y}) => {
          elem.setAttribute('cx', x);
          elem.setAttribute('cy', y);
        })
        .finally(() => elem.remove());
    });

  const speech$ = new Rx.Observable(observer => {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();

    recognition.onresult = e => observer.next(
      Array.from(e.results)
        .reduce((final, result) =>
          final.concat(Array.from(result, x => x.transcript)), [])
    );
    recognition.onerror = e => observer.error(e);

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition = null;
    };
  });

  window.addBall = addBall;

  window.listenFor = (text) => speech$
    .filter(results => results.some(x => x === text));
}());
