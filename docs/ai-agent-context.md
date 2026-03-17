# AI Agent Context

**Service Purpose:**

A React-based UI that allows Decentraland players to report other players for misconduct or rule violations. Players must authenticate with their Decentraland wallet before submitting a report, ensuring identity verification and preventing anonymous abuse.

**Key Capabilities:**

- Player authentication via Decentraland wallet (identity verification required before reporting)
- Report submission form allowing a player to report another player with reason and details
- Display and management of submitted reports

**Communication Pattern:**

HTTP REST API calls to Decentraland backend services for authentication and report submission.

**Technology Stack:**

- Runtime: Node.js 22+
- Language: TypeScript
- UI Framework: React 18
- Build Tool: Vite
- Component Library: decentraland-ui2
- Environment Config: @dcl/ui-env

**External Dependencies:**

- Decentraland Auth: Player authentication and wallet-based identity verification
- Intercom API: Report submission destination

**Key Concepts:**

- **Authentication requirement**: Players must sign in with their Decentraland wallet before they can submit a report. This prevents anonymous reports and ties each report to a verified in-world identity.
- **Player identity**: Decentraland players are identified by their Ethereum wallet address. The reported player is also identified this way.
- **Report submission**: Completed reports are submitted to Intercom via its API, where they can be managed and actioned by the moderation team.
