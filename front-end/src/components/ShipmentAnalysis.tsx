import { useState } from 'react'

const riskFactors = [
  { label: 'Rotterdam port strike', impact: 'High', desc: 'Announced 72-hour strike starting Aug 9' },
  { label: 'Port congestion', impact: 'Medium', desc: 'Average wait time +18 hours above baseline' },
  { label: 'Perishable product', impact: 'High', desc: 'Temperature-sensitive cargo, strict handling SLA' },
  { label: 'Weather conditions', impact: 'Low', desc: 'Minor North Sea swell, within acceptable limits' },
]

const impactColors: Record<string, { bg: string; text: string; bar: string }> = {
  High: { bg: '#FEE2E2', text: '#B91C1C', bar: '#DC2626' },
  Medium: { bg: '#FEF3C7', text: '#B45309', bar: '#D97706' },
  Low: { bg: '#DCFCE7', text: '#15803D', bar: '#16A34A' },
}

const comparisonRows = [
  { action: 'Ship Now', time: '8.6 days', risk: 'High', cost: '$10,000', riskLevel: 'High', recommended: false },
  { action: 'Hold 48 Hours', time: '5.4 days', risk: 'Low', cost: '$6,000', riskLevel: 'Low', recommended: true },
  { action: 'Reroute via Antwerp', time: '6.2 days', risk: 'Medium', cost: '$14,000', riskLevel: 'Medium', recommended: false },
]

const historyRows = [
  { date: 'Jun 12, 2026', carrier: 'DHL', transit: '5.1 days', delay: '+0.1d', outcome: 'On Time' },
  { date: 'Apr 28, 2026', carrier: 'Maersk', transit: '5.8 days', delay: '+0.8d', outcome: 'Minor Delay' },
  { date: 'Mar 3, 2026', carrier: 'DHL', transit: '9.2 days', delay: '+4.2d', outcome: 'Disrupted' },
  { date: 'Jan 15, 2026', carrier: 'FedEx', transit: '5.0 days', delay: '0.0d', outcome: 'On Time' },
  { date: 'Nov 30, 2025', carrier: 'DHL', transit: '6.1 days', delay: '+1.1d', outcome: 'Minor Delay' },
]

const outcomeColors: Record<string, { bg: string; text: string }> = {
  'On Time': { bg: '#DCFCE7', text: '#15803D' },
  'Minor Delay': { bg: '#FEF3C7', text: '#B45309' },
  Disrupted: { bg: '#FEE2E2', text: '#B91C1C' },
}

type ActionType = 'SHIP' | 'HOLD' | 'REROUTE'

const actionConfig: Record<ActionType, { label: string; sub: string; bg: string; activeBg: string; activeBorder: string; activeText: string; badgeBg: string; badgeText: string }> = {
  SHIP: {
    label: 'SHIP',
    sub: 'Normal operation',
    bg: '#F8FAFC',
    activeBg: '#EFF6FF',
    activeBorder: '#2563EB',
    activeText: '#1D4ED8',
    badgeBg: '#DBEAFE',
    badgeText: '#1D4ED8',
  },
  HOLD: {
    label: 'HOLD',
    sub: 'Recommended',
    bg: '#F8FAFC',
    activeBg: '#FFF7ED',
    activeBorder: '#D97706',
    activeText: '#B45309',
    badgeBg: '#FEF3C7',
    badgeText: '#B45309',
  },
  REROUTE: {
    label: 'REROUTE',
    sub: 'Alternative route',
    bg: '#F8FAFC',
    activeBg: '#F0FDF4',
    activeBorder: '#16A34A',
    activeText: '#15803D',
    badgeBg: '#DCFCE7',
    badgeText: '#15803D',
  },
}

export default function ShipmentAnalysis() {
  const [analyzed, setAnalyzed] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedAction, setSelectedAction] = useState<ActionType>('HOLD')

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
    }, 1200)
  }

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.4px' }}>
          Shipment Analysis
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#64748B' }}>
          Enter shipment details to assess risk and receive a routing recommendation.
        </p>
      </div>

      {/* Shipment Form */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              backgroundColor: '#E0F2FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>Shipment Details</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {[
            { label: 'Shipment ID', value: '#9910', placeholder: 'e.g. #9910' },
            { label: 'Origin', value: 'Miami, FL', placeholder: 'City, State' },
            { label: 'Destination', value: 'Rotterdam, Netherlands', placeholder: 'City, Country' },
            { label: 'Product', value: 'Temperature-sensitive Vaccine', placeholder: 'Product type' },
            { label: 'Carrier', value: 'DHL', placeholder: 'Carrier name' },
            { label: 'Weight (kg)', value: '500', placeholder: '0' },
            { label: 'Ship Date', value: 'August 10, 2026', placeholder: 'Select date', span: 2 },
          ].map((field) => (
            <div key={field.label} style={{ gridColumn: (field as { span?: number }).span ? `span ${(field as { span?: number }).span}` : 'span 1' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#64748B',
                  marginBottom: '6px',
                  letterSpacing: '0.3px',
                  textTransform: 'uppercase',
                }}
              >
                {field.label}
              </label>
              <input
                type="text"
                defaultValue={field.value}
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '14px',
                  color: '#1E293B',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '7px',
                  outline: 'none',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#7DD3FC')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#E2E8F0')}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: analyzing ? '#0284C7' : '#0369A1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '11px 24px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: analyzing ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s',
              letterSpacing: '-0.1px',
              opacity: analyzing ? 0.8 : 1,
            }}
            onMouseEnter={(e) => { if (!analyzing) e.currentTarget.style.backgroundColor = '#075985' }}
            onMouseLeave={(e) => { if (!analyzing) e.currentTarget.style.backgroundColor = '#0369A1' }}
          >
            {analyzing ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Analyze Shipment
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analyzed && (
        <div>
          {/* Recommendation Banner */}
          <div
            style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FCD34D',
              borderRadius: '10px',
              padding: '20px 24px',
              marginBottom: '20px',
              borderLeft: '4px solid #D97706',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              boxShadow: '0 1px 3px rgba(217,119,6,0.08)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#92400E' }}>
                  Recommendation
                </span>
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#78350F', letterSpacing: '-0.5px' }}>
                HOLD
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#92400E', lineHeight: 1.5, maxWidth: '560px' }}>
                Delay shipment by approximately 48 hours due to elevated disruption risk at the destination port. Strike action is expected to resolve before Aug 12.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '7px',
                  border: '1px solid #FCD34D',
                  backgroundColor: 'white',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#92400E',
                  cursor: 'pointer',
                }}
              >
                Dismiss
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '7px',
                  border: 'none',
                  backgroundColor: '#D97706',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Apply Hold
              </button>
            </div>
          </div>

          {/* Row: Actions + ETA + Risk Level */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Action Options */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Select Action
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(Object.keys(actionConfig) as ActionType[]).map((action) => {
                  const cfg = actionConfig[action]
                  const isActive = selectedAction === action
                  const isRecommended = action === 'HOLD'
                  return (
                    <button
                      key={action}
                      onClick={() => setSelectedAction(action)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: `1.5px solid ${isActive ? cfg.activeBorder : '#E2E8F0'}`,
                        backgroundColor: isActive ? cfg.activeBg : cfg.bg,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: isActive ? cfg.activeText : '#1E293B',
                            letterSpacing: '0.3px',
                          }}
                        >
                          {cfg.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{cfg.sub}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isRecommended && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: '3px',
                              backgroundColor: cfg.badgeBg,
                              color: cfg.badgeText,
                              letterSpacing: '0.4px',
                            }}
                          >
                            REC
                          </span>
                        )}
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: `2px solid ${isActive ? cfg.activeBorder : '#CBD5E1'}`,
                            backgroundColor: isActive ? cfg.activeBorder : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isActive && <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white', display: 'block' }} />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ETA Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <h3 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                ETA Prediction
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Baseline ETA
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '26px', fontWeight: 500, color: '#0F172A', letterSpacing: '-0.5px' }}>
                    5.0 <span style={{ fontSize: '14px', fontWeight: 400, color: '#64748B' }}>days</span>
                  </div>
                  {/* Bar */}
                  <div style={{ marginTop: '8px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '58%', height: '100%', backgroundColor: '#16A34A', borderRadius: '3px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Adjusted ETA
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '26px', fontWeight: 500, color: '#DC2626', letterSpacing: '-0.5px' }}>
                    8.6 <span style={{ fontSize: '14px', fontWeight: 400, color: '#64748B' }}>days</span>
                  </div>
                  <div style={{ marginTop: '8px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#DC2626', borderRadius: '3px' }} />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    borderRadius: '7px',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                  <div>
                    <div style={{ fontSize: '11px', color: '#B91C1C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Expected Delay</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '15px', fontWeight: 500, color: '#B91C1C' }}>+3.6 days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Level */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Risk Level
              </h3>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '7px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  marginBottom: '16px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#B91C1C', letterSpacing: '0.5px' }}>HIGH RISK</span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Contributing Factors
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {riskFactors.map((f) => (
                  <div
                    key={f.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#F8FAFC',
                      borderLeft: `3px solid ${impactColors[f.impact].bar}`,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {f.label}
                      </div>
                    </div>
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '3px',
                        backgroundColor: impactColors[f.impact].bg,
                        color: impactColors[f.impact].text,
                        letterSpacing: '0.3px',
                      }}
                    >
                      {f.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row: Live Disruptions + AI Assessment */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Live Disruptions */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  padding: '18px 20px',
                  borderBottom: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DC2626', display: 'inline-block', boxShadow: '0 0 0 3px rgba(220,38,38,0.15)' }} />
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>Live Disruptions</h3>
                </div>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>Retrieved 4 min ago</span>
              </div>
              <div style={{ padding: '8px 0' }}>
                {[
                  {
                    title: 'Rotterdam dockworkers announce strike',
                    location: 'Rotterdam Port, NL',
                    date: 'Aug 7, 2026',
                    severity: 'High',
                    desc: 'Increased unloading and transit delays expected. Strike window: Aug 9–11.',
                    source: 'Port Authority Rotterdam',
                  },
                  {
                    title: 'North Sea moderate weather advisory',
                    location: 'North Sea corridor',
                    date: 'Aug 6, 2026',
                    severity: 'Low',
                    desc: 'Swell of 1.2m expected, within vessel operating tolerances.',
                    source: 'ECMWF Marine Forecast',
                  },
                ].map((event, i, arr) => (
                  <div
                    key={i}
                    style={{
                      padding: '16px 20px',
                      borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', lineHeight: 1.3 }}>{event.title}</span>
                      <span
                        style={{
                          flexShrink: 0,
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 7px',
                          borderRadius: '4px',
                          backgroundColor: impactColors[event.severity].bg,
                          color: impactColors[event.severity].text,
                        }}
                      >
                        {event.severity}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>{event.desc}</p>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#94A3B8' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {event.location}
                      </span>
                      <span>{event.date}</span>
                      <span style={{ color: '#CBD5E1' }}>·</span>
                      <span>Source: {event.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assessment */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>Risk Assessment</h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#6366F1',
                      backgroundColor: '#EEF2FF',
                      padding: '1px 6px',
                      borderRadius: '3px',
                      letterSpacing: '0.4px',
                    }}
                  >
                    AI-GENERATED
                  </span>
                </div>
              </div>

              <p
                style={{
                  margin: '0 0 14px',
                  fontSize: '14px',
                  color: '#334155',
                  lineHeight: 1.7,
                }}
              >
                The shipment contains a <strong>temperature-sensitive vaccine</strong> and is scheduled to arrive during an announced Rotterdam port strike. Historical transit time on this route is approximately <strong>5.0 days</strong>, but current disruption conditions increase the expected transit time to <strong>8.6 days</strong>.
              </p>
              <p
                style={{
                  margin: '0 0 16px',
                  fontSize: '14px',
                  color: '#334155',
                  lineHeight: 1.7,
                }}
              >
                The combination of perishable cargo sensitivity and port labor action creates a <strong>High risk</strong> scenario. Delaying departure by 48 hours aligns the shipment arrival with expected post-strike resumption, reducing transit risk significantly without incurring reroute costs.
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  padding: '12px 14px',
                  borderRadius: '7px',
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '1px', flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#166534' }}>Confidence: High</div>
                  <div style={{ fontSize: '12px', color: '#15803D' }}>
                    Based on 47 similar disruption events in this corridor (2023–2026)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>Routing Comparison</h3>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>Estimated outcomes by action</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Action', 'Estimated Transit', 'Risk Level', 'Estimated Cost', ''].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 20px',
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
                {comparisonRows.map((row, i) => {
                  const colors = impactColors[row.riskLevel]
                  return (
                    <tr
                      key={i}
                      style={{
                        backgroundColor: row.recommended ? '#FFFBEB' : 'transparent',
                        borderBottom: i < comparisonRows.length - 1 ? '1px solid #F1F5F9' : 'none',
                        borderLeft: row.recommended ? '3px solid #D97706' : '3px solid transparent',
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0F172A' }}>{row.action}</td>
                      <td style={{ padding: '14px 20px', fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#1E293B' }}>{row.time}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: colors.bg,
                            color: colors.text,
                          }}
                        >
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: colors.bar, flexShrink: 0 }} />
                          {row.risk}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: "'DM Mono', monospace", fontSize: '13px', fontWeight: 500, color: '#1E293B' }}>{row.cost}</td>
                      <td style={{ padding: '14px 20px' }}>
                        {row.recommended && (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '4px',
                              backgroundColor: '#FEF3C7',
                              color: '#B45309',
                              letterSpacing: '0.4px',
                              textTransform: 'uppercase',
                            }}
                          >
                            Recommended
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Shipment History */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>Historical Performance</h3>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>Previous shipments · Miami, FL → Rotterdam, Netherlands</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Date', 'Carrier', 'Transit Time', 'Delay', 'Outcome'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 20px',
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
                {historyRows.map((row, i) => {
                  const oc = outcomeColors[row.outcome]
                  return (
                    <tr
                      key={i}
                      style={{
                        borderBottom: i < historyRows.length - 1 ? '1px solid #F1F5F9' : 'none',
                        transition: 'background-color 0.1s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '12px 20px', color: '#475569' }}>{row.date}</td>
                      <td style={{ padding: '12px 20px', color: '#475569' }}>{row.carrier}</td>
                      <td style={{ padding: '12px 20px', fontFamily: "'DM Mono', monospace", color: '#1E293B' }}>{row.transit}</td>
                      <td
                        style={{
                          padding: '12px 20px',
                          fontFamily: "'DM Mono', monospace",
                          color: row.delay === '0.0d' ? '#16A34A' : row.delay.startsWith('+4') ? '#DC2626' : '#D97706',
                          fontWeight: 500,
                        }}
                      >
                        {row.delay}
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 500,
                            backgroundColor: oc.bg,
                            color: oc.text,
                          }}
                        >
                          {row.outcome}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
