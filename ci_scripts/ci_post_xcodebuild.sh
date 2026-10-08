#!/bin/sh
set -eu
# La distribuzione viene gestita dalla post-action TestFlight del workflow.
# Non esegue un secondo upload, evitando build duplicate.
if [ "${CI_XCODEBUILD_ACTION:-}" = "archive" ]; then
  echo "Archivio PRISM completato. Usa la post-action TestFlight per distribuirlo."
  if [ -n "${CI_APP_STORE_SIGNED_APP_PATH:-}" ]; then
    echo "Xcode Cloud ha prodotto l'artefatto firmato App Store Connect."
  fi
fi
