import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ShipmentAnalysis from './components/ShipmentAnalysis'

export type Page = 'dashboard' | 'shipments' | 'risk' | 'history' | 'settings'

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#F0F4F8' }}>
      <Sidebar activePage={page} onNavigate={setPage} />
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 36px',
          minWidth: 0,
        }}
      >
        {page === 'dashboard' && <Dashboard onAnalyze={() => setPage('shipments')} />}
        {page === 'shipments' && <ShipmentAnalysis />}
        {page === 'risk' && <ComingSoon title="Risk Analysis" description="Aggregate risk scoring across your entire shipment portfolio." />}
        {page === 'history' && <ComingSoon title="History" description="Full audit trail of all analyzed shipments and decisions." />}
        {page === 'settings' && <ComingSoon title="Settings" description="Configure carriers, routes, alert thresholds, and integrations." />}
      </main>
    </div>
  )
}

function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        gap: '12px',
        color: '#64748B',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          backgroundColor: '#E0F2FE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0369A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      </div>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1E293B', margin: 0 }}>{title}</h2>
      <p style={{ fontSize: '14px', maxWidth: 320, margin: 0 }}>{description}</p>
      <span style={{ fontSize: '12px', color: '#94A3B8', marginTop: 4 }}>Coming soon</span>
    </div>
  )
}
