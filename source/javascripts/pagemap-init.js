document.addEventListener("DOMContentLoaded", function() {
  pagemap(document.querySelector('#map'), {
    viewport: null,
    // styles: {
    //   'header,footer,section,article': 'rgba(0,0,0,0.08)',
    //   'h1,h2,a': 'rgba(0,0,0,0.18)',
    //   'h3,h4': 'rgba(0,0,0,0.08)',
    //   'pre': 'rgba(119,0,0,0.10)',
    //   'img': 'rgba(255,255,255,0.3)'
    // },
    styles: {
      // 'header,footer,section,article': 'rgba(0,0,0,0.08)',
      'h1, h2': 'rgba(0,0,0,0.20)',
      'h3, h4': 'rgba(0,0,0,0.12)',
      'p, ul': 'rgba(0,0,0,0.04)',
      'table, pre, img': 'rgba(119,0,0,0.10)'
    },
    back: 'rgba(0,0,0,0.02)',
    view: 'rgba(0,0,0,0.05)',
    drag: 'rgba(0,0,0,0.10)',
    interval: null
  });
})