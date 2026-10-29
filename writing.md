---
title: Writing
permalink: /writing/
wide: true
kicker: "Articles on LinkedIn"
intro: "I write about what works when you build AI agents on enterprise data, and what does not."
---
{% assign articles = site.data.articles | where_exp: "a", "a.url contains 'http'" %}

{% if articles.size > 0 %}
{% assign series = articles | group_by: "series" %}
{% for s in series %}
{% assign sid = s.name | slugify %}
{% include section.html id=sid title=s.name %}
<ol class="index-list">
{% assign items = s.items | sort: "date" | reverse %}
{% for a in items %}
  <li><a href="{{ a.url }}"><span class="il-num">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span><span class="il-title">{{ a.title }}</span><span class="il-text">{{ a.summary }}{% if a.date %} <span class="mono">{{ a.date }}</span>{% endif %}</span></a></li>
{% endfor %}
</ol>
{% endfor %}
{% else %}
<p class="note">The first articles are on their way. Follow me on <a href="{{ site.links.linkedin }}">LinkedIn</a> to read them when they appear.</p>
{% endif %}
