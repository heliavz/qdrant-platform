# Qdrant Cloud UI - Rework

A redesign and feature improvement of [Qdrant Cloud](https://cloud.qdrant.io/), the managed cloud platform for the Qdrant vector database. Built as a frontend portfolio project to demonstrate real product thinking and UI engineering on an existing developer tool.

> This is not an official Qdrant product. It is an independent rework built to identify UX gaps and propose concrete improvements to the live platform.

---

## What was improved

### 1. Get Started page - tab navigation

**Problem:** The original page stacks all content sections vertically, forcing users to scroll through everything to find what they need.

**Improvement:** Converted the layout into a tab-based interface with four sections: Explore Your Data, Build Applications, Deployment, and Support. The Cloud Quickstart banner remains pinned at the top on every tab. Zero scrolling required.

---

### 2. Cluster detail page - health status bar

**Problem:** RAM, CPU, and disk metrics existed in the original platform but were buried at the bottom of the Overview tab, below an upgrade upsell banner and a "Get Started" section. Engineers monitoring production clusters had to scroll past marketing content to reach health data.

**Improvement:** Surfaced a compact health strip immediately below the cluster name - above the tabs, always visible regardless of which tab is active. Shows RAM, CPU, and disk usage as progress bars with color-coded status (green/amber/red), version badge, region, and collection count at a glance.

---

### 3. API Keys tab - security improvements

**Problem:** The original API Keys tab showed basic key information with no usage tracking or security guidance.

**Improvements added:**

- **Last Used** column: shows when each key was last used, color-coded to flag stale keys
- **Reveal / hide toggle**: keys can be temporarily revealed without leaving the page
- **One-click copy**: copy the full key directly from the table
- **Security warning**: automatic alert when unused keys are detected
- **Create key modal**: with access level selection (Manage / Read Only / Write Only), expiry options, and a security reminder that the key is only shown once
- **Revoke confirmation**: explicit confirmation dialog before permanently revoking a key

---

### 4. Command palette - `Ctrl+K`

**Problem:** The platform had no global search or keyboard navigation. Users had to click through the sidebar to reach any destination.

**Improvement:** A command palette triggered by `Ctrl+K` (or the search button in the topbar) with:

- Real-time fuzzy search with match highlighting
- Results grouped by Pages, Clusters, Quick Actions, and Documentation
- Full keyboard navigation: arrow keys, Enter to select, Escape to close
- Navigates directly to cluster detail pages when a cluster is selected
- External links (docs, Discord) open in a new tab

---

## Stack

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [MUI (Material UI)](https://mui.com/): following Qdrant's exact design tokens
- [Lucide React](https://lucide.dev/): icons
- Mona Sans: Qdrant's typeface

---

## Design decisions

The entire project uses Qdrant's exact color palette, typography, and component patterns extracted from their open-source `qdrant-web-ui` repository. Primary color `#9494ff`, dark background `#0b0f19`, and all MUI theme overrides match the live platform pixel-for-pixel. The goal was to produce something that could be dropped into their actual codebase with minimal friction.

---

## Running locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

No backend required. All cluster data is mocked locally to demonstrate the UI improvements.

---

## What's next - identified but not built

These improvements were identified during the rework and documented as future work:

- **Onboarding checklist**: a persistent progress tracker for new users (Create cluster → Create collection → Insert vectors → Run first search) to reduce activation drop-off
- **Metrics tab**: real-time charts for RAM, CPU, and disk usage over time using the Qdrant Cloud monitoring API
- **Collections view**: a proper in-platform collections browser instead of redirecting to the self-hosted Web UI
- **Real-time log streaming**: filterable log viewer with severity levels and timestamp search

---

## Context

The goal was to go beyond a standard portfolio piece by working directly with a real product, identifying genuine UX problems, and proposing solutions grounded in how developers actually use the platform.

All improvements prioritise the needs of the primary user, a software engineer building AI-powered applications, over aesthetic changes.
