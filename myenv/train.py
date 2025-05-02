import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score,confusion_matrix,classification_report


df = pd.read_csv('realistic_career_dataset.csv')
print(df.head(5))

skills_df = df['Skills'].apply(lambda x: x.split(', ')).explode()
skills_dummies = pd.get_dummies(skills_df).groupby(level=0).max()

skills_dummies=skills_dummies.reset_index(drop=True)
df=df.reset_index(drop=True)

df = pd.concat([df[['10th Marks','12th Marks']], skills_dummies, df['Career']], axis=1)
print(df)

x=df.drop('Career',axis=1)
y=df['Career']

x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=42)

rf_model=RandomForestClassifier(random_state=42)

rf_model.fit(x_train,y_train)

y_pred=rf_model.predict(x_test)

print(accuracy_score(y_test,y_pred))
print(confusion_matrix(y_test,y_pred))
print(classification_report(y_test,y_pred))


