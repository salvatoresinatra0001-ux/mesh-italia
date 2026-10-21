from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
root=Path("site")
out=Path("dist")
out.mkdir(exist_ok=True)
files=[p for p in root.rglob("*") if p.is_file()]
for suffix in ("PREVIEW","FINALE"):
 with ZipFile(out/("mesh-italia-"+suffix+".zip"),"w",ZIP_DEFLATED) as z:
  for p in files:z.write(p,p.relative_to(root))
(out/"mesh-italia-report.json").write_text(json.dumps({"files":len(files),"html":sum(p.suffix==".html" for p in files),"images":sum(p.suffix.lower() in (".png",".jpg",".webp",".svg") for p in files)},indent=2))
print("Files packaged:",len(files))
