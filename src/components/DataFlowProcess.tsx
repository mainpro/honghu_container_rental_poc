import React, { useState } from 'react'
import { ArrowRight, CheckCircle, Circle, User, FileText, Package, CreditCard, Settings, Database, Truck, Wrench } from 'lucide-react'

const DataFlowProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const processSteps = [
    {
      id: 1,
      title: '客户需求提交',
      description: '客户填写租赁订单，包含箱型、数量、租赁方式等需求信息',
      icon: <User className="w-6 h-6" />,
      completed: false,
      active: true,
      data: {
        customerName: '顺丰航空有限公司',
        equipment: 'RKN-AT1集装箱 × 20个，RAP-AT1集装箱 × 15个',
        rentalMethod: 'Round Trip',
        rentalPeriod: '7天',
        startDate: '2025年11月10日（星期一）',
        endDate: '2025年11月17日（星期一）',
        modifyDeadline: '2025年11月8日（星期六）',
        luggage:"承租人自提",
        deliveryAddress:"上海市浦东新区世纪大道100号"
      }
    },
    {
      id: 2,
      title: '订单信息确认',
      description: '市场部确认订单可行性，评估航线、箱型、数量和租赁模式',
      icon: <CheckCircle className="w-6 h-6" />,
      completed: false,
      active: false,
      data: {
        orderNumber: 'HT20241106001',
        confirmTime: '2025-11-06 09:30:00',
        manager: '张经理',
        status: '已确认'
      }
    },
    {
      id: 3,
      title: '租赁单主表创建',
      description: '创建主订单记录，包含客户信息、供应商、日期、总金额等核心数据',
      icon: <Database className="w-6 h-6" />,
      completed: false,
      active: false,
      data: {
        mainTableNumber: 'HT20241106001',
        customerId: 'SF2024001',
        totalAmount: '￥228,550.00',
        expectedStartTime: '2025-11-10 08:00:00',
        expectedEndTime: '2025-11-17 08:00:00'
      }
    },
    {
      id: 4,
      title: '租赁明细创建',
      description: '根据产品类型创建明细记录，RKN-AT1 20台，RAP-AT1 15台',
      icon: <FileText className="w-6 h-6" />,
      completed: false,
      active: false,
      data: {
        record1: 'RKN-AT1，20个，单价￥900/天，小计￥126,000',
        record2: 'RAP-AT1，15个，单价￥850/天，小计￥89,250',
        record3: '运输费：￥8,000',
        record4: '保险费：￥5,250',
        subtotal: '￥228,550'
      }
    },
    {
      id: 4.1,
      title: '锁定设备明细',
      description: '根据产品类型创建明细记录，RKN-AT1 20台，RAP-AT1 15台',
      icon: <Package className="w-6 h-6" />,
      completed: false,
      active: false,
      data: {
        record1: 'RKN-AT1，温度-18°C, 规格:1.5x1.2x1.0m,状态:已检测,可出库',
        record2: 'RAP-AT1，温度0°C, 规格:1.5x1.2x1.0m,状态:已检测,可出库',
        record3: 'RAP-AT2，温度8°C, 规格:1.5x1.2x1.0m,状态:待检测',
      }
    },
    {
      id: 5,
      title: '设备检测单创建',
      description: '为每个设备创建检测记录，确保设备状态符合租赁要求',
      icon: <Settings className="w-6 h-6" />,
      completed: false,
      active: false,
      data: {
        detectionNumber: 'JC20241106001',
        detectionItems: '温度控制系统、密封性、电气系统',
        detectionTime: '2025-11-09 14:00:00',
        inspector: '李技师',
        detectionResult: '全部合格'
      }
    },
    {
      id: 7,
      title: '发货单生成',
      description: '生成发货单，指定发货人、发货地点和发货时间',
      icon: <Truck className="w-6 h-6" />,
      completed: false,
      active: false,
      data: {
        shippingNumber: 'FH20241106001',
        shippingTime: '2025-11-10 08:00:00',
        shippingLocation: '北京首都机场',
        carrier: '王师傅',
        receivingStatus: '已签收'
      }
    },
    {
      id: 8,
      title: '入库单生成',
      description: '设备使用完成后，执行还箱操作和设备状态检查',
      icon: <Package className="w-6 h-6" />,
      completed: false,
      active: false,
      data: {
        receivingNumber: 'RK20241106001',
        receivingTime: '2025-11-17 08:00:00',
        receivingLocation: '上海浦东机场',
        equipmentStatus: '待检查',
        inspectionResult: '待处理'
      }
    },
  
    {
      id: 12,
      title: '费用结算',
      description: '汇总所有费用，包括基础费用和可能的额外费用',
      icon: <CreditCard className="w-6 h-6" />,
      completed: false,
      active: false,
      data: {
        // 基础费用
        rentalFee: '￥215,250',
        transportFee: '￥8,000',
        insuranceFee: '￥5,250',
        // 可能的额外费用
        maintenanceFee: '￥2,500（维修费）',
        transferFee: '￥1,800（调拨费）',
        changeFee: '￥500（变更费，如有）',
        // 费用汇总
        subtotal: '￥233,300',
        vatRate: '13%',
        vatAmount: '￥30,329',
        settlementTotal: '￥263,629',
        settlementStatus: '已支付'
      }
    }
  ]

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'active'
    return 'pending'
  }

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">数据流转流程展示</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          完整业务流程演示，从客户需求提交到费用结算的端到端数据流转，每个步骤都包含具体的业务数据
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          
          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const status = getStepStatus(index)
              
              return (
                <div 
                  key={step.id}
                  className={`relative cursor-pointer transition-all ${
                    status === 'active' ? 'transform scale-105' : ''
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-4 transition-all ${
                    status === 'completed' 
                      ? 'bg-green-500 border-green-500' 
                      : status === 'active'
                      ? 'bg-blue-500 border-blue-500 animate-pulse'
                      : 'bg-white border-slate-300'
                  }`}></div>
                  
                  <div className="ml-16">
                    <div className={`p-6 rounded-xl border-2 transition-all ${
                      status === 'completed'
                        ? 'bg-green-50 border-green-200'
                        : status === 'active'
                        ? 'bg-blue-50 border-blue-300 shadow-lg'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            status === 'completed'
                              ? 'bg-green-100 text-green-600'
                              : status === 'active'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {step.icon}
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold ${
                              status === 'active' ? 'text-blue-800' : 'text-slate-800'
                            }`}>
                              {step.title}
                            </h3>
                            <p className="text-sm text-slate-600">{step.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 步骤数据展示 */}
                      {step.data && (
                        <div className={`mt-4 p-4 rounded-lg border ${
                          status === 'completed'
                            ? 'bg-green-50 border-green-100'
                            : status === 'active'
                            ? 'bg-blue-50 border-blue-100'
                            : 'bg-slate-50 border-slate-100'
                        }`}>
                          <h4 className="text-sm font-semibold text-slate-700 mb-3">业务数据详情：</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(step.data).map(([key, value]) => (
                              <div key={key} className="bg-white p-3 rounded border">
                                <div className="text-xs font-medium text-slate-500 mb-1">
                                  {key === 'customerName' ? '客户名称' :
                                   key === 'equipment' ? '需求设备' :
                                   key === 'rentalMethod' ? (
                                    <div className="space-y-1">
                                      <span className="block">租赁方式</span>
                                      <div className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500 leading-relaxed whitespace-nowrap overflow-visible">
                                        <span className="text-red-700 font-semibold">备注：</span>如果异地规划可选Network
                                      </div>
                                    </div>
                                  ) :
                                   key === 'rentalPeriod' ? '租期' :
                                   key === 'startDate' ? '租赁开始日期' :
                                   key === 'endDate' ? '租赁结束日期' :
                                   key === 'rentalDays' ? '租赁天数' :
                                   key === 'modifyDeadline' ? '退改签截止日期' :
                                   key === 'luggage' ? '提箱方式' :
                                   key === 'deliveryAddress' ? '配送地址' :
                                   key === 'pickupLocation' ? '提箱地点' :
                                   key === 'returnLocation' ? '还箱地点' :
                                   key === 'orderNumber' ? '订单编号' :
                                   key === 'confirmTime' ? '确认时间' :
                                   key === 'manager' ? '操作经理' :
                                   key === 'status' ? '订单状态' :
                                   key === 'modifyWindow' ? '修改时间窗口' :
                                   key === 'modifyContent' ? '修改内容' :
                                   key === 'modifyFee' ? '修改费用' :
                                   key === 'modifyFlow' ? '修改流程' :
                                   key === 'cancelWindow' ? '取消时间窗口' :
                                   key === 'cancelFee' ? '取消费用' :
                                   key === 'cancelFlow' ? '取消流程' :
                                   key === 'cancelReason' ? '取消原因' :
                                   key === 'mainTableNumber' ? '主表编号' :
                                   key === 'customerId' ? '客户ID' :
                                   key === 'totalAmount' ? '总金额' :
                                   key === 'expectedStartTime' ? '预计开始时间' :
                                   key === 'expectedEndTime' ? '预计结束时间' :
                                   key === 'record1' ? '明细记录1' :
                                   key === 'record2' ? '明细记录2' :
                                   key === 'record3' ? '明细记录3' :
                                   key === 'record4' ? '明细记录4' :
                                   key === 'subtotal' ? '小计' :
                                   key === 'detectionNumber' ? '检测单编号' :
                                   key === 'detectionItems' ? '检测项目' :
                                   key === 'detectionTime' ? '检测时间' :
                                   key === 'inspector' ? '检测员' :
                                   key === 'detectionResult' ? '检测结果' :
                                   key === 'rknDevices' ? 'RKN设备清单' :
                                   key === 'rapDevices' ? 'RAP设备清单' :
                                   key === 'deviceStatus' ? '设备状态' :
                                   key === 'shippingNumber' ? '发货单编号' :
                                   key === 'shippingTime' ? '发货时间' :
                                   key === 'shippingLocation' ? '发货地点' :
                                   key === 'carrier' ? '承运人' :
                                   key === 'receivingStatus' ? '签收状态' :
                                   key === 'receivingNumber' ? '入库单编号' :
                                   key === 'receivingTime' ? '入库时间' :
                                   key === 'receivingLocation' ? '入库地点' :
                                   key === 'equipmentStatus' ? '设备状态' :
                                   key === 'inspectionResult' ? '入库检查' :
                                   key === 'inspectionNumber' ? '状态检查单编号' :
                                   key === 'statusResult' ? '状态检查结果' :
                                   key === 'nextAction' ? '下一步操作' :
                                   key === 'maintenanceNumber' ? '维修单编号' :
                                   key === 'triggerCondition' ? '触发条件' :
                                   key === 'maintenanceContent' ? '维修内容' :
                                   key === 'maintenanceFee' ? '维修费用' :
                                   key === 'estimatedTime' ? '预计时间' :
                                   key === 'transferNumber' ? '调拨单编号' :
                                   key === 'transferReason' ? '调拨原因' :
                                   key === 'transferFee' ? '调拨费用' :
                                   key === 'sourceWarehouse' ? '源仓库' :
                                   key === 'targetWarehouse' ? '目标仓库' :
                                   key === 'rentalFee' ? '租赁费用' :
                                   key === 'transportFee' ? '运输费' :
                                   key === 'insuranceFee' ? '保险费' :
                                   key === 'changeFee' ? '变更费' :
                                   key === 'subtotal' ? '小计' :
                                   key === 'vatRate' ? '增值税率' :
                                   key === 'vatAmount' ? '增值税' :
                                   key === 'settlementTotal' ? '结算总额' :
                                   key === 'settlementStatus' ? '结算状态' : key}
                                </div>
                                <div className="text-sm text-slate-800 font-medium">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DataFlowProcess
