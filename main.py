import json
import os
import random

def loadESTables(path: str):
	with open(path, 'r') as f:
		data = f.read()
		obj_str = data[data.find('{'):data.find('}')+1]
		obj = json.loads(obj_str)
		return obj

def remove_appendix(path: str) -> str:
	base, ext = path.split(".")
	base, _ = base.split('-')
	return f"{base}.{ext}"

CONFIG = loadESTables("config.ts")

CATS = CONFIG["category"]
MATS = CONFIG["material"]

ret = []
dirs = os.listdir("public/images")
for i, d in enumerate(dirs):
	temp = {}
	temp["id"] = d
	temp["images"] = [remove_appendix(img) for img in os.listdir(f"public/images/{d}")]
	temp['category'] = CATS[random.randint(0, len(CATS) - 1)]
	temp["name"] = f"Produkt-{i}"
	temp["price"] = random.randint(8000, 200000)
	temp["material"] = MATS[random.randint(0, len(MATS) - 1)]
	temp["disciption"] = "Lorem ipsum dolor"
	ret.append(temp)

with open('data.json', 'w') as f:
	json.dump(ret, fp=f)