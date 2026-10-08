#!/bin/sh
set -eu
PRISM_SCRIPT_DIR="$(CDPATH= cd "$(dirname "$0")" && pwd)"
PRISM_ROOT="$(CDPATH= cd "$PRISM_SCRIPT_DIR/.." && pwd)"
if ! command -v python3 >/dev/null 2>&1; then
  echo "PRISM: python3 non disponibile; nessuna modifica automatica. Xcode userà la configurazione del progetto."
  exit 0
fi
python3 - "$PRISM_ROOT" <<'PY'
import os, re, sys
from pathlib import Path
root = Path(sys.argv[1])
config = root / 'Config' / 'App.xcconfig'
if not config.is_file():
    raise SystemExit('PRISM: Config/App.xcconfig non trovato. Mantieni ci_scripts e Config alla radice del progetto.')
text = config.read_text()
def get(key):
    match = re.search(r'^' + re.escape(key) + r'[ \t]*=[ \t]*([^\r\n]*)', text, re.M)
    return match.group(1).strip() if match else ''
def put(key, value):
    global text
    pattern = r'^' + re.escape(key) + r'[ \t]*=[^\r\n]*'
    replacement = key + ' = ' + value
    text = re.sub(pattern, replacement, text, flags=re.M) if re.search(pattern, text, re.M) else text + '\n' + replacement + '\n'
# Preserve the repository's Team. A workflow override takes precedence.
team = os.environ.get('PRISM_TEAM_ID', '').strip() or get('DEVELOPMENT_TEAM')
if not team:
    candidate = os.environ.get('CI_TEAM_ID', '').strip()
    if re.fullmatch(r'[A-Z0-9]{10}', candidate):
        team = candidate
if team:
    if re.fullmatch(r'[A-Z0-9]{10}', team):
        put('DEVELOPMENT_TEAM', team)
        print('PRISM: Team di firma configurato.')
    else:
        print('PRISM: Team ID non valido; controlla DEVELOPMENT_TEAM o PRISM_TEAM_ID. La firma sarà verificata da Xcode.')
else:
    # An explicit empty xcconfig setting can override Xcode's inherited signing value.
    text = re.sub(r'^DEVELOPMENT_TEAM[ \t]*=[ \t]*(?:\r?\n|$)', '', text, flags=re.M)
    print('PRISM: nessun Team ID nello script; viene mantenuta la firma gestita dal progetto/workflow Xcode Cloud.')
bundle = os.environ.get('PRISM_BUNDLE_ID', '').strip()
if bundle:
    if re.fullmatch(r'[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)+', bundle):
        put('PRODUCT_BUNDLE_IDENTIFIER', bundle)
    else:
        print('PRISM: PRISM_BUNDLE_ID non valido; mantengo quello del repository.')
build = os.environ.get('CI_BUILD_NUMBER', '').strip()
if build.isdigit():
    put('CURRENT_PROJECT_VERSION', build)
config.write_text(text)
if not (root / 'PRISM' / 'Web' / 'index.html').is_file():
    raise SystemExit('PRISM: manca PRISM/Web/index.html nel repository.')
print('PRISM: configurazione post-clone completata.')
PY

# Bootstrap the lockfile before Xcode Cloud's strict archive dependency check.
# These process-local defaults allow this explicit resolution only; they do not
# change the machine's Xcode preferences or the archive invocation.
if command -v xcodebuild >/dev/null 2>&1; then
  echo "PRISM: risoluzione dipendenze Firebase prima dell'archivio…"
  xcodebuild -resolvePackageDependencies \
    -project "$PRISM_ROOT/PRISM.xcodeproj" \
    -scheme PRISM \
    -IDEPackageOnlyUseVersionsFromResolvedFile=NO \
    -IDEPackageDisableAutomaticResolution=NO
  PRISM_RESOLVED="$PRISM_ROOT/PRISM.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved"
  if [ ! -s "$PRISM_RESOLVED" ]; then
    echo "PRISM: risoluzione incompleta, manca Package.resolved."
    exit 1
  fi
  python3 - "$PRISM_RESOLVED" <<'PY'
import json, sys
data=json.load(open(sys.argv[1]))
pins=data.get('pins',data.get('object',{}).get('pins',[]))
if not any(p.get('identity')=='firebase-ios-sdk' or 'firebase-ios-sdk' in p.get('repositoryURL','') for p in pins):
    raise SystemExit('PRISM: Firebase non presente nel file delle dipendenze risolte.')
print('PRISM: Package.resolved pronto; avvio archivio con dipendenze fissate.')
PY
else
  echo "PRISM: Xcode non disponibile su questa macchina; la risoluzione sarà eseguita da Xcode Cloud."
fi
