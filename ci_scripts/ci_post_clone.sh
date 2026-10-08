#!/bin/sh
set -eu
PRISM_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
python3 - "$PRISM_ROOT" <<'PY'
import os,re,sys
from pathlib import Path
root=Path(sys.argv[1]); p=root/'Config/App.xcconfig'; text=p.read_text()
for variable,key in [('PRISM_TEAM_ID','DEVELOPMENT_TEAM'),('PRISM_BUNDLE_ID','PRODUCT_BUNDLE_IDENTIFIER')]:
 value=os.environ.get(variable,'').strip()
 if value:
  if key=='DEVELOPMENT_TEAM' and not re.fullmatch(r'[A-Z0-9]{10}',value):raise SystemExit('PRISM_TEAM_ID deve avere 10 caratteri alfanumerici.')
  if key=='PRODUCT_BUNDLE_IDENTIFIER' and not re.fullmatch(r'[A-Za-z0-9.-]+',value):raise SystemExit('Bundle ID non valido.')
  text=re.sub(r'^'+key+r'\s*=.*$',key+' = '+value,text,flags=re.M)
build=os.environ.get('CI_BUILD_NUMBER','').strip()
if build.isdigit():text=re.sub(r'^CURRENT_PROJECT_VERSION\s*=.*$','CURRENT_PROJECT_VERSION = '+build,text,flags=re.M)
p.write_text(text)
team=re.search(r'^DEVELOPMENT_TEAM\s*=\s*(\S*)',text,re.M)
if not team or not re.fullmatch(r'[A-Z0-9]{10}',team.group(1)):
 raise SystemExit('Configura DEVELOPMENT_TEAM in Config/App.xcconfig o PRISM_TEAM_ID nel workflow Xcode Cloud.')
if not (root/'PRISM/Web/index.html').is_file():raise SystemExit('Risorse Web mancanti.')
print('Configurazione PRISM pronta. Nessuna dipendenza da scaricare.')
PY
