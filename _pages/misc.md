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
      - path: assets/img/misc/ljl/1.JPG
      - path: assets/img/misc/ljl/2.JPG
      - path: assets/img/misc/ljl/3.JPG
      - path: assets/img/misc/ljl/4.JPG
      - path: assets/img/misc/ljl/5.JPG
  - name: london
    description: "2026.6 @uk"
    photos:
      - path: assets/img/misc/ld/1.JPG
      - path: assets/img/misc/ld/2.JPG
      - path: assets/img/misc/ld/3.JPG
      - path: assets/img/misc/ld/4.JPG
      - path: assets/img/misc/ld/5.JPG
  - name: white cliffs
    description: "2026.6 @uk"
    photos:
      - path: assets/img/misc/wc/1.JPG
      - path: assets/img/misc/wc/2.JPG
      - path: assets/img/misc/wc/3.JPG
  - name: ice
    description: "2025.8 @alaska"
    photos:
      - path: assets/img/misc/ice/1.JPG
      - path: assets/img/misc/ice/2.JPG
      - path: assets/img/misc/ice/4.JPG
      - path: assets/img/misc/ice/5.JPG
      - path: assets/img/misc/ice/3.JPG
      - path: assets/img/misc/ice/6.JPG
  - name: outside the window
    description: "2025.8 @alaska"
    photos:
      - path: assets/img/misc/window/1.JPG
      - path: assets/img/misc/window/2.JPG
      - path: assets/img/misc/window/4.JPG
      - path: assets/img/misc/window/5.JPG
      - path: assets/img/misc/window/6.JPG
      - path: assets/img/misc/window/7.JPG
  - name: yellowstone
    description: "2025.8 @yellowstone"
    photos:
      - path: assets/img/misc/yellowstone/1.JPG
      - path: assets/img/misc/yellowstone/2.JPG
      - path: assets/img/misc/yellowstone/3.JPG
      - path: assets/img/misc/yellowstone/4.JPG
      - path: assets/img/misc/yellowstone/5.JPG
  - name: bromo
    description: "2024.5 @indonesia"
    photos:
      - path: assets/img/misc/volcano/1.JPG
      - path: assets/img/misc/volcano/2.JPG
  - name: hokkaido & kamakura
    description: "2024.1 @japan"
    photos:
      - path: assets/img/misc/japan/1.JPG
      - path: assets/img/misc/japan/2.JPG
---

{% for album in page.albums %}
{% unless forloop.first %}<hr class="my-5">{% endunless %}
## {{ album.name }}
{% if album.description %}
{{ album.description }}
{% endif %}

<div class="row mt-3">
  {% for photo in album.photos %}
  <div class="col-sm-6 col-lg-4 mt-3">
    {% include figure.liquid path=photo.path caption=photo.caption %}
  </div>
  {% endfor %}
</div>
{% endfor %}
