---
title: Research
permalink: /research/
wide: true
kicker: "NTU MSc Artificial Intelligence"
intro: "Academic work from my MSc at Nanyang Technological University. Each study states its method and its measured result."
---
{% assign items = site.research | sort: "year" | reverse %}

{% include section.html id="studies" title="Studies" %}

<ul class="cards">
{% for c in items %}<li>{% include card.html item=c %}</li>
{% endfor %}
</ul>
