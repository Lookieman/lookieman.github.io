---
title: Enterprise AI at SAP
permalink: /enterprise-ai/
wide: true
kicker: "SAP Asia / Data and AI, South-East Asia"
intro: "How I take AI agents from discovery to production for SAP customers. The method comes first. Customer work is anonymised and shows method and pattern only."
---
{% assign methods = site.methods | sort: "order" %}
{% assign studies = site.enterprise_ai | sort: "year" | reverse %}

{% include section.html id="method" title="Method" %}

<p>Four rules shape every agent engagement I run.</p>

<ol class="index-list">
{% for m in methods %}
  <li><a href="{{ m.url | relative_url }}"><span class="il-num">{{ m.order | prepend: '0' | slice: -2, 2 }}</span><span class="il-title">{{ m.title }}</span><span class="il-text">{{ m.summary }}</span></a></li>
{% endfor %}
</ol>

{% include section.html id="customer-engagements" title="Customer engagements" %}

<p>Live work for SAP customers in South-East Asia and Korea. None of these agents is in production yet.</p>

<ul class="cards">
{% for e in site.data.engagements.customers %}
  <li class="card">
    <div class="card-body">
      <div class="card-meta">{% include status-badge.html status=e.status %}</div>
      <p class="card-descriptor mono">{{ e.descriptor }}</p>
      <h3 class="card-title">{{ e.problem }}</h3>
      <dl><dt>My role</dt><dd>{{ e.role }}</dd></dl>
    </div>
  </li>
{% endfor %}
</ul>

{% include section.html id="internal-accelerators" title="Internal accelerators" %}

<p>Tools I designed and led for SAP teams.</p>

<ul class="cards">
{% for c in studies %}<li>{% include card.html item=c %}</li>
{% endfor %}
{% for e in site.data.engagements.internal %}
  <li class="card">
    <div class="card-body">
      <div class="card-meta">{% include status-badge.html status=e.status %}<span class="mono muted">{{ e.year }}</span></div>
      <h3 class="card-title">{{ e.title }}</h3>
      <p class="card-summary">{{ e.problem }}</p>
      <p class="card-summary">{{ e.detail }}</p>
      <dl><dt>My role</dt><dd>{{ e.role }}</dd></dl>
      {% include tags.html tags=e.tags limit=4 %}
    </div>
  </li>
{% endfor %}
</ul>

{% include section.html id="the-practice" title="The practice" %}

<p>I built the Applied AI practice for the region. I worked with Customer Success Managers, Enterprise Architects and more than 20 account teams to position SAP Business AI, Joule and agentic AI.</p>

<ul>
  <li>Screened 92 customer AI and generative AI use cases against system access limits and against what SAP already ships. The result was seven buildable clusters and one recommended primary build.</li>
  <li>Designed the evaluation method for agent builds. It uses three synthetic data sets and an answer key written in advance, so we measure accuracy on data the builders have not seen.</li>
  <li>Mentored two colleagues from Python only to a working agent. They built parts on their own, compared them blind and presented each other's work.</li>
  <li>Wrote an agent portfolio of ten use cases across data foundation, migration and operations, and governance, risk and security. Added a field catalogue of 152 agents from SAP and its delivery organisation.</li>
  <li>Designed a source-agnostic migration and data quality pipeline: profiling, harmonisation, rule synthesis, entity resolution, reference data gap detection and dependency-aware load order.</li>
  <li>Built a co-sell deck for Customer Success Managers and Enterprise Architects. Shaped the regional go-to-market agenda with an account-fit rubric, a commercial motion and a RACI for handoff.</li>
  <li>Gave content and audience polls to the Joule for Consultants webinar, and supported a customer session on agentic AI.</li>
  <li>Supported pre-sales across AI, Business Data Cloud and SAP BTP, including a comparison of partner AI proposals.</li>
</ul>
