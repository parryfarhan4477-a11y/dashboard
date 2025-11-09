import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coins as CoinsIcon, TrendingUp, Gift, History } from 'lucide-react'
import CoinTransaction from '../components/CoinTransaction'
import RedeemModal from '../components/RedeemModal'

function Coins() {
  const [balance] = useState(1250)
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false)

  const transactions = [
    {
      id: '1',
      amount: 200,
      transaction_type: 'hackathon',
      description: 'Hackathon 2024 Participation',
      created_at: new Date('2025-11-01T10:30:00')
    },
    {
      id: '2',
      amount: 100,
      transaction_type: 'workshop',
      description: 'AI Workshop Completion',
      created_at: new Date('2025-10-25T14:00:00')
    },
    {
      id: '3',
      amount: 75,
      transaction_type: 'event',
      description: 'Cloud Computing Event Attendance',
      created_at: new Date('2025-10-20T16:30:00')
    },
    {
      id: '4',
      amount: -200,
      transaction_type: 'redemption',
      description: 'Redeemed Coffee Voucher',
      created_at: new Date('2025-10-15T12:00:00')
    },
    {
      id: '5',
      amount: 50,
      transaction_type: 'event',
      description: 'Web Development Workshop',
      created_at: new Date('2025-10-10T11:00:00')
    },
    {
      id: '6',
      amount: 150,
      transaction_type: 'hackathon',
      description: 'Mini Hackathon Winner',
      created_at: new Date('2025-10-05T18:00:00')
    },
    {
      id: '7',
      amount: 60,
      transaction_type: 'workshop',
      description: 'Cybersecurity Fundamentals',
      created_at: new Date('2025-09-28T15:30:00')
    },
    {
      id: '8',
      amount: 80,
      transaction_type: 'event',
      description: 'Mobile App Development Seminar',
      created_at: new Date('2025-09-20T13:00:00')
    }
  ]

  const stats = [
    {
      title: 'Total Earned',
      value: transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Total Spent',
      value: Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)),
      icon: Gift,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Transactions',
      value: transactions.length,
      icon: History,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    }
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">NSDC Coins</h1>
        <p className="text-gray-400 text-sm md:text-base">Track and redeem your earned coins</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="glass-card p-8 border-2 border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-orange-400/10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-yellow-400/20 animate-glow">
              <CoinsIcon className="w-12 h-12 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Your Balance</p>
              <p className="text-5xl font-bold text-yellow-400">{balance}</p>
            </div>
          </div>

          <button
            onClick={() => setIsRedeemModalOpen(true)}
            className="btn-primary px-8 py-4 text-lg flex items-center gap-2"
          >
            <Gift className="w-5 h-5" />
            Redeem Rewards
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -3 }}
            className="glass-card p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-blue-400" />
            Transaction History
          </h2>
        </div>

        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <CoinTransaction key={transaction.id} transaction={transaction} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <CoinsIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No transactions yet</h3>
            <p className="text-gray-400">Start attending events to earn NSDC coins!</p>
          </motion.div>
        )}
      </div>

      <RedeemModal isOpen={isRedeemModalOpen} onClose={() => setIsRedeemModalOpen(false)} />
    </div>
  )
}

export default Coins
