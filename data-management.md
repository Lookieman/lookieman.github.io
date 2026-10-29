---
title: Data management at SAP
permalink: /data-management/
wide: true
kicker: "15+ years, seven countries"
intro: "Master data governance, data architecture and integration work for SAP customers in Asia-Pacific and Europe. Most recent first."
redirect_from:
  - /sap-projects
  - /sap-projects.html
---
{% assign projects = site.data.sap_projects %}
{% assign countries = projects | map: "country" | uniq | sort %}
{% assign domains = "MDG,governance,architecture,integration" | split: "," %}

{% include section.html id="engagements" title="Engagements" %}

<div class="filters" data-filters hidden>
  <fieldset class="filter-group" data-filter-group="country">
    <legend>Country</legend>
    <button type="button" class="filter-btn" data-value="all" aria-pressed="true">All</button>
    {% for c in countries %}<button type="button" class="filter-btn" data-value="{{ c | slugify }}" aria-pressed="false">{{ c }}</button>
    {% endfor %}
  </fieldset>
  <fieldset class="filter-group" data-filter-group="domain">
    <legend>Domain</legend>
    <button type="button" class="filter-btn" data-value="all" aria-pressed="true">All</button>
    {% for d in domains %}<button type="button" class="filter-btn" data-value="{{ d | slugify }}" aria-pressed="false">{% if d == "MDG" %}MDG and MDM{% else %}{{ d | capitalize }}{% endif %}</button>
    {% endfor %}
  </fieldset>
</div>
<p class="filter-count" data-filter-count aria-live="polite"></p>

<ul class="cards">
{% for p in projects %}
  <li class="card" data-filter-item data-country="{{ p.country | slugify }}" data-domain="{{ p.domain | slugify }}">
    <div class="card-body">
      <div class="card-meta">
        <span class="mono muted">{{ p.country }}</span>
        <span class="tags"><span class="mono muted">{% if p.domain == "MDG" %}MDG and MDM{% else %}{{ p.domain | capitalize }}{% endif %}</span></span>
      </div>
      <h3 class="card-title">{{ p.title }}</h3>
      <p class="card-descriptor mono">{{ p.descriptor }}</p>
      <p class="card-summary">{{ p.summary }}</p>
      <dl>
        <dt>Role</dt><dd>{{ p.role }}</dd>
        {% if p.team_size %}<dt>Team</dt><dd>{{ p.team_size }}</dd>{% endif %}
        {% if p.users %}<dt>Users</dt><dd>{{ p.users }}</dd>{% endif %}
      </dl>
      <details>
        <summary>What I did</summary>
        <ul class="bullets">
          {% for b in p.bullets %}<li>{{ b }}</li>
          {% endfor %}
        </ul>
      </details>
    </div>
  </li>
{% endfor %}
</ul>
