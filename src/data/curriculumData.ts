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
