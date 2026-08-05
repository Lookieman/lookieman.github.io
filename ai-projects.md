# AI and Machine Learning Project Portfolio


## AgentDQ: Agentic Data Quality Assessment for SAP Master Data
**Type:** Self-initiated engineering project
**Timeline:** 2026, in progress
**Role:** Architect and Developer

AgentDQ is a multi-agent system that assesses data quality across SAP master data, aligned to the six DAMA dimensions: Completeness, Validity, Consistency, Accuracy, Timeliness and Uniqueness. Each dimension is handled by a specialist agent. A LangGraph orchestrator coordinates them and produces a consolidated data quality scorecard. The system targets asset-intensive industries and focuses on Material Master (MARA, MARC, MAKT) and Equipment Master.

**Architectural principle: deterministic measurement, agentic interpretation**

The system separates the two jobs that are usually conflated. A pandas-based layer computes the facts, that is population rates, distinct counts, inferred domains and composite-key uniqueness, and never calls a language model. A DSPy layer sits on top and interprets those facts for a data operations audience, citing the numbers it reasons from. Rule execution stays deterministic and is wielded by the agents as a tool. The judgement sits at the front of the pipeline, deciding what the rules should be, and at the back, turning findings into prioritised actions.

**Human approval gate: the agent proposes, the human disposes**

A Rule Suggestion Agent emits candidate rules with rationale, supporting evidence and a decomposed confidence score. Nothing executes until a human reviewer approves it. The gate exists to counter the central failure mode of rule inference from data, which is an agent that suggests rules describing the present state of the data rather than enforcing genuine quality. Every state transition writes an append-only audit entry recording the rule, the actor, the reason and a diff of the rule specification. Agents can never promote rule strength; only a human can, and the promotion is audited and reversible.

**Key Contributions:**
- Designed a seven-package delivery plan where every package ends with a system a person can use, rather than a component that merely compiles
- Built a canonical rule intermediate representation, so rules are described declaratively instead of written as runtime code
- Imported 107 legacy SAP Information Steward rules and repositioned them as a rule bank of templates and priors, re-mapped from the Information Steward taxonomy onto the DAMA dimensions
- Built a Rule Suggestion Agent with two grounded engines: bank matching against profiled field patterns, and data-driven inference for fields with no template
- Implemented a rules repository with a full approval lifecycle (draft, approved, rejected, retired) over a YAML snapshot and a JSONL audit ledger, with two interchangeable backends behind one interface
- Orchestrated the flow as two LangGraph StateGraphs joined by the repository, with a parallel fan-out across the three deterministic dimensions and cross-agent advisories routed to the downstream stage
- Built a ground-truth defect injector that logs each injected defect by table, record and field, enabling precision, recall and F1 measurement per agent per dimension
- Built three Streamlit surfaces: an assessment dashboard, the rule approval gate and a rule bank browser for strength governance
- Built a deterministic onboarding scaffolder that reduces adding a new SAP table to a single schema contract

**Results to date:**
- Packages 1 to 3 complete. Package 4 of 7 in progress.
- 84 tests passing and 1 skipped, all offline, with no LLM or API key required
- Precision and recall of 1.000 on Completeness, Validity and Consistency, measured against injected ground truth on the labelled synthetic path
- Runs on real SAP Cloud Appliance Library extracts (MARA, MARC, MAKT) and surfaces genuine completeness gaps in that data, with ten reference tables loaded

**In progress and planned:**
- Package 4 (current): Uniqueness agent using tiered matching with an LLM adjudicator on borderline cases, and a Remediation agent that prioritises findings by business impact
- Package 5: rule rediscovery harness, per-agent precision, recall and F1, MLflow tracking, empirical calibration of retrieval and confidence dials
- Package 6: migration to a locally hosted model with DSPy and GEPA optimisation, measured before and after
- Package 7: public interactive demo with a session-scoped repository backend, so a visitor can approve and reject candidate rules without touching the real store

**Technologies Used:** Python, LangGraph (StateGraph), DSPy, GEPA, Claude API, Ollama, pandas, rapidfuzz, sentence-transformers, Streamlit, MLflow, YAML, JSONL, pytest, SAP MDG domain model, SAP Information Steward

---

## LLM-Based PII Anonymisation Evaluation Framework
**Organisation:** SAP Asia Pte Ltd, Singapore (Customer Data Hub Team)
**Timeline:** November 2025 - June 2026
**Role:** Technical Lead and Evaluation Framework Designer

Designing and implementing a comprehensive evaluation framework to assess whether Large Language Models can outperform existing anonymisation solutions (GLiNER, DPI) for Personally Identifiable Information detection and masking. The project aims to support investment decisions for LLM-based anonymisation at CPIT by providing quantitative comparative analysis across multiple languages and code-switching scenarios.

**Key Contributions:**
- Architected end-to-end evaluation pipeline with three-level assessment: mention-level coverage (privacy protection), type-level accuracy using IoU-based span matching, and index-level consistency for co-reference tracking
- Designed three-tier comparison methodology isolating the value of each component: naive baseline, DSPy Chain-of-Thought structured prompting, and GEPA-optimised prompts for systematic performance attribution
- Developed comprehensive multilingual test dataset covering 7 languages (English, German, Chinese, French, Spanish, Japanese, Portuguese) with culturally-appropriate PII formats and three levels of code-switching complexity
- Implemented DSPy programmatic prompt engineering framework integrated with SAP Generative AI Hub, replacing manual string-based prompt crafting with structured signatures and automated optimisation
- Created modular evaluation framework supporting 17 entity types with equivalence groups, configurable IoU thresholds, and automated Excel report generation with embedded visualisations
- Designed integration patterns for SAP AI Core deployment including Databricks (MLflow experiment tracking, Delta Lake storage) and BTP Cloud Foundry architectures

**Technologies Used:** Python, DSPy, GEPA, SAP AI Core, SAP Generative AI Hub, Azure Databricks, GPT-4, Claude 3.5 Sonnet, NLP, Named Entity Recognition, IoU-based Span Matching, pandas, openpyxl, Statistical Analysis (scipy)

**Current Status:** Design phase complete with 12-section technical design document. Dataset generation completed for English with 300 records across training, validation, and test splits. Implementation of DSPy-based anonymisation pipeline and GEPA prompt optimisation in progress.

---

## Statement of Work Draft Generator
**Organisation:** SAP Asia Pte Ltd, Singapore
**Timeline:** October 2025 - February 2026
**Role:** Technical Lead and Framework Designer

Designed and developed a Retrieval-Augmented Generation (RAG) system that automates the creation of Statement of Work documents for SAP implementation projects. The application leverages anonymised historical SOW examples to ground LLM outputs, producing professionally formatted Word documents with standardised sections including Introduction, Scope, Detailed Scope, Exclusions, and Assumptions.

**Key Contributions:**
- Architected end-to-end document generation pipeline with modular service-oriented design supporting RAG retrieval, LLM generation, and Word document creation
- Implemented intelligent chunking strategy with metadata-based filtering to retrieve contextually relevant examples by scenario type (SAP SDT, SAP MDG) and document section
- Developed structured prompting framework using DSPy signatures for each SOW section, enabling consistent and controllable content generation
- Created document conversion pipeline to transform existing Word and PDF SOW documents into structured markdown format with anonymisation protocols
- Designed Flask-based web interface for user input collection and document download, with architecture optimised for future SAP BTP migration

**Technologies Used:** Python, Flask, RAG, LlamaIndex, ChromaDB, DSPy, Claude Haiku (Anthropic API), python-docx, Jinja2

**Impact:** Streamlined SOW creation process for SAP consultants by reducing document drafting time through automated retrieval of relevant examples and structured content generation, while maintaining consistency with organisational standards and best practices.

---

## AI-Enabled Pathogen Tracking System for Food Safety Monitoring
**Client:** Singapore Food Agency (SFA)
**Institution:** Nanyang Technological University (Master's Project)
**Timeline:** August 2025 - March 2026
**Role:** Researcher and Developer

Developed an advanced automated system to extract pathogen assay information from scientific literature, significantly improving upon existing BERT-based extraction tools. The project addresses critical food safety monitoring needs by automating literature review for pathogen surveillance.

**Research Objectives:**
- Improve accuracy and precision of pathogen information extraction from scientific literature
- Evaluate effectiveness of LLMs with prompt programming (DSPy) and prompt optimisation (GEPA)
- Determine optimal ground truth requirements for model training
- Assess model performance across different pathogen types for generalisation

**Technical Innovations:**
- Implemented NCBI E-utilities API integration for accessing full-text XML articles instead of PDFs, enabling more accurate text extraction
- Developed two-stage pipeline: Stage 1 (Isolate ID extraction) achieving 87% F1 score, Stage 2 (Assay Info extraction) achieving 78.5% F1 score
- Designed cross-pathogen transfer learning approach, validating that classification methodology generalises across different pathogens (E.coli, Salmonella, Campylobacter, Listeria, Hepatitis A/E)
- Created comprehensive GenBank accession number extraction system with 200+ documented NCBI format patterns
- Built section-aware annotation strategy to prevent error cascading between pipeline stages

**Technical Implementation:**
- Developed PubMed Article Downloader with PMID-to-PMCID conversion, processing ~1,800 documents
- Implemented DSPy-based classification pipeline with Google Colab AI integration
- Designed ground truth data collection framework with error categorisation for iterative improvement
- Established NCBI policy-compliant API usage with proper rate limiting (3-10 requests/second)

**Technologies Used:** Python, DSPy, GEPA, LLMs (GPT-4, Gemini 2.0), BERT, NLP, NCBI E-utilities API, XML Processing, AWS Bedrock, Google Colab, Information Extraction

**Outcome:** System designed for scalable deployment across multiple pathogens for Singapore's food safety infrastructure.

---

## RAG System Evaluation Framework for Enterprise Knowledge Base
**Organisation:** SAP Asia Pte Ltd, Singapore
**Timeline:** October - December 2025
**Role:** Technical Lead and Framework Designer

Designed and implemented a comprehensive evaluation framework for assessing Retrieval-Augmented Generation (RAG) systems deployed on SAP's internal knowledge base. The framework enables systematic evaluation of both retrieval quality and generation accuracy, and compares different prompt engineering approaches.

**Key Contributions:**
- Architected end-to-end evaluation pipeline measuring retrieval metrics (Precision@K, Recall@K, F1, MRR, NDCG) and generation quality (faithfulness, relevance, answer correctness)
- Implemented comparison framework between manual string-based prompts and DSPy programmatic approaches, enabling data-driven decisions on prompt engineering methodology
- Designed ground truth generation strategies and quality assessment protocols for creating reliable evaluation datasets
- Integrated with SAP infrastructure including SAP HANA DB for vector storage and SAP AI Core for LLM/embedding services
- Developed modular Python framework supporting batch evaluation of 100-500 questions with comprehensive logging and reporting

**Technologies Used:** Python, RAG, RAGAS framework, DSPy, NLP, SAP HANA DB, SAP AI Core, GPT-4, OpenAI Embeddings

**Impact:** Enabled systematic assessment of RAG system performance across multiple dimensions, providing quantitative metrics to guide system improvements and validate deployment decisions for enterprise knowledge management.

---

## 3D Reconstruction from Images using Structure from Motion
**Course:** AI6121 Computer Vision
**Institution:** Nanyang Technological University
**Timeline:** October - November 2025
**Role:** Primary Experimenter (Team of 5)

Led experimental campaign for systematic evaluation of COLMAP-based Structure from Motion (SfM) 3D reconstruction across diverse real-world scenes, focusing on parameter optimisation and adaptive pipeline development for robust performance.

**Project Scope:**
- Conducted comprehensive experiments across four distinct NTU campus scenes presenting unique reconstruction challenges: reflective surfaces (Mediacorp Building), repetitive patterns (The Hive), textured outdoor (North Spine), and low-texture environments (Yunnan Garden Pagoda)
- Captured and processed 426 high-resolution images across all scenes with systematic overlap protocols
- Executed 33 reconstruction experiments generating 143,287 3D points and registering 760 cameras

**Technical Achievements:**
- Achieved 100% baseline reconstruction success rate across all four diverse scene types, validating pipeline robustness
- Developed scene difficulty predictor using texture complexity scoring, lighting consistency analysis, and feature density estimation to enable adaptive parameter selection
- Implemented parameter optimisation framework using grid search across SIFT configurations (`max_num_features`: 4,000-16,000, `ratio_threshold`: 0.6-0.9)
- Demonstrated 260% improvement in 3D point reconstruction for challenging reflective scenes through systematic parameter optimisation
- Validated adaptive pipeline achieving 26.9% average improvement across all scenes, with 90.2% peak improvement for reflective surfaces

**Technical Implementation:**
- Built modular Python framework with components for scene analysis, parameter optimisation, adaptive pipeline execution, and comprehensive metrics evaluation
- Developed failure analysis classification system identifying reconstruction failure modes and patterns
- Implemented ablation studies assessing impact of image count on reconstruction quality
- Created comparative study framework evaluating multiple SIFT parameter configurations across diverse scenes

**Technologies Used:** Python, COLMAP, PyColmap, SIFT, OpenCV, NumPy, Open3D, Matplotlib, Google Colab (L4 GPU), Computer Vision, 3D Reconstruction

**Outcomes:** Established quantitative performance baselines for SfM reconstruction across varied scene types, validated scene-adaptive parameter selection methodology, and provided comprehensive experimental framework for computer vision coursework.

---

## Technical Skills and Expertise

**Agentic AI:**
- Orchestration: LangGraph (StateGraph, parallel fan-out, human-in-the-loop gates)
- Agent design: multi-agent systems, tool use, human approval gates, audited state lifecycles
- Prompt programming: DSPy signatures and modules, GEPA optimisation

**Machine Learning and AI:**
- Large Language Models (LLMs): GPT-4, Claude, Gemini
- Frameworks: PyTorch, TensorFlow, DSPy, LangChain, LangGraph
- Techniques: RAG, NLP, Transfer Learning, Prompt Engineering

**Development and Tools:**
- Languages: Python, ABAP
- Platforms: SAP AI Core, SAP BTP, SAP Generative AI Hub, AWS Bedrock, Azure Databricks, Google Colab
- Applications and tracking: Streamlit, Flask, MLflow, pytest
- Version Control: Git, GitHub

**Data and Analytics:**
- Databases: SAP HANA, Vector Databases (FAISS, ChromaDB)
- Processing: Data Pipeline Design, ETL, XML/JSON Processing, pandas
- Evaluation: RAGAS, ground truth defect injection, precision/recall/F1 design, Statistical Testing

**Computer Vision:**
- 3D Reconstruction: Structure from Motion, COLMAP
- Feature Detection: SIFT, ORB
- Libraries: OpenCV, Open3D

---

## Academic Background

**Master of Science in Artificial Intelligence** (Conferred 2026)
Nanyang Technological University, Singapore

**Bachelor of Engineering (Honours) in Computer Engineering** (2005)
Nanyang Technological University, Singapore

---
