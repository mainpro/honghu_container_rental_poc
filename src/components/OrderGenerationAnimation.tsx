import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, FileText, Truck, Package, Wrench, Settings, Database, ArrowRight } from 'lucide-react'

const OrderGenerationAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  
  const [stepData, setStepData] = useState<any>(null)

  // 业务流程步骤数据
  const businessSteps = [
    {
      id: 'main-table',
      name: '租赁单主表',
      icon: <Database className="w-8 h-8 text-white" />,
      color: 'bg-blue-600',
      description: '创建主订单记录',
      data: {
        mainTableNumber: 'HT20241106001',
        customerId: 'SF2024001',
        totalAmount: '￥228,550.00',
        startTime: '2025-11-10 08:00:00',
        endTime: '2025-11-17 08:00:00'
      }
    },
    {
      id: 'sub-table',
      name: '租赁明细',
      icon: <FileText className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
      description: '创建订单明细',
      data: {
        records: [
          'RKN-AT1，20个，单价￥900/天，小计￥126,000',
          'RAP-AT1，15个，单价￥850/天，小计￥89,250',
          '运输费：￥8,000',
          '保险费：￥5,250'
        ]
      }
    },
    {
      id: 'sub-table-detail',
      name: '锁定设备明细',
      icon: <FileText className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
      description: '锁定库存设备',
      data: {
        records: [
          'RKN-AT1，温度-18°C, 规格:1.5x1.2x1.0m,状态:已检测,可出库',
          'RAP-AT1，温度0°C, 规格:1.5x1.2x1.0m,状态:已检测,可出库',
          'RAP-AT2，温度8°C, 规格:1.5x1.2x1.0m,状态:待检测',
        ]
      }
    },
    {
      id: 'detection',
      name: '设备检测',
      icon: <Settings className="w-6 h-6 text-white" />,
      color: 'bg-orange-500',
      description: '设备检测调试',
      data: {
        detectionNumber: 'JC20241106001',
        items: '6面检测、温度控制系统、密封性、电气系统',
        time: '2025-11-09 14:00:00',
        inspector: '李技师',
        result: '全部合格'
      }
    },
    {
      id: 'shipping',
      name: '发货单',
      icon: <Truck className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
      description: '生成发货单',
      data: {
        shippingNumber: 'FH20241106001',
        time: '2025-11-10 08:00:00',
        location: '北京首都机场',
        carrier: '王师傅',
        status: '已签收'
      }
    },
    {
      id: 'receiving',
      name: '入库单',
      icon: <Package className="w-6 h-6 text-white" />,
      color: 'bg-indigo-500',
      description: '生成入库单',
      data: {
        receivingNumber: 'RK20241106001',
        time: '2025-11-17 08:00:00',
        location: '上海浦东机场',
        status: '待检查',
        inspection: '待处理'
      }
    },
    {
      id: 'transfer',
      name: '调拨单',
      icon: <ArrowRight className="w-6 h-6 text-white" />,
      color: 'bg-cyan-500',
      description: '条件触发：设备调拨',
      data: {
        transferNumber: 'DB20241106001',
        triggerReason: '库存平衡、业务需要',
        reason: '上海地区需求增加，需要补充库存',
        cost: '￥1,800',
        source: '北京仓库',
        target: '上海仓库',
        status: '待执行'
      }
    },
        {
      id: 'maintenance',
      name: '维修单',
      icon: <Wrench className="w-6 h-6 text-white" />,
      color: 'bg-red-500',
      description: '条件触发：设备维修',
      data: {
        maintenanceNumber: 'WX20241106001',
        triggerReason: '设备检测发现损坏',
        scope: '制冷系统维修、门封更换',
        cost: '￥2,500',
        status: '待执行'
      }
    },
  ]

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const resetAnimation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setStepData(businessSteps[0].data)
  }

  // 动画控制逻辑
  useEffect(() => {
    if (isPlaying && currentStep < businessSteps.length) {
      const timer = setTimeout(() => {
        if (currentStep < businessSteps.length - 1) {
          setCurrentStep(currentStep + 1)
          setStepData(businessSteps[currentStep + 1].data)
        } else {
          setIsPlaying(false)
        }
      }, 2000) // 每2秒切换一次

      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentStep])

  // 初始化第一步数据
  useEffect(() => {
    setStepData(businessSteps[0].data)
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">订单衍生动画流程</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          以租赁单为中心，逐步生成相关单据的完整业务流程
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlay}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                isPlaying
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? '暂停' : '播放'}</span>
            </button>
            <button
              onClick={resetAnimation}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>重置</span>
            </button>
          </div>
          
          {/* 步骤指示器 */}
          <div className="text-sm text-slate-600">
            步骤 {currentStep + 1} / {businessSteps.length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 动画展示区域 */}
          <div className="relative h-96 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-dashed border-slate-300">
            {businessSteps.slice(0, currentStep + 1).map((step, index) => {
              const angle = (index * 360 / Math.min(currentStep + 1, 6)) * Math.PI / 180
              const radius = 80
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              
              return (
                <div
                  key={step.id}
                  className={`absolute w-20 h-20 ${step.color} rounded-xl flex flex-col items-center justify-center text-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    index === currentStep ? 'scale-110 shadow-lg' : 'scale-100'
                  }`}
                  style={{ 
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    zIndex: index + 1
                  }}
                >
                  {step.icon}
                  <span className="text-xs font-medium mt-1 text-center">{step.name}</span>
                </div>
              )
            })}
            
            {/* 连接线 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {businessSteps.slice(0, currentStep).map((_, index) => {
                const angle1 = (index * 360 / Math.min(currentStep, 6)) * Math.PI / 180
                const angle2 = ((index + 1) * 360 / Math.min(currentStep + 1, 6)) * Math.PI / 180
                const radius = 80
                const x1 = Math.cos(angle1) * radius
                const y1 = Math.sin(angle1) * radius
                const x2 = Math.cos(angle2) * radius
                const y2 = Math.sin(angle2) * radius
                
                return (
                  <line
                    key={index}
                    x1={`calc(50% + ${x1}px)`}
                    y1={`calc(50% + ${y1}px)`}
                    x2={`calc(50% + ${x2}px)`}
                    y2={`calc(50% + ${y2}px)`}
                    stroke="#64748b"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                )
              })}
            </svg>
          </div>
          
          {/* 数据展示区域 */}
          {stepData && (
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                {businessSteps[currentStep].name} - 数据详情
              </h3>
              <div className="space-y-3">
                {Object.entries(stepData).map(([key, value]) => (
                  <div key={key} className="bg-white p-3 rounded-lg">
                    <div className="text-sm font-medium text-slate-600">
                      {key === 'mainTableNumber' ? '主表编号' :
                       key === 'customerId' ? '客户ID' :
                       key === 'totalAmount' ? '总金额' :
                       key === 'startTime' ? '预计开始时间' :
                       key === 'endTime' ? '预计结束时间' :
                       key === 'records' ? '明细记录' :
                       key === 'detectionNumber' ? '检测单编号' :
                       key === 'items' ? '检测项目' :
                       key === 'time' ? '检测时间' :
                       key === 'inspector' ? '检测员' :
                       key === 'result' ? '检测结果' :
                       key === 'shippingNumber' ? '发货单编号' :
                       key === 'location' ? '发货地点' :
                       key === 'carrier' ? '承运人' :
                       key === 'status' ? '状态' :
                       key === 'receivingNumber' ? '入库单编号' :
                       key === 'inspection' ? '入库检查' :
                       key === 'checkCondition' ? '检查条件' :
                       key === 'inspectionResult' ? '检查结果' :
                       key === 'nextSteps' ? '满足条件流程' :
                       key === 'alternativeSteps' ? '不满足条件流程' :
                       key === 'maintenanceNumber' ? '维修单编号' :
                       key === 'triggerReason' ? '触发原因' :
                       key === 'scope' ? '维修范围' :
                       key === 'cost' ? '费用' :
                       key === 'transferNumber' ? '调拨单编号' :
                       key === 'triggerReason' ? '触发原因' :
                       key === 'reason' ? '调拨原因' :
                       key === 'source' ? '源仓库' :
                       key === 'target' ? '目标仓库' : key}:
                    </div>
                    {Array.isArray(value) ? (
                      <div className="mt-1">
                        {value.map((item, index) => (
                          <div key={index} className="text-sm text-slate-800 ml-2">• {item}</div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-800 mt-1">{String(value)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default OrderGenerationAnimation
