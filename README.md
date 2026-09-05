# CloseAI

### AI Finance Controller for reconciliation and exception resolution

CloseAI helps finance teams reconcile payments, settlements, bank transactions and ledger entries.

It investigates mismatches, verifies the available evidence, applies finance policies, and resolves cases when it has enough confidence. Cases that are uncertain or require approval are escalated instead of being automatically closed.

## Core workflow

**Match → Investigate → Verify → Govern → Close**

### Match
Identify related records across payment, settlement, bank and ledger sources.

### Investigate
Trace the exception and retrieve the records needed to understand the mismatch.

### Verify
Check amounts, transaction details and other evidence using deterministic validation.

### Govern
Apply predefined policies to determine whether the case can be resolved automatically or needs human approval.

### Close
Resolve verified cases and record the decision and evidence in an audit trail.

## Why CloseAI

Financial reconciliation often involves comparing records across multiple systems and manually investigating exceptions.

CloseAI focuses on the part that rules and simple matching leave behind: investigating exceptions and deciding whether there is enough evidence to safely close them.

## Key features

- Multi-source reconciliation
- Exception investigation
- Evidence-based verification
- Policy-based controls
- Human-in-the-loop approval
- Audit trail
- Synthetic benchmark for evaluation

## Architecture

CloseAI separates AI reasoning from deterministic financial controls.

```text
Data Sources
    │
    ▼
Reconciliation
    │
    ▼
Investigation Agent
    │
    ▼
Deterministic Verification
    │
    ▼
Policy Engine
   / \
  /   \
Auto   Human
Close  Review
  \     /
   \   /
    ▼
Audit Trail
