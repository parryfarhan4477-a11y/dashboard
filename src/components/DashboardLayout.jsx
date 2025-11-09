import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Coins,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'NSDC Coins', path: '/coins', icon: Coins },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen flex">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 glass-card border-r border-white/10 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between lg:justify-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                NSDC JHSC
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20'
                      : 'hover:bg-white/10 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/20 border border-transparent hover:border-red-400/30 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
              <span className="font-medium text-gray-300 group-hover:text-white">
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass-card border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none" />

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass-card rounded-full">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-400">1,250</span>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 glass-card rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="hidden md:block font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
