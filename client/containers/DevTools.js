import React              from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor         from 'redux-devtools-log-monitor';
import DockMonitor        from 'redux-devtools-dock-monitor';

/**
 * Show the redux DevTools dock. This allows toggling, reverting,
 * resetting, and committing of actions. We also set up a LogMonitor
 * to log the actions and the before/after state in the console.
 */
export default createDevTools(
  <DockMonitor toggleVisibilityKey="H" changePositionKey="W">
    <LogMonitor />
  </DockMonitor>
);
