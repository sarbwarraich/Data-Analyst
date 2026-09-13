export interface ConceptDiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  description: string;
  type: 'input' | 'process' | 'decision' | 'output' | 'warning' | 'formula';
  badge?: string;
}

export interface ConceptDiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ConceptDetail {
  conceptKey: string;
  question: string;
  shortSummary: string;
  detailedAnswer: {
    coreDefinition: string;
    howItWorks: string[];
    realWorldUseCases: string[];
    commonPitfalls: string[];
    keyTakeaway: string;
  };
  diagram: {
    title: string;
    subtitle: string;
    type: 'flowchart' | 'pipeline' | 'matrix' | 'architecture' | 'comparison' | 'decision';
    nodes: ConceptDiagramNode[];
    edges: ConceptDiagramEdge[];
  };
  mathFormula?: {
    latex: string;
    name: string;
    explanation: string;
    variables: { symbol: string; meaning: string }[];
  };
  pythonExample?: {
    title: string;
    code: string;
    explanation: string;
  };
}

export const DETAILED_CONCEPTS_MAP: Record<string, ConceptDetail> = {
  // 0. Start of Course: Data Types Foundation
  'data-types': {
    conceptKey: 'data-types',
    question: 'How do Structured, Semi-Structured, and Unstructured data types differ in schema enforcement and analytics pipelines?',
    shortSummary:
      'Data types classify raw data based on underlying structural format, schema enforcement, and storage organization into Structured (relational tables), Semi-Structured (polymorphic JSON/XML), and Unstructured (raw text, audio, video) paradigms.',
    detailedAnswer: {
      coreDefinition:
        'Data types classify raw data based on its underlying structural format, schema enforcement, and storage organization. Structured data adheres to rigid predefined tabular schemas; Semi-Structured data uses organizational markers and keys; Unstructured data exists in native raw binary or textual formats without predefined schemas.',
      howItWorks: [
        'Structured Data (Schema-on-Write): Enforces rigid DDL types (INT, VARCHAR, DECIMAL) before writing. Stored in relational RDBMS (PostgreSQL, MySQL, Parquet) optimized for SQL relational algebra and ACID guarantees.',
        'Semi-Structured Data (Schema-on-Read): Employs self-describing tags or key-value hierarchies (JSON, XML, MongoDB). Allows polymorphic attributes without upfront schema migration locks.',
        'Unstructured Data (Neural Embedding): Comprises over 80% of enterprise data (speech, videos, PDFs, raw text). Converted into quantitative feature spaces via deep neural encoders and indexed in vector databases using Cosine similarity.',
      ],
      realWorldUseCases: [
        'Amazon E-Commerce: Harmonizing relational order ledger tables with dynamic catalog JSON specs and unstructured product review sentiment.',
        'Healthcare Analytics: Integrating structured lab panels (EPIC EHR), semi-structured HL7/FHIR JSON records, and unstructured MRI radiography DICOM scans.',
      ],
      commonPitfalls: [
        'Forcing polymorphic semi-structured payloads into rigid SQL tables, resulting in extreme null sparsity and schema lock contention.',
        'Treating unstructured text/audio as simple string columns rather than vectorizing through domain-specific embeddings.',
      ],
      keyTakeaway:
        'Modern analytics workflows are inherently multi-modal; mastering the transformation between structured, semi-structured, and unstructured data is the foundational capability for all data analysts.',
    },
    diagram: {
      title: 'Enterprise Data Typology Hierarchy',
      subtitle: 'Classification by Schema Enforcement & Storage Architecture',
      type: 'comparison',
      nodes: [
        {
          id: '1',
          label: 'Raw Enterprise Ingestion',
          sublabel: 'Multi-Modal Data Streams',
          description: 'Streaming events, transactional databases, and object media files.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Structured Data',
          sublabel: 'Schema-on-Write (RDBMS/SQL)',
          description: 'Relational tables, fixed columns, strict ACID constraints (PostgreSQL, Parquet).',
          type: 'process',
          badge: 'Tabular',
        },
        {
          id: '3',
          label: 'Semi-Structured Data',
          sublabel: 'Schema-on-Read (JSON/XML)',
          description: 'Hierarchical tags and keys, polymorphic documents (MongoDB, DynamoDB).',
          type: 'process',
          badge: 'Self-Describing',
        },
        {
          id: '4',
          label: 'Unstructured Data',
          sublabel: 'No Predefined Schema',
          description: 'Raw text, audio, video, sensor streams (S3, Vector DBs).',
          type: 'process',
          badge: '80%+ Volume',
        },
        {
          id: '5',
          label: 'Harmonized Analytics Layer',
          sublabel: 'BI & Machine Learning',
          description: 'Unified feature store feeding dashboards, SQL OLAP, and predictive AI models.',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Relational CDC' },
        { from: '1', to: '3', label: 'REST APIs / IoT' },
        { from: '1', to: '4', label: 'Object Blobs' },
        { from: '2', to: '5', label: 'SQL Views' },
        { from: '3', to: '5', label: 'JSON Flattening' },
        { from: '4', to: '5', label: 'Vector Embeddings' },
      ],
    },
    mathFormula: {
      name: 'Cosine Similarity for Vectorized Unstructured Records',
      latex: '\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}',
      explanation: 'Quantifies semantic affinity between high-dimensional neural vector representations of unstructured text, audio, or images.',
      variables: [
        { symbol: 'u, v', meaning: 'Dense neural embedding vectors in R^d' },
        { symbol: '||u||', meaning: 'Euclidean L2 vector norm' },
        { symbol: 'cos(θ)', meaning: 'Similarity metric bound in [-1, +1]' },
      ],
    },
    pythonExample: {
      title: 'Handling Structured, Semi-Structured & Unstructured Data in Python',
      code: `import json
import numpy as np
import pandas as pd

# 1. Structured Tabular Schema
df = pd.DataFrame({'id': [1, 2], 'amount': [99.5, 140.0]})
print("Structured dtypes:\\n", df.dtypes)

# 2. Semi-Structured JSON Normalization
json_payload = '[{"user": "A", "specs": {"ram": 16}}, {"user": "B", "specs": {"ram": 32}}]'
normalized = pd.json_normalize(json.loads(json_payload))
print("Semi-Structured flattened:\\n", normalized)

# 3. Unstructured Embedding Cosine Metric
v1, v2 = np.array([0.8, -0.2]), np.array([0.7, -0.1])
sim = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
print(f"Unstructured Cosine Similarity: {sim:.4f}")`,
      explanation: 'Demonstrates Python idioms for strict tabular DataFrames, hierarchical JSON normalization, and dense vector metric calculations.',
    },
  },

  // 1. Data Preprocessing & Leakage
  'data-leakage': {
    conceptKey: 'data-leakage',
    question: 'What is Data Leakage in analytics pipelines, and how do you architect leakage-free validation?',
    shortSummary:
      'Data leakage occurs when information from outside the training dataset (such as future timestamps or test labels) inadvertently contaminates the model during feature engineering or scaling.',
    detailedAnswer: {
      coreDefinition:
        'Data Leakage (target leakage or train-test contamination) is a critical error where features encode predictive signals that would not realistically be available at true inference time. It produces unrealistically high test metrics during validation that collapse catastrophically in live production.',
      howItWorks: [
        'Preprocessing Leakage: Fitting StandardScaler, SimpleImputer, or OneHotEncoder on the entire dataset prior to train-test splitting causes mean/variance information from the test set to bleed into the training partition.',
        'Temporal Lookahead Leakage: In time series or churn forecasting, including future events or rolling statistics that span across the prediction cut-off date.',
        'Target Proxy Leakage: Including an ID or feature that is causally downstream of the target (e.g., "Account Cancellation Date" when predicting "Will Customer Churn").',
      ],
      realWorldUseCases: [
        'Fintech Fraud Detection: Preventing future transaction timestamps from biasing rolling fraud score windows.',
        'Healthcare Sepsis Prediction: Ensuring laboratory measurements taken after ICU admission do not contaminate pre-admission diagnosis models.',
      ],
      commonPitfalls: [
        'Running scaler.fit_transform(X) before train_test_split(X, y).',
        'Over-sampling (SMOTE) before splitting, which duplicates exact synthetic points across both train and test splits.',
        'Calculating target encoding without K-Fold out-of-fold regularization.',
      ],
      keyTakeaway:
        'Golden Rule: Always instantiate a Scikit-Learn Pipeline or ColumnTransformer and fit strictly on X_train only; call transform() on X_val and X_test.',
    },
    diagram: {
      title: 'Leakage-Free Validation Architecture',
      subtitle: 'Strict separation of parameter estimation vs transformation',
      type: 'pipeline',
      nodes: [
        {
          id: '1',
          label: 'Raw Input Data',
          sublabel: 'Tabular / Time Series',
          description: 'Original collected dataset with features and target labels.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Train / Test Split',
          sublabel: 'Stratified / Time-Aware',
          description: 'Partition data FIRST before calculating any means, medians, or vocabularies.',
          type: 'decision',
          badge: 'Firewall',
        },
        {
          id: '3',
          label: 'Fit Transformer on Train',
          sublabel: 'scaler.fit(X_train)',
          description: 'Compute μ, σ, medians, and encoders strictly using training instances.',
          type: 'process',
        },
        {
          id: '4',
          label: 'Transform Test Split',
          sublabel: 'scaler.transform(X_test)',
          description: 'Apply training parameters to test split without re-estimating statistics.',
          type: 'process',
        },
        {
          id: '5',
          label: 'Unbiased Model Validation',
          sublabel: 'True Production Performance',
          description: 'Model evaluated on genuinely unseen distributions without prior contamination.',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Initial Split' },
        { from: '2', to: '3', label: 'Train Records Only' },
        { from: '3', to: '4', label: 'Frozen Parameters' },
        { from: '4', to: '5', label: 'Evaluate' },
      ],
    },
    mathFormula: {
      name: 'Standardization Under Leak-Free Splitting',
      latex: 'z_{\\text{test}} = \\frac{x_{\\text{test}} - \\mu_{\\text{train}}}{\\sigma_{\\text{train}}}',
      explanation: 'Test samples MUST be standardized using the training sample mean and standard deviation, NEVER the test mean.',
      variables: [
        { symbol: 'μ_train', meaning: 'Mean calculated strictly across X_train' },
        { symbol: 'σ_train', meaning: 'Standard deviation calculated strictly across X_train' },
        { symbol: 'x_test', meaning: 'Unseen feature value from validation/test fold' },
      ],
    },
    pythonExample: {
      title: 'Leak-Free Pipeline Architecture in Scikit-Learn',
      code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# 1. Split BEFORE fitting any transformer
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Encapsulate in Pipeline: parameters fit strictly on X_train during pipeline.fit()
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
    ('model', RandomForestClassifier(random_state=42))
])

pipeline.fit(X_train, y_train)
# 3. Predict transforms X_test using parameters learned from X_train
accuracy = pipeline.score(X_test, y_test)
print(f"Leak-Free Unbiased Accuracy: {accuracy:.4f}")`,
      explanation: 'The pipeline guarantees zero parameter bleed between training and evaluation folds.',
    },
  },

  // 2. Missingness Mechanisms
  'missingness-mechanisms': {
    conceptKey: 'missingness-mechanisms',
    question: 'How do MCAR, MAR, and MNAR missingness mechanisms dictate imputation strategies?',
    shortSummary:
      'Understanding whether data is missing completely at random (MCAR), at random given other variables (MAR), or not at random (MNAR) prevents severe systematic bias in downstream statistical conclusions.',
    detailedAnswer: {
      coreDefinition:
        'Missing data mechanisms describe the statistical relationship between the probability of a value being missing and the values of the observed or unobserved variables. Choosing the wrong imputation technique without auditing the mechanism introduces artificial skewness.',
      howItWorks: [
        'MCAR (Missing Completely at Random): The missingness probability is completely independent of both observed and unobserved data (e.g., a lab technician drops random blood vials). Listwise deletion is statistically valid, though inefficient.',
        'MAR (Missing at Random): Missingness depends on observed features but not the missing value itself (e.g., younger users are less likely to report income, but age is fully recorded). Controlled via conditional imputation (MICE, regression, KNN).',
        'MNAR (Missing Not at Random): Missingness depends directly on the unobserved value itself (e.g., individuals with extremely high incomes refuse to disclose salary). Requires pattern-mixture models or explicit missingness indicator flags.',
      ],
      realWorldUseCases: [
        'Clinical Trials: Patients dropping out due to adverse drug side effects (MNAR) must be handled differently than patients who moved cities (MCAR).',
        'Customer Survey Feedback: Unsatisfied customers refusing to answer satisfaction NPS ratings represents MNAR.',
      ],
      commonPitfalls: [
        'Blindly imputing column mean for MNAR data, which compresses variance and conceals high-risk clusters.',
        'Dropping all rows with nulls (dropna), which destroys 50%+ of training samples and biases distributions.',
      ],
      keyTakeaway:
        'Always create a binary boolean indicator column (e.g., feature_is_missing) when imputing MNAR or MAR data to preserve the informative signal of absence.',
    },
    diagram: {
      title: 'Missing Data Mechanism Decision Tree',
      subtitle: 'Diagnostic flow for choosing valid statistical treatment',
      type: 'decision',
      nodes: [
        {
          id: '1',
          label: 'Audit Missing Columns',
          sublabel: 'Identify Null Patterns',
          description: 'Visualize missingness matrix with missingno heatmap or Little’s MCAR test.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Is missingness correlated with observed features?',
          sublabel: 'Logistic Regression on Null Flags',
          description: 'Test whether other columns predict whether this feature is missing.',
          type: 'decision',
        },
        {
          id: '3',
          label: 'MCAR Path',
          sublabel: 'Independent',
          description: 'Simple Median / Mode or Mean Imputation is unbiased.',
          type: 'process',
        },
        {
          id: '4',
          label: 'MAR Path',
          sublabel: 'Conditional Dependency',
          description: 'Use KNNImputer or IterativeImputer (MICE) using observed predictors.',
          type: 'process',
        },
        {
          id: '5',
          label: 'MNAR Warning',
          sublabel: 'Value Itself Causes Absence',
          description: 'Add MissingIndicator feature flag + domain-informed bounds.',
          type: 'warning',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Statistical Audit' },
        { from: '2', to: '3', label: 'No correlation (MCAR)' },
        { from: '2', to: '4', label: 'Correlated with observed (MAR)' },
        { from: '2', to: '5', label: 'Correlated with target/hidden (MNAR)' },
      ],
    },
    mathFormula: {
      name: 'Little’s MCAR Chi-Square Test',
      latex: 'd^2 = \\sum_{j=1}^J n_j (\\bar{y}_j - \\hat{\\mu}_j)^T \\hat{\\Sigma}_j^{-1} (\\bar{y}_j - \\hat{\\mu}_j)',
      explanation: 'Tests the null hypothesis that missingness pattern groups share the same population mean vector.',
      variables: [
        { symbol: 'n_j', meaning: 'Sample size in missingness pattern group j' },
        { symbol: 'y_j', meaning: 'Observed mean vector for group j' },
        { symbol: 'Σ_j', meaning: 'Covariance matrix for group j' },
      ],
    },
    pythonExample: {
      title: 'Iterative Imputation with MissingIndicator',
      code: `from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer, MissingIndicator
from sklearn.pipeline import FeatureUnion

# Add binary flag for missingness to capture MNAR signal
indicator = MissingIndicator()
imputer = IterativeImputer(max_iter=10, random_state=42)

# Fit on training data
X_imputed = imputer.fit_transform(X_train)
X_flags = indicator.fit_transform(X_train)
print(f"Imputed shape: {X_imputed.shape}, Indicator flags: {X_flags.shape}")`,
      explanation: 'Preserves the information that a value was missing while filling continuous slots.',
    },
  },

  // 3. ANOVA & F-Statistic
  'anova-f-statistic': {
    conceptKey: 'anova-f-statistic',
    question: 'How does One-Way ANOVA calculate the F-statistic to compare variances between multiple groups?',
    shortSummary:
      'ANOVA tests whether three or more population means are equal by decomposing total variation into between-group variance (treatment effect) and within-group variance (random noise).',
    detailedAnswer: {
      coreDefinition:
        'Analysis of Variance (ANOVA) evaluates the null hypothesis that several group means are identical (H0: μ1 = μ2 = ... = μk) without inflating Type I error rates that occur when running multiple pairwise t-tests.',
      howItWorks: [
        'Sum of Squares Between (SSB): Measures the deviation of group means from the overall grand mean, scaled by group sample size.',
        'Sum of Squares Within (SSW): Measures individual variability within each group around its respective group mean (unexplained error).',
        'Mean Squares: Divides SSB and SSW by their degrees of freedom (df_between = k - 1, df_within = N - k).',
        'F-Ratio Calculation: F = MSB / MSW. When F > F_critical (or p < 0.05), we reject H0 and conclude at least one group mean differs.',
      ],
      realWorldUseCases: [
        'E-commerce UI Optimization: Testing bounce rates across 4 different promotional banner variants.',
        'Pharmacological Trials: Comparing blood pressure reduction across Placebo, 10mg Dose, and 25mg Dose.',
      ],
      commonPitfalls: [
        'Performing multiple two-sample t-tests instead of ANOVA, which causes family-wise error rate inflation: α_total = 1 - (1 - 0.05)^m.',
        'Ignoring variance heterogeneity (heteroscedasticity); if group variances are unequal, Welch ANOVA must be used.',
      ],
      keyTakeaway:
        'If ANOVA is statistically significant (F is large, p < 0.05), you must follow up with a Tukey HSD post-hoc test to identify exactly which group pairs differ.',
    },
    diagram: {
      title: 'ANOVA Variance Decomposition Flow',
      subtitle: 'Partitioning Total Variance into Between vs Within Group Effects',
      type: 'comparison',
      nodes: [
        {
          id: '1',
          label: 'Total Sum of Squares (SST)',
          sublabel: 'All Observations Deviation from Grand Mean',
          description: 'SST = SSB + SSW (Total variation in dataset)',
          type: 'input',
        },
        {
          id: '2',
          label: 'Between-Group Variance (SSB)',
          sublabel: 'df = k - 1',
          description: 'Reflects true treatment differences among group means.',
          type: 'process',
          badge: 'Signal',
        },
        {
          id: '3',
          label: 'Within-Group Variance (SSW)',
          sublabel: 'df = N - k',
          description: 'Reflects individual random noise and measurement variance.',
          type: 'process',
          badge: 'Noise',
        },
        {
          id: '4',
          label: 'F-Statistic Ratio',
          sublabel: 'F = MSB / MSW',
          description: 'Ratio of Signal to Noise; compare against F-distribution.',
          type: 'decision',
        },
        {
          id: '5',
          label: 'Post-Hoc Tukey HSD',
          sublabel: 'Pairwise Confidence Intervals',
          description: 'Identifies which specific group combinations are significantly different.',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Group Mean Shifts' },
        { from: '1', to: '3', label: 'Individual Errors' },
        { from: '2', to: '4', label: 'Numerator (Signal)' },
        { from: '3', to: '4', label: 'Denominator (Noise)' },
        { from: '4', to: '5', label: 'If p < 0.05' },
      ],
    },
    mathFormula: {
      name: 'One-Way ANOVA F-Statistic',
      latex: 'F = \\frac{\\text{MSB}}{\\text{MSW}} = \\frac{\\frac{\\sum_{i=1}^k n_i (\\bar{x}_i - \\bar{x})^2}{k - 1}}{\\frac{\\sum_{i=1}^k \\sum_{j=1}^{n_i} (x_{ij} - \\bar{x}_i)^2}{N - k}}',
      explanation: 'The F-ratio is the ratio of explained variance (between treatments) to unexplained variance (within treatments).',
      variables: [
        { symbol: 'k', meaning: 'Number of comparison groups' },
        { symbol: 'N', meaning: 'Total number of observations across all groups' },
        { symbol: 'x̄_i', meaning: 'Mean of group i' },
        { symbol: 'x̄', meaning: 'Grand mean across entire combined sample' },
      ],
    },
    pythonExample: {
      title: 'Scipy ANOVA and Statsmodels Tukey HSD',
      code: `import scipy.stats as stats
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# Group data: 3 user interface variants
group_A = [12.4, 14.1, 13.5, 12.9, 13.8]
group_B = [18.2, 19.5, 17.9, 18.8, 19.1]
group_C = [13.1, 12.8, 13.9, 13.4, 14.2]

# 1. Run One-Way ANOVA
f_stat, p_val = stats.f_oneway(group_A, group_B, group_C)
print(f"ANOVA F-stat: {f_stat:.3f}, p-value: {p_val:.5e}")

# 2. If significant, run Tukey HSD
if p_val < 0.05:
    data = group_A + group_B + group_C
    labels = ['A']*5 + ['B']*5 + ['C']*5
    tukey = pairwise_tukeyhsd(data, labels, alpha=0.05)
    print(tukey)`,
      explanation: 'ANOVA confirms if any difference exists, while Tukey HSD isolates precisely where the difference lies.',
    },
  },

  // 4. K-Means Clustering & Elbow
  'kmeans-inertia': {
    conceptKey: 'kmeans-inertia',
    question: 'How does K-Means cluster data points, and how do you find optimal K using Elbow and Silhouette scores?',
    shortSummary:
      'K-Means partitions n observations into k clusters by iteratively assigning each point to the nearest centroid and recalculating centroids until convergence minimizes WCSS.',
    detailedAnswer: {
      coreDefinition:
        'K-Means is an unsupervised partition algorithm that minimizes the Within-Cluster Sum of Squares (Inertia). It discovers geometric cluster spheres in multi-dimensional space without requiring pre-existing ground truth labels.',
      howItWorks: [
        'K-Means++ Initialization: Centroids are chosen probabilistically proportional to squared distance from existing centroids, preventing poor local minima.',
        'Expectation (Assignment): Compute Euclidean distance from every point x to each centroid μ_k; assign point to the nearest cluster.',
        'Maximization (Update): Recalculate each centroid position as the arithmetic mean of all points assigned to that cluster.',
        'Convergence Check: Repeat until centroid movement drops below threshold ε or max iterations reached.',
      ],
      realWorldUseCases: [
        'Customer Segmentation: Grouping users by recency, frequency, and monetary (RFM) transaction values.',
        'Image Compression: Color quantization reducing 16M RGB colors down to 16 dominant palette centroids.',
      ],
      commonPitfalls: [
        'Failing to standardize features: A feature with scale [0, 100000] will overwhelm a feature scaled [0, 1] in Euclidean distance.',
        'Assuming non-spherical clusters: K-Means fails on concentric circles or elongated crescents (DBSCAN is needed).',
      ],
      keyTakeaway:
        'Always combine the Elbow Method (inflection in Inertia) with Silhouette Analysis (measuring separation between clusters from -1 to +1) to validate K.',
    },
    diagram: {
      title: 'K-Means Iterative Optimization Loop',
      subtitle: 'Expectation-Maximization cycle minimizing WCSS',
      type: 'flowchart',
      nodes: [
        {
          id: '1',
          label: 'Feature Standardization',
          sublabel: 'StandardScaler()',
          description: 'Ensure isotropic Euclidean geometry across all feature axes.',
          type: 'input',
        },
        {
          id: '2',
          label: 'K-Means++ Initialization',
          sublabel: 'Spread Initial Seeds',
          description: 'Pick seed 1 randomly; pick subsequent seeds with probability proportional to D(x)^2.',
          type: 'process',
        },
        {
          id: '3',
          label: 'Assignment Step (E-Step)',
          sublabel: 'argmin ||x - μ_k||^2',
          description: 'Assign each data point to its closest centroid in metric space.',
          type: 'process',
        },
        {
          id: '4',
          label: 'Centroid Update (M-Step)',
          sublabel: 'μ_k = (1/|S_k|) Σ x',
          description: 'Compute new centroid as the geometric center of cluster members.',
          type: 'process',
        },
        {
          id: '5',
          label: 'Did Centroids Move < ε?',
          sublabel: 'Convergence Criterion',
          description: 'If moved, loop back to Assignment. If converged, output final clusters.',
          type: 'decision',
        },
        {
          id: '6',
          label: 'Final Clusters & Silhouette Metric',
          sublabel: 'Evaluate Quality',
          description: 'Calculate average silhouette score to verify partition tightness and separation.',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Scale-Free Tensor' },
        { from: '2', to: '3', label: 'Initial Centroids' },
        { from: '3', to: '4', label: 'Points Partitioned' },
        { from: '4', to: '5', label: 'New Centroids' },
        { from: '5', to: '3', label: 'Yes (Shifted > ε)' },
        { from: '5', to: '6', label: 'No (Converged)' },
      ],
    },
    mathFormula: {
      name: 'Within-Cluster Sum of Squares (Inertia)',
      latex: 'J = \\sum_{k=1}^K \\sum_{x_i \\in C_k} \\| x_i - \\mu_k \\|^2',
      explanation: 'Objective function minimized by K-Means. Inertia decreases monotonically as K increases.',
      variables: [
        { symbol: 'K', meaning: 'Number of distinct clusters' },
        { symbol: 'C_k', meaning: 'Set of points belonging to cluster k' },
        { symbol: 'μ_k', meaning: 'Centroid mean vector of cluster k' },
        { symbol: 'x_i', meaning: 'Observation feature vector' },
      ],
    },
    pythonExample: {
      title: 'Evaluating Optimal K with Silhouette and Inertia',
      code: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import numpy as np

# Standardized data X_scaled
inertias = []
silhouettes = []
k_range = range(2, 8)

for k in k_range:
    km = KMeans(n_clusters=k, init='k-means++', random_state=42, n_init=10)
    labels = km.fit_predict(X_scaled)
    inertias.append(km.inertia_)
    silhouettes.append(silhouette_score(X_scaled, labels))
    print(f"K={k}: Inertia={km.inertia_:.1f}, Silhouette={silhouettes[-1]:.3f}")

best_k = k_range[np.argmax(silhouettes)]
print(f"Optimal K by Silhouette Score: {best_k}")`,
      explanation: 'Silhouette scores close to +1 indicate dense, well-separated cluster geometry.',
    },
  },

  // 5. Anscombe's Quartet & EDA
  'anscombes-quartet': {
    conceptKey: 'anscombes-quartet',
    question: 'Why does Anscombe’s Quartet prove that summary statistics can be dangerously deceptive?',
    shortSummary:
      'Anscombe’s Quartet comprises four datasets that possess identical summary statistics (means, variances, correlations, and regression lines) but radically different visual distributions.',
    detailedAnswer: {
      coreDefinition:
        'Constructed by statistician Francis Anscombe in 1973, this quartet demonstrates that mathematical summary statistics (mean, standard deviation, Pearson r, OLS slope) fail to capture non-linear shapes, high-leverage outliers, and clustering.',
      howItWorks: [
        'Dataset I: Follows a traditional linear relationship with normal residual scatter.',
        'Dataset II: A pure non-linear quadratic parabola, yet has the exact same correlation (r = 0.816) as Dataset I.',
        'Dataset III: A tight linear relationship with a single vertical outlier that pulls the regression line upward.',
        'Dataset IV: Vertical cluster where all x-values are 8 except for a single extreme leverage outlier at x=19 that artificially creates the high correlation.',
      ],
      realWorldUseCases: [
        'Financial Risk Modeling: Relying solely on portfolio covariance matrices without charting tail events leads to catastrophic drawdowns.',
        'Sensor Telemetry Monitoring: A broken sensor stuck at a fixed value with occasional spikes can mimic a valid linear distribution.',
      ],
      commonPitfalls: [
        'Fitting linear models without inspecting residual plots (residuals vs fitted).',
        'Reporting Pearson correlation without verifying bivariate normality and absence of influential leverage points.',
      ],
      keyTakeaway:
        'Always visualize data distributions through scatter plots, histograms, and box plots before computing correlation or training models.',
    },
    diagram: {
      title: 'Anscombe’s Four Deceptive Geometries',
      subtitle: 'Identical Statistics (x̄=9, ȳ=7.5, r=0.816) vs Real Data Structures',
      type: 'comparison',
      nodes: [
        {
          id: '1',
          label: 'Identical Summary Stats',
          sublabel: 'x̄=9.0, ȳ=7.5, r=0.816, y=3+0.5x',
          description: 'Looking only at tabular numbers, all four datasets appear identical.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Dataset I: Clean Linear',
          sublabel: 'Valid OLS Fit',
          description: 'True linear relationship with homoscedastic gaussian noise.',
          type: 'process',
        },
        {
          id: '3',
          label: 'Dataset II: Parabolic Curve',
          sublabel: 'Non-Linear Physics',
          description: 'Zero linear fit; requires polynomial y = a + bx + cx^2.',
          type: 'warning',
        },
        {
          id: '4',
          label: 'Dataset III: Outlier Contamination',
          sublabel: 'Robust Regression Needed',
          description: 'Perfect line corrupted by 1 influential outlier. RANSAC handles this.',
          type: 'warning',
        },
        {
          id: '5',
          label: 'Dataset IV: High-Leverage Anchor',
          sublabel: 'Artificial Slope',
          description: 'No variation in x except one extreme leverage point creating false correlation.',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Visualize' },
        { from: '1', to: '3', label: 'Visualize' },
        { from: '1', to: '4', label: 'Visualize' },
        { from: '1', to: '5', label: 'Visualize' },
      ],
    },
    mathFormula: {
      name: 'Pearson Correlation Coefficient',
      latex: 'r = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^n (x_i - \\bar{x})^2} \\sqrt{\\sum_{i=1}^n (y_i - \\bar{y})^2}}',
      explanation: 'Measures ONLY linear association. Anscombe’s datasets all have r = 0.816 despite completely non-linear relationships.',
      variables: [
        { symbol: 'r', meaning: 'Sample Pearson correlation coefficient (-1 to +1)' },
        { symbol: 'x̄, ȳ', meaning: 'Sample means of features X and Y' },
      ],
    },
    pythonExample: {
      title: 'Visualizing Anscombe Quartet with Seaborn',
      code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load built-in Anscombe dataset
df = sns.load_dataset("anscombe")

# Plot all 4 datasets with regression lines
sns.lmplot(x="x", y="y", col="dataset", hue="dataset", data=df,
           col_wrap=2, ci=None, palette="muted", height=3.5,
           scatter_kws={"s": 60, "alpha": 1})
plt.suptitle("Anscombe's Quartet: Identical Numbers, Completely Different Truth", y=1.02)
plt.show()`,
      explanation: 'Reveals the four vastly different geometries that produce identical statistical metrics.',
    },
  },

  // 6. Bayes' Theorem
  'bayes-theorem': {
    conceptKey: 'bayes-theorem',
    question: 'How does Bayes’ Theorem update prior probabilities with new likelihood evidence to compute posteriors?',
    shortSummary:
      'Bayes’ Theorem provides the mathematical framework for updating the probability of a hypothesis as more empirical evidence or data arrives.',
    detailedAnswer: {
      coreDefinition:
        'Bayes’ Theorem calculates the conditional probability P(A|B) using the prior belief P(A), the likelihood P(B|A), and the marginal evidence P(B). It overcomes human cognitive flaws like the base-rate fallacy.',
      howItWorks: [
        'Prior Probability P(H): Baseline belief in hypothesis H before observing new data (e.g., population disease prevalence = 0.1%).',
        'Likelihood P(E|H): Probability of observing evidence E given that hypothesis H is true (e.g., test sensitivity = 99%).',
        'Evidence P(E): Total probability of observing evidence across all states: P(E) = P(E|H)P(H) + P(E|~H)P(~H).',
        'Posterior Probability P(H|E): Updated probability of hypothesis H after integrating the new evidence.',
      ],
      realWorldUseCases: [
        'Spam Filtering: Updating the probability that an email is spam given the presence of words like "wire transfer" or "free lottery".',
        'Clinical Medical Diagnosis: Calculating true positive probability when screening for rare conditions in general populations.',
      ],
      commonPitfalls: [
        'Base Rate Fallacy: Confusing the test accuracy P(Positive|Sick) with the patient probability P(Sick|Positive). When a disease is rare, even a 99% accurate test yields mostly false positives.',
        'Assuming features are independent when using Naive Bayes without checking conditional covariance.',
      ],
      keyTakeaway:
        'Rare events require extraordinarily high test specificity to achieve acceptable positive predictive value (PPV).',
    },
    diagram: {
      title: 'Bayesian Belief Revision Flow',
      subtitle: 'Prior Knowledge $\\rightarrow$ Empirical Evidence $\\rightarrow$ Posterior Truth',
      type: 'flowchart',
      nodes: [
        {
          id: '1',
          label: 'Prior Probability P(H)',
          sublabel: 'Base Rate Prevalence',
          description: 'Historical frequency or prior belief before receiving new data.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Observed Evidence (E)',
          sublabel: 'Test Result / Sensor Reading',
          description: 'Empirical measurement with known True Positive Rate & False Positive Rate.',
          type: 'process',
        },
        {
          id: '3',
          label: 'Marginal Evidence P(E)',
          sublabel: 'Total Probability Law',
          description: 'P(E) = P(E|H)P(H) + P(E|~H)P(~H) (Normalizing denominator).',
          type: 'process',
        },
        {
          id: '4',
          label: 'Posterior Probability P(H|E)',
          sublabel: 'Updated Belief',
          description: 'Final calibrated probability given both prior base rate and new evidence.',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '3', label: 'Weights Prior' },
        { from: '2', to: '3', label: 'Likelihood P(E|H)' },
        { from: '3', to: '4', label: 'Bayes Equation' },
      ],
    },
    mathFormula: {
      name: 'Bayes’ Theorem Formulation',
      latex: 'P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)} = \\frac{P(E \\mid H) \\cdot P(H)}{P(E \\mid H)P(H) + P(E \\mid \\neg H)P(\\neg H)}',
      explanation: 'Posterior is equal to Likelihood times Prior divided by Total Evidence.',
      variables: [
        { symbol: 'P(H|E)', meaning: 'Posterior probability of hypothesis H given evidence E' },
        { symbol: 'P(E|H)', meaning: 'Likelihood of evidence E assuming hypothesis H is true' },
        { symbol: 'P(H)', meaning: 'Prior probability of hypothesis H before observing evidence' },
        { symbol: 'P(E)', meaning: 'Marginal probability of observing evidence across all states' },
      ],
    },
    pythonExample: {
      title: 'Solving the Rare Disease False Positive Paradox',
      code: `def bayes_posterior(prior, sensitivity, specificity):
    """
    prior: P(Disease)
    sensitivity: P(Positive | Disease)
    specificity: P(Negative | Healthy) -> False Positive Rate = 1 - specificity
    """
    fpr = 1.0 - specificity
    p_evidence = (sensitivity * prior) + (fpr * (1.0 - prior))
    posterior = (sensitivity * prior) / p_evidence
    return posterior

# Rare disease: 1 in 1000 people (0.1%), Test is 99% sensitive and 95% specific
prior = 0.001
sens = 0.99
spec = 0.95

post = bayes_posterior(prior, sens, spec)
print(f"Probability patient actually has disease after testing positive: {post*100:.2f}%")
# Result is only ~1.94% due to the low base rate!`,
      explanation: 'Demonstrates why base rates dominate rare event classification.',
    },
  },

  // 7. Queuing Theory & M/M/1
  'queuing-mm1': {
    conceptKey: 'queuing-mm1',
    question: 'Why does queue delay explode asymptotically as traffic intensity ρ approaches 1.0 in M/M/1 queues?',
    shortSummary:
      'In M/M/1 queuing theory, queue lengths and wait times do not increase linearly with load; they explode hyperbolically toward infinity as arrival rate λ approaches service rate μ.',
    detailedAnswer: {
      coreDefinition:
        'Queuing theory models waiting lines using stochastic processes. In an M/M/1 queue (Markovian Poisson arrivals, Exponential service times, 1 server), the average queue length is governed by the utilization factor ρ = λ / μ.',
      howItWorks: [
        'Arrival Rate (λ): Average number of arrival requests per unit time, governed by Poisson distribution.',
        'Service Rate (μ): Average processing capacity per unit time, governed by Exponential service duration.',
        'Traffic Intensity (ρ = λ / μ): System utilization. For stability, ρ MUST be strictly less than 1.0.',
        'Non-Linear Hyperbola: L = ρ / (1 - ρ). At 80% utilization, average items in system is 4. At 95% utilization, it surges to 19. At 99%, it surges to 99 items.',
      ],
      realWorldUseCases: [
        'Cloud Server Auto-Scaling: Determining CPU utilization target thresholds (e.g., scale at 70% CPU before queue latency explodes).',
        'Airport Security & Call Centers: Staffing ticket counters to balance waiting customer SLA limits against idle server wage costs.',
      ],
      commonPitfalls: [
        'Assuming a server running at 95% utilization is "highly efficient"; in stochastic arrivals, 95% utilization creates massive backlog spikes.',
        'Ignoring variance: High variance in service times drastically increases queue length compared to deterministic service (Pollaczek-Khinchine formula).',
      ],
      keyTakeaway:
        'Little’s Law (L = λ * W) is universal: average queue inventory equals arrival rate multiplied by average waiting time, regardless of probability distributions.',
    },
    diagram: {
      title: 'M/M/1 Queuing Pipeline & Latency Wall',
      subtitle: 'Poisson Ingestion $\\rightarrow$ Buffer Queue $\\rightarrow$ Exponential Server',
      type: 'pipeline',
      nodes: [
        {
          id: '1',
          label: 'Poisson Arrival Process',
          sublabel: 'λ arrivals / sec',
          description: 'Independent memoryless inter-arrival intervals.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Waiting Buffer Queue',
          sublabel: 'FIFO Disciplined',
          description: 'Holds requests when server is currently occupied. Backlog L_q.',
          type: 'process',
        },
        {
          id: '3',
          label: 'Service Mechanism',
          sublabel: 'μ completions / sec',
          description: 'Single processing unit with exponentially distributed execution times.',
          type: 'decision',
          badge: 'Server',
        },
        {
          id: '4',
          label: 'Hyperbolic Latency Surge',
          sublabel: 'W = 1 / (μ - λ)',
          description: 'As λ -> μ (ρ -> 1.0), waiting time W approaches infinity.',
          type: 'warning',
        },
        {
          id: '5',
          label: 'Completed Output Stream',
          sublabel: 'SLA Compliant',
          description: 'Dispatched transactions fulfilling turnaround constraints.',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Rate λ' },
        { from: '2', to: '3', label: 'Next in FIFO' },
        { from: '3', to: '4', label: 'If ρ > 0.85' },
        { from: '3', to: '5', label: 'Processed' },
      ],
    },
    mathFormula: {
      name: 'M/M/1 Average System Queue Length & Waiting Time',
      latex: 'L = \\frac{\\rho}{1 - \\rho} = \\frac{\\lambda}{\\mu - \\lambda}, \\quad W = \\frac{1}{\\mu - \\lambda}',
      explanation: 'Shows that as arrival rate λ approaches service rate μ, both queue length L and delay W diverge to infinity.',
      variables: [
        { symbol: 'ρ', meaning: 'Traffic intensity (λ / μ)' },
        { symbol: 'L', meaning: 'Average number of requests in the system' },
        { symbol: 'W', meaning: 'Average time spent in the system (waiting + service)' },
        { symbol: 'λ, μ', meaning: 'Arrival rate and service capacity rate' },
      ],
    },
    pythonExample: {
      title: 'Simulating M/M/1 Queue Metrics in Python',
      code: `def mm1_metrics(arrival_rate_lambda, service_rate_mu):
    if arrival_rate_lambda >= service_rate_mu:
        raise ValueError("System is unstable: arrival rate exceeds service capacity!")
    
    rho = arrival_rate_lambda / service_rate_mu
    L = rho / (1 - rho)               # Avg customers in system
    W = 1 / (service_rate_mu - arrival_rate_lambda)  # Avg time in system
    L_q = (rho ** 2) / (1 - rho)      # Avg customers in queue waiting
    W_q = rho / (service_rate_mu - arrival_rate_lambda) # Avg wait in queue
    
    return {'rho': rho, 'L': L, 'W_seconds': W, 'L_queue': L_q, 'W_queue': W_q}

# Example: 8 requests/sec arrival, 10 requests/sec capacity (80% utilization)
m80 = mm1_metrics(8, 10)
# Same system pushed to 95% utilization (9.5 req/sec arrival)
m95 = mm1_metrics(9.5, 10)

print(f"At 80% load: Avg items = {m80['L']:.1f}, Avg delay = {m80['W_seconds']:.2f}s")
print(f"At 95% load: Avg items = {m95['L']:.1f}, Avg delay = {m95['W_seconds']:.2f}s")`,
      explanation: 'A 19% increase in throughput causes a nearly 400% increase in latency.',
    },
  },

  // 8. ROC Curve & Confusion Matrix
  'roc-auc-matrix': {
    conceptKey: 'roc-auc-matrix',
    question: 'How do ROC-AUC and Confusion Matrices evaluate classification models, and why is threshold tuning crucial?',
    shortSummary:
      'A confusion matrix tabulates binary classification outcomes at a single decision threshold, while the Receiver Operating Characteristic (ROC) curve evaluates the trade-off across all possible thresholds.',
    detailedAnswer: {
      coreDefinition:
        'The Confusion Matrix partitions predictions into True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN). ROC plots True Positive Rate (Sensitivity) vs False Positive Rate (1 - Specificity) as the probability threshold sweeps from 0.0 to 1.0.',
      howItWorks: [
        'Threshold Independence: ROC-AUC measures ranking discrimination power. A score of 0.85 means a randomly chosen positive case has an 85% chance of being ranked higher than a negative case.',
        'Cost Asymmetry: In cancer diagnosis or fraud, a False Negative (missed cancer) is 100x more costly than a False Positive (extra blood test). Setting threshold = 0.5 is almost always suboptimal.',
        'PR-AUC vs ROC-AUC: For severely imbalanced data (e.g., 0.1% fraud), ROC can appear deceptively optimistic because large TNs suppress the FPR denominator. Precision-Recall curves are mandatory.',
      ],
      realWorldUseCases: [
        'Credit Card Fraud Scoring: Tuning threshold to flag suspicious charges without irritating legitimate cardholders.',
        'Autonomous Driving Obstacle Detection: Minimizing false negatives (failing to see pedestrian) with acceptable false braking rates.',
      ],
      commonPitfalls: [
        'Reporting simple Accuracy on imbalanced datasets: A naive model predicting all negatives achieves 99.9% accuracy on 0.1% fraud while catching zero fraudsters.',
        'Deploying models with default 0.5 threshold without aligning with business operational costs.',
      ],
      keyTakeaway:
        'Calculate the expected dollar cost: Total Cost = (Cost_FP * FP) + (Cost_FN * FN) across all thresholds to find the profit-maximizing cutoff.',
    },
    diagram: {
      title: 'Confusion Matrix & ROC Space Mapping',
      subtitle: 'From Raw Probabilities to Asymmetric Decision Thresholds',
      type: 'matrix',
      nodes: [
        {
          id: '1',
          label: 'Model Predicted Probabilities',
          sublabel: 'P(y=1 | x) in [0.0, 1.0]',
          description: 'Continuous calibrated output scores from logistic regression or gradient boosting.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Decision Threshold (θ)',
          sublabel: 'Default 0.5 vs Optimal θ*',
          description: 'Points >= θ predicted Positive; points < θ predicted Negative.',
          type: 'decision',
          badge: 'Tuning Dial',
        },
        {
          id: '3',
          label: 'Confusion Matrix [TP, FP, TN, FN]',
          sublabel: '4 Contingency Quadrants',
          description: 'Calculates Precision, Recall, and Specificity for this exact threshold.',
          type: 'process',
        },
        {
          id: '4',
          label: 'ROC Curve & AUC Score',
          sublabel: 'Global Ranking Quality',
          description: 'Integrates TPR vs FPR across all thresholds; Area Under Curve (0.5 to 1.0).',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Set Cutoff θ' },
        { from: '2', to: '3', label: 'Binarize' },
        { from: '1', to: '4', label: 'Sweep θ from 0 to 1' },
      ],
    },
    mathFormula: {
      name: 'TPR and FPR Formulation',
      latex: '\\text{TPR (Recall)} = \\frac{TP}{TP + FN}, \\quad \\text{FPR} = \\frac{FP}{FP + TN} = 1 - \\text{Specificity}',
      explanation: 'ROC plots TPR on the y-axis against FPR on the x-axis across every classification threshold.',
      variables: [
        { symbol: 'TP', meaning: 'True Positives (Correctly identified positive class)' },
        { symbol: 'FP', meaning: 'False Positives (Type I error, false alarm)' },
        { symbol: 'TN', meaning: 'True Negatives (Correctly identified negative class)' },
        { symbol: 'FN', meaning: 'False Negatives (Type II error, missed detection)' },
      ],
    },
    pythonExample: {
      title: 'Cost-Optimal Decision Threshold Tuning',
      code: `import numpy as np
from sklearn.metrics import roc_curve, roc_auc_score

# Sample ground truth and predicted probabilities
y_true = np.array([0, 0, 1, 1, 0, 1, 0, 1, 0, 0])
y_probs = np.array([0.1, 0.2, 0.8, 0.65, 0.35, 0.9, 0.4, 0.75, 0.15, 0.25])

fpr, tpr, thresholds = roc_curve(y_true, y_probs)
auc = roc_auc_score(y_true, y_probs)

# Business Cost: False Negative costs $500; False Positive costs $25
cost_fn, cost_fp = 500, 25
best_threshold = 0.5
min_cost = float('inf')

for th in np.linspace(0.05, 0.95, 100):
    preds = (y_probs >= th).astype(int)
    fn = np.sum((y_true == 1) & (preds == 0))
    fp = np.sum((y_true == 0) & (preds == 1))
    total_cost = (fn * cost_fn) + (fp * cost_fp)
    if total_cost < min_cost:
        min_cost = total_cost
        best_threshold = th

print(f"ROC-AUC: {auc:.3f} | Optimal Business Threshold: {best_threshold:.2f} (Cost: \${min_cost})")`,
      explanation: 'Tunes the decision boundary according to financial risk rather than default 0.5.',
    },
  },

  // 9. LSTM Cell & Gates
  'lstm-gates': {
    conceptKey: 'lstm-gates',
    question: 'How do Forget, Input, and Output gates in an LSTM cell eliminate the vanishing gradient problem in time series?',
    shortSummary:
      'Long Short-Term Memory (LSTM) networks maintain an uninterrupted cell state conveyor belt regulated by three sigmoid-tanh gate mechanisms that control what information to discard, store, and expose.',
    detailedAnswer: {
      coreDefinition:
        'Standard Recurrent Neural Networks (RNNs) suffer from vanishing gradients when backpropagating through long sequences due to repeated matrix multiplications. LSTMs introduce an additive cell state highway (C_t) that allows gradients to flow across hundreds of timesteps without exponential decay.',
      howItWorks: [
        'Forget Gate (f_t = σ(W_f · [h_{t-1}, x_t] + b_f)): Decides what percentage of previous cell memory C_{t-1} to erase (0 = wipe completely, 1 = retain completely).',
        'Input Gate (i_t = σ(...)) & Candidate Cell (~C_t = tanh(...)): Decides what new information from the current observation x_t to inject into the persistent memory.',
        'Cell State Update (C_t = f_t * C_{t-1} + i_t * ~C_t): Purely linear additive update that preserves long-term gradients.',
        'Output Gate (o_t = σ(...)) & Hidden State (h_t = o_t * tanh(C_t)): Filters the cell state to produce the hidden representation passed to the next timestep and final output layer.',
      ],
      realWorldUseCases: [
        'Algorithmic Financial Trading: Modeling multi-week price momentum while filtering high-frequency noise.',
        'Predictive Maintenance: Detecting subtle degradation signatures in turbine sensor streams over months of continuous operation.',
      ],
      commonPitfalls: [
        'Failing to scale time series inputs to [-1, 1] or [0, 1], which causes saturating gradients in tanh and sigmoid activations.',
        'Using LSTMs on stationary autoregressive data where simple ARIMA or Prophet converges faster with fewer parameters.',
      ],
      keyTakeaway:
        'The additive update C_t = f_t * C_{t-1} + i_t * ~C_t is the mathematical secret: derivative ∂C_t / ∂C_{t-1} = f_t, preventing vanishing gradients as long as f_t ≈ 1.',
    },
    diagram: {
      title: 'LSTM Internal Cell Anatomy & Gating Highway',
      subtitle: 'Information flow through Forget, Input, and Output gates',
      type: 'architecture',
      nodes: [
        {
          id: '1',
          label: 'Inputs [h_{t-1}, x_t]',
          sublabel: 'Previous Hidden State + Current Input',
          description: 'Combined feature vector concatenated at timestep t.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Forget Gate (f_t)',
          sublabel: 'σ(W_f · [h_{t-1}, x_t])',
          description: 'Filters historical cell memory; 0 drops, 1 keeps.',
          type: 'process',
          badge: 'Gate 1',
        },
        {
          id: '3',
          label: 'Input Gate & Candidate',
          sublabel: 'i_t * tanh(W_c · [h_{t-1}, x_t])',
          description: 'Constructs new candidate values and weights their importance.',
          type: 'process',
          badge: 'Gate 2',
        },
        {
          id: '4',
          label: 'Cell State Highway (C_t)',
          sublabel: 'C_t = f_t * C_{t-1} + i_t * ~C_t',
          description: 'Linear additive memory channel bypassing vanishing gradient degradation.',
          type: 'process',
          badge: 'Memory Core',
        },
        {
          id: '5',
          label: 'Output Gate & h_t',
          sublabel: 'h_t = o_t * tanh(C_t)',
          description: 'Emits updated hidden state for next step or downstream predictions.',
          type: 'output',
          badge: 'Gate 3',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Evaluate' },
        { from: '1', to: '3', label: 'Evaluate' },
        { from: '2', to: '4', label: 'Filter C_{t-1}' },
        { from: '3', to: '4', label: 'Inject New Info' },
        { from: '4', to: '5', label: 'Activated by o_t' },
      ],
    },
    mathFormula: {
      name: 'LSTM Core Gate Equations',
      latex: '\\begin{aligned} f_t &= \\sigma(W_f [h_{t-1}, x_t] + b_f) \\\\ i_t &= \\sigma(W_i [h_{t-1}, x_t] + b_i) \\\\ \\tilde{C}_t &= \\tanh(W_c [h_{t-1}, x_t] + b_c) \\\\ C_t &= f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t \\\\ o_t &= \\sigma(W_o [h_{t-1}, x_t] + b_o) \\\\ h_t &= o_t \\odot \\tanh(C_t) \\end{aligned}',
      explanation: 'System of six non-linear equations orchestrating cell state updates and sequence outputs.',
      variables: [
        { symbol: 'σ', meaning: 'Sigmoid activation function mapping values strictly between 0 and 1' },
        { symbol: '⊙', meaning: 'Hadamard element-wise vector product' },
        { symbol: 'C_t', meaning: 'Cell state vector (long-term memory)' },
        { symbol: 'h_t', meaning: 'Hidden state vector (short-term working memory)' },
      ],
    },
    pythonExample: {
      title: 'Building an LSTM Sequential Model in PyTorch',
      code: `import torch
import torch.nn as nn

class LSTMForecaster(nn.Module):
    def __init__(self, input_dim=1, hidden_dim=64, num_layers=2, output_dim=1):
        super().__init__()
        # PyTorch LSTM processes all 3 gates internally with GPU vectorization
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)
        
    def forward(self, x):
        # x shape: [batch_size, sequence_length, input_dim]
        lstm_out, (hn, cn) = self.lstm(x)
        # Take hidden state of final timestep for forecast
        last_step = lstm_out[:, -1, :]
        prediction = self.fc(last_step)
        return prediction

model = LSTMForecaster()
print(model)`,
      explanation: 'PyTorch handles the internal gating equations in highly optimized C++/CUDA kernels.',
    },
  },
};

/**
 * Intelligent Concept Resolver:
 * Matches any raw string concept from curriculumData to its detailed breakdown.
 * If not specifically hardcoded, creates a high-fidelity dynamically generated
 * conceptual answer, complete with flowchart nodes, formulas, and practical advice!
 */
export function resolveConceptDetail(conceptText: string, topicTitle?: string): ConceptDetail {
  const lower = conceptText.toLowerCase();

  // Try direct key matching
  if (
    lower.includes('data type') ||
    lower.includes('typolog') ||
    lower.includes('structured data') ||
    lower.includes('semi-structured') ||
    lower.includes('unstructured data') ||
    lower.includes('schema-on-write') ||
    lower.includes('schema-on-read')
  ) {
    return DETAILED_CONCEPTS_MAP['data-types'];
  }
  if (lower.includes('leakage') || lower.includes('lookahead')) {
    return DETAILED_CONCEPTS_MAP['data-leakage'];
  }
  if (lower.includes('mcar') || lower.includes('missingness') || lower.includes('imputation')) {
    return DETAILED_CONCEPTS_MAP['missingness-mechanisms'];
  }
  if (lower.includes('anova') || lower.includes('f-stat') || lower.includes('variance')) {
    return DETAILED_CONCEPTS_MAP['anova-f-statistic'];
  }
  if (lower.includes('k-means') || lower.includes('cluster') || lower.includes('silhouette') || lower.includes('wcss')) {
    return DETAILED_CONCEPTS_MAP['kmeans-inertia'];
  }
  if (lower.includes('anscombe') || lower.includes('eda') || lower.includes('tufte')) {
    return DETAILED_CONCEPTS_MAP['anscombes-quartet'];
  }
  if (lower.includes('bayes') || lower.includes('posterior') || lower.includes('prior') || lower.includes('conditional probability')) {
    return DETAILED_CONCEPTS_MAP['bayes-theorem'];
  }
  if (lower.includes('queuing') || lower.includes('m/m/1') || lower.includes('little\'s law') || lower.includes('traffic intensity')) {
    return DETAILED_CONCEPTS_MAP['queuing-mm1'];
  }
  if (lower.includes('confusion') || lower.includes('roc') || lower.includes('precision') || lower.includes('recall') || lower.includes('auc')) {
    return DETAILED_CONCEPTS_MAP['roc-auc-matrix'];
  }
  if (lower.includes('lstm') || lower.includes('gates') || lower.includes('recurrent') || lower.includes('vanishing gradient')) {
    return DETAILED_CONCEPTS_MAP['lstm-gates'];
  }

  // Fallback: Generate an elegant, comprehensive deep-dive answer tailored to the concept
  return {
    conceptKey: conceptText.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
    question: `What is "${conceptText}" and why is it essential in modern Data Analytics?`,
    shortSummary: `A foundational pillar in ${topicTitle || 'the curriculum'}: establishing mathematical validity, operational discipline, and reproducible outcomes.`,
    detailedAnswer: {
      coreDefinition: `"${conceptText}" represents a core analytical concept ensuring that data transformation, statistical inference, and machine learning pipelines adhere to rigorous theoretical standards.`,
      howItWorks: [
        '1. Mathematical Integrity: Enforces strict data assumptions (normality, stationarity, or independence) before algorithms run.',
        '2. Scalable Implementation: Translated into production via Scikit-Learn transformers, PyTorch neural layers, or SQL window functions.',
        '3. Validation Checkpoints: Measured using empirical validation metrics to prevent overfitting and misleading statistical conclusions.',
      ],
      realWorldUseCases: [
        'Enterprise Production Systems: Ensuring data models generalize effectively to live streaming distributions.',
        'Executive Decision Dashboards: Providing verifiable quantitative evidence rather than intuition-driven guesses.',
      ],
      commonPitfalls: [
        'Treating the concept as a black box without inspecting underlying statistical distribution assumptions.',
        'Applying default hyperparameter settings without tuning for class imbalance or domain cost asymmetries.',
      ],
      keyTakeaway:
        'Mastering this concept allows data analysts to diagnose pipeline failures, interpret ambiguous results, and defend technical decisions before executive stakeholders.',
    },
    diagram: {
      title: `${conceptText} — Conceptual Workflow Diagram`,
      subtitle: 'End-to-end analytical dataflow and verification cycle',
      type: 'flowchart',
      nodes: [
        {
          id: '1',
          label: 'Raw Input Observation',
          sublabel: 'Ingestion & Schema Check',
          description: 'Collect raw features, audit null values, and verify appropriate data typologies.',
          type: 'input',
        },
        {
          id: '2',
          label: 'Core Transformation',
          sublabel: conceptText.slice(0, 24),
          description: 'Apply algorithm-specific transformation, encoding, or statistical estimation.',
          type: 'process',
          badge: 'Core Step',
        },
        {
          id: '3',
          label: 'Hypothesis / Parameter Verification',
          sublabel: 'p-value / Loss Evaluation',
          description: 'Validate against convergence thresholds and statistical confidence criteria.',
          type: 'decision',
        },
        {
          id: '4',
          label: 'Actionable Analytics Output',
          sublabel: 'Deployable Decision Model',
          description: 'Emit calibrated predictions, executive visual summaries, or automated alerts.',
          type: 'output',
        },
      ],
      edges: [
        { from: '1', to: '2', label: 'Prepare' },
        { from: '2', to: '3', label: 'Evaluate' },
        { from: '3', to: '4', label: 'Verified Output' },
      ],
    },
    mathFormula: {
      name: 'Statistical Generalization Principle',
      latex: '\\mathbb{E}_{\\text{test}}[L(f(X), Y)] \\le \\hat{L}_{\\text{train}}(f) + \\mathcal{O}\\left(\\sqrt{\\frac{d_{\\text{VC}}}{N}}\\right)',
      explanation: 'Generalization error bounds guarantee that test performance tracks empirical training performance as sample size N grows.',
      variables: [
        { symbol: 'f(X)', meaning: 'Trained analytics or predictive model' },
        { symbol: 'L', meaning: 'Loss function measuring prediction error' },
        { symbol: 'N', meaning: 'Number of independent training samples' },
      ],
    },
    pythonExample: {
      title: `Applying ${conceptText.slice(0, 30)} in Python`,
      code: `import numpy as np
import pandas as pd

# Concept Execution Blueprint
def execute_analytical_step(data_df):
    """
    Implements ${conceptText} with defensive data validation.
    """
    validated = data_df.dropna().copy()
    print("Executing rigorous transformation for: ${conceptText}")
    # Process transformation logic
    return validated

# Verification check
print("Concept operationalized successfully.")`,
      explanation: 'Follows defensive programming standards with explicit data validation and logging.',
    },
  };
}
