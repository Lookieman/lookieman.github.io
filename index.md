---
title: Luqman Ali
hide_header: true
wide: true
---
{% assign featured = site.enterprise_ai | concat: site.builds | concat: site.research | where: "featured", true %}
{% assign articles = site.data.articles | default: empty | where_exp: "a", "a.url contains 'http'" %}
{% if articles.size > 0 %}{% assign articles = articles | sort: "date" | reverse %}{% endif %}

<section class="hero" aria-labelledby="hero-title">
  <p class="kicker">Luqman Ali / Singapore</p>
  <h1 id="hero-title">Enterprise AI architect.</h1>
  <p class="lede">I take AI agents from discovery to production on SAP, and I write about what works.</p>
  <ul class="stats">
    <li><strong>15+</strong><span>years in SAP data and AI</span></li>
    <li><strong>4</strong><span>customer AI agent engagements</span></li>
    <li><strong>600+</strong><span>consultant days in an advisory portfolio I built</span></li>
  </ul>
</section>

{% include section.html id="now" title="Now" %}

<div class="now">
  <p class="kicker">October 2026</p>
  <p>Point person for the AI Agent Lab in SAP's South-East Asia market unit. Five agents for four customers in solution design and build, with production targets from December 2026 to Q1 2027.</p>
</div>

{% include section.html id="selected-work" title="Selected work" %}

<ul class="cards">
{% for c in featured limit: 3 %}<li>{% include card.html item=c %}</li>
{% endfor %}
</ul>

<p><a href="{{ '/enterprise-ai/' | relative_url }}">Enterprise AI at SAP</a> · <a href="{{ '/builds/' | relative_url }}">Independent builds</a> · <a href="{{ '/research/' | relative_url }}">Research</a></p>

{% include section.html id="writing" title="Latest writing" %}

{% if articles.size > 0 %}
<ol class="index-list">
{% for a in articles limit: 3 %}
  <li><a href="{{ a.url }}"><span class="il-num">{{ a.series }}</span><span class="il-title">{{ a.title }}</span><span class="il-text">{{ a.summary }}</span></a></li>
{% endfor %}
</ol>
{% else %}
<p class="note">The first articles are on their way. See the <a href="{{ '/writing/' | relative_url }}">Writing</a> page.</p>
{% endif %}
