interface DashboardProps {
  onAnalyze: () => void
}

const kpis = [
  {
    label: 'Active Shipments',
    value: '142',
    delta: '+12 this week',
    deltaPositive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0369A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 4v4h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    iconBg: '#E0F2FE',
  },
  {
    label: 'High Risk',
    value: '7',
    delta: '3 require action',
    deltaPositive: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    iconBg: '#FEE2E2',
  },
  {
    label: 'On-Time Rate',
    value: '87%',
    delta: '-2.1% vs. last month',
    deltaPositive: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    iconBg: '#DCFCE7',
  },
  {
    label: 'Avg. Delay',
    value: '+1.2d',
    delta: 'This week',
    deltaPositive: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    iconBg: '#FEF3C7',
  },
]

const recentShipments = [
  { id: '#9845', origin: 'Los Angeles, CA', dest: 'Hamburg, Germany', carrier: 'Maersk', status: 'In Transit', risk: 'Low', eta: 'Aug 14' },
  { id: '#9867', origin: 'Chicago, IL', dest: 'Shanghai, China', carrier: 'FedEx', status: 'In Transit', risk: 'Medium', eta: 'Aug 18' },
  { id: '#9891', origin: 'New York, NY', dest: 'Dubai, UAE', carrier: 'UPS', status: 'Held', risk: 'High', eta: 'TBD' },
  { id: '#9903', origin: 'Houston, TX', dest: 'Singapore', carrier: 'DHL', status: 'In Transit', risk: 'Low', eta: 'Aug 21' },
  { id: '#9910', origin: 'Miami, FL', dest: 'Rotterdam, Netherlands', carrier: 'DHL', status: 'Pending', risk: 'High', eta: 'TBD' },
]

const liveAlerts = [
  { title: 'Rotterdam Port Strike', severity: 'High', time: '2h ago', location: 'Rotterdam, NL' },
  { title: 'Shanghai Port Congestion', severity: 'Medium', time: '6h ago', location: 'Shanghai, CN' },
  { title: 'Red Sea Routing Advisory', severity: 'High', time: '1d ago', location: 'Red Sea' },
]

const riskColors: Record<string, { bg: string; text: string; dot: string }> = {
  Low: { bg: '#DCFCE7', text: '#15803D', dot: '#16A34A' },
  Medium: { bg: '#FEF3C7', text: '#B45309', dot: '#D97706' },
  High: { bg: '#FEE2E2', text: '#B91C1C', dot: '#DC2626' },
}

const severityColors: Record<string, { bg: string; text: string }> = {
  High: { bg: '#FEE2E2', text: '#B91C1C' },
  Medium: { bg: '#FEF3C7', text: '#B45309' },
  Low: { bg: '#DCFCE7', text: '#15803D' },
}

export default function Dashboard({ onAnalyze }: DashboardProps) {
  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '28px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#0F172A',
              margin: 0,
              letterSpacing: '-0.4px',
            }}
          >
            Shipping Risk Dashboard
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#64748B', lineHeight: 1.5 }}>
            Monitor shipments, detect disruptions, and make informed routing decisions.
          </p>
        </div>
        <button
          onClick={onAnalyze}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#0369A1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.15s',
            flexShrink: 0,
            letterSpacing: '-0.1px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#075985')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0369A1')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Analyze Shipment
        </button>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>{kpi.label}</span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: kpi.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {kpi.icon}
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', fontFamily: "'DM Mono', monospace", letterSpacing: '-1px', lineHeight: 1 }}>
              {kpi.value}
            </div>
            <div
              style={{
                fontSize: '12px',
                marginTop: '6px',
                color: kpi.deltaPositive === null ? '#94A3B8' : kpi.deltaPositive ? '#16A34A' : '#DC2626',
              }}
            >
              {kpi.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>
        {/* Recent Shipments */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 20px',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>Recent Shipments</h2>
              <span style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px', display: 'block' }}>Last 7 days activity</span>
            </div>
            <button
              style={{
                fontSize: '13px',
                color: '#0369A1',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                padding: '4px 8px',
                borderRadius: '6px',
              }}
            >
              View all
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Shipment ID', 'Origin', 'Destination', 'Carrier', 'Status', 'Risk', 'ETA'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#94A3B8',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid #E2E8F0',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentShipments.map((s, i) => (
                <tr
                  key={s.id}
                  style={{
                    borderBottom: i < recentShipments.length - 1 ? '1px solid #F1F5F9' : 'none',
                    transition: 'background-color 0.1s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '12px 16px', fontFamily: "'DM Mono', monospace", fontSize: '12px', fontWeight: 500, color: '#0369A1' }}>{s.id}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{s.origin}</td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>{s.dest}</td>
                  <td style={{ padding: '12px 16px', color: '#64748B' }}>{s.carrier}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor: s.status === 'Held' ? '#FEF3C7' : s.status === 'Pending' ? '#F1F5F9' : '#E0F2FE',
                        color: s.status === 'Held' ? '#B45309' : s.status === 'Pending' ? '#64748B' : '#0369A1',
                      }}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor: riskColors[s.risk].bg,
                        color: riskColors[s.risk].text,
                      }}
                    >
                      <span
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: riskColors[s.risk].dot,
                          flexShrink: 0,
                        }}
                      />
                      {s.risk}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#64748B' }}>{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Alerts panel */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>Live Disruptions</h2>
              <span style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px', display: 'block' }}>Active alerts</span>
            </div>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#DC2626',
                display: 'inline-block',
                boxShadow: '0 0 0 3px rgba(220,38,38,0.2)',
              }}
            />
          </div>
          <div style={{ padding: '8px 0' }}>
            {liveAlerts.map((alert, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 20px',
                  borderBottom: i < liveAlerts.length - 1 ? '1px solid #F1F5F9' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.1s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>{alert.title}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: severityColors[alert.severity].bg,
                      color: severityColors[alert.severity].text,
                    }}
                  >
                    {alert.severity}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8' }}>
                  <span>{alert.location}</span>
                  <span>·</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
            <button
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '7px',
                border: '1px solid #E2E8F0',
                backgroundColor: 'white',
                fontSize: '13px',
                fontWeight: 500,
                color: '#475569',
                cursor: 'pointer',
              }}
            >
              View all disruptions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
