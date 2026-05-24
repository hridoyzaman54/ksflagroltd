import os
import re

rootDir = r"e:\greenspout"

def clean_html(content, is_sub):
  # 1. Purge Herbal and Dairy nav elements in header & footer
  # Desktop/Mobile dropdown navbar items
  content = re.sub(r'<div[^>]*>\s*<a[^>]*href="[^"]*products\.html#herbal"[^>]*>.*?</a>\s*</div>', '', content, flags=re.DOTALL)
  content = re.sub(r'<div[^>]*>\s*<a[^>]*href="[^"]*products\.html#dairy"[^>]*>.*?</a>\s*</div>', '', content, flags=re.DOTALL)
  
  # 2. Update Farm Experiences -> Our Crops
  target_crops_link = "../our-crops.html" if is_sub else "./our-crops.html"
  content = content.replace("products.html#farm-experiences", "our-crops.html")
  content = content.replace("Farm Experiences & Kits", "Our Crops")
  content = content.replace("Farm Experiences &amp; Kits", "Our Crops")
  content = content.replace("Farm Experiences &#038; Kits", "Our Crops")
  
  # 3. Update Natural Pantry Items -> Micronutrients
  target_micro_link = "../products.html" if is_sub else "./products.html"
  content = content.replace("products.html#pantry", "products.html")
  content = content.replace("Natural Pantry Items", "Micronutrients")
  
  # 4. Testimonial swap
  content = content.replace(
    "I enjoyed KSFL Agro Ltd.'s herbal tea! The chamomile and mint blend was calming.",
    "I highly recommend KSFL Agro Ltd.'s organic seeds and crops! Outstanding quality and yields."
  )
  content = content.replace(
    "আমি তাদের ভেষজ চা খুব উপভোগ করেছি! বিশেষ করে ক্যামোমাইল ও পুদিনা মিশ্রণটি বেশ প্রশান্তিদায়ক ছিল।",
    "আমি কেএসএফএল এগ্রো লিঃ এর জৈব বীজ এবং ফসলের সুপারিশ করছি! অসাধারণ মান এবং ফলন।"
  )
  
  # 5. Inject Bangla translation dictionary entries
  dict_marker = 'const dict = {'
  if dict_marker in content:
    injected_dict = 'const dict = {\n        "Our Crops": "আমাদের ফসল",\n        "Micronutrients": "মাইক্রোনিউট্রিয়েন্টস",\n        "Grown with care at our Mirpur 10, Dhaka farm": "আমাদের মিরপুর ১০, ঢাকা খামারে যত্নে উৎপাদিত",\n        "Rice": "ধান",\n        "Bottle Gourd": "লাউ",\n        "Sweet Pumpkin": "মিষ্টি কুমড়া",\n        "Cucumber": "শসা",\n        "Radish": "মূলা",\n        "Pointed Gourd": "পটল",\n        "Okra": "ঢেঁড়স",\n        "Bitter Gourd": "করলা",\n        "Eggplant": "বেগুন",\n        "Potato": "গোল আলু",'
    content = content.replace(dict_marker, injected_dict)
    
  return content

# Traverse and process HTML files
for root, dirs, files in os.walk(rootDir):
  if '.git' in root or 'node_modules' in root or 'assets' in root:
    continue
  for file in files:
    if file.endswith('.html') or file.lower().endswith('.html'):
      filePath = os.path.join(root, file)
      is_sub = (root != rootDir)
      
      with open(filePath, 'r', encoding='utf-8') as f:
        content = f.read()
      
      updated_content = clean_html(content, is_sub)
      
      with open(filePath, 'w', encoding='utf-8') as f:
        f.write(updated_content)
      
      print(f"Processed: {filePath}")

print("Global restructuring complete!")
