---
title: "🚨 Workflow Failure: Semantic Release"
labels: bug, ci/cd
---

## ❌ Workflow Failed: Semantic Release

**Date & Time:** ${{ github.event.repository.pushed_at }}

**Commit:** ${{ github.sha }}

**Branch:** `${{ github.ref }}`

**Error Message:**

```
${{ job.steps.release.outputs.stdout }}
```

**Check the logs:** [Actions Logs](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})
