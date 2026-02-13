import React, { useState, useEffect } from 'react'
import Rules from './components/Rules'
import Plays from './components/Plays'
import Scoring from './components/Scoring'
import './index.css'

type Tab = 'rules' | 'plays' | 'scoring'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('rules')

  const renderContent = () => {
    switch (activeTab) {
      case 'rules':
        return <Rules setActiveTab={setActiveTab} />
      case 'plays':
        return <Plays />
      case 'scoring':
        return <Scoring />
      default:
        return <Rules setActiveTab={setActiveTab} />
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [activeTab])

  return (
    <div className="min-h-screen bg-paper-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-center text-black">Guan Dan (掼蛋)</h1>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-[60px] z-10">
        <div className="max-w-2xl mx-auto flex">
          <button
            onClick={() => setActiveTab('rules')}
            className={`tab-button ${activeTab === 'rules' ? 'tab-active' : 'tab-inactive'}`}
          >
            Rules
          </button>
          <button
            onClick={() => setActiveTab('plays')}
            className={`tab-button ${activeTab === 'plays' ? 'tab-active' : 'tab-inactive'}`}
          >
            Plays
          </button>
          <button
            onClick={() => setActiveTab('scoring')}
            className={`tab-button ${activeTab === 'scoring' ? 'tab-active' : 'tab-inactive'}`}
          >
            Scoring
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-2xl mx-auto">{renderContent()}</main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        <p>Made for Guan Dan players • 掼蛋快乐</p>
      </footer>
    </div>
  )
}

export default App
