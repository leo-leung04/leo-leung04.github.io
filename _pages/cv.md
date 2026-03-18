---
layout: none
permalink: /cv/
title: CV
nav: true
nav_order: 2
redirect: /assets/pdf/Jingcheng_Liang_cv.pdf
---
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url={{ page.redirect | relative_url }}">
    <script>
      window.location.replace("{{ page.redirect | relative_url }}");
    </script>
  </head>
  <body>
    <a href="{{ page.redirect | relative_url }}">Open CV PDF</a>
  </body>
</html>
