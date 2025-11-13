import React from 'react'
import Header from './components/Header'
import DataStructureDisplay from './components/DataStructureDisplay'
import OrderGenerationAnimation from './components/OrderGenerationAnimation'
import DataFlowProcess from './components/DataFlowProcess'
import Footer from './components/Footer'
import { Button } from './components/ui/button'
import { useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'

function App() {
  const navigate = useNavigate()

  const handlePreviewRentalOrder = () => {
    navigate('/rental-order-detail')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="space-y-16 py-16 px-4">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            鸿鹄航空集装箱租赁
            <span className="block text-blue-600">管理系统</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            通过可视化展示系统对订单管理需求的深入理解，
            体现完整的数据结构、订单衍生流程和业务闭环
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
            <span className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              POC展示版本
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              专业可视化
            </span>
          </div>
        </section>

        {/* Data Structure Display */}
        <DataStructureDisplay />

        {/* Order Generation Animation */}
        <OrderGenerationAnimation />

        {/* Data Flow Process */}
        <DataFlowProcess />
        
        {/* 预览租赁单按钮 */}
        <div className="text-center">
          <Button 
            onClick={handlePreviewRentalOrder}
            className="text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-6 px-8 shadow-lg transform transition-all hover:scale-105"
          >
            <FileText className="mr-2 h-5 w-5" />
            预览租赁单
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
