---
layout: page
title: Misc.
permalink: /misc/
description: A collection of photos I've taken.
nav: true
nav_order: 9
albums:
  - name: Ice
    description: "2025.8 Alaska"
    photos:
      - path: assets/img/misc/ice/1.JPG
      - path: assets/img/misc/ice/2.JPG
      - path: assets/img/misc/ice/4.JPG
      - path: assets/img/misc/ice/5.JPG
      - path: assets/img/misc/ice/3.JPG
      - path: assets/img/misc/ice/6.JPG
  - name: Outside the Window
    description: "2025.8 Alaska"
    photos:
      - path: assets/img/misc/window/1.JPG
      - path: assets/img/misc/window/2.JPG
      - path: assets/img/misc/window/4.JPG
      - path: assets/img/misc/window/5.JPG
      - path: assets/img/misc/window/6.JPG
      - path: assets/img/misc/window/7.JPG
  - name: Yellowstone
    description: "2025.8 Yellowstone"
    photos:
      - path: assets/img/misc/yellowstone/1.JPG
      - path: assets/img/misc/yellowstone/2.JPG
      - path: assets/img/misc/yellowstone/3.JPG
      - path: assets/img/misc/yellowstone/4.JPG
      - path: assets/img/misc/yellowstone/5.JPG
  - name: Volcano - Bromo
    description: "2024.5 Indonesia"
    photos:
      - path: assets/img/misc/volcano/1.JPG
      - path: assets/img/misc/volcano/2.JPG
  - name: Hokkaido & Kamakura
    description: "2024.1 Japan"
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
