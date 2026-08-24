export default function ProjectVisual({ type }: { type: 'football' | 'crm' }) {
  if (type === 'football') {
    return (
      <div className="project-visual football-visual" aria-hidden="true">
        <div className="visual-window-bar"><i /><i /><i /><span>victory / matchday</span></div>
        <div className="football-layout">
          <div className="football-sidebar"><b>V</b><span /><span /><span /><span /></div>
          <div className="football-main">
            <div className="football-heading"><small>Saturday, 14 June</small><strong>Matchday overview</strong></div>
            <div className="score-card"><div><small>Home</small><b>VCT</b></div><strong>03 : 01</strong><div className="score-away"><small>Away</small><b>RVR</b></div></div>
            <div className="football-stats"><span /><span /><span /><span /></div>
            <div className="football-table"><b>Upcoming sessions</b><em>17:30&nbsp; — &nbsp;Training / Pitch 02</em><em>19:00&nbsp; — &nbsp;League fixture / Pitch 01</em></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual crm-visual" aria-hidden="true">
      <div className="crm-orbit orbit-one" /><div className="crm-orbit orbit-two" />
      <div className="crm-header"><span>CRM intelligence</span><b>● live model</b></div>
      <div className="crm-grid">
        <div className="crm-metric"><small>Leads qualified</small><strong>84.6%</strong><span>+12.8%</span></div>
        <div className="crm-metric"><small>Response time</small><strong>1.4<span>h</span></strong><span>−34.2%</span></div>
        <div className="crm-chart"><small>Pipeline momentum</small><div className="chart-line"><i /><i /><i /><i /><i /><i /><i /></div></div>
      </div>
      <div className="crm-footer"><span>Vietnam Post / Research node</span><span>AI&nbsp;&nbsp;·&nbsp;&nbsp;CRM&nbsp;&nbsp;·&nbsp;&nbsp;DATA</span></div>
    </div>
  );
}
