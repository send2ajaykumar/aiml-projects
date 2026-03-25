🧠 EasyVisa — Machine Learning Project
The EasyVisa project demonstrates an end‑to‑end machine learning workflow using a structured dataset. It includes data exploration, preprocessing, model development, evaluation, and insights — all packaged in a clean, reproducible format.

## 📌 Project Overview
The Office of Foreign Labor Certification (OFLC) processes hundreds of thousands of job certification applications annually for employers seeking to bring foreign workers into the United States. With the number of applications increasing by the year (e.g., a 9% increase in FY 2016 to nearly 776,000 applications), the manual review process has become incredibly tedious and resource-intensive. 

This project aims to build a Machine Learning classification model to facilitate the visa approval process. By analyzing historical data, the model identifies significant drivers of visa decisions and predicts whether an applicant's case will be **Certified** or **Denied**.

## 🎯 Business Objective
* **Automate & Facilitate:** Streamline the shortlisting process for candidates with a high probability of visa approval.
* **Driver Analysis:** Recommend suitable profiles for applicants based on the key features that significantly influence case status.

## 📊 Data Dictionary
The dataset contains 25,480 records and 12 attributes detailing employee qualifications and employer characteristics:

| Feature | Description |
| :--- | :--- |
| `case_id` | Unique ID of each visa application |
| `continent` | Continent of the foreign worker |
| `education_of_employee`| Highest education level of the employee |
| `has_job_experience` | Does the employee have prior job experience? (Y/N) |
| `requires_job_training`| Does the employee require job training? (Y/N) |
| `no_of_employees` | Total number of employees in the employer's company |
| `yr_of_estab` | Year the employer's company was established |
| `region_of_employment` | Intended region of employment in the US |
| `prevailing_wage` | Average wage paid to similarly employed workers in the specific occupation and area |
| `unit_of_wage` | Unit of prevailing wage (Hourly, Weekly, Monthly, Yearly) |
| `full_time_position` | Is the position full-time? (Y/N) |
| `case_status` | **Target Variable:** Flag indicating if the Visa was Certified or Denied |

## 🛠️ Technologies & Libraries
* **Language:** Python (Jupyter Notebook / Google Colab)
* **Data Manipulation & Analysis:** `pandas`, `numpy`
* **Data Visualization:** `matplotlib`, `seaborn`
* **Machine Learning Models:** `scikit-learn` (Decision Trees, Random Forest, Bagging, AdaBoost, Gradient Boosting), `xgboost`
* **Data Preprocessing & Resampling:** `imblearn` (SMOTE, RandomUnderSampler), `OneHotEncoder`
* **Model Evaluation:** `accuracy_score`, `precision_score`, `recall_score`, `f1_score`, `roc_auc_score`

## 🧠 Methodology
1. **Exploratory Data Analysis (EDA):** - Analyzed the distribution of the target variable (`case_status`), finding a baseline class imbalance of ~66.8% Certified to 33.2% Denied.
   - Investigated categorical distributions (e.g., ~66% of applicants originate from Asia; over 40% hold a Bachelor's degree).
2. **Data Preprocessing & Cleaning:**
   - Corrected anomalous data entry errors (e.g., converting negative employee counts to positive absolute values).
   - Removed non-predictive identifier columns (`case_id`).
3. **Modeling & Hyperparameter Tuning:**
   - Trained multiple ensemble classifiers (Random Forest, Gradient Boosting, XGBoost) to predict certification outcomes.
   - Utilized SMOTE and undersampling techniques to handle class imbalances.
   - Tuned models using `GridSearchCV` and `RandomizedSearchCV` for optimal performance.

## 🚀 Future Enhancements & Considerations
To further improve the robust nature of the model and ensure responsible AI practices in immigration contexts, the following steps are recommended:
1. **Feature Engineering:**
   * Add employer industry classification.
   * Include application seasonality patterns.
   * Incorporate macro-economic industry demand indicators.
2. **AI Ethics & Governance:**
   * Regularly audit the model for bias across demographic groups.
   * Maintain strict human-in-the-loop oversight for all automated decisions to ensure fairness and compliance with INA statutory requirements.
