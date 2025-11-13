import React, { useState } from 'react'
import { Database, Layers, Box, FileText, CheckCircle, Settings, Truck, Package, ArrowRight, Wrench } from 'lucide-react'

const DataStructureDisplay: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number>(1)
  const [showRelations, setShowRelations] = useState(false)

  const mainOrder = {
    id: 'main-001',
    orderNo: 'HT20241106001',
    customerName: '中国东方航空',
    supplier: '鸿鹄航空科技',
    startDate: '2025-11-10',
    endDate: '2025-11-17',
    rentalDays: 7,
    modifyDeadline: '2025-11-08',
    totalAmount: 228550,
    rentalType: 'Round Trip',
    rentalPeriod: '7天',
    luggage: '承租人自提',
    deliveryAddress: '上海市浦东新区世纪大道100号'
  }

  const orderDetails = [
    {
      id: 'detail-001',
      mainOrderId: 'main-001',
      productType: 'RKN-AT1',
      quantity: 10,
      unitPrice: 8000,
      totalPrice: 80000,
      insurance: 2000,
      temperature:'-18°C'
    },
    {
      id: 'detail-002',
      mainOrderId: 'main-001',
      productType: 'RAP-AT1',
      quantity: 5,
      unitPrice: 9000,
      totalPrice: 45000,
      insurance: 2000,
      temperature:'15°C'
    }
  ]

  const equipmentDetails = [
    {
      id: 'equip-001',
      detailOrderId: 'detail-001',
      equipmentNo: 'RKN-AT1-001',
      equipmentType: 'RKN-AT1',
      status: 'available' as const,
      attributes: { temperature: '-18°C', dimensions: '1.5x1.2x1.0m' },
      rentalAmount: 8000,
      insuranceFee: 200
    },
    {
      id: 'equip-002',
      detailOrderId: 'detail-001',
      equipmentNo: 'RKN-AT1-002',
      equipmentType: 'RKN-AT1',
      status: 'toBetested' as const,
      attributes: { temperature: '-18°C', dimensions: '1.5x1.2x1.0m' },
      rentalAmount: 8000,
      insuranceFee: 200
    },
    {
      id: 'equip-003',
      detailOrderId: 'detail-002',
      equipmentNo: 'RAP-AT1-001',
      equipmentType: 'RAP-AT1',
      status: 'available' as const,
      attributes: { temperature: '+25°C', dimensions: '1.5x1.2x1.0m' },
      rentalAmount: 9000,
      insuranceFee: 225
    }
  ]

  // 单据关联关系数据
  const relatedDocuments = [
    {
      id: 'detection-doc',
      name: '检测调试单',
      icon: <Settings className="w-6 h-6 text-white" />,
      color: 'bg-orange-500',
      description: '设备检测调试记录'
    },
    {
      id: 'shipping-doc',
      name: '发货单',
      icon: <Truck className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
      description: '设备发货出库'
    },
    {
      id: 'receiving-doc',
      name: '入库单',
      icon: <Package className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
      description: '设备入库确认'
    },
    {
      id: 'transfer-doc',
      name: '调拨单',
      icon: <ArrowRight className="w-6 h-6 text-white" />,
      color: 'bg-cyan-500',
      description: '设备仓库调拨'
    },
    {
      id: 'maintenance-doc',
      name: '维修保养单',
      icon: <Wrench className="w-6 h-6 text-white" />,
      color: 'bg-red-500',
      description: '设备维修保养'
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">数据存储结构展示</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          展示租赁单三层架构：主单据→产品数据→设备明细，以及相关单据关联关系
        </p>
        <button
          onClick={() => setShowRelations(!showRelations)}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
        >
          {showRelations ? '隐藏关联关系' : '显示关联关系'}
        </button>
      </div>
      {/* 关联关系图谱 */}
        {showRelations && (
          <div className="mt-12 p-6 bg-slate-50 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">租赁单关联关系图谱</h3>
            <div className="relative  bg-white rounded-lg border-2 border-dashed border-slate-300  h-[28rem]">
              {/* 中心：租赁单主表 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-center p-2">
                  租赁单主表
                  <br />
                  {/* <span className="text-sm">{mainOrder.orderNo}</span> */}
                </div>
              </div>
              
              {/* 周围：关联单据 */}
              {relatedDocuments.map((doc, index) => {
                const angle = (index * 72) * Math.PI / 180 // 每个72度角
                const radius = 120
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <div key={doc.id}>
                    {/* 连接线 */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${x}px)`}
                        y2={`calc(50% + ${y}px)`}
                        stroke="#64748b"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                        className="opacity-60"
                      />
                    </svg>
                    
                    {/* 单据卡片 */}
                    <div 
                      className={`absolute w-24 h-16 ${doc.color} rounded-lg flex flex-col items-center justify-center text-white text-center text-xs transform -translate-x-1/2 -translate-y-1/2`}
                      style={{ 
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`
                      }}
                    >
                      {doc.icon}
                      <span className="mt-1 font-medium">{doc.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* 关联说明 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <div className={`w-8 h-8 ${doc.color} rounded-lg flex items-center justify-center`}>
                    {doc.icon}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{doc.name}</div>
                    <div className="text-sm text-slate-600">{doc.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h1 className='mb-4'>租赁单层级关系</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div 
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              activeLevel === 1 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-slate-200 hover:border-blue-300'
            }`}
            onClick={() => setActiveLevel(1)}
          >
            <div className="flex items-center mb-4">
              <Database className={`w-8 h-8 ${activeLevel === 1 ? 'text-blue-600' : 'text-slate-400'}`} />
              <h3 className={`ml-3 text-xl font-semibold ${activeLevel === 1 ? 'text-blue-800' : 'text-slate-600'}`}>
                第一层：主单据
              </h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium text-slate-700">订单编号：</span>
                <span className="ml-2 text-slate-900">{mainOrder.orderNo}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">客户名称：</span>
                <span className="ml-2 text-slate-900">{mainOrder.customerName}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">租赁开始日期：</span>
                <span className="ml-2 text-slate-900">{mainOrder.startDate}（星期一）</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">租赁结束日期：</span>
                <span className="ml-2 text-slate-900">{mainOrder.endDate}（星期一）</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">租赁天数：</span>
                <span className="ml-2 text-slate-900">{mainOrder.rentalDays}天</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">租赁方式：</span>
                <div className="mt-1 ml-2">
                  <div className="text-slate-900 font-medium">{mainOrder.rentalType}</div>
                  <div className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500 leading-relaxed whitespace-nowrap overflow-visible mt-1">
                    <span className="text-red-700 font-semibold">备注：</span>如果异地规划可选Network
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">提箱方式</span>
                <span className="ml-2 text-blue-600 font-semibold">{mainOrder.luggage}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">配送地址：</span>
                <div className="mt-1 ml-2">
                  <div className="text-slate-900 font-medium">{mainOrder.deliveryAddress}</div>
                  <div className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500 leading-relaxed whitespace-nowrap overflow-visible mt-1">
                    <span className="text-red-700 font-semibold">备注：</span>送箱到指定地点，请列明地址及联系方式
                  </div>
                </div>
              </div>
            
              <div className="text-sm">
                <span className="font-medium text-slate-700">总金额：</span>
                <span className="ml-2 text-blue-600 font-semibold">¥{mainOrder.totalAmount.toLocaleString()}</span>
              </div>
                <div className="text-sm">
                <span className="font-medium text-slate-700">退改签截止日期：</span>
                <span className="ml-2 text-orange-600 font-medium">{mainOrder.modifyDeadline}（星期六）</span>
              </div>
            </div>
          </div>

          <div 
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              activeLevel === 2 
                ? 'border-green-500 bg-green-50 shadow-lg' 
                : 'border-slate-200 hover:border-green-300'
            }`}
            onClick={() => setActiveLevel(2)}
          >
            <div className="flex items-center mb-4">
              <Layers className={`w-8 h-8 ${activeLevel === 2 ? 'text-green-600' : 'text-slate-400'}`} />
              <h3 className={`ml-3 text-xl font-semibold ${activeLevel === 2 ? 'text-green-800' : 'text-slate-600'}`}>
                第二层：租赁明细
              </h3>
            </div>
            <div className="space-y-3">
              {orderDetails.map((detail) => (
                <div key={detail.id} className="bg-slate-50 p-3 rounded-lg">
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">产品类型：</span>
                    <span className="ml-2 text-slate-900">{detail.productType}</span>
                  </div>
                   <div className="text-sm">
                    <span className="font-medium text-slate-700">温度要求:</span>
                    <span className="ml-2 text-slate-900">{detail.temperature}-0℃</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">数量：</span>
                    <span className="ml-2 text-slate-900">{detail.quantity} 个</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">单价：</span>
                    <span className="ml-2 text-slate-900">{detail.unitPrice} 元</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">保险费：</span>
                    <span className="ml-2 text-slate-900">{detail.insurance} 元</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              activeLevel === 3 
                ? 'border-purple-500 bg-purple-50 shadow-lg' 
                : 'border-slate-200 hover:border-purple-300'
            }`}
            onClick={() => setActiveLevel(3)}
          >
            <div className="flex items-center mb-4">
              <Box className={`w-8 h-8 ${activeLevel === 3 ? 'text-purple-600' : 'text-slate-400'}`} />
              <h3 className={`ml-3 text-xl font-semibold ${activeLevel === 3 ? 'text-purple-800' : 'text-slate-600'}`}>
                第三层：设备明细
              </h3>
            </div>
            <div className="space-y-3  overflow-y-auto">
              {equipmentDetails.map((equipment) => (
                <div key={equipment.id} className="bg-slate-50 p-3 rounded-lg">
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">设备编号：</span>
                    <span className="ml-2 text-slate-900">{equipment.equipmentNo}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">当前温度：</span>
                    <span className="ml-2 text-slate-900">{equipment.attributes.temperature}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">设备规格</span>
                    <span className="ml-2 text-slate-900">{equipment.attributes.dimensions}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">设备状态：</span>
                    <span className={`ml-2 ${
                      equipment.status === 'available' ? 'text-green-600' :
                      equipment.status === 'toBetested' ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {equipment.status === 'available' ? '可用' :
                       equipment.status === 'toBetested' ? '待检测' : '维护中'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
  
      </div>
    </section>
  )
}

export default DataStructureDisplay
