#!/bin/sh
set -eu
if [ "$#" -lt 3 ]; then
  echo "Uso: ./export_ipa.sh /percorso/PRISM.xcarchive TEAMID1234 /percorso/output"
  exit 1
fi
PRISM_ARCHIVE="$1"
PRISM_TEAM="$2"
PRISM_OUTPUT="$3"
mkdir -p "$PRISM_OUTPUT"
python3 - "$PRISM_TEAM" "$PRISM_OUTPUT/ExportOptions.plist" <<'PY'
import plistlib,re,sys
if not re.fullmatch(r'[A-Z0-9]{10}',sys.argv[1]):raise SystemExit('Team ID non valido')
with open(sys.argv[2],'wb') as f:plistlib.dump({'method':'app-store-connect','teamID':sys.argv[1],'signingStyle':'automatic','destination':'export','manageAppVersionAndBuildNumber':False,'uploadSymbols':True},f)
PY
xcodebuild -exportArchive -archivePath "$PRISM_ARCHIVE" -exportPath "$PRISM_OUTPUT" -exportOptionsPlist "$PRISM_OUTPUT/ExportOptions.plist" -allowProvisioningUpdates
