---
layout: default
permalink: /blog/
title: blog
nav: true
nav_order: 3
pagination:
  enabled: false
---

<div class="post">

{% assign blog_name_size = site.blog_name | size %}
{% assign blog_description_size = site.blog_description | size %}

{% if blog_name_size > 0 or blog_description_size > 0 %}

  <div class="header-bar">
    <div class="header-bar-top">
      <div>
        <h1>{{ site.blog_name }}</h1>
        <h2>{{ site.blog_description }}</h2>
      </div>
      <div class="blog-controls">
        <div class="blog-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="blog-search-input" placeholder="Search posts..." autocomplete="off">
        </div>
        <select id="blog-category-select">
          <option value="all">All topics</option>
          {% assign all_tags = site.posts | map: "tags" | join: "," | split: "," | uniq | sort %}
          {% for tag in all_tags %}
            {% if tag != "" %}
              <option value="{{ tag }}">{{ tag }}</option>
            {% endif %}
          {% endfor %}
        </select>
      </div>
    </div>
  </div>
  {% endif %}

{% if site.display_tags and site.display_tags.size > 0 or site.display_categories and site.display_categories.size > 0 %}

  <div class="tag-category-list">
    <ul class="p-0 m-0">
      {% for tag in site.display_tags %}
        <li>
          <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
      {% if site.display_categories.size > 0 and site.display_tags.size > 0 %}
        <p>&bull;</p>
      {% endif %}
      {% for category in site.display_categories %}
        <li>
          <i class="fa-solid fa-tag fa-sm"></i> <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}">{{ category }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
    </ul>
  </div>
  {% endif %}

{% assign featured_posts = site.posts | where: "featured", "true" %}
{% if featured_posts.size > 0 %}
<br>

<div class="container featured-posts">
{% assign is_even = featured_posts.size | modulo: 2 %}
<div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
{% for post in featured_posts %}
<div class="col mb-4">
<a href="{{ post.url | relative_url }}">
<div class="card hoverable">
<div class="row g-0">
<div class="col-md-12">
<div class="card-body">
<div class="float-right">
<i class="fa-solid fa-thumbtack fa-xs"></i>
</div>
<h3 class="card-title text-lowercase">{{ post.title }}</h3>
<p class="card-text">{{ post.description }}</p>

                    {% if post.external_source == blank %}
                      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                    {% else %}
                      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                    {% endif %}
                    {% assign year = post.date | date: "%Y" %}

                    <p class="post-meta">
                      {{ read_time }} min read &nbsp; &middot; &nbsp;
                      <a href="{{ year | prepend: '/blog/' | relative_url }}">
                        <i class="fa-solid fa-calendar fa-sm"></i> {{ year }} </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      {% endfor %}
      </div>
    </div>
    <hr>

{% endif %}

  <ul class="post-list">

    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}

    {% for post in postlist %}

    {% if post.external_source == blank %}
      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    {% else %}
      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
    {% endif %}
    {% assign year = post.date | date: "%Y" %}
    {% assign tags = post.tags | join: "" %}
    {% assign categories = post.categories | join: "" %}

    <li class="post-item-clickable" data-title="{{ post.title | downcase }}" data-description="{{ post.description | downcase }}" data-tags="{{ post.tags | join: ',' | downcase }}" data-url="{% if post.redirect == blank %}{{ post.url | relative_url }}{% elsif post.redirect contains '://' %}{{ post.redirect }}{% else %}{{ post.redirect | relative_url }}{% endif %}" {% if post.redirect contains '://' %}data-external="true"{% endif %}>
      <div class="post-entry">
        <div class="post-entry-main">
          <span class="post-title">{{ post.title }}
            {% if post.redirect contains '://' %}
              <i class="fa-solid fa-arrow-up-right-from-square fa-xs"></i>
            {% endif %}
          </span>
          <span class="post-description">{{ post.description }}</span>
        </div>
        <div class="post-entry-meta">
          <span>{{ post.date | date: '%b %d, %Y' }}</span>
          {% if tags != "" %}
            <div class="post-entry-tags">
              {% for tag in post.tags %}
                <span class="post-entry-tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </div>
    </li>

    {% endfor %}

  </ul>

{% if page.pagination.enabled %}
{% include pagination.liquid %}
{% endif %}

</div>

<script>
(function() {
  const searchInput = document.getElementById('blog-search-input');
  const categorySelect = document.getElementById('blog-category-select');
  const posts = document.querySelectorAll('.post-list li');

  function filterPosts() {
    const query = searchInput.value.toLowerCase().trim();
    const category = categorySelect.value.toLowerCase();

    posts.forEach(function(post) {
      const title = post.getAttribute('data-title') || '';
      const desc = post.getAttribute('data-description') || '';
      const tags = post.getAttribute('data-tags') || '';

      const matchesSearch = !query || title.includes(query) || desc.includes(query);
      const matchesCategory = category === 'all' || tags.split(',').indexOf(category) !== -1;

      post.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterPosts);
  if (categorySelect) categorySelect.addEventListener('change', filterPosts);

  // Make entire post row clickable
  document.querySelectorAll('.post-item-clickable').forEach(function(item) {
    item.addEventListener('click', function() {
      var url = item.getAttribute('data-url');
      var isExternal = item.getAttribute('data-external');
      if (url) {
        if (isExternal) {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }
    });
  });
})();
</script>
