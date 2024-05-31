import React, { useState } from 'react';
import {
  DashboardOutlined,
  TransactionOutlined,
  LineChartOutlined,
  WalletOutlined,
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  HistoryOutlined,
  SettingOutlined,
  BellOutlined,
} from '@ant-design/icons';


const Dashboard = () => {
  const [isFolded, setIsFolded] = useState(false);

  const toggleSidebar = () => {
    setIsFolded(!isFolded);
  };

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardOutlined /> },
    { label: 'Transaction', icon: <TransactionOutlined /> },
    { label: 'Statistics', icon: <LineChartOutlined /> },
    { label: 'Analytics', icon: <LineChartOutlined /> },
    { label: 'My Wallet', icon: <WalletOutlined /> },
    { label: 'Inbox', icon: <MailOutlined /> },
    { label: 'Integrations', icon: <LineChartOutlined /> },
    { label: 'User', icon: <UserOutlined /> },
    { label: 'Calendar', icon: <CalendarOutlined /> },
    { label: 'History', icon: <HistoryOutlined /> },
    { label: 'Setting', icon: <SettingOutlined /> },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`bg-white text-gray-100 flex flex-col ${isFolded ? 'w-20' : 'w-64'} transition-width duration-300`}>
        <div className="p-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isFolded ? 'hidden' : 'block'}`}>BankCo.</h1>
          <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
            {isFolded ? '>' : '<'}
          </button>
        </div>
        <nav className="flex-1 px-6">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="my-2">
                <a href="#" className="flex items-center py-2 px-2 rounded hover:bg-gray-800">
                  <span className="text-xl">{item.icon}</span>
                  {!isFolded && <span className="ml-4">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-4 border-t border-gray-800">
          <ul>
            <li className="my-2">
              <a href="#" className="flex items-center py-2 px-2 rounded hover:bg-gray-800">
                <SettingOutlined className="text-xl" />
                {!isFolded && <span className="ml-4">Support</span>}
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="flex items-center py-2 px-2 rounded hover:bg-gray-800">
                <SettingOutlined className="text-xl" />
                {!isFolded && <span className="ml-4">Setting</span>}
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="flex items-center py-2 px-2 rounded hover:bg-gray-800">
                <SettingOutlined className="text-xl" />
                {!isFolded && <span className="ml-4">Sign in</span>}
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="flex items-center py-2 px-2 rounded hover:bg-gray-800">
                <SettingOutlined className="text-xl" />
                {!isFolded && <span className="ml-4">Sign up</span>}
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="flex items-center py-2 px-2 rounded hover:bg-gray-800">
                <SettingOutlined className="text-xl" />
                {!isFolded && <span className="ml-4">Coming Soon</span>}
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p>Let's check your update today</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full"></span>
              <button className="text-gray-600 hover:text-gray-900">
                <BellOutlined />
              </button>
            </div>
            <div className="relative">
              <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full"></span>
              <button className="text-gray-600 hover:text-gray-900">
                <MailOutlined />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full"/>
              <div>
                <p className="text-gray-800 font-bold">John Doe</p>
                <p className="text-gray-600 text-sm">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white shadow p-4 rounded-lg">
              <h3 className="text-xl font-bold">Total Earnings</h3>
              <p className="text-2xl">$7,245.00</p>
              <p className="text-green-500">+ 3.5% from last week</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
              <h3 className="text-xl font-bold">Total Spending</h3>
              <p className="text-2xl">$7,245.00</p>
              <p className="text-green-500">+ 3.5% from last week</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
              <h3 className="text-xl font-bold">Spending Goal</h3>
              <p className="text-2xl">$7,245.00</p>
              <p className="text-green-500">+ 3.5% from last week</p>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold">Revenue Flow</h3>
            <div className="h-40">{/* Placeholder for chart */}</div>
          </div>
          <div className="bg-white shadow p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold">Efficiency</h3>
            <div className="flex items-center justify-between">
              <div className="w-1/2">
                <p>$5,230</p>
                <p className="text-green-500">Arrival</p>
              </div>
              <div className="w-1/2">
                <p>$6,230</p>
                <p className="text-red-500">Spending</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold">Transaction List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200">Location</th>
                    <th className="py-2 px-4 border-b border-gray-200">Amount Spent</th>
                    <th className="py-2 px-4 border-b border-gray-200">Transaction Date</th>
                    <th className="py-2 px-4 border-b border-gray-200">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Philadelphia, USA</td>
                    <td className="py-2 px-4 border-b border-gray-200">$101.00</td>
                    <td className="py-2 px-4 border-b border-gray-200">01/11/2024</td>
                    <td className="py-2 px-4 border-b border-gray-200">Pending</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Philadelphia, USA</td>
                    <td className="py-2 px-4 border-b border-gray-200">$101.00</td>
                    <td className="py-2 px-4 border-b border-gray-200">01/11/2024</td>
                    <td className="py-2 px-4 border-b border-gray-200">Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
        {/* Wallet and Quick Transfer */}
        <aside className="bg-white shadow p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold">My Wallet</h3>
          <div className="my-4">
            <div className="bg-gray-200 rounded-lg p-4">
              <p className="text-lg font-bold">Balance</p>
              <p className="text-2xl">$24,098.00</p>
            </div>
          </div>
          <div className="my-4">
            <h4 className="text-lg font-bold">Quick Transfer</h4>
            <div className="flex items-center my-2">
              <span className="flex-1 text-gray-700">Debit</span>
              <span className="font-bold text-gray-800">$10,431</span>
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-2 border rounded-lg"
            />
            <button className="w-full mt-2 p-2 bg-green-500 text-white rounded-lg">Send Money</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
