// ==UserScript==
// @name        Open all green row links in sukebei
// @namespace   https://github.com/gslin/open-all-green-row-links-in-sukebei
// @match       https://sukebei.nyaa.si/*
// @grant       GM_openInTab
// @version     0.20230727.2
// @author      Gea-Suan Lin <gslin@gslin.com>
// @description A faster way to open links in sukebei green rows
// @license     MIT
// ==/UserScript==

(() => {
  'use strict';

  const h1 = document.querySelector('h1');
  if (h1?.innerText === '429 Too Many Requests') {
    setTimeout('document.location.reload();', Math.random() * 100 + 2950);
    return;
  }

  const tbl = document.querySelector('table.torrent-list');
  if (!tbl) {
    return;
  }

  const handler = () => {
    let timeout = 0;

    for (let item of document.querySelectorAll('tr.success')) {
      const a = item.querySelector('a[href^="/view"]');
      const url = a.getAttribute('href');

      setTimeout(() => {
        GM_openInTab(url, true);
      }, timeout);
      timeout += Math.random() * 100 + 700;
    }
  };

  const input = document.createElement('input');
  input.addEventListener('click', handler);
  input.setAttribute('style', 'font-size:200%');
  input.setAttribute('type', 'button');
  input.setAttribute('value', 'Open links');
  tbl.parentElement.appendChild(input);

  window.addEventListener('keydown', ev => {
    let aEl = document.activeElement;
    if ('input' === aEl?.tagName?.toLowerCase() || 'textarea' === aEl?.tagName?.toLowerCase()) {
      return;
    }

    if ('o' === ev.key) {
      input.click();
      return;
    }
  });
})();
