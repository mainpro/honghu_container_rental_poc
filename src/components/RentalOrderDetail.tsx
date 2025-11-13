import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { 
  Calendar, 
  MapPin, 
  Package, 
  Thermometer, 
  DollarSign,
  Clock,
  FileText,
  Eye,
  ChevronRight
} from 'lucide-react';

// 模拟数据
const rentalOrderData = {
  // 主单据信息
  orderInfo: {
    orderNumber: 'HT20241106001',
    customerName: '中国东方航空',
    startDate: '2025-11-10',
    startDateWeek: '星期一',
    endDate: '2025-11-17',
    endDateWeek: '星期一',
    rentalDays: 7,
    rentalMethod: 'Round Trip',
    pickupMethod: '承租人自提',
    deliveryAddress: '上海市浦东新区世纪大道100号',
    totalAmount: 228550,
    refundDeadline: '2025-11-08',
    refundDeadlineWeek: '星期六'
  },
  
  // 租赁明细
  rentalDetails: [
    {
      id: 1,
      productType: 'RKN-AT1',
      temperatureRange: '-18°C-0℃',
      quantity: 10,
      unitPrice: 8000,
      insuranceFee: 2000,
      subtotal: 100000,
      // 设备明细
      equipmentDetails: [
        {
          equipmentId: 'RKN-AT1-002',
          currentTemperature: '-18°C',
          dimensions: '1.5x1.2x1.0m',
          status: '待检测',
          pollutionCleaningFee: 300
        },
        {
          equipmentId: 'RKN-AT1-003',
          currentTemperature: '-16°C',
          dimensions: '1.5x1.2x1.0m',
          status: '正常',
          pollutionCleaningFee: 0
        }
      ]
    },
    {
      id: 2,
      productType: 'RKN-AT2',
      temperatureRange: '-25°C-0℃',
      quantity: 5,
      unitPrice: 9000,
      insuranceFee: 1500,
      subtotal: 52500,
      equipmentDetails: [
        {
          equipmentId: 'RKN-AT2-001',
          currentTemperature: '-25°C',
          dimensions: '1.6x1.3x1.1m',
          status: '正常',
          pollutionCleaningFee: 0
        }
      ]
    }
  ],
  
  // 额外费用
  additionalFees: {
    rushFee: 5000, // 加急费（主订单）
    cancellationFee: 2000, // 取消订单费（主订单）
    modificationFee: 1500, // 改单费（租赁明细）
    pollutionCleaningFee: 300 // 污染清理费（设备明细）
  }
};

const RentalOrderDetail: React.FC = () => {
  const [selectedRentalDetail, setSelectedRentalDetail] = useState<any>(null);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string, weekDay: string) => {
    return `${dateStr}（${weekDay}）`;
  };

  const handleViewEquipment = (rentalDetail: any) => {
    setSelectedRentalDetail(rentalDetail);
    setShowEquipmentModal(true);
  };

  const calculateTotalCost = () => {
    const baseTotal = rentalOrderData.rentalDetails.reduce((sum, detail) => sum + detail.subtotal, 0);
    return baseTotal + rentalOrderData.additionalFees.rushFee + rentalOrderData.additionalFees.cancellationFee + 
           rentalOrderData.additionalFees.modificationFee + rentalOrderData.additionalFees.pollutionCleaningFee;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br to-blue-50 from-slate-50">
      <div className="mx-auto space-y-8 max-w-6xl">
        
        {/* 页面标题 */}
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-800">租赁订单详情</h1>
          <p className="text-slate-600">订单编号：{rentalOrderData.orderInfo.orderNumber}</p>
        </div>

        {/* #1 主单据区域 */}
        <Card className="border-0 shadow-lg backdrop-blur-sm bg-white/80">
          <CardHeader className="text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg">
            <CardTitle className="flex gap-2 items-center">
              <FileText className="w-5 h-5" />
              主单据信息
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">订单编号</label>
                <div className="font-mono text-lg text-slate-800">{rentalOrderData.orderInfo.orderNumber}</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">客户名称</label>
                <div className="text-lg font-semibold text-slate-800">{rentalOrderData.orderInfo.customerName}</div>
              </div>
              
              <div className="space-y-2">
                <label className="flex gap-1 items-center text-sm font-medium text-slate-600">
                  <Calendar className="w-4 h-4" />
                  租赁开始日期
                </label>
                <div className="text-lg text-slate-800">
                  {formatDate(rentalOrderData.orderInfo.startDate, rentalOrderData.orderInfo.startDateWeek)}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex gap-1 items-center text-sm font-medium text-slate-600">
                  <Calendar className="w-4 h-4" />
                  租赁结束日期
                </label>
                <div className="text-lg text-slate-800">
                  {formatDate(rentalOrderData.orderInfo.endDate, rentalOrderData.orderInfo.endDateWeek)}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex gap-1 items-center text-sm font-medium text-slate-600">
                  <Clock className="w-4 h-4" />
                  租赁天数
                </label>
                <div className="text-lg font-semibold text-slate-800">{rentalOrderData.orderInfo.rentalDays}天</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">租赁方式</label>
                <Badge className="text-blue-700 bg-blue-50 border-blue-200">
                  {rentalOrderData.orderInfo.rentalMethod}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">提箱方式</label>
                <div className="text-slate-800">{rentalOrderData.orderInfo.pickupMethod}</div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="flex gap-1 items-center text-sm font-medium text-slate-600">
                  <MapPin className="w-4 h-4" />
                  配送地址
                </label>
                <div className="p-3 rounded-md text-slate-800">
                  {rentalOrderData.orderInfo.deliveryAddress}
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-3">
                <Separator />
              </div>
              
              <div className="space-y-2">
                <label className="flex gap-1 items-center text-sm font-medium text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  总金额
                </label>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(rentalOrderData.orderInfo.totalAmount)}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">退改签截止日期</label>
                <div className="text-slate-800">
                  {formatDate(rentalOrderData.orderInfo.refundDeadline, rentalOrderData.orderInfo.refundDeadlineWeek)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* #2 租赁明细区域 */}
        <Card className="border-0 shadow-lg backdrop-blur-sm bg-white/80">
          <CardHeader className="text-white bg-gradient-to-r from-green-600 to-green-700 rounded-t-lg">
            <CardTitle className="flex gap-2 items-center">
              <Package className="w-5 h-5" />
              租赁明细
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">产品类型</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">温度要求</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">数量</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">单价</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">保险费</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">小计</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {rentalOrderData.rentalDetails.map((detail) => (
                    <tr key={detail.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">{detail.productType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1 items-center text-slate-600">
                          <Thermometer className="w-4 h-4" />
                          {detail.temperatureRange}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-slate-900">{detail.quantity} 个</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-slate-900">{formatCurrency(detail.unitPrice)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-slate-900">{formatCurrency(detail.insuranceFee)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-green-600">{formatCurrency(detail.subtotal)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewEquipment(detail)}
                          className="flex gap-1 items-center"
                        >
                          <Eye className="w-4 h-4" />
                          查看
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* #4 额外费用区域 */}
        <Card className="border-0 shadow-lg backdrop-blur-sm bg-white/80">
          <CardHeader className="text-white bg-gradient-to-r from-orange-600 to-orange-700 rounded-t-lg">
            <CardTitle className="flex gap-2 items-center">
              <DollarSign className="w-5 h-5" />
              额外费用明细
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 text-center bg-blue-50 rounded-lg border border-blue-200">
                <div className="mb-1 text-sm font-medium text-blue-600">加急费</div>
                <div className="text-lg font-bold text-blue-800">主订单</div>
                <div className="text-xl font-semibold text-blue-900">
                  {formatCurrency(rentalOrderData.additionalFees.rushFee)}
                </div>
              </div>
              
              <div className="p-4 text-center bg-red-50 rounded-lg border border-red-200">
                <div className="mb-1 text-sm font-medium text-red-600">取消订单费</div>
                <div className="text-lg font-bold text-red-800">主订单</div>
                <div className="text-xl font-semibold text-red-900">
                  {formatCurrency(rentalOrderData.additionalFees.cancellationFee)}
                </div>
              </div>
              
              <div className="p-4 text-center bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="mb-1 text-sm font-medium text-yellow-600">改单费</div>
                <div className="text-lg font-bold text-yellow-800">租赁明细</div>
                <div className="text-xl font-semibold text-yellow-900">
                  {formatCurrency(rentalOrderData.additionalFees.modificationFee)}
                </div>
              </div>
              
              <div className="p-4 text-center bg-purple-50 rounded-lg border border-purple-200">
                <div className="mb-1 text-sm font-medium text-purple-600">污染清理费</div>
                <div className="text-lg font-bold text-purple-800">设备明细</div>
                <div className="text-xl font-semibold text-purple-900">
                  {formatCurrency(rentalOrderData.additionalFees.pollutionCleaningFee)}
                </div>
              </div>
            </div>
            
            {/* 总费用计算 */}
            <div className="p-4 mt-6 rounded-lg bg-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-slate-700">最终总金额：</span>
                <span className="text-3xl font-bold text-green-600">
                  {formatCurrency(calculateTotalCost())}
                </span>
              </div>
              <div className="mt-2 text-sm text-slate-600">
                * 价格计算：基础费用 + 额外费用（设备明细 → 租赁明细 → 主订单向上卷积）
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* #3 设备明细弹窗 */}
      {showEquipmentModal && selectedRentalDetail && (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 text-white bg-gradient-to-r from-indigo-600 to-indigo-700">
              <h3 className="text-lg font-semibold">
                设备明细 - {selectedRentalDetail.productType}
              </h3>
              <p className="text-sm text-indigo-100">
                数量：{selectedRentalDetail.quantity}个 | 温度要求：{selectedRentalDetail.temperatureRange}
              </p>
            </div>
            
            <ScrollArea className="p-4 max-h-96">
              <div className="space-y-4">
                {selectedRentalDetail.equipmentDetails.map((equipment: any, index: number) => (
                  <div key={equipment.equipmentId} className="p-4 rounded-lg border border-slate-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-600">设备编号</label>
                        <div className="font-mono text-slate-800">{equipment.equipmentId}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="flex gap-1 items-center text-sm font-medium text-slate-600">
                          <Thermometer className="w-4 h-4" />
                          当前温度
                        </label>
                        <div className="font-semibold text-slate-800">{equipment.currentTemperature}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-600">设备规格</label>
                        <div className="text-slate-800">{equipment.dimensions}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-600">设备状态</label>
                        <Badge 
                          className={equipment.status === '正常' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {equipment.status}
                        </Badge>
                      </div>
                      
                      {equipment.pollutionCleaningFee > 0 && (
                        <div className="col-span-2 space-y-2">
                          <label className="text-sm font-medium text-slate-600">污染清理费</label>
                          <div className="font-semibold text-purple-600">
                            {formatCurrency(equipment.pollutionCleaningFee)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <Button 
                onClick={() => setShowEquipmentModal(false)}
                className="w-full"
              >
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalOrderDetail;
