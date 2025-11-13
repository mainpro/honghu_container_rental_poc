import React from 'react'
import { Plane, Container, BarChart3 } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">鸿鹄航空科技</h1>
              <p className="text-sm text-slate-600">Qingdao HB TempCon Aviation Co., Ltd.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-slate-600">
              <Container className="w-5 h-5 text-blue-600" />
              <span>集装箱租赁</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>POC展示</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
