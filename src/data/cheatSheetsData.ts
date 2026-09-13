import { CheatSheetEntry } from '../types/curriculum';

export const CHEAT_SHEETS: CheatSheetEntry[] = [
  // Subject 1: Data Analytics - Start of Course: Data Types
  {
    id: 'cs-dt-1',
    subjectId: 'data-analytics',
    category: 'Foundations & Data Types',
    title: 'Data Types Typology: Structured vs Semi-Structured vs Unstructured',
    formulaOrSyntax: 'H(X) = -\\sum P(x)\\log_2 P(x); \\quad \\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}',
    description: '• Structured: Rigid predefined tabular schema (rows × cols); Schema-on-Write; SQL/RDBMS.\n• Semi-Structured: Tags, keys, markers (JSON/XML); Schema-on-Read; MongoDB/DynamoDB.\n• Unstructured: No schema (text, audio, video); Vector embeddings & deep neural encodings; S3 & Vector DBs.',
    ruleOfThumb: 'Use RDBMS for ACID transactional financial ledgers; use JSON/document stores for rapid schema evolution; use Vector DBs with embeddings for semantic retrieval on unstructured text/media.',
    pythonSnippet: `# Structured: pd.DataFrame with strict types
# Semi-Structured: pd.json_normalize(json_data)
# Unstructured: Cosine similarity on dense embedding vectors
cosine_sim = np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))`,
  },
  {
    id: 'cs-1',
    subjectId: 'data-analytics',
    category: 'Data Preprocessing',
    title: 'Outlier Detection & Imputation Rules',
    formulaOrSyntax: 'IQR = Q_3 - Q_1; \\quad \\text{Fences} = [Q_1 - 1.5\\cdot IQR,\\; Q_3 + 1.5\\cdot IQR]',
    description: 'Tukey IQR method detects outliers without assuming normal Gaussian distribution. Standard Z-Score rule flags |z| > 3.0.',
    ruleOfThumb: 'Use median imputation for skewed data; mode for categoricals; KNN/IterativeImputer when inter-feature correlation > 0.4.',
    pythonSnippet: `from sklearn.impute import KNNImputer
imputer = KNNImputer(n_neighbors=5)
X_imputed = imputer.fit_transform(X_train)`,
  },
  {
    id: 'cs-2',
    subjectId: 'data-analytics',
    category: 'Hypothesis Testing',
    title: 'Hypothesis Test Selector Matrix',
    formulaOrSyntax: 't = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p \\sqrt{1/n_1 + 1/n_2}}; \\quad F = \\frac{MS_{between}}{MS_{within}}; \\quad \\chi^2 = \\sum \\frac{(O-E)^2}{E}',
    description: '• 2 Continuous Groups: Two-Sample t-test (Independent or Paired)\n• 3+ Continuous Groups: One-Way ANOVA (Post-hoc: Tukey HSD)\n• Categorical vs Categorical: Chi-Square Test of Independence\n• Non-parametric alternative to ANOVA: Kruskal-Wallis',
    ruleOfThumb: 'Always check Levene test for equal variance before ANOVA. If p < 0.05, use Welchs ANOVA.',
    pythonSnippet: `from scipy import stats
# ANOVA
f_val, p_val = stats.f_oneway(group1, group2, group3)
# Chi-Square
chi2, p, dof, ex = stats.chi2_contingency(contingency_table)`,
  },
  {
    id: 'cs-3',
    subjectId: 'data-analytics',
    category: 'Clustering',
    title: 'K-Means vs Hierarchical vs DBSCAN',
    formulaOrSyntax: 'WCSS = \\sum_{k} \\sum_{x \\in C_k} ||x - \\mu_k||^2; \\quad s(i) = \\frac{b(i)-a(i)}{\\max(a,b)}',
    description: '• K-Means: Fast O(n·k·i), assumes spherical convex clusters, sensitive to outliers.\n• Hierarchical: Produces dendrogram, O(n³), no need to pre-specify k upfront.\n• DBSCAN: Density-based, identifies arbitrary shapes and noise outliers automatically.',
    ruleOfThumb: 'Use Elbow plot + Silhouette score > 0.5. Normalize data first with StandardScaler!',
    pythonSnippet: `from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=4, init='k-means++', n_init=10, random_state=42)
labels = kmeans.fit_predict(X_scaled)`,
  },

  // Subject 2: Data Visualization
  {
    id: 'cs-4',
    subjectId: 'data-visualization',
    category: 'Chart Selection',
    title: 'Which Chart for Which Data Structure?',
    formulaOrSyntax: '\\text{Chart Selector: Distribution } \\rightarrow \\text{ KDE/Histogram; Relationship } \\rightarrow \\text{ Scatter; Comparison } \\rightarrow \\text{ Bar}',
    description: '• 1 Continuous: Histogram with KDE, Boxplot, Violin plot\n• 2 Continuous: Scatter plot with trendline, Hexbin (if N > 100k)\n• 1 Categorical + 1 Continuous: Bar chart (start at zero y-axis), Boxplot\n• Temporal: Line chart with rolling 7-day average\n• High-D Correlation: Heatmap with diverging palette (vmin=-1, vmax=1)',
    ruleOfThumb: 'Never use 3D pie charts. Bar charts MUST start at 0 baseline to avoid Lie Factor distortion.',
    pythonSnippet: `import seaborn as sns
sns.violinplot(data=df, x='category', y='revenue', inner='quartile')`,
  },
  {
    id: 'cs-5',
    subjectId: 'data-visualization',
    category: 'BI Calculation',
    title: 'Power BI DAX vs Tableau LOD Cheatsheet',
    formulaOrSyntax: '\\text{Power BI: CALCULATE}(m, \\text{FILTER}(...)) \\quad \\iff \\quad \\text{Tableau: } \\{ \\text{FIXED } [Dim]: \\text{SUM}([Val]) \\}',
    description: '• Tableau FIXED: Ignores worksheet filters, computes at level of specified dimension.\n• Tableau INCLUDE / EXCLUDE: Evaluates at finer/coarser level than visual grain.\n• Power BI CALCULATE(): Context transition engine; overrides active filter context with specified table filters.',
    ruleOfThumb: 'In Power BI, prefer Star Schemas with 1-to-many single-direction relationships to avoid circular filter deadlocks.',
  },

  // Subject 3: Probability, Statistics & Queuing Theory
  {
    id: 'cs-6',
    subjectId: 'probability-statistics',
    category: 'Distributions',
    title: 'Core Parametric Distributions Reference',
    formulaOrSyntax: '\\text{Normal: } N(\\mu, \\sigma^2); \\quad \\text{Poisson: } \\frac{\\lambda^k e^{-\\lambda}}{k!}; \\quad \\text{Binomial: } \\binom{n}{k}p^k(1-p)^{n-k}; \\quad \\text{Exp: } \\lambda e^{-\\lambda x}',
    description: '• Normal: Sum of independent variables (CLT). 68-95-99.7 empirical rule.\n• Binomial: k successes in n fixed trials with constant p.\n• Poisson: Counts of rare independent events per unit time (Mean = Variance = λ).\n• Exponential: Waiting time between Poisson events. Memoryless: P(X > s + t | X > s) = P(X > t).',
    ruleOfThumb: 'If Binomial has n > 30 and np < 5, approximate with Poisson(λ = np). If np >= 5 and n(1-p) >= 5, approximate with Normal.',
  },
  {
    id: 'cs-7',
    subjectId: 'probability-statistics',
    category: 'Queuing Theory',
    title: 'M/M/1 & Little’s Law Closed-Form Formulas',
    formulaOrSyntax: '\\rho = \\frac{\\lambda}{\\mu}; \\quad L = \\frac{\\rho}{1-\\rho}; \\quad L_q = \\frac{\\rho^2}{1-\\rho}; \\quad W = \\frac{1}{\\mu - \\lambda}; \\quad W_q = \\frac{\\rho}{\\mu - \\lambda}',
    description: '• λ: Arrival rate | μ: Service rate | ρ: Server utilization (must be < 1)\n• L: Total average customers in system | L_q: Average customers in waiting line\n• W: Average total time in system | W_q: Average queue wait time\n• Little’s Law: L = λW and L_q = λW_q',
    ruleOfThumb: 'When utilization ρ reaches 0.90, average wait time jumps by a factor of 9x compared to ρ = 0.50!',
  },

  // Subject 4: Machine Learning
  {
    id: 'cs-8',
    subjectId: 'machine-learning',
    category: 'Classification Metrics',
    title: 'Confusion Matrix & Metrics Master Formulas',
    formulaOrSyntax: '\\text{Acc} = \\frac{TP+TN}{N}; \\; \\text{Prec} = \\frac{TP}{TP+FP}; \\; \\text{Rec} = \\frac{TP}{TP+FN}; \\; F_1 = \\frac{2PR}{P+R}',
    description: '• True Positive Rate (TPR / Recall / Sensitivity) = TP / (TP + FN)\n• False Positive Rate (FPR / Fall-out) = FP / (FP + TN) = 1 - Specificity\n• Specificity (TNR) = TN / (TN + FP)\n• ROC-AUC: Area under TPR vs FPR curve across all thresholds [0, 1].',
    ruleOfThumb: 'Imbalanced dataset? Never optimize Accuracy. Optimize PR-AUC for minority class detection or tune threshold via Cost Matrix.',
    pythonSnippet: `from sklearn.metrics import roc_auc_score, f1_score
auc = roc_auc_score(y_true, y_prob)
f1 = f1_score(y_true, y_pred)`,
  },
  {
    id: 'cs-9',
    subjectId: 'machine-learning',
    category: 'Tree-based & PCA',
    title: 'Random Forest & PCA Hyperparameter Rules',
    formulaOrSyntax: '\\text{Gini} = 1 - \\sum p_i^2; \\quad \\text{Entropy} = -\\sum p_i \\log_2 p_i; \\quad \\Sigma = \\frac{1}{n-1}X^T X = V \\Lambda V^T',
    description: '• Random Forest: Set max_features = sqrt(p) for classification, p/3 for regression. Set min_samples_leaf >= 5 to curb overfitting.\n• PCA: Standardize features first! Select components where cumulative explained variance exceeds 80%-95% (Elbow on scree plot).',
    ruleOfThumb: 'Trees are scale-invariant; PCA is extremely scale-sensitive. Always scale before PCA.',
  },

  // Subject 5: Time Series Analysis
  {
    id: 'cs-10',
    subjectId: 'time-series',
    category: 'Box-Jenkins ARIMA',
    title: 'ARIMA(p, d, q) Identification & Diagnostics',
    formulaOrSyntax: '\\phi(B)(1-B)^d Y_t = c + \\theta(B)\\epsilon_t; \\quad \\text{ADF Test: } H_0 = \\text{Unit Root (Non-stationary)}',
    description: '1. Test Stationarity: Run adfuller(). If p > 0.05, difference series (d=1 or d=2).\n2. Read PACF: Sharp cut at lag p => AR(p) order.\n3. Read ACF: Sharp cut at lag q => MA(q) order.\n4. Diagnostic Check: Residuals must be white noise. Run Ljung-Box test (p > 0.05 means no remaining autocorrelation).',
    ruleOfThumb: 'Rarely need d > 2. If series has strong seasonal cycles (e.g. 12 months), use SARIMA(p,d,q)(P,D,Q)[12].',
    pythonSnippet: `from statsmodels.tsa.stattools import adfuller
p_val = adfuller(series)[1] # p <= 0.05 => stationary`,
  },
  {
    id: 'cs-11',
    subjectId: 'time-series',
    category: 'Modern Forecasting',
    title: 'Facebook Prophet vs LSTM Decision Guide',
    formulaOrSyntax: 'y(t) = g(t) + s(t) + h(t) + \\epsilon_t; \\quad f_t = \\sigma(W_f[h_{t-1}, x_t] + b_f)',
    description: '• Choose Prophet: Daily/weekly/monthly business sales with known holidays, missing observations, and changepoints. Fast, automated, interpretable.\n• Choose LSTM: Complex non-linear sequences, multi-step high-frequency sensor telemetry, multivariate dependencies with cross-series interactions.',
    ruleOfThumb: 'Prophet is curve-fitting with Bayesian priors; LSTM is sequential state memory. Always benchmark against a simple seasonal naive model first!',
  },
];
