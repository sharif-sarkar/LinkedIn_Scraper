import React, { useState } from "react";
import Header from "./components/Header";
import TabNav from "./components/TabNav";
import ConfigPanel from "./components/ConfigPanel";
import StatusBar from "./components/StatusBar";
import StatsRow from "./components/StatsRow";
import Feed from "./components/Feed";
import LogicTab from "./components/LogicTab";

import { scrapeAdyaMentions } from "./utils/apify";

const DEFAULT_CONFIG = {
  token: "",
  sortBy: "date_posted",
};

const DEFAULT_STATE = {
  status: "idle",
  message: 'Enter your Apify token and click "Run scraper".',
  fetched: 0,
  matched: 0,
  discarded: 0,
  rate: 0,
  posts: [],
  hasData: false,
};

export default function App() {
  const [tab, setTab] = useState("scraper");
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [state, setState] = useState(DEFAULT_STATE);
  const [loading, setLoading] = useState(false);

  function setStatus(message) {
    setState((prev) => ({ ...prev, status: "running", message }));
  }

  async function handleRun() {
    if (!config.token.trim()) {
      setState((prev) => ({
        ...prev,
        status: "error",
        message: "Please enter your Apify API token.",
      }));
      return;
    }

    setLoading(true);
    setState((prev) => ({
      ...prev,
      status: "running",
      message: "Connecting to Apify…",
      hasData: false,
    }));

    try {
      const result = await scrapeAdyaMentions(config.token.trim(), {
        sortBy: config.sortBy,
        onStatus: setStatus,
      });

      setState({
        status: "done",
        message: `${result.matched} mention${result.matched !== 1 ? "s" : ""} found in the last 6 months (from ${result.fetched} posts scanned).`,
        fetched: result.fetched,
        matched: result.matched,
        discarded: result.discarded,
        rate: result.rate,
        posts: result.posts,
        hasData: true,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: "error",
        message: "Error: " + err.message,
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0f1a",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <Header />
        <TabNav active={tab} onChange={setTab} />

        {tab === "scraper" && (
          <>
            <ConfigPanel
              config={config}
              onChange={setConfig}
              onRun={handleRun}
              loading={loading}
            />
            <StatusBar status={state.status} message={state.message} />
            {state.hasData && (
              <StatsRow
                fetched={state.fetched}
                matched={state.matched}
                discarded={state.discarded}
                rate={state.rate}
              />
            )}
            {state.hasData && <Feed posts={state.posts} />}
          </>
        )}

        {tab === "logic" && <LogicTab />}
      </div>
    </div>
  );
}
