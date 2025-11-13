import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';
import { 
  Calendar, 
  MapPin, 
  Package, 
  Thermometer, 
  DollarSign,
  Clock,
  FileText,
  Eye,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* 返回按钮 */}
        <Button 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          返回主页
        </Button>
        
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">租赁订单详情</h1>
          <p className="text-slate-600">订单编号：{rentalOrderData.orderInfo.orderNumber}</p>
        </div>

        {/* 主单据区域 */}
        <Card className="shadow-md border border-gray-200 bg-white mb-8">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <FileText className="h-5 w-5 text-blue-600" />
              主单据信息
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">订单编号</label>
                <div className="font-mono text-lg text-slate-800">{rentalOrderData.orderInfo.orderNumber}</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">客户名称</label>
                <div className="text-lg text-slate-800 font-semibold">{rentalOrderData.orderInfo.customerName}</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  租赁开始日期
                </label>
                <div className="text-lg text-slate-800">
                  {formatDate(rentalOrderData.orderInfo.startDate, rentalOrderData.orderInfo.startDateWeek)}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  租赁结束日期
                </label>
                <div className="text-lg text-slate-800">
                  {formatDate(rentalOrderData.orderInfo.endDate, rentalOrderData.orderInfo.endDateWeek)}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  租赁天数
                </label>
                <div className="text-lg text-slate-800 font-semibold">{rentalOrderData.orderInfo.rentalDays}天</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">租赁方式</label>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  {rentalOrderData.orderInfo.rentalMethod}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">提箱方式</label>
                <div className="text-slate-800">{rentalOrderData.orderInfo.pickupMethod}</div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  配送地址
                </label>
                <div className="text-slate-800 bg-slate-50 p-3 rounded-md">
                  {rentalOrderData.orderInfo.deliveryAddress}
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-3">
                <Separator />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
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

        {/* 租赁明细区域 */}
        <Card className="shadow-md border border-gray-200 bg-white mb-8">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Package className="h-5 w-5 text-blue-600" />
              租赁明细
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">产品类型</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">温度要求</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">数量</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">单价</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">保险费</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">小计</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {rentalOrderData.rentalDetails.map((detail) => (
                    <tr key={detail.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">{detail.productType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Thermometer className="h-4 w-4" />
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
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          查看
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 额外费用区域 */}
        <Card className="shadow-md border border-gray-200 bg-white">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <DollarSign className="h-5 w-5 text-blue-600" />
              额外费用明细
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-700 mb-1">加急费</div>
                <div className="text-sm font-medium text-gray-500 mb-2">主订单</div>
                <div className="text-xl font-semibold text-gray-900">
                  {formatCurrency(rentalOrderData.additionalFees.rushFee)}
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-700 mb-1">取消订单费</div>
                <div className="text-sm font-medium text-gray-500 mb-2">主订单</div>
                <div className="text-xl font-semibold text-gray-900">
                  {formatCurrency(rentalOrderData.additionalFees.cancellationFee)}
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-700 mb-1">改单费</div>
                <div className="text-sm font-medium text-gray-500 mb-2">租赁明细</div>
                <div className="text-xl font-semibold text-gray-900">
                  {formatCurrency(rentalOrderData.additionalFees.modificationFee)}
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-700 mb-1">污染清理费</div>
                <div className="text-sm font-medium text-gray-500 mb-2">设备明细</div>
                <div className="text-xl font-semibold text-gray-900">
                  {formatCurrency(rentalOrderData.additionalFees.pollutionCleaningFee)}
                </div>
              </div>
            </div>
            
            {/* 总费用计算 */}
              <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">最终总金额：</span>
                  <span className="text-2xl font-bold text-blue-700">
                    {formatCurrency(calculateTotalCost())}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  * 价格计算：基础费用 + 额外费用（设备明细 → 租赁明细 → 主订单向上卷积）
                </div>
              </div>
          </CardContent>
        </Card>
      </div>

      {/* 设备明细弹窗 */}
      {showEquipmentModal && selectedRentalDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-lg border border-gray-200">
            <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  设备明细 - {selectedRentalDetail.productType}
                </h3>
                <p className="text-gray-600 text-sm">
                  数量：{selectedRentalDetail.quantity}个 | 温度要求：{selectedRentalDetail.temperatureRange}
                </p>
              </div>
            </div>
            
            <ScrollArea className="max-h-96 p-4">
              <div className="space-y-4">
                {selectedRentalDetail.equipmentDetails.map((equipment: any, index: number) => (
                  <div key={equipment.equipmentId} className="border border-slate-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">设备编号</label>
                      <div className="font-mono text-gray-800">{equipment.equipmentId}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <Thermometer className="h-4 w-4 text-gray-500" />
                        当前温度
                      </label>
                      <div className="text-gray-800 font-medium">{equipment.currentTemperature}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">设备规格</label>
                      <div className="text-gray-800">{equipment.dimensions}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">设备状态</label>
                      <Badge 
                        className={equipment.status === '正常' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {equipment.status}
                      </Badge>
                    </div>
                    
                    {equipment.pollutionCleaningFee > 0 && (
                      <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-600">污染清理费</label>
                        <div className="text-gray-800 font-medium">
                          {formatCurrency(equipment.pollutionCleaningFee)}
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Button 
                  onClick={() => setShowEquipmentModal(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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