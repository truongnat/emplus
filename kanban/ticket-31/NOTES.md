# ticket-31 notes

- **2026-04-04 (hotfix):** Empty notifications state — wrap cat + copy in `emptyStateContainer` (`flexGrow: 1`, `justifyContent`/`alignItems` center) so content centers in the `ScrollView` when `flexGrow: 1` is on `contentContainerStyle`. `emptyTitle` gets `textAlign: "center"`.
