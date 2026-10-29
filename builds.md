---
title: Independent builds
permalink: /builds/
wide: true
kicker: "Own time, own code"
intro: "Projects I design and build in my own time. Each one tests an idea I use in enterprise work."
redirect_from:
  - /ai-projects
  - /ai-projects.html
---
{% assign items = site.builds | sort: "year" | reverse %}

{% include section.html id="builds" title="Builds" %}

<ul class="cards">
{% for c in items %}<li>{% include card.html item=c %}</li>
{% endfor %}
</ul>

<p>Looking for the older AI project list? The internal SAP accelerators are now under <a href="{{ '/enterprise-ai/#internal-accelerators' | relative_url }}">Enterprise AI at SAP</a>, and the NTU work is under <a href="{{ '/research/' | relative_url }}">Research</a>.</p>
