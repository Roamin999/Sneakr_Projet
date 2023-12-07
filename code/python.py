import pandas as pd
import json

# Chemin du fichier JSON d'entrée
input_file = "./sneakerData.json"

# Chemin du fichier TSV de sortie
output_file = "./sneakerData.tsv"

# Charger le fichier JSON dans un DataFrame pandas
with open(input_file, "r", encoding="utf-8") as file:
    data = json.load(file)
    df = pd.json_normalize(data)  # Utilisez pd.json_normalize si votre JSON est un objet imbriqué

# Convertir le DataFrame en format TSV
df.to_csv(output_file, sep="\t", index=False)