import React from 'react'
import { Plane, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">鸿鹄航空科技有限公司</h3>
                <p className="text-slate-400 text-sm">Qingdao HB TempCon Aviation Co., Ltd.</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              专业的航空温控集装箱租赁服务提供商，致力于为全球航空货运提供可靠的温度控制解决方案。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">核心服务</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>RKN-AT1 温控集装箱租赁</li>
              <li>RAP-AT1 温控集装箱租赁</li>
              <li>Round Trip 短期租赁</li>
              <li>Network 网络租赁</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">系统功能</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>订单管理系统</li>
              <li>设备调度系统</li>
              <li>费用结算系统</li>
              <li>客户服务平台</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 my-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-400 mb-4 md:mb-0">
            © 2024 鸿鹄航空科技有限公司. 保留所有权利. | POC展示版本
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
