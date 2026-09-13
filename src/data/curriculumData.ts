import { Subject } from '../types/curriculum';

export const CURRICULUM: Subject[] = [
  {
    id: 'data-analytics',
    title: '1. Data Analytics (Most Important)',
    badge: 'Core Elective',
    importance: 'Direct Data Analyst Foundation & End-to-End Analytics Pipelines',
    description:
      'From data preprocessing and imputation to hypothesis tests (ANOVA, Chi-Square), clustering, regression, and social media analytics.',
    color: 'emerald',
    iconName: 'Database',
    topics: [
      {
        id: 'data-types-fundamentals',
        title: 'Start of Course: Data Types (Structured, Semi-Structured, Unstructured)',
        subjectId: 'data-analytics',
        category: 'Foundations & Data Engineering',
        difficulty: 'Foundational',
        summary:
          'Data types classify raw data based on its underlying structural format, schema enforcement, and storage organization into Structured (relational tables with rigid schemas), Semi-Structured (polymorphic documents with organizational tags/keys), and Unstructured (native binary/text with no predefined schema) data archetypes.',
        keyConcepts: [
          'Definition of Data Types: Classifying raw data based on its underlying structural format, schema enforcement, and storage organization',
          'Structured Data: High-level organized data that adheres to a rigid, predefined schema and is stored in relational tables with rows and columns (e.g., PostgreSQL, MySQL, Parquet)',
          'Semi-Structured Data: Data that lacks a strict tabular schema but contains organizational markers, tags, or keys to separate data elements (e.g., JSON, XML, YAML, MongoDB, DynamoDB)',
          'Unstructured Data: Data that has no predefined structure, schema, or organization, existing in its native raw binary or textual format (e.g., natural language text, audio, video, sensor streams)',
          'Schema-on-Write vs. Schema-on-Read: Structured RDBMS enforces strict DDL validation on write; semi-structured and unstructured data leverage schema-on-read at query time',
          'Enterprise Volume Distribution: Unstructured data accounts for ~80%+ of global enterprise volume, while structured data powers core transactional accounting and ACID records',
          'Transformation & Analytics Paradigms: ETL for structured warehousing vs. ELT & vector embeddings (Cosine similarity, Transformer encodings) for unstructured data lakes',
          'Indexing & Query Access Mechanisms: B-Tree and Hash indexes for SQL vs. Inverted and document indexes for JSON vs. Vector ANN (HNSW, FAISS) for unstructured media',
        ],
        formulas: [
          {
            name: 'Shannon Entropy of Data Format',
            latex: 'H(X) = -\\sum_{i=1}^{n} P(x_i) \\log_2 P(x_i)',
            explanation: 'Quantifies the average information entropy and compression predictability across structured vs unstructured formats. Structured schemas exhibit low entropy; unstructured raw media exhibits high entropy.',
            variables: [
              { symbol: 'P(x_i)', meaning: 'Probability distribution of tokens or byte symbols' },
              { symbol: 'H(X)', meaning: 'Information entropy in bits' },
            ],
          },
          {
            name: 'Tabular Sparsity vs Document Density',
            latex: '\\text{Sparsity} = 1 - \\frac{\\text{Non-Null Entries}}{\\text{Rows} \\times \\text{Columns}}',
            explanation: 'In tabular structured schemas, polymorphic attributes create extreme null sparsity. Semi-structured document stores eliminate sparsity by only persisting populated keys.',
            variables: [
              { symbol: 'Non-Null Entries', meaning: 'Count of actively populated attribute values' },
              { symbol: 'Rows × Columns', meaning: 'Total matrix grid dimension' },
            ],
          },
          {
            name: 'Cosine Similarity for Unstructured Embeddings',
            latex: '\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}',
            explanation: 'Standard metric utilized by vector databases to execute semantic search and clustering across unstructured text and audio embeddings.',
            variables: [
              { symbol: 'u, v', meaning: 'High-dimensional neural dense embedding vectors' },
              { symbol: '||u||', meaning: 'Euclidean L2 vector norm' },
            ],
          },
        ],
        interactiveType: 'data-types',
        flowchart: {
          title: 'End-to-End Ingestion, Classification & Transformation Pipeline',
          description: 'How modern enterprise platforms ingest, audit schemas, route, and transform Structured, Semi-Structured, and Unstructured data',
          steps: [
            { id: '1', title: '1. Multi-Modal Ingestion Stream', description: 'Receive incoming payloads: relational database CDC feeds, REST API JSONs, and raw S3 audio/text files.', category: 'input' },
            { id: '2', title: '2. Schema Audit & Typology Classification', description: 'Inspect payload structure: validate against rigid DDL, detect self-describing tags, or flag binary blob.', category: 'decision' },
            { id: '3', title: '3. Architectural Storage Routing', description: 'Route structured to Data Warehouses (Snowflake); semi-structured to Document/Lakehouse (MongoDB); unstructured to Object Store (S3).', category: 'process' },
            { id: '4', title: '4. Schema-on-Write vs. Schema-on-Read', description: 'Enforce ACID DDL constraints on write for SQL; preserve raw JSON for dynamic parsing on read.', category: 'process' },
            { id: '5', title: '5. Vectorization & Harmonization', description: 'Flatten nested JSON keys, tokenize text corpus, and generate neural embeddings for unstructured media.', category: 'process' },
            { id: '6', title: '6. Unified Analytical Serving Layer', description: 'Serve clean unified data to SQL reporting dashboards, machine learning models, and real-time LLM RAG pipelines.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
          caption: 'Foundational Data Typology: Tabular Structured rows, hierarchical Semi-Structured JSON, and raw Unstructured media.',
          badge: 'Core Course Foundation',
          diagramType: 'comparison',
        },
        caseStudy: {
          title: 'Amazon E-Commerce: Harmonizing Structured, Semi-Structured & Unstructured Data',
          industry: 'Enterprise E-Commerce & Cloud Analytics',
          companyExample: 'Amazon Consumer Platform & AWS Lake Formation',
          problem: 'Amazon serves over 300 million active shoppers generating billions of events across three incompatible data archetypes: relational order transactions, dynamic product catalog specifications, and customer review text/audio streams.',
          solutionWorkflow: [
            'Structured Data: Stored customer billing, inventory balances, and order ledgers in Aurora PostgreSQL with rigid Schema-on-Write to guarantee ACID consistency.',
            'Semi-Structured Data: Stored polymorphic product specifications (electronics RAM vs apparel fabric) in DynamoDB JSON documents, leveraging Schema-on-Read flexibility.',
            'Unstructured Data: Stored product review images, unboxing video clips, and customer voice calls in Amazon S3; extracted 1536-dimensional embeddings with neural language models.',
            'Data Lakehouse Integration: Unified all three types using AWS Glue and Apache Iceberg, enabling analysts to write standard SQL queries that join structured orders with unstructured review sentiment.',
          ],
          metricsUsed: ['Query Execution Latency', 'Catalog Schema Evolution Time (Reduced from 2 weeks to 0 seconds)', 'Product Recommendation Conversion Rate (+29%)'],
          outcome: 'Eliminated brittle database migrations, enabled real-time product search combining structured price filters with semantic review queries, driving billions in incremental revenue.',
          keyTakeaway: 'Real-world data analytics never operates solely in pristine SQL spreadsheets. Mastering the transformation of structured, semi-structured, and unstructured data is the #1 prerequisite for all advanced analytics.',
        },
        pythonSnippet: {
          title: 'Multi-Modal Data Processing: Handling All 3 Data Types in Python',
          code: `import json
import numpy as np
import pandas as pd

# ==========================================
# 1. STRUCTURED DATA: Tabular & Strict Dtypes
# ==========================================
structured_df = pd.DataFrame({
    'order_id': [1001, 1002, 1003],
    'customer_id': [401, 402, 403],
    'amount': [129.99, 45.50, 899.00],
    'timestamp': pd.to_datetime(['2026-09-01', '2026-09-02', '2026-09-03'])
})
print("=== STRUCTURED (Strict Schema) ===")
print(structured_df.dtypes)
print(structured_df.head(2))

# ==========================================
# 2. SEMI-STRUCTURED DATA: Nested JSON & Normalization
# ==========================================
raw_json_stream = """[
  {"event": "click", "user": {"id": 401, "tier": "Gold"}, "specs": {"browser": "Chrome", "ram_gb": 16}},
  {"event": "purchase", "user": {"id": 402, "tier": "Silver"}, "apparel": {"size": "L", "color": "Navy"}}
]"""
semi_structured_data = json.loads(raw_json_stream)
# Schema-on-Read: Flatten hierarchical JSON into a DataFrame
flattened_df = pd.json_normalize(semi_structured_data)
print("\\n=== SEMI-STRUCTURED (Schema-on-Read) ===")
print(flattened_df)

# ==========================================
# 3. UNSTRUCTURED DATA: Text & Vector Embeddings
# ==========================================
text_reviews = [
    "Battery drains very fast after the 4.2 firmware upgrade.",
    "Outstanding battery longevity, lasts three full days easily."
]
# Simulate dense 4-dimensional neural semantic embeddings
embeddings = np.array([
    [0.85, -0.42, 0.12, 0.28],   # Negative battery sentiment vector
    [-0.78, 0.65, -0.15, -0.10]  # Positive battery sentiment vector
])
# Cosine Similarity between the two unstructured text items
dot_product = np.dot(embeddings[0], embeddings[1])
norm_product = np.linalg.norm(embeddings[0]) * np.linalg.norm(embeddings[1])
cosine_sim = dot_product / norm_product
print("\\n=== UNSTRUCTURED (Vectorized Text Semantic Distance) ===")
print(f"Cosine Similarity between Reviews: {cosine_sim:.4f}")`,
          explanation: 'Demonstrates handling all 3 data types in Python: strict tabular schemas with pandas, dynamic JSON normalization with json_normalize, and unstructured text vectorization with cosine distance calculation.',
        },
        suggestedPrompts: [
          'Explain the fundamental difference between Schema-on-Write and Schema-on-Read.',
          'Why do relational databases struggle when storing polymorphic product catalog data?',
          'How do vector databases enable quantitative analytics and semantic retrieval on unstructured text and audio?',
        ],
        quiz: [
          {
            id: 'q-dt-1',
            question: 'What is the defining characteristic of Structured Data according to the course definition?',
            options: [
              'High-level organized data that adheres to a rigid, predefined schema and is stored in relational tables with rows and columns',
              'Raw continuous audio waveforms stored as uncompressed byte streams',
              'Dynamic documents with no tags, keys, or organizational markers',
              'Textual narratives written in colloquial natural language',
            ],
            correctIndex: 0,
            explanation: 'Structured data is characterized by its strict, predefined tabular schema, column data types, and relational organization.',
          },
          {
            id: 'q-dt-2',
            question: 'Which of the following is classified as Semi-Structured data?',
            options: [
              'A PostgreSQL table with integer primary keys and decimal prices',
              'A JSON document containing nested objects, tags, and polymorphic key-value pairs',
              'An MP3 audio recording of a customer phone conversation',
              'A raw 4K video surveillance camera byte stream',
            ],
            correctIndex: 1,
            explanation: 'JSON lacks a strict tabular schema but contains organizational markers, tags, or keys (curly braces and property names) to separate data elements.',
          },
          {
            id: 'q-dt-3',
            question: 'An enterprise data lake stores patient MRI scan image files and audio transcriptions of doctor consultations. How are these assets classified?',
            options: [
              'Structured Data',
              'Semi-Structured Data',
              'Unstructured Data',
              'Relational OLAP Data',
            ],
            correctIndex: 2,
            explanation: 'MRI scans (pixels) and voice audio recordings exist in native raw binary formats without predefined schemas or tags, making them Unstructured data.',
          },
          {
            id: 'q-dt-4',
            question: 'What is the primary operational advantage of Schema-on-Read used in semi-structured data lakes?',
            options: [
              'It eliminates the need for computer storage hardware',
              'It allows ingesting dynamic and rapidly evolving data without requiring upfront ALTER TABLE database schema migrations',
              'It guarantees 100% relational referential integrity at the hard disk controller level',
              'It completely prevents any missing values or null fields',
            ],
            correctIndex: 1,
            explanation: 'Schema-on-Read allows storing heterogeneous raw payloads immediately and parsing only the required fields when querying, avoiding rigid upfront schema migration locks.',
          },
        ],
      },
      {
        id: 'intro-data-analytics-outcomes',
        title: 'Start of Course: What is Data Analytics & Course Outcomes',
        subjectId: 'data-analytics',
        category: 'Foundations & Course Orientation',
        difficulty: 'Foundational',
        summary:
          'Comprehensive course launchpad: Definition of Data Analytics, differences across analytics paradigms (Descriptive, Diagnostic, Predictive, Prescriptive), data types & schemas, and the 5 foundational Course Outcomes (CO 1-5).',
        keyConcepts: [
          'What is Data Analytics: Converting raw data into verifiable intelligence and algorithmic decision systems',
          'The 4 Analytics Paradigms: Descriptive (What happened?), Diagnostic (Why?), Predictive (What next?), Prescriptive (What to do?)',
          'Course Outcome 1 (CO 1): Understand foundational concepts of data analytics, including data types, preprocessing, and statistical analysis',
          'Course Outcome 2 (CO 2): Apply analytical techniques to extract insights from structured and unstructured data',
          'Course Outcome 3 (CO 3): Analyze real-world datasets using machine learning and visualization tools',
          'Course Outcome 4 (CO 4): Evaluate the performance of data models and interpret results for decision-making',
          'Course Outcome 5 (CO 5): Create end-to-end data analytics pipelines using modern tools and frameworks',
          'Data Typologies: Structured (Relational/SQL, Parquet), Semi-structured (JSON, XML), Unstructured (Text, Audio, Video, Logs)',
        ],
        formulas: [
          {
            name: 'Analytics Value Chain Progression',
            latex: '\\text{Value} = f(\\text{Data Quality}, \\; \\text{Statistical Rigor}, \\; \\text{Model Validation}, \\; \\text{Executive Action})',
            explanation: 'The mathematical returns of an analytics initiative scale multiplicatively across data quality, statistical validity, and execution.',
            variables: [
              { symbol: 'Data Quality', meaning: 'Absence of target leakage, proper imputation, valid schema' },
              { symbol: 'Statistical Rigor', meaning: 'Hypothesis testing (p-value, alpha, power), proper distribution modeling' },
              { symbol: 'Model Validation', meaning: 'ROC-AUC, cross-validation, out-of-time evaluation' },
              { symbol: 'Executive Action', meaning: 'Translation of predictions into bottom-line automated policies' },
            ],
          },
          {
            name: 'Signal-to-Noise Ratio (SNR) in Analytics',
            latex: 'SNR = \\frac{\\mu_{\\text{signal}}}{\\sigma_{\\text{noise}}}',
            explanation: 'Quantifies how much actionable predictive signal exists relative to stochastic background variation.',
            variables: [
              { symbol: 'μ_signal', meaning: 'Mean magnitude of true underlying pattern' },
              { symbol: 'σ_noise', meaning: 'Standard deviation of random measurement error' },
            ],
          },
        ],
        interactiveType: 'pipeline',
        flowchart: {
          title: 'End-to-End Data Analytics Lifecycle & Course Outcomes Mapping',
          description: 'Step-by-step workflow aligning the 5 Course Outcomes to modern data lifecycle engineering',
          steps: [
            { id: '1', title: '1. Problem Framing & Data Typology (CO 1)', description: 'Categorize sources (structured SQL vs unstructured text/logs), define metric objectives, and audit data types.', category: 'input' },
            { id: '2', title: '2. Preprocessing & Leakage-Free Partitions (CO 1 & CO 5)', description: 'Partition into Train/Validation/Test; fit imputers, scalers, and encoders strictly on Train splits.', category: 'process' },
            { id: '3', title: '3. Exploratory Data Analysis & Feature Extraction (CO 2)', description: 'Extract insights from structured distributions and unstructured corpus via NLP and statistical tests.', category: 'process' },
            { id: '4', title: '4. Machine Learning & Forecasting Models (CO 3)', description: 'Train supervised classifiers, decision trees, time series (ARIMA/SARIMA), or clustering algorithms.', category: 'process' },
            { id: '5', title: '5. Model Evaluation & Threshold Tuning (CO 4)', description: 'Evaluate Confusion Matrix, ROC-AUC, PR-AUC, and tune asymmetric business cost-decision thresholds.', category: 'decision' },
            { id: '6', title: '6. End-to-End Automated Pipeline Deployment (CO 5)', description: 'Package into reproducible Scikit-Learn/Docker pipeline artifacts for real-world automated decision-making.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          caption: 'Course Launchpad: Modern Data Analytics lifecycle from raw telemetry to executive insights.',
          badge: 'Course Launchpad',
          diagramType: 'architecture',
        },
        caseStudy: {
          title: 'Building Netflix Personalized Recommendation Intelligence',
          industry: 'Streaming & Media Analytics',
          companyExample: 'Netflix Analytics & Algorithms Group',
          problem: 'Analyzing over 250 million global subscribers generating billions of interaction events daily (structured watch timestamps + unstructured synopsis embeddings).',
          solutionWorkflow: [
            'CO 1: Preprocessed user viewing session logs, handling null stops and network dropouts.',
            'CO 2: Extracted insights from both structured metadata (genre, cast, time of day) and unstructured content summaries.',
            'CO 3: Trained collaborative filtering matrix factorization and ensemble decision trees.',
            'CO 4: Evaluated offline NDCG (Normalized Discounted Cumulative Gain) and conducted online randomized A/B tests.',
            'CO 5: Automated the end-to-end model pipeline with daily continuous retraining and low-latency microservice serving.',
          ],
          metricsUsed: ['Take-Rate (% of recommendations watched)', 'Session Playback Abandonment', 'Subscriber Churn Rate'],
          outcome: 'Over 80% of content watched on Netflix is discovered via algorithmic analytics, saving an estimated $1B annually in customer retention.',
          keyTakeaway: 'Mastering the 5 Course Outcomes empowers data analysts to connect raw distributed telemetry directly to billion-dollar enterprise decisions.',
        },
        pythonSnippet: {
          title: 'Full End-to-End Starter Pipeline: Ingestion to Metric Evaluation',
          code: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

# Step 1 (CO 1): Structured & Unstructured Ingestion Simulation
np.random.seed(42)
n_samples = 1000
data = pd.DataFrame({
    'tenure_months': np.random.exponential(scale=18, size=n_samples),
    'monthly_spend': np.random.normal(loc=75, scale=25, size=n_samples),
    'support_calls': np.random.poisson(lam=2, size=n_samples),
    'contract_tier': np.random.choice(['Monthly', 'Annual', 'Two-Year'], size=n_samples, p=[0.5, 0.3, 0.2]),
})
# Target: Churn binary label (1 = churned)
churn_logits = 0.05 * data['support_calls'] - 0.04 * data['tenure_months'] + 0.01 * data['monthly_spend']
churn_prob = 1 / (1 + np.exp(-churn_logits))
data['churn'] = (np.random.rand(n_samples) < churn_prob).astype(int)

# Step 2 (CO 1 & CO 5): Leak-free Train/Test Partitioning
X = data.drop(columns=['churn'])
y = data['churn']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

# Step 3 (CO 1 & CO 5): Preprocessing ColumnTransformer
num_features = ['tenure_months', 'monthly_spend', 'support_calls']
cat_features = ['contract_tier']

preprocessor = ColumnTransformer(transformers=[
    ('num', Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ]), num_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_features)
])

# Step 4 (CO 3 & CO 5): End-to-End Machine Learning Pipeline
model_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42))
])

# Step 5 (CO 4): Fit and Evaluate
model_pipeline.fit(X_train, y_train)
y_pred_proba = model_pipeline.predict_proba(X_test)[:, 1]
roc_auc = roc_auc_score(y_test, y_pred_proba)

print(f"=== COURSE OUTCOME 4 VALIDATION ===")
print(f"Test ROC-AUC Score: {roc_auc:.4f}")
print("\\nClassification Report:")
print(classification_report(y_test, (y_pred_proba >= 0.5).astype(int)))`,
          explanation: 'Demonstrates all 5 Course Outcomes in 60 lines of clean Python: types, leak-free preprocessing, modeling, evaluation, and end-to-end pipeline creation.',
        },
        suggestedPrompts: [
          'Explain how Course Outcomes 1 through 5 map to the day-to-day responsibilities of a Senior Data Analyst.',
          'What is the difference between structured, semi-structured, and unstructured data in corporate data lakes?',
          'Why is predictive analytics considered incomplete without prescriptive decision modeling?',
        ],
        quiz: [
          {
            id: 'q-intro-1',
            question: 'Which of the following best describes Course Outcome 1 (CO 1)?',
            options: [
              'Understand the foundational concepts of data analytics, including data types, preprocessing, and statistical analysis',
              'Deploy Kubernetes clusters for distributed cloud compute',
              'Design physical microprocessors for GPU data parallelization',
              'Manage human resource hiring for data teams',
            ],
            correctIndex: 0,
            explanation: 'CO 1 establishes the core foundation: mastering data types, rigorous preprocessing, and statistical analysis.',
          },
          {
            id: 'q-intro-2',
            question: 'What is the primary objective of Prescriptive Analytics?',
            options: [
              'To summarize past database records into quarterly tables',
              'To recommend specific optimal actions and operational decisions based on model predictions',
              'To calculate simple arithmetic means of CSV files',
              'To store raw logs on tape storage archives',
            ],
            correctIndex: 1,
            explanation: 'Prescriptive analytics answers "What should we do?" by providing actionable policies, optimization rules, and decision recommendations.',
          },
          {
            id: 'q-intro-3',
            question: 'According to Course Outcome 5 (CO 5), what will students be able to create?',
            options: [
              'Static manual spreadsheets with no automation',
              'End-to-end data analytics pipelines using modern tools and frameworks',
              'Custom proprietary operating systems',
              'Front-end mobile video games',
            ],
            correctIndex: 1,
            explanation: 'CO 5 focuses on building scalable, reproducible end-to-end data analytics pipelines utilizing modern data frameworks.',
          },
        ],
      },
      {
        id: 'data-prep-pipeline',
        title: 'Data Preprocessing & End-to-End Pipelines',
        subjectId: 'data-analytics',
        category: 'Data Engineering & Pipeline',
        difficulty: 'Intermediate',
        summary:
          'Transforming messy raw sources into validated, standardized, and leakage-free analytical datasets through structured ingestion, imputation, outlier mitigation, and feature transformation.',
        keyConcepts: [
          'Garbage-In Garbage-Out: Data quality determines model ceiling',
          'Missingness mechanisms: MCAR (Completely at Random), MAR (At Random), MNAR (Not at Random)',
          'Imputation strategies: Median/Mode, KNN Imputer, MICE (Iterative)',
          'Data Leakage avoidance: Fit imputers/scalers strictly on training splits',
          'Feature scaling: StandardScaler (Z-score) vs MinMaxScaler vs RobustScaler',
        ],
        formulas: [
          {
            name: 'Standard Z-Score Scaler',
            latex: 'z = \\frac{x - \\mu}{\\sigma}',
            explanation: 'Centers data at 0 with unit variance; sensitive to extreme outliers.',
            variables: [
              { symbol: 'x', meaning: 'Original feature value' },
              { symbol: 'μ', meaning: 'Mean of training feature' },
              { symbol: 'σ', meaning: 'Standard deviation' },
            ],
          },
          {
            name: 'Interquartile Range (IQR) Outlier Fences',
            latex: '[Q_1 - 1.5 \\times IQR,\\; Q_3 + 1.5 \\times IQR]',
            explanation: 'Tukey method for outlier detection invariant to normality assumptions.',
            variables: [
              { symbol: 'IQR', meaning: 'Q3 - Q1 (Middle 50% spread)' },
              { symbol: 'Q1, Q3', meaning: '25th and 75th percentiles' },
            ],
          },
        ],
        interactiveType: 'pipeline',
        flowchart: {
          title: 'Production Data Preprocessing Pipeline',
          description: 'Step-by-step pipeline avoiding target leakage',
          steps: [
            { id: '1', title: '1. Ingestion & Schema Validation', description: 'Validate data types, null counts, and schema constraints using Pydantic or Great Expectations.', category: 'input' },
            { id: '2', title: '2. Train-Test Partitioning', description: 'Split before ANY transformation to prevent lookahead bias and target data leakage.', category: 'decision' },
            { id: '3', title: '3. Missing Value Imputation', description: 'Fit SimpleImputer / KNNImputer on Train; transform Train & Test.', category: 'process' },
            { id: '4', title: '4. Outlier Clamping / Encoding', description: 'Winsorization or IQR thresholding; One-Hot or Target Encoding for categoricals.', category: 'process' },
            { id: '5', title: '5. Scaling & Transformation', description: 'Log1p for skewed distributions, RobustScaler for outlier-prone features.', category: 'process' },
            { id: '6', title: '6. Validated Feature Store', description: 'Export normalized feature tensor ready for training and inference pipelines.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          caption: 'Production ETL Pipeline Architecture: Schema ingestion, automated imputation, and leakage-safe transformations.',
          badge: 'Pipeline Architecture',
          diagramType: 'architecture',
        },
        caseStudy: {
          title: 'Uber Driver-Rider Matching Data Pipeline',
          industry: 'Ride-Hailing & Mobility',
          companyExample: 'Uber Dispatch Platform',
          problem: 'GPS dropouts, battery throttling, and latency generate 14% null coordinates and erratic speed anomalies across millions of telemetry points.',
          solutionWorkflow: [
            'Applied Kalman Filtering and spatial KNN imputation for missing GPS pings',
            'Implemented automated IQR fences to filter out impossible supersonic vehicle speeds',
            'Standardized temporal features with cyclical sine/cosine encoders (hour of day, day of week)',
          ],
          metricsUsed: ['ETA Mean Absolute Error (MAE)', 'Data Ingestion Latency (ms)', 'Null Rate Drop'],
          outcome: 'Reduced dispatch ETA errors by 22% and eliminated downstream crash spikes in the matching model.',
          keyTakeaway: 'Always freeze transformation parameters (mean, scale, quantile fences) on training slices before feeding streaming test records.',
        },
        pythonSnippet: {
          title: 'Scikit-Learn ColumnTransformer Pipeline',
          code: `import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

num_cols = ['tenure', 'monthly_charges', 'total_charges']
cat_cols = ['contract_type', 'payment_method']

num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer([
    ('num', num_pipeline, num_cols),
    ('cat', cat_pipeline, cat_cols)
])

# Fit strictly on X_train, then transform both
# X_train_clean = preprocessor.fit_transform(X_train)
# X_test_clean  = preprocessor.transform(X_test)`,
          explanation: 'ColumnTransformer ensures leak-free processing by packaging heterogeneous feature workflows into a single reproducible artifact.',
        },
        suggestedPrompts: [
          'How do I detect whether missing data is MCAR, MAR, or MNAR in Python?',
          'What is data leakage and how does fitting an imputer before train_test_split cause it?',
          'When should I choose RobustScaler over StandardScaler in fintech analytics?',
        ],
        quiz: [
          {
            id: 'q1-1',
            question: 'Why must feature scaling be fitted ONLY on the training split?',
            options: [
              'Because test data has a different number of rows',
              'To avoid data leakage from test distribution into the training pipeline',
              'Because the scaler will throw an error if applied to test data',
              'It does not matter, scaling on full dataset is standard practice',
            ],
            correctIndex: 1,
            explanation: 'Fitting on the full dataset leaks test set statistics (mean and variance) into training, artificially inflating evaluation scores.',
          },
        ],
      },
      {
        id: 'clustering-kmeans',
        title: 'K-Means Clustering & Unsupervised Analytics',
        subjectId: 'data-analytics',
        category: 'Unsupervised Machine Learning',
        difficulty: 'Intermediate',
        summary:
          'Partitioning n observations into k Voronoi cells where each observation belongs to the cluster with the nearest mean centroid, minimizing Within-Cluster Sum of Squares (WCSS).',
        keyConcepts: [
          'Objective: Minimize inertia (Within-Cluster Sum of Squares)',
          'K-Means++ initialization: Smart centroid seeding to avoid local minima',
          'Elbow Method & Silhouette Coefficient for optimal k selection',
          'Spherical assumption: Fails on non-convex or varied-density manifolds',
          'Curse of Dimensionality: Euclidean distance degenerates in high dimensions',
        ],
        formulas: [
          {
            name: 'Inertia / WCSS',
            latex: 'WCSS = \\sum_{i=1}^{k} \\sum_{x \\in C_i} \\|x - \\mu_i\\|^2',
            explanation: 'Measures total squared distance of data points to assigned centroid μ_i.',
            variables: [
              { symbol: 'k', meaning: 'Number of clusters' },
              { symbol: 'C_i', meaning: 'Set of points in cluster i' },
              { symbol: 'μ_i', meaning: 'Centroid coordinates of cluster i' },
            ],
          },
          {
            name: 'Silhouette Score',
            latex: 's(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}',
            explanation: 'Ranges from -1 (misclustered) to +1 (dense, well-separated cluster).',
            variables: [
              { symbol: 'a(i)', meaning: 'Mean intra-cluster distance of point i' },
              { symbol: 'b(i)', meaning: 'Mean nearest-cluster distance of point i' },
            ],
          },
        ],
        interactiveType: 'kmeans',
        flowchart: {
          title: 'K-Means Clustering Iterative Convergence Flowchart',
          description: 'Expectation-Maximization loop from centroid seeding to Voronoi partition convergence',
          steps: [
            { id: '1', title: '1. Standardization & Feature Scaling', description: 'Scale features to zero mean and unit variance so high-magnitude columns do not dominate Euclidean distance.', category: 'input' },
            { id: '2', title: '2. K-Means++ Centroid Seeding', description: 'Sample initial k centroids sequentially with probability proportional to squared distance from nearest chosen center.', category: 'process' },
            { id: '3', title: '3. Voronoi Partition Assignment (E-Step)', description: 'Assign each data point x to the closest centroid μ_j by minimizing Euclidean norm ||x - μ_j||^2.', category: 'process' },
            { id: '4', title: '4. Centroid Recalculation (M-Step)', description: 'Recompute each centroid position as the mathematical mean of all points assigned to that cluster.', category: 'process' },
            { id: '5', title: '5. Convergence Criterion Check', description: 'Check if centroid movements are below threshold epsilon or max iterations reached.', category: 'decision' },
            { id: '6', title: '6. Optimal Cluster Partition & Silhouette Audit', description: 'Output final cluster labels, calculate Silhouette Coefficient, and evaluate cluster density.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
          caption: 'High-dimensional cluster separation and Voronoi partitioning across user behavioral vectors.',
          badge: 'Unsupervised Topology',
          diagramType: 'distribution',
        },
        caseStudy: {
          title: 'Spotify Listener Behavioral Segmentation',
          industry: 'Music Streaming & Media',
          companyExample: 'Spotify Personalization Engine',
          problem: 'Classifying 500 million active listeners into 8 distinct engagement archetypes (e.g., Casual Commuters, Weekend Discovery, Loyal Stans) using audio feature vectors.',
          solutionWorkflow: [
            'Extracted 12 normalized telemetry features: skip rate, session duration, diversity index, danceability preference',
            'Used K-Means++ with k=7 identified via Silhouette analysis and business interpretability',
            'Fed cluster identities into the dynamic home screen layout generator',
          ],
          metricsUsed: ['Silhouette Score (0.64)', 'Day-30 Retention Uplift (+4.2%)', 'Recommendation Click-Through Rate'],
          outcome: 'Delivered tailored curation cards that drove a 19% lift in playlist completion.',
          keyTakeaway: 'Always standardize audio features before K-Means; otherwise high-variance dimensions like stream count dominate distance metrics.',
        },
        pythonSnippet: {
          title: 'K-Means with Silhouette Analysis',
          code: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import numpy as np

# Sample standardized customer feature matrix X
k_range = range(2, 7)
sil_scores = []

for k in k_range:
    kmeans = KMeans(n_clusters=k, init='k-means++', random_state=42, n_init=10)
    labels = kmeans.fit_predict(X)
    score = silhouette_score(X, labels)
    sil_scores.append(score)
    print(f"k={k}, Silhouette Score: {score:.3f}")

# Best model
optimal_k = k_range[np.argmax(sil_scores)]
final_kmeans = KMeans(n_clusters=optimal_k, random_state=42).fit(X)
centroids = final_kmeans.cluster_centers_`,
          explanation: 'Running multiple restarts (n_init) and checking silhouette scores guarantees robust centroid selection.',
        },
        suggestedPrompts: [
          'Walk me through the mathematical proof that K-Means is guaranteed to converge.',
          'Why does K-Means perform poorly with clusters of varying sizes or densities, and how does DBSCAN fix it?',
          'What happens during K-Means++ initialization step-by-step?',
        ],
        quiz: [
          {
            id: 'q1-2',
            question: 'What is the theoretical range of the Silhouette Coefficient?',
            options: ['0 to 1', '-1 to 1', '-infinity to +infinity', '0 to 100'],
            correctIndex: 1,
            explanation: 'The silhouette coefficient ranges from -1 (point is assigned to the wrong cluster) to +1 (point is far from neighboring clusters).',
          },
        ],
      },
      {
        id: 'anova-chi-square',
        title: 'Statistical Tests: ANOVA & Chi-Square',
        subjectId: 'data-analytics',
        category: 'Inferential Analytics & Hypothesis Testing',
        difficulty: 'Intermediate',
        summary:
          'Determining statistical significance across groups. ANOVA compares variance between 3+ continuous group means, while Chi-Square tests independence between categorical variables.',
        keyConcepts: [
          'One-Way ANOVA: Ratio of Between-Group variance to Within-Group variance (F-statistic)',
          'Assumptions of ANOVA: Normality (Shapiro-Wilk), Homoscedasticity (Levene test), Independence',
          'Post-Hoc Tests: Tukey HSD to find which specific group pair differs',
          'Chi-Square Test of Independence: Observed vs Expected frequencies in contingency tables',
          'Degrees of Freedom: (r - 1)(c - 1) for contingency tables',
        ],
        formulas: [
          {
            name: 'ANOVA F-Statistic',
            latex: 'F = \\frac{MS_{between}}{MS_{within}} = \\frac{SS_B / (k - 1)}{SS_W / (N - k)}',
            explanation: 'F >> 1 implies between-group variance significantly exceeds random intra-group noise.',
            variables: [
              { symbol: 'SS_B, SS_W', meaning: 'Sum of squares Between and Within groups' },
              { symbol: 'k, N', meaning: 'Number of groups and total sample size' },
            ],
          },
          {
            name: 'Chi-Square Statistic',
            latex: '\\chi^2 = \\sum \\frac{(O_{ij} - E_{ij})^2}{E_{ij}},\\quad E_{ij} = \\frac{R_i \\times C_j}{N}',
            explanation: 'Quantifies divergence between observed categorical counts and expected counts under independence.',
            variables: [
              { symbol: 'O_ij', meaning: 'Observed count in cell (i, j)' },
              { symbol: 'E_ij', meaning: 'Expected count under independence' },
            ],
          },
        ],
        interactiveType: 'hypothesis-testing',
        flowchart: {
          title: 'Statistical Hypothesis Testing Selection Flowchart',
          description: 'Decision path for determining the correct inferential test (ANOVA vs Chi-Square vs t-Test)',
          steps: [
            { id: '1', title: '1. Problem Formulation & Hypotheses', description: 'State Null Hypothesis (H0: no difference or independent) and Alternative (H1) with alpha = 0.05.', category: 'input' },
            { id: '2', title: '2. Variable Type Identification', description: 'Determine whether the target metric is continuous (means) or categorical (proportions).', category: 'decision' },
            { id: '3', title: '3. Group Count & Normality Verification', description: 'If continuous: check if k >= 3 groups and test normality via Shapiro-Wilk and variance via Levene test.', category: 'decision' },
            { id: '4', title: '4. Test Statistic Computation', description: 'Calculate ANOVA F-ratio (Between MS / Within MS) or Chi-Square divergence sum of (O-E)^2/E.', category: 'process' },
            { id: '5', title: '5. P-Value Evaluation vs Alpha', description: 'Compare p-value with significance threshold. If p < alpha, reject H0 (statistically significant).', category: 'decision' },
            { id: '6', title: '6. Post-Hoc Contrasts & Effect Size', description: 'Run Tukey HSD pairwise contrasts or compute Cramérs V to quantify business effect magnitude.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          caption: 'Variance decomposition and inferential hypothesis testing for multi-group A/B experiment evaluation.',
          badge: 'Statistical Testing',
          diagramType: 'distribution',
        },
        caseStudy: {
          title: 'E-Commerce Checkout Flow A/B/C Multi-Variant Testing',
          industry: 'Retail & E-Commerce',
          companyExample: 'Amazon / Shopify Merchants',
          problem: 'Testing whether 3 distinct checkout designs (Single-Page, 3-Step Accordion, Apple-Pay Express) yield different average order values (continuous) and completion rates (categorical).',
          solutionWorkflow: [
            'Conducted One-Way ANOVA on Basket Size across groups: F = 14.8, p < 0.001',
            'Ran Tukey HSD post-hoc test: Apple-Pay Express outpaced 3-Step Accordion by +$18.40 (95% CI: $12.10 - $24.70)',
            'Constructed a 3x2 Chi-Square contingency table for Abandoned vs Completed carts: chi2 = 42.1, p < 0.0001',
          ],
          metricsUsed: ['F-Ratio', 'p-value (alpha=0.01)', 'Tukey Honest Significant Difference (HSD)'],
          outcome: 'Adopted Apple-Pay Express globally, reducing abandoned checkouts by 16.3%.',
          keyTakeaway: 'Never perform multiple individual pairwise t-tests instead of ANOVA; doing so multiplies the family-wise Type I error rate (alpha inflation).',
        },
        pythonSnippet: {
          title: 'Running One-Way ANOVA and Chi-Square in SciPy',
          code: `import scipy.stats as stats
import pandas as pd

# 1. One-Way ANOVA across 3 group basket sizes
group_a = [45, 52, 60, 48, 55]
group_b = [62, 70, 68, 65, 72]
group_c = [50, 54, 58, 52, 56]

f_stat, p_val = stats.f_oneway(group_a, group_b, group_c)
print(f"ANOVA: F={f_stat:.2f}, p-value={p_val:.4e}")

# 2. Chi-Square Test of Independence
# Contingency table: [Completed, Abandoned] for Designs A, B, C
contingency = [
    [120, 80],   # Design A
    [160, 40],   # Design B
    [110, 90]    # Design C
]
chi2, p_chi, dof, expected = stats.chi2_contingency(contingency)
print(f"Chi-Square: stat={chi2:.2f}, p={p_chi:.4e}, dof={dof}")`,
          explanation: 'SciPy provides f_oneway and chi2_contingency for instant hypothesis verification.',
        },
        suggestedPrompts: [
          'Why does running multiple pairwise t-tests instead of ANOVA inflate Type I error?',
          'What are the non-parametric alternatives when ANOVA normality assumptions fail (Kruskal-Wallis)?',
          'How do you interpret the Chi-Square contingency table expected values formula?',
        ],
        quiz: [
          {
            id: 'q1-3',
            question: 'If you compare 4 groups using pairwise t-tests at alpha=0.05 without correction, what is the family-wise error rate?',
            options: ['0.05', '~0.26', '~0.50', '0.01'],
            correctIndex: 1,
            explanation: 'With 4 groups, there are 4C2 = 6 comparisons. Family-wise error = 1 - (1 - 0.05)^6 ≈ 0.265 (26.5%). ANOVA protects against this.',
          },
        ],
      },
    ],
  },
  {
    id: 'data-visualization',
    title: '2. Data Visualization Techniques',
    badge: 'Core Curriculum',
    importance: 'Exploratory Data Analysis (EDA), Storytelling, and Executive Dashboards',
    description:
      'Master visual encodings, histograms, heatmaps, geospatial mappings, time-series charts, and Tableau/Power BI architectural paradigms.',
    color: 'sky',
    iconName: 'BarChart3',
    topics: [
      {
        id: 'eda-storytelling',
        title: 'Exploratory Data Analysis (EDA) & Data Storytelling',
        subjectId: 'data-visualization',
        category: 'Visual Analytics',
        difficulty: 'Foundational',
        summary:
          'Uncovering distribution shapes, bivariate correlations, and anomalies before modeling. Data storytelling frames visual evidence within a contextual narrative arch.',
        keyConcepts: [
          'Anscombe Quartet & Datasaurus: Summary statistics hide true geometric relationships',
          'Visual Encodings hierarchy: Position > Length > Angle > Area > Color Saturation (Cleveland & McGill)',
          'Pre-attentive attributes: Color hue, orientation, size for instant subconscious recognition (<200ms)',
          'Lie Factor: Edward Tufte rule—size of graphic effect / size of effect in data ≈ 1.0',
          'The 5-second dashboard rule: Key operational metrics visible at a glance',
        ],
        formulas: [
          {
            name: 'Tufte Lie Factor',
            latex: 'Lie\\;Factor = \\frac{\\text{Size of effect shown in graphic}}{\\text{Size of effect in data}}',
            explanation: 'Values significantly greater than 1.0 exaggerate reality, distorting executive decisions.',
            variables: [
              { symbol: 'Effect shown', meaning: '% change represented visually in chart element' },
              { symbol: 'Effect in data', meaning: 'True numerical % change in metric' },
            ],
          },
        ],
        interactiveType: 'eda-visualizer',
        flowchart: {
          title: 'The Structured EDA Workflow',
          description: 'Iterative process of data discovery',
          steps: [
            { id: '1', title: '1. Univariate Profile', description: 'Histograms, Boxplots, Skewness, Kurtosis checks for each continuous attribute.', category: 'process' },
            { id: '2', title: '2. Bivariate Correlation', description: 'Pearson/Spearman heatmaps, pairplots to detect collinearity.', category: 'process' },
            { id: '3', title: '3. Multivariate Interaction', description: 'Facet grids, categorical color encodings to unearth Simpson paradoxes.', category: 'process' },
            { id: '4', title: '4. Executive Synthesis', description: 'Filter down to 3 narrative charts highlighting actionable business drivers.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80',
          caption: 'Exploratory bivariate correlation distributions and outlier detection surface visual.',
          badge: 'Exploratory Analytics',
          diagramType: 'distribution',
        },
        caseStudy: {
          title: 'Targeting Supply Chain Bottlenecks at Nike Logistics',
          industry: 'Supply Chain & Manufacturing',
          companyExample: 'Nike Global Logistics',
          problem: 'Average port dwell times looked stable at 4.1 days, but standard deviation exploded, hiding major container demurrage costs.',
          solutionWorkflow: [
            'Replaced single KPI cards with distribution ridgeplots showing bi-modal spikes on West Coast ports',
            'Built an interactive geospatial flow map correlating vessel anchorage delays with seasonal port strikes',
            'Implemented an anomaly threshold alert in Tableau for fast container re-routing',
          ],
          metricsUsed: ['Dwell Time Kurtosis', 'Demurrage Expense ($M)', 'Lead Time Variance'],
          outcome: 'Discovered a 14-day delay cluster impacting 28% of seasonal shoe launches, recovering $11.4M in potential stockouts.',
          keyTakeaway: 'Never report only mean and median; always plot histograms or violin distributions to uncover hidden multi-modal behavior.',
        },
        pythonSnippet: {
          title: 'Interactive EDA Heatmap & Distribution with Seaborn',
          code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Load dataset
df = sns.load_dataset('titanic')

# 1. Bivariate correlation heatmap
plt.figure(figsize=(8, 6))
numeric_df = df.select_dtypes(include=['float64', 'int64'])
sns.heatmap(numeric_df.corr(), annot=True, cmap='vlag', fmt='.2f', vmin=-1, vmax=1)
plt.title('Pearson Correlation Heatmap')
plt.show()

# 2. Distribution with KDE
sns.displot(df, x='age', hue='survived', kind='kde', fill=True, common_norm=False)
plt.title('Age Distribution Segmented by Survival')
plt.show()`,
          explanation: 'Seaborn heatmaps and KDE overlays reveal hidden cohort survival gaps in seconds.',
        },
        suggestedPrompts: [
          'What is the Datasaurus Dozen and why does it prove summary statistics are insufficient?',
          'How does Cleveland and McGills graphical perception ranking influence dashboard design?',
          'What are the core architectural differences between Tableau extracts and Direct Query in Power BI?',
        ],
        quiz: [
          {
            id: 'q2-1',
            question: 'According to Cleveland & McGill graphical perception studies, which encoding has the highest human accuracy?',
            options: ['Position along a common scale', 'Area of a circle', 'Color saturation', 'Angle/Slope'],
            correctIndex: 0,
            explanation: 'Position along a common scale (e.g. standard bar or scatter plot) is decoded by human visual perception with the highest quantitative precision.',
          },
        ],
      },
      {
        id: 'bi-dashboard-design',
        title: 'Tableau & Power BI Enterprise Architecture',
        subjectId: 'data-visualization',
        category: 'Business Intelligence',
        difficulty: 'Intermediate',
        summary:
          'Designing scalable executive dashboards using Star Schemas, DAX (Data Analysis Expressions), Tableau LOD (Level of Detail) calculations, and optimized refresh pipelines.',
        keyConcepts: [
          'Dimensional Modeling: Fact tables (numerical measures) surrounded by Dimension tables (context attributes)',
          'Star Schema vs Snowflake Schema: Star schemas minimize joins and maximize Power BI VertiPaq engine cache speed',
          'Tableau LOD Expressions: FIXED, INCLUDE, EXCLUDE compute aggregations independent of view level',
          'DAX Context Transition: Row Context vs Filter Context and CALCULATE() modifier',
          'DirectQuery vs Import Mode: Balancing real-time latency with in-memory memory footprint',
        ],
        formulas: [
          {
            name: 'Tableau FIXED LOD Syntax',
            latex: '\\{ \\text{FIXED } [\\text{Region}] : \\text{SUM}([\\text{Sales}]) \\}',
            explanation: 'Computes total sales per region regardless of date or category filters in the current worksheet.',
            variables: [
              { symbol: 'FIXED', meaning: 'Bypasses visualization dimensions' },
            ],
          },
          {
            name: 'Power BI DAX Filter Context Modification',
            latex: '\\text{CALCULATE}(\\text{SUM}(\\text{Sales}[\\text{Amount}]), \\text{ALL}(\\text{Product}))',
            explanation: 'Overwrites existing product filter context to compute total baseline sales for market share %.',
            variables: [
              { symbol: 'CALCULATE', meaning: 'The only DAX function capable of mutating filter context' },
            ],
          },
        ],
        flowchart: {
          title: 'Enterprise Business Intelligence Architecture Flowchart',
          description: 'End-to-end data pipeline from transactional ERP/CRM to optimized executive dashboards',
          steps: [
            { id: '1', title: '1. Operational Ingestion & CDC', description: 'Capture transactional tables from PostgreSQL, Stripe, and Salesforce via Change Data Capture.', category: 'input' },
            { id: '2', title: '2. Dimensional Modeling (Star Schema)', description: 'Transform into centralized Fact tables surrounded by conformed Dimensions (Date, Customer, Product).', category: 'process' },
            { id: '3', title: '3. VertiPaq / Columnar In-Memory Cache', description: 'Stage in BigQuery or Power BI VertiPaq compressed columnar cache for sub-second queries.', category: 'process' },
            { id: '4', title: '4. Semantic Layer & DAX / LOD Measures', description: 'Define governed business metrics with DAX CALCULATE() and Tableau FIXED Level of Detail expressions.', category: 'process' },
            { id: '5', title: '5. Executive Visual Layout & Latency Audit', description: 'Apply 5-second cognitive test, F-pattern layout, and ensure query rendering time is < 1.0 second.', category: 'decision' },
            { id: '6', title: '6. Automated Refresh & Alert Dispatch', description: 'Publish certified reports with automated anomaly alerts dispatched to Slack and executive emails.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
          caption: 'Modern dimensional data warehouse and BI architecture powering real-time executive cockpits.',
          badge: 'BI Architecture',
          diagramType: 'architecture',
        },
        caseStudy: {
          title: 'Enterprise FinTech CFO Executive Cockpit',
          industry: 'Financial Services & Payments',
          companyExample: 'Stripe / Adyen Merchant Reporting',
          problem: 'DirectQuery dashboard with 12 visuals hit 18-second query latency against 200M transaction records, rendering weekly executive reviews unusable.',
          solutionWorkflow: [
            'Redesigned schema into a clean Star Schema with a high-cardinality pre-aggregated Fact table',
            'Implemented composite models in Power BI: In-memory VertiPaq for historical trends, DirectQuery for past 24h real-time settlement',
            'Replaced 8 complex unindexed DAX iterative measures (SUMX) with native columnar aggregations',
          ],
          metricsUsed: ['Dashboard Render Latency (<1.2s)', 'VertiPaq Memory Usage (reduced 65%)'],
          outcome: 'Decreased query wait times from 18 seconds to 850 milliseconds.',
          keyTakeaway: 'In BI tools, 80% of performance optimization happens in data modeling (star schema) rather than visual tweaking.',
        },
        pythonSnippet: {
          title: 'Simulating Dimensional Aggregations in Pandas',
          code: `import pandas as pd

# Creating Fact and Dimension dataframes
fact_sales = pd.DataFrame({
    'date_id': [20260101, 20260101, 20260102],
    'cust_id': [101, 102, 101],
    'revenue': [450.0, 1200.0, 310.0]
})

dim_customer = pd.DataFrame({
    'cust_id': [101, 102],
    'segment': ['Enterprise', 'SMB']
})

# Star Schema Join & Grouping
merged = fact_sales.merge(dim_customer, on='cust_id')
revenue_by_segment = merged.groupby('segment')['revenue'].sum().reset_index()
print(revenue_by_segment)`,
          explanation: 'Demonstrates the basic star schema relational merge and measure aggregation.',
        },
        suggestedPrompts: [
          'What is the difference between FIXED and INCLUDE Level of Detail (LOD) in Tableau?',
          'Explain DAX CALCULATE() and how context transition occurs in Power BI.',
          'Why is Star Schema heavily preferred over Snowflake Schema in in-memory BI tools?',
        ],
        quiz: [
          {
            id: 'q2-2',
            question: 'What happens when CALCULATE() is executed in a DAX measure?',
            options: [
              'It turns the measure into an integer',
              'It evaluates the expression in a modified filter context',
              'It clears all database memory caches',
              'It converts the query to DirectQuery',
            ],
            correctIndex: 1,
            explanation: 'CALCULATE() is the primary engine in DAX that takes filter arguments, overrides or merges with the existing visual filter context, and re-evaluates the aggregation.',
          },
        ],
      },
    ],
  },
  {
    id: 'probability-statistics',
    title: '3. Probability, Statistics and Queuing Theory',
    badge: 'Mathematical Foundation',
    importance: 'The Theoretical Backbone: Inference, Distributions, Bayes, and Queuing Systems',
    description:
      'Rigorous mathematical treatments of Probability, Bayes Theorem, Central Limit Theorem, Hypothesis Testing, and M/M/1 Queuing Theory.',
    color: 'indigo',
    iconName: 'Sigma',
    topics: [
      {
        id: 'bayes-distributions',
        title: 'Probability, Bayes Theorem & Distributions',
        subjectId: 'probability-statistics',
        category: 'Probability Theory',
        difficulty: 'Foundational',
        summary:
          'Bayesian inference updates prior belief with incoming evidence. Parametric distributions (Normal, Poisson, Binomial, Exponential) model diverse real-world stochastic processes.',
        keyConcepts: [
          'Bayes Theorem: Posterior ∝ Likelihood × Prior / Evidence',
          'Law of Total Probability and Marginalization',
          'Central Limit Theorem (CLT): Sample means of any distribution with finite variance approach Gaussian as n → ∞',
          'Poisson Process: Discrete arrivals in continuous time with memoryless inter-arrival times (Exponential)',
          'Binomial to Poisson approximation: When n is large and p is small (λ = np)',
        ],
        formulas: [
          {
            name: 'Bayes Theorem',
            latex: 'P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)} = \\frac{P(B|A) \\cdot P(A)}{\\sum_i P(B|A_i)P(A_i)}',
            explanation: 'Calculates the posterior probability of hypothesis A given observed evidence B.',
            variables: [
              { symbol: 'P(A|B)', meaning: 'Posterior probability' },
              { symbol: 'P(B|A)', meaning: 'Likelihood of evidence given hypothesis' },
              { symbol: 'P(A)', meaning: 'Prior probability of hypothesis' },
              { symbol: 'P(B)', meaning: 'Marginal likelihood (evidence normalizing constant)' },
            ],
          },
          {
            name: 'Poisson Distribution PMF',
            latex: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}',
            explanation: 'Probability of observing exactly k independent events within fixed interval at rate λ.',
            variables: [
              { symbol: 'λ', meaning: 'Mean rate of occurrences per interval' },
              { symbol: 'k', meaning: 'Count of events (0, 1, 2, ...)' },
            ],
          },
        ],
        interactiveType: 'distributions',
        flowchart: {
          title: 'Bayesian Inference & Distribution Selection Flowchart',
          description: 'Probabilistic updating loop and stochastic continuous/discrete distribution selection',
          steps: [
            { id: '1', title: '1. Prior Belief Formulation', description: 'Establish base rate prior probability P(A) from historical domain observations or uniform uninformative prior.', category: 'input' },
            { id: '2', title: '2. Evidence Observation', description: 'Observe new stochastic signal, biomarker test result, or fraudulent login vector B.', category: 'input' },
            { id: '3', title: '3. Likelihood & Total Marginal Probability', description: 'Compute conditional likelihood P(B|A) and calculate evidence denominator via Law of Total Probability.', category: 'process' },
            { id: '4', title: '4. Bayes Posterior Calculation', description: 'Update belief via P(A|B) = [P(B|A) * P(A)] / P(B) to derive exact revised probability.', category: 'process' },
            { id: '5', title: '5. Action Threshold Comparison', description: 'Evaluate whether updated posterior probability breaches risk tolerance or diagnostic cutoff.', category: 'decision' },
            { id: '6', title: '6. Iterative Belief Update', description: 'Current posterior serves as the new informed prior for the next cycle of incoming evidence.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
          caption: 'Mathematical probability distributions, Gaussian curves, and Bayesian inferential updating.',
          badge: 'Stochastic Calculus',
          diagramType: 'distribution',
        },
        caseStudy: {
          title: 'False Positive Paradox in Rare Disease Screening & Fraud',
          industry: 'Healthcare Diagnostics & Cyber Fraud',
          companyExample: 'Card Fraud Detection Engine',
          problem: 'A credit card fraud model has 99% sensitivity (True Positive Rate) and 99% specificity. However, transaction fraud prevalence is 0.1% (1 in 1000). Management assumes a flagged transaction is 99% likely to be fraudulent.',
          solutionWorkflow: [
            'Prior: P(Fraud) = 0.001, P(Legit) = 0.999',
            'P(Alert | Fraud) = 0.99, P(Alert | Legit) = 1 - 0.99 = 0.01',
            'Total Alert Evidence: P(Alert) = (0.99 × 0.001) + (0.01 × 0.999) = 0.00099 + 0.00999 = 0.01098',
            'Posterior: P(Fraud | Alert) = 0.00099 / 0.01098 ≈ 9.01%!',
          ],
          metricsUsed: ['Posterior Probability (Precision)', 'Sensitivity / Recall', 'Base Rate Fallacy'],
          outcome: 'Showed leadership that 91% of alerts are false alarms due to low base rate, guiding implementation of a secondary biometric confirmation step instead of immediate card blocking.',
          keyTakeaway: 'When base rate (prior) is extremely low, even a test with 99% accuracy produces more false positives than true positives.',
        },
        pythonSnippet: {
          title: 'Bayesian Posterior Calculator & Poisson Sim',
          code: `import numpy as np
import scipy.stats as stats

def bayes_posterior(prior, sensitivity, specificity):
    p_b_given_a = sensitivity
    p_b_given_not_a = 1.0 - specificity
    p_evidence = (p_b_given_a * prior) + (p_b_given_not_a * (1.0 - prior))
    posterior = (p_b_given_a * prior) / p_evidence
    return posterior

post = bayes_posterior(prior=0.001, sensitivity=0.99, specificity=0.99)
print(f"P(Fraud | Alert) = {post:.4f} (Only {post*100:.1f}%)")

# Poisson arrival probabilities for call center
lam = 4.5  # average calls per minute
k_vals = np.arange(0, 10)
probs = stats.poisson.pmf(k_vals, mu=lam)
print("P(k calls) for k=0..4:", probs[:5].round(3))`,
          explanation: 'Demonstrates Bayesian posterior calculation and Poisson probability mass functions.',
        },
        suggestedPrompts: [
          'Prove why the Central Limit Theorem holds even if the underlying parent distribution is heavily skewed.',
          'Derive the relationship between Poisson distribution and Exponential inter-arrival times.',
          'Explain the Base Rate Fallacy with a concrete financial fraud detection example.',
        ],
        quiz: [
          {
            id: 'q3-1',
            question: 'If events occur at an average rate of λ = 3 per hour following a Poisson process, what is the distribution of the waiting time between consecutive events?',
            options: ['Normal(μ=3, σ=1)', 'Exponential with rate parameter λ = 3', 'Uniform(0, 3)', 'Binomial(n=3, p=0.5)'],
            correctIndex: 1,
            explanation: 'The time between consecutive arrivals in a Poisson process with rate λ follows an Exponential distribution with mean 1/λ and parameter λ (memoryless property).',
          },
        ],
      },
      {
        id: 'queuing-theory',
        title: 'Queuing Theory & M/M/1 Waiting Lines',
        subjectId: 'probability-statistics',
        category: 'Operations Research & Stochastic Modeling',
        difficulty: 'Advanced',
        summary:
          'Analyzing waiting lines in server architectures, call centers, and cloud microservices. Kendalls notation M/M/1 calculates server utilization, queue length, and waiting times using Littles Law.',
        keyConcepts: [
          'Kendalls Notation: A/S/c (Arrival process / Service time / Number of servers)',
          'M/M/1: Markovian arrivals (Poisson rate λ), Markovian service (Exponential rate μ), 1 server',
          'Traffic Intensity (Utilization): ρ = λ / μ; system is stable ONLY when ρ < 1',
          'Littles Law: L = λW (Average items in system = arrival rate × average time in system)',
          'Non-linear queue explosion: As ρ → 1, average wait time tends toward infinity',
        ],
        formulas: [
          {
            name: 'Traffic Intensity (Utilization)',
            latex: '\\rho = \\frac{\\lambda}{\\mu} \\quad (\\text{Stable if } \\rho < 1)',
            explanation: 'Ratio of arrival rate λ to service rate μ. If ρ ≥ 1, queue grows without bound.',
            variables: [
              { symbol: 'λ', meaning: 'Mean arrival rate (customers / time unit)' },
              { symbol: 'μ', meaning: 'Mean service rate (customers served / time unit)' },
            ],
          },
          {
            name: 'Average Customers in System (L)',
            latex: 'L = \\frac{\\rho}{1 - \\rho} = \\frac{\\lambda}{\\mu - \\lambda}',
            explanation: 'Total expected count of customers currently being served and waiting in line.',
            variables: [
              { symbol: 'L', meaning: 'Average number of customers in system' },
            ],
          },
          {
            name: 'Average Time in System (W)',
            latex: 'W = \\frac{1}{\\mu - \\lambda} = \\frac{L}{\\lambda}',
            explanation: 'Expected total dwell time (waiting time W_q + service time 1/μ).',
            variables: [
              { symbol: 'W', meaning: 'Average total system latency per request' },
            ],
          },
        ],
        interactiveType: 'queuing',
        flowchart: {
          title: 'M/M/1 Server Capacity & Waiting Line Flowchart',
          description: 'Capacity planning and queue stabilization workflow to prevent latency spikes',
          steps: [
            { id: '1', title: '1. Arrival Rate Measurement (λ)', description: 'Model incoming request transactions or customer arrivals as a Poisson process with mean rate λ.', category: 'input' },
            { id: '2', title: '2. Service Capacity Estimation (μ)', description: 'Determine maximum throughput and mean execution duration per worker thread (1 / μ).', category: 'input' },
            { id: '3', title: '3. Stability Condition Check (ρ < 1.0)', description: 'Verify traffic intensity ρ = λ / μ. If ρ ≥ 1, queue grows without bound and rejects traffic.', category: 'decision' },
            { id: '4', title: '4. Littles Law Queue Metrics', description: 'Compute expected queue length L_q = ρ^2 / (1 - ρ) and total system dwell latency W = 1 / (μ - λ).', category: 'process' },
            { id: '5', title: '5. SLA Latency Violation Audit', description: 'Determine if 95th/99th percentile wait times exceed user experience service-level agreements.', category: 'decision' },
            { id: '6', title: '6. Multi-Server Scaling (M/M/c)', description: 'Trigger horizontal container auto-scaling to distribute load across c parallel worker instances.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
          caption: 'Cloud server cluster, connection pool buffers, and high-throughput queuing infrastructure.',
          badge: 'Server Architecture',
          diagramType: 'architecture',
        },
        caseStudy: {
          title: 'Cloud Database Connection Pooling & Latency Spikes',
          industry: 'Cloud Infrastructure & SaaS',
          companyExample: 'AWS / Cloud Run Microservice Architecture',
          problem: 'An API gateway handles λ = 80 requests/sec. Single database connection pool can process μ = 90 queries/sec (utilization ρ = 88.9%). A traffic bump of +10% causes API timeouts to jump by 400%.',
          solutionWorkflow: [
            'Baseline W: 1 / (90 - 80) = 0.100s (100 ms total latency)',
            'Traffic bump to λ = 88 req/sec: New utilization ρ = 88/90 = 97.8%',
            'New W: 1 / (90 - 88) = 0.500s (500 ms latency) — a 500% spike in wait time!',
            'Added an M/M/c multi-server pool (c=3 parallel connection pools), dropping queue wait W_q to <15ms',
          ],
          metricsUsed: ['Traffic Intensity (ρ)', '99th Percentile Latency (p99)', 'Queue Length (L_q)'],
          outcome: 'Stabilized API response times under flash sales without over-provisioning servers.',
          keyTakeaway: 'Queuing systems do not degrade linearly. At ρ > 85%, tiny arrival increments trigger asymptotic queue explosions.',
        },
        pythonSnippet: {
          title: 'M/M/1 Queue Metrics Calculator',
          code: `def mm1_metrics(arrival_rate_lambda, service_rate_mu):
    if arrival_rate_lambda >= service_rate_mu:
        return "System Unstable (rho >= 1.0) - Queue will grow to infinity!"
    
    rho = arrival_rate_lambda / service_rate_mu
    L = rho / (1.0 - rho)           # avg in system
    L_q = (rho ** 2) / (1.0 - rho)   # avg in queue
    W = 1.0 / (service_rate_mu - arrival_rate_lambda) # avg time in system
    W_q = rho / (service_rate_mu - arrival_rate_lambda) # avg time in queue
    
    return {
        "Utilization (rho)": f"{rho*100:.1f}%",
        "Avg in System (L)": round(L, 2),
        "Avg in Queue (Lq)": round(L_q, 2),
        "Total Time (W sec)": round(W, 3),
        "Wait Time (Wq sec)": round(W_q, 3)
    }

print(mm1_metrics(arrival_rate_lambda=80, service_rate_mu=100))`,
          explanation: 'Computes M/M/1 stochastic steady-state performance measures.',
        },
        suggestedPrompts: [
          'What is Littles Law (L = λW) and why does it hold regardless of arrival or service distribution?',
          'How does an M/M/c multi-server queue compare to c independent M/M/1 queues?',
          'Why does latency explode non-linearly when CPU utilization crosses 80%?',
        ],
        quiz: [
          {
            id: 'q3-2',
            question: 'In an M/M/1 queue with λ = 4 customers/hr and μ = 5 customers/hr, what is the average number of customers in the system (L)?',
            options: ['0.8', '4', '5', '16'],
            correctIndex: 1,
            explanation: 'ρ = 4/5 = 0.8. L = ρ / (1 - ρ) = 0.8 / (1 - 0.8) = 0.8 / 0.2 = 4 customers.',
          },
        ],
      },
    ],
  },
  {
    id: 'machine-learning',
    title: '4. Machine Learning',
    badge: 'Predictive Modeling',
    importance: 'Supervised, Unsupervised, Dimensionality Reduction & Rigorous Validation',
    description:
      'Linear & Logistic Regression, Decision Trees, Random Forests, KNN, SVM, PCA dimensionality reduction, and ROC-AUC evaluation metrics.',
    color: 'amber',
    iconName: 'Cpu',
    topics: [
      {
        id: 'classification-metrics',
        title: 'Model Evaluation Metrics: ROC, Precision, Recall, AUC',
        subjectId: 'machine-learning',
        category: 'Model Evaluation & Validation',
        difficulty: 'Intermediate',
        summary:
          'Evaluating classification performance beyond naive accuracy. Trading off Precision and Recall via decision thresholds and summarizing discriminative power via the ROC-AUC curve.',
        keyConcepts: [
          'Confusion Matrix: True Positives (TP), False Positives (FP), True Negatives (TN), False Negatives (FN)',
          'Accuracy Paradox: 99% accuracy is useless when positive prevalence is 0.1%',
          'Precision: Quality of positive predictions (TP / (TP + FP))',
          'Recall (Sensitivity): Quantity of positives retrieved (TP / (TP + FN))',
          'ROC Curve: True Positive Rate vs False Positive Rate across all decision thresholds [0, 1]',
          'PR-AUC vs ROC-AUC: PR-AUC is heavily preferred for severely imbalanced datasets',
        ],
        formulas: [
          {
            name: 'Precision & Recall',
            latex: '\\text{Precision} = \\frac{TP}{TP + FP},\\quad \\text{Recall} = \\frac{TP}{TP + FN}',
            explanation: 'Precision measures exactness; Recall measures completeness.',
            variables: [
              { symbol: 'TP, FP', meaning: 'True Positives, False Positives' },
              { symbol: 'FN', meaning: 'False Negatives (missed cases)' },
            ],
          },
          {
            name: 'F1-Score (Harmonic Mean)',
            latex: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
            explanation: 'Harmonic mean punishes extreme divergence between Precision and Recall.',
            variables: [
              { symbol: 'F1', meaning: 'Balanced single-metric performance indicator' },
            ],
          },
          {
            name: 'ROC Curve Coordinates',
            latex: 'TPR = \\frac{TP}{TP+FN},\\quad FPR = \\frac{FP}{FP+TN}',
            explanation: 'AUC (Area Under Curve) = 1.0 is perfect; 0.5 is random guessing.',
            variables: [
              { symbol: 'TPR, FPR', meaning: 'True Positive Rate (Y-axis) vs False Positive Rate (X-axis)' },
            ],
          },
        ],
        interactiveType: 'confusion-matrix',
        flowchart: {
          title: 'Classification Model Diagnostic & Threshold Calibration Flowchart',
          description: 'Lifecycle of model evaluation balancing precision, recall, and asymmetric business costs',
          steps: [
            { id: '1', title: '1. Model Probability Inference', description: 'Generate continuous probability predictions p_i in [0, 1] for all test instances.', category: 'input' },
            { id: '2', title: '2. Baseline Confusion Matrix (0.50)', description: 'Tabulate True Positives, False Positives, True Negatives, and False Negatives at default 0.50 cutoff.', category: 'process' },
            { id: '3', title: '3. Error Cost Asymmetry Audit', description: 'Assess business cost of False Negative (e.g. missed cancer/fraud) vs False Positive (false alarm).', category: 'decision' },
            { id: '4', title: '4. PR / ROC Curve Threshold Calibration', description: 'Sweep threshold τ from 0 to 1; identify optimal cutoff maximizing F1-score or target Recall.', category: 'process' },
            { id: '5', title: '5. Probability Calibration (Brier / Reliability)', description: 'Validate Platt scaling or Isotonic regression to ensure model probabilities reflect true empirical odds.', category: 'decision' },
            { id: '6', title: '6. Production Monitoring & Drift Alerts', description: 'Monitor Population Stability Index (PSI) and live Precision degradation against test baseline.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          caption: 'Classification confusion matrix, ROC-AUC space, and probability decision boundaries.',
          badge: 'Model Diagnostics',
          diagramType: 'matrix',
        },
        caseStudy: {
          title: 'Subscription Churn Prediction at Netflix',
          industry: 'Video Streaming & SaaS',
          companyExample: 'Netflix Customer Retention',
          problem: 'A model predicts monthly subscriber churn (5% baseline rate). A naive dummy classifier that always predicts "Will Not Churn" achieves 95% accuracy but catches zero churners, costing millions.',
          solutionWorkflow: [
            'Shifted primary optimization metric from Accuracy to PR-AUC and F1-Score',
            'Tuned decision threshold down from 0.50 to 0.28 to prioritize Recall (capturing 84% of at-risk users)',
            'Offered automated personalized content re-engagement discount to the high-probability cohort',
          ],
          metricsUsed: ['ROC-AUC (0.89)', 'PR-AUC (0.58)', 'Net Revenue Churn Reduction (-2.1%)'],
          outcome: 'Retained an estimated 180,000 subscribers per quarter.',
          keyTakeaway: 'Always choose the decision threshold based on business asymmetric cost: Missing a churner ($15/mo lifetime value) costs far more than sending a retention email ($0.01).',
        },
        pythonSnippet: {
          title: 'Calculating ROC-AUC and Precision-Recall in Scikit-Learn',
          code: `from sklearn.metrics import classification_report, roc_auc_score, roc_curve, precision_recall_curve
import numpy as np

# y_true binary labels and y_proba model predictions
y_true = np.array([0, 0, 1, 1, 0, 1, 0, 1, 1, 0])
y_proba = np.array([0.1, 0.2, 0.85, 0.7, 0.3, 0.9, 0.4, 0.65, 0.8, 0.15])

auc = roc_auc_score(y_true, y_proba)
fpr, tpr, thresholds = roc_curve(y_true, y_proba)

print(f"ROC-AUC: {auc:.3f}")
# Binarize at custom threshold 0.35
y_pred = (y_proba >= 0.35).astype(int)
print(classification_report(y_true, y_pred, target_names=['Retained', 'Churn']))`,
          explanation: 'Calculates the complete suite of classification metrics and classification_report.',
        },
        suggestedPrompts: [
          'Why is the harmonic mean used in F1-score rather than the arithmetic mean?',
          'When should a data analyst prefer the Precision-Recall curve over the ROC curve?',
          'How do you pick an optimal probability threshold using an asymmetric cost matrix?',
        ],
        quiz: [
          {
            id: 'q4-1',
            question: 'In a medical cancer detection model where failing to detect cancer is catastrophic, which metric should be maximized?',
            options: ['Precision', 'Specificity', 'Recall (Sensitivity)', 'Accuracy'],
            correctIndex: 2,
            explanation: 'Recall = TP / (TP + FN). Maximizing Recall minimizes False Negatives (missed cancer diagnoses).',
          },
        ],
      },
      {
        id: 'pca-trees-ensemble',
        title: 'Decision Trees, Random Forest & PCA',
        subjectId: 'machine-learning',
        category: 'Tree-based & Dimensionality Reduction',
        difficulty: 'Advanced',
        summary:
          'Tree algorithms split feature spaces recursively using Gini impurity or Information Gain. Random Forests ensemble decorrelated trees. PCA projects high-dimensional correlated features onto orthogonal axes of maximum variance.',
        keyConcepts: [
          'Information Gain: Reduction in Entropy before and after split',
          'Gini Impurity: Probability of incorrectly classifying a randomly chosen element (faster to compute)',
          'Random Forest: Bagging (Bootstrap Aggregating) + Random Subspace feature selection',
          'Bias-Variance Tradeoff: Single deep tree has high variance; forest averages variance down',
          'PCA Eigenvalues & Eigenvectors: Eigenvectors determine principal directions; eigenvalues quantify explained variance',
        ],
        formulas: [
          {
            name: 'Gini Impurity',
            latex: 'Gini(S) = 1 - \\sum_{i=1}^{C} p_i^2',
            explanation: 'Equals 0 for pure node (all same class); 0.5 for balanced binary split.',
            variables: [
              { symbol: 'p_i', meaning: 'Proportion of samples in class i' },
            ],
          },
          {
            name: 'PCA Covariance & Spectral Decomposition',
            latex: '\\Sigma = \\frac{1}{n-1} X^T X = V \\Lambda V^T',
            explanation: 'V contains orthogonal eigenvectors; diagonal entries in Λ are variances along principal axes.',
            variables: [
              { symbol: 'Σ', meaning: 'Covariance matrix of centered data X' },
              { symbol: 'V', meaning: 'Matrix of eigenvectors (principal loading vectors)' },
              { symbol: 'Λ', meaning: 'Diagonal eigenvalues matrix' },
            ],
          },
        ],
        interactiveType: 'decision-tree',
        flowchart: {
          title: 'PCA & Random Forest Ensemble Architecture Flowchart',
          description: 'Dimensionality reduction followed by bootstrapped decision tree ensemble pipeline',
          steps: [
            { id: '1', title: '1. Standardization & Centering', description: 'Zero-center and scale continuous input matrix X to standardize feature variances.', category: 'input' },
            { id: '2', title: '2. Covariance Eigendecomposition', description: 'Compute covariance matrix Σ = (1/(n-1)) X^T X and solve for orthogonal eigenvectors and eigenvalues.', category: 'process' },
            { id: '3', title: '3. Scree Plot Variance Selection', description: 'Select top k principal components retaining ≥90-95% of cumulative explained variance.', category: 'decision' },
            { id: '4', title: '4. Bootstrap Aggregation (Bagging)', description: 'Draw B random subsets with replacement; select random subset of features per split.', category: 'process' },
            { id: '5', title: '5. Parallel Decision Tree Growth', description: 'Train B de-correlated CART trees splitting on Gini Impurity or Information Gain until stopping criteria.', category: 'process' },
            { id: '6', title: '6. Majority Vote & Out-of-Bag Score', description: 'Ensemble individual tree predictions via majority vote and calculate Out-of-Bag generalized error.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
          caption: 'Orthogonal principal component rotation and recursive decision tree branching topology.',
          badge: 'Ensemble Learning',
          diagramType: 'matrix',
        },
        caseStudy: {
          title: 'High-Dimensional Credit Risk Scoring & Fraud Feature Reduction',
          industry: 'Banking & Fintech',
          companyExample: 'Capital One Risk Model',
          problem: 'Credit bureau feeds deliver 340 highly collinear financial metrics (ratios of 30-day, 60-day, 90-day delinquency). Training gradient boosted trees directly causes overfitting and slow inference.',
          solutionWorkflow: [
            'Standardized feature matrix and computed PCA scree plot: first 18 principal components capture 92.4% of total variance',
            'Trained a Random Forest with 200 estimators on the reduced orthogonal space',
            'Compared against a pruned single Decision Tree for regulatory explainability (SHAP values)',
          ],
          metricsUsed: ['Cumulative Explained Variance Ratio', 'Gini Coefficient', 'Out-Of-Bag (OOB) Score'],
          outcome: 'Reduced inference compute latency by 78% while boosting cross-validated AUC from 0.81 to 0.88.',
          keyTakeaway: 'PCA eliminates multicollinearity and compresses dimensions before modeling, but loses individual feature interpretability unless mapped via loadings.',
        },
        pythonSnippet: {
          title: 'PCA Dimensionality Reduction & Random Forest in Python',
          code: `from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# Pipeline combining scaling, PCA to 95% variance, and Random Forest
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA(n_components=0.95)), # Retain 95% variance
    ('rf', RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42))
])

# pipeline.fit(X_train, y_train)
# print(f"Components retained: {pipeline.named_steps['pca'].n_components_}")`,
          explanation: 'PCA within a pipeline automatically retains the minimal components necessary to explain 95% of data variance.',
        },
        suggestedPrompts: [
          'How does Random Forest reduce model variance without increasing bias?',
          'Why must data be centered and scaled before running Principal Component Analysis?',
          'What is the difference between Gini Impurity and Entropy in decision trees?',
        ],
        quiz: [
          {
            id: 'q4-2',
            question: 'Why are the principal components produced by PCA guaranteed to be orthogonal (uncorrelated)?',
            options: [
              'Because they are normalized to sum to 1',
              'Because they are derived as eigenvectors of a symmetric real covariance matrix',
              'Because PCA removes all negative values',
              'They are not orthogonal; they are collinear',
            ],
            correctIndex: 1,
            explanation: 'The sample covariance matrix is symmetric and positive semi-definite; by the Spectral Theorem, its eigenvectors form an orthogonal basis.',
          },
        ],
      },
    ],
  },
  {
    id: 'time-series',
    title: '5. Time Series Analysis',
    badge: 'Forecasting & Temporality',
    importance: 'Predicting the Future: Stationarity, ARIMA, SARIMA, Prophet, and LSTMs',
    description:
      'Master temporal modeling: ACF/PACF analysis, Augmented Dickey-Fuller stationarity tests, Box-Jenkins ARIMA/SARIMA, FaceBook Prophet, and Recurrent Neural Networks (LSTM).',
    color: 'rose',
    iconName: 'TrendingUp',
    topics: [
      {
        id: 'stationarity-arima',
        title: 'Stationarity, ACF/PACF, and ARIMA/SARIMA Models',
        subjectId: 'time-series',
        category: 'Statistical Forecasting',
        difficulty: 'Advanced',
        summary:
          'Forecasting stationary stochastic series. Non-stationary trends are stabilized via differencing (d), then modeled as a linear combination of past lags (AR: p) and past forecast errors (MA: q).',
        keyConcepts: [
          'Weak Stationarity: Constant mean, constant variance, and autocovariance dependent only on lag k',
          'Augmented Dickey-Fuller (ADF) Test: H0 = unit root exists (non-stationary); Reject H0 if p < 0.05',
          'Autocorrelation (ACF) & Partial Autocorrelation (PACF) plots determine p and q order',
          'AR(p): Cuts off on PACF after lag p; tails off on ACF',
          'MA(q): Cuts off on ACF after lag q; tails off on PACF',
          'SARIMA(p,d,q)(P,D,Q)s: Incorporates seasonal period s (e.g. s=12 for monthly, s=7 for daily)',
        ],
        formulas: [
          {
            name: 'ARIMA(p, d, q) Model Equation',
            latex: '\\phi(B)(1 - B)^d Y_t = c + \\theta(B)\\epsilon_t',
            explanation: 'Compact backshift polynomial notation combining differencing, autoregression, and moving average.',
            variables: [
              { symbol: 'B', meaning: 'Backshift operator (B^k Y_t = Y_{t-k})' },
              { symbol: 'ϕ(B)', meaning: 'AR polynomial: 1 - ϕ_1 B - ... - ϕ_p B^p' },
              { symbol: 'θ(B)', meaning: 'MA polynomial: 1 + θ_1 B + ... + θ_q B^q' },
              { symbol: 'ε_t', meaning: 'White noise error ~ N(0, σ²)' },
            ],
          },
          {
            name: 'First-Order Differencing',
            latex: '\\Delta Y_t = Y_t - Y_{t-1} = (1 - B)Y_t',
            explanation: 'Removes linear trends to achieve stationary constant mean.',
            variables: [
              { symbol: 'ΔY_t', meaning: 'Differenced series' },
            ],
          },
        ],
        interactiveType: 'timeseries-decomp',
        flowchart: {
          title: 'Box-Jenkins ARIMA/SARIMA Time Series Modeling Flowchart',
          description: 'Iterative statistical procedure for stationarity transformation, model identification, and forecasting',
          steps: [
            { id: '1', title: '1. Stationarity Diagnostic (ADF Test)', description: 'Plot series and perform Augmented Dickey-Fuller unit root test (H0: non-stationary, p > 0.05).', category: 'decision' },
            { id: '2', title: '2. Differencing Order d & D', description: 'Apply first differencing (1-B) or seasonal differencing (1-B^s) until mean and variance stabilize.', category: 'process' },
            { id: '3', title: '3. ACF & PACF Order Identification', description: 'Inspect PACF cutoff for AR order p, and ACF cutoff for MA order q.', category: 'process' },
            { id: '4', title: '4. Maximum Likelihood Parameter Estimation', description: 'Fit candidate SARIMA(p,d,q)(P,D,Q)s models; minimize Akaike Information Criterion (AIC).', category: 'process' },
            { id: '5', title: '5. Residual Diagnostic & Ljung-Box Test', description: 'Verify model residuals are uncorrelated Gaussian White Noise (p > 0.05 in Ljung-Box).', category: 'decision' },
            { id: '6', title: '6. Out-of-Sample Horizon Forecast', description: 'Generate multi-step point projections with expanding 95% confidence intervals.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
          caption: 'Stochastic temporal oscillations, trend decomposition, and ARIMA lag modeling.',
          badge: 'Time Series Modeling',
          diagramType: 'flow',
        },
        caseStudy: {
          title: 'Daily Electricity Grid Demand Forecasting',
          industry: 'Energy & Utilities',
          companyExample: 'California ISO / National Grid',
          problem: 'Forecasting hour-by-hour MW load to dispatch peaker plants. Data exhibits strong 24-hour daily seasonality, 7-day weekly seasonality, and weather temperature drift.',
          solutionWorkflow: [
            'Tested raw series with ADF test: p-value = 0.42 (non-stationary)',
            'Applied first-order differencing (d=1) and seasonal differencing (D=1, s=24), bringing ADF p-value < 0.001',
            'Inspected ACF and PACF: Identified SARIMA(2, 1, 1)(1, 1, 1)[24]',
            'Benchmarked forecast residuals: Ljung-Box test confirmed white noise (no autocorrelation left)',
          ],
          metricsUsed: ['Mean Absolute Percentage Error (MAPE: 2.3%)', 'Root Mean Squared Error (RMSE)', 'AIC/BIC'],
          outcome: 'Reduced over-generation reserve waste by $4.2M annually.',
          keyTakeaway: 'Always verify model residuals with the Ljung-Box test; if residuals still have autocorrelation, your model missed systematic information.',
        },
        pythonSnippet: {
          title: 'ADF Test and SARIMAX in Statsmodels',
          code: `from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.statespace.sarimax import SARIMAX
import pandas as pd

# 1. ADF Stationarity Test
def check_stationarity(series):
    result = adfuller(series.dropna())
    print(f"ADF Stat: {result[0]:.3f}, p-value: {result[1]:.4e}")
    if result[1] <= 0.05:
        print("=> Reject H0: Series is Stationary")
    else:
        print("=> Fail to Reject H0: Series is Non-Stationary (Needs differencing)")

# 2. Fit SARIMA model
model = SARIMAX(
    data_series,
    order=(1, 1, 1),
    seasonal_order=(1, 1, 1, 12), # monthly seasonality
    enforce_stationarity=False,
    enforce_invertibility=False
)
results = model.fit(disp=False)
print(results.summary())
forecast = results.get_forecast(steps=12).predicted_mean`,
          explanation: 'Statsmodels adfuller tests stationarity, and SARIMAX fits both seasonal and non-seasonal polynomials.',
        },
        suggestedPrompts: [
          'How do you read ACF and PACF plots to select the exact values for p and q in ARIMA?',
          'What is the intuitive meaning of the Augmented Dickey-Fuller (ADF) unit root test?',
          'Why does a random walk require differencing d=1 to become stationary?',
        ],
        quiz: [
          {
            id: 'q5-1',
            question: 'If the PACF plot cuts off sharply after lag 2 while the ACF tails off exponentially, what is the indicated model?',
            options: ['MA(2)', 'AR(2)', 'ARMA(2, 2)', 'White noise'],
            correctIndex: 1,
            explanation: 'An autoregressive process AR(p) exhibits an exponential decay in the ACF and a sharp cut-off after lag p in the PACF.',
          },
        ],
      },
      {
        id: 'prophet-lstm',
        title: 'Facebook Prophet & Deep Learning LSTM Networks',
        subjectId: 'time-series',
        category: 'Advanced Forecasting & Deep Learning',
        difficulty: 'Advanced',
        summary:
          'Modern non-linear time series approaches: Prophet utilizes decomposable additive models with changepoints and holiday effects; LSTMs utilize gating mechanisms to capture long-term sequential dependencies.',
        keyConcepts: [
          'Prophet Additive Architecture: y(t) = g(t) [Trend] + s(t) [Seasonality] + h(t) [Holidays] + ε_t',
          'Automatic Changepoint Detection: Sparse priors (Laplace) on trend flexibility',
          'Recurrent Neural Networks (RNN) Vanishing Gradient problem on long horizons',
          'Long Short-Term Memory (LSTM) Cell: Forget Gate, Input Gate, Cell State update, Output Gate',
          'When to use Prophet vs LSTM: Prophet excels on business time series with holidays and missing dates; LSTM excels on dense high-frequency telemetry with cross-feature interactions',
        ],
        formulas: [
          {
            name: 'Prophet Decomposable Model',
            latex: 'y(t) = g(t) + s(t) + h(t) + \\epsilon_t',
            explanation: 'Formulates forecasting as a curve-fitting generalized additive regression rather than lag-based recurrence.',
            variables: [
              { symbol: 'g(t)', meaning: 'Non-periodic piecewise trend with changepoints' },
              { symbol: 's(t)', meaning: 'Periodic seasonal patterns modeled with Fourier series' },
              { symbol: 'h(t)', meaning: 'Irregular holiday and promotional event effects' },
              { symbol: 'ε_t', meaning: 'Normally distributed error term' },
            ],
          },
          {
            name: 'LSTM Forget Gate Vector',
            latex: 'f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)',
            explanation: 'Outputs values between 0 (completely discard) and 1 (completely keep) for each element in cell state C_{t-1}.',
            variables: [
              { symbol: 'σ', meaning: 'Sigmoid activation function (0 to 1)' },
              { symbol: 'h_{t-1}', meaning: 'Hidden state from previous time step' },
              { symbol: 'x_t', meaning: 'Current input vector at step t' },
            ],
          },
        ],
        interactiveType: 'lstm-cell',
        flowchart: {
          title: 'LSTM Recurrent Network & Prophet Forecasting Flowchart',
          description: 'Deep sequential memory gating pipeline and generalized additive seasonality decomposition',
          steps: [
            { id: '1', title: '1. Sliding Window Tensor Construction', description: 'Transform 1D time series into 3D recurrent sliding lag tensor [samples, timesteps, features].', category: 'input' },
            { id: '2', title: '2. Forget Gate Evaluation (f_t)', description: 'Sigmoid activation determines what portion of past long-term cell state C_{t-1} to discard.', category: 'process' },
            { id: '3', title: '3. Input Gate & Candidate Memory (i_t, C~_t)', description: 'Sigmoid input gate and tanh layer synthesize new candidate information to record into cell state.', category: 'process' },
            { id: '4', title: '4. Cell State Update (C_t)', description: 'Compute C_t = f_t * C_{t-1} + i_t * C~_t, updating the uninterrupted conveyor belt of memory.', category: 'process' },
            { id: '5', title: '5. Output Gate & Hidden State (o_t, h_t)', description: 'Filter tanh(C_t) through sigmoid output gate to produce recurrent state vector h_t.', category: 'process' },
            { id: '6', title: '6. Backtesting & Forecast Horizon', description: 'Generate forward forecasts, evaluate test WAPE, and ensemble with Prophet holiday regressors.', category: 'output' },
          ],
        },
        visualDiagram: {
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          caption: 'Deep recurrent neural memory architectures, sequential vectors, and temporal gating states.',
          badge: 'Deep Learning',
          diagramType: 'architecture',
        },
        caseStudy: {
          title: 'Retail Demand Forecasting across 5,000 SKUs',
          industry: 'Omnichannel Retail & E-Commerce',
          companyExample: 'Walmart / Target Inventory Logistics',
          problem: 'Forecasting weekly SKU sales across stores impacted by Black Friday, Super Bowl, weather disruptions, and irregular stockouts.',
          solutionWorkflow: [
            'Prophet deployed for macro category-level demand: explicitly modeled federal holidays and school vacations with holiday windows [-2, +2]',
            'Stacked LSTM neural network applied to high-frequency perishable grocery items utilizing exogenous weather and discount features',
            'Ensembled forecasts to feed automated automated purchasing orders',
          ],
          metricsUsed: ['WAPE (Weighted Absolute Percentage Error)', 'Stockout Rate (-3.8%)', 'Forecast Bias'],
          outcome: 'Achieved a 12% reduction in perishable food spoilages while maintaining 98.4% in-stock availability.',
          keyTakeaway: 'Prophet is ideal when strong holiday effects and human-interpretable changepoints dominate; LSTMs shine when multiple cross-series interactions drive the pattern.',
        },
        pythonSnippet: {
          title: 'Prophet and PyTorch LSTM Structure',
          code: `# 1. Prophet Model
from prophet import Prophet
import pandas as pd

# Prophet requires columns 'ds' (datestamp) and 'y' (value)
df_prophet = pd.DataFrame({'ds': dates, 'y': sales})
m = Prophet(yearly_seasonality=True, weekly_seasonality=True, daily_seasonality=False)
m.add_country_holidays(country_name='US')
m.fit(df_prophet)

future = m.make_future_dataframe(periods=30)
forecast = m.predict(future)
# m.plot_components(forecast)

# 2. PyTorch LSTM Cell concept
import torch
import torch.nn as nn

class LSTMForecaster(nn.Module):
    def __init__(self, input_dim=1, hidden_dim=64, num_layers=2):
        super().__init__()
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_dim, 1)
        
    def forward(self, x):
        out, (hn, cn) = self.lstm(x)
        return self.fc(out[:, -1, :])`,
          explanation: 'Prophet handles calendar seasonality easily, while LSTM captures multi-lag temporal dynamics.',
        },
        suggestedPrompts: [
          'Explain step-by-step how the Forget, Input, and Output gates in an LSTM cell prevent the vanishing gradient problem.',
          'How does Facebook Prophet model seasonality using Fourier series?',
          'What are the tradeoffs between ARIMA, Prophet, and LSTM for a data analyst in an e-commerce firm?',
        ],
        quiz: [
          {
            id: 'q5-2',
            question: 'What is the mathematical role of the Sigmoid activation function in an LSTM gate?',
            options: [
              'To scale values between -1 and 1 to prevent exploding values',
              'To output values between 0 and 1 acting as a soft binary switch to retain or discard information',
              'To calculate the derivative of the loss function',
              'To introduce linear regression into the cell state',
            ],
            correctIndex: 1,
            explanation: 'The Sigmoid function maps inputs strictly to [0, 1]. Multiplying by 0 blocks the flow of information (forgets), while multiplying by 1 allows all information to pass through unchanged.',
          },
        ],
      },
    ],
  },
];
