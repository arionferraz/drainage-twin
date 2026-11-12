import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# 1. Carregar os dados
# Suponha que os dados estejam em um CSV com as colunas: latitude, longitude, chuva, alagamento
data = pd.read_csv('data_alagamentos.csv')

# Separar características (latitude, longitude, chuva) e rótulos (alagamento: 1 ou 0)
X = data[['latitude', 'longitude', 'chuva']].values
y = data['alagamento'].values  # 1 para alagamento, 0 para sem alagamento

# 2. Normalizar os dados
scaler = MinMaxScaler(feature_range=(0, 1))
X_normalized = scaler.fit_transform(X)

# 3. Criar sequências para entrada na LSTM
def create_sequences(data, labels, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i + seq_length])
        y.append(labels[i + seq_length])
    return np.array(X), np.array(y)

seq_length = 5  # Número de passos temporais
X_seq, y_seq = create_sequences(X_normalized, y, seq_length)

# 4. Dividir em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X_seq, y_seq, test_size=0.2, random_state=42)

# 5. Construir o modelo LSTM
model = Sequential([
    LSTM(50, return_sequences=False, input_shape=(seq_length, X_seq.shape[2])),
    Dense(1, activation='sigmoid')  # Sigmoid para problemas binários
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# 6. Treinar o modelo
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_data=(X_test, y_test))

# 7. Fazer previsões
predictions = model.predict(X_test)
predictions_binary = (predictions > 0.5).astype(int)  # Convertendo para 0 ou 1

# 8. Avaliar o modelo
from sklearn.metrics import accuracy_score
print("Acurácia:", accuracy_score(y_test, predictions_binary))
