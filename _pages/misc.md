---
layout: page
title: misc.
permalink: /misc/
description: a collection of photos I've taken.
nav: true
nav_order: 9
albums:
  - name: la jolla
    description: "2026.7 @san diego"
    photos:
      - path: assets/img/misc/ljl/1.jpg
      - path: assets/img/misc/ljl/2.jpg
      - path: assets/img/misc/ljl/3.jpg
      - path: assets/img/misc/ljl/4.jpg
      - path: assets/img/misc/ljl/5.jpg
  - name: london
    description: "2026.6 @uk"
    photos:
      - path: assets/img/misc/ld/1.jpg
      - path: assets/img/misc/ld/2.jpg
      - path: assets/img/misc/ld/3.jpg
      - path: assets/img/misc/ld/4.jpg
      - path: assets/img/misc/ld/5.jpg
  - name: white cliffs
    description: "2026.6 @uk"
    photos:
      - path: assets/img/misc/wc/1.jpg
      - path: assets/img/misc/wc/2.jpg
      - path: assets/img/misc/wc/3.jpg
  - name: ice
    description: "2025.8 @alaska"
    photos:
      - path: assets/img/misc/ice/1.jpg
      - path: assets/img/misc/ice/2.jpg
      - path: assets/img/misc/ice/4.jpg
      - path: assets/img/misc/ice/5.jpg
      - path: assets/img/misc/ice/3.jpg
      - path: assets/img/misc/ice/6.jpg
  - name: outside the window
    description: "2025.8 @alaska"
    photos:
      - path: assets/img/misc/window/1.jpg
      - path: assets/img/misc/window/2.jpg
      - path: assets/img/misc/window/4.jpg
      - path: assets/img/misc/window/5.jpg
      - path: assets/img/misc/window/6.jpg
      - path: assets/img/misc/window/7.jpg
  - name: yellowstone
    description: "2025.8 @yellowstone"
    photos:
      - path: assets/img/misc/yellowstone/1.jpg
      - path: assets/img/misc/yellowstone/2.jpg
      - path: assets/img/misc/yellowstone/3.jpg
      - path: assets/img/misc/yellowstone/4.jpg
      - path: assets/img/misc/yellowstone/5.jpg
  - name: bromo
    description: "2024.5 @indonesia"
    photos:
      - path: assets/img/misc/volcano/1.jpg
      - path: assets/img/misc/volcano/2.jpg
  - name: hokkaido & kamakura
    description: "2024.1 @japan"
    photos:
      - path: assets/img/misc/japan/1.jpg
      - path: assets/img/misc/japan/2.jpg
---

<hr class="my-3">

{% capture photo_sizes %}(min-width: {{ site.max_width }}) {{ site.max_width | minus: 60 | divided_by: 3 }}px, (min-width: 576px) 45vw, 95vw{% endcapture %}

{% for album in page.albums %}
{% unless forloop.first %}<hr class="my-5">{% endunless %}

## {{ album.name }}

{% if album.description %}
{{ album.description }}
{% endif %}

<div class="row mt-3">
  {% for photo in album.photos %}
  <div class="col-sm-6 col-lg-4 mt-3">
    {% include figure.liquid path=photo.path caption=photo.caption sizes=photo_sizes %}
  </div>
  {% endfor %}
</div>
{% endfor %}
