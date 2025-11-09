import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Calendar, Award, Zap, Gift } from 'lucide-react'

function CoinTransaction({ transaction, index }) {
  const isPositive = transaction.amount > 0

  const transactionIcons = {
    event: Calendar,
    hackathon: Zap,
    workshop: Award,
    redemption: Gift
  }

  const Icon = transactionIcons[transaction.transaction_type] || Calendar

  const transactionDate = new Date(transaction.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="glass-card p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`p-3 rounded-full ${isPositive ? 'bg-green-500/20' : 'bg-red-500/20'}`}
        >
          <Icon className={`w-5 h-5 ${isPositive ? 'text-green-400' : 'text-red-400'}`} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 truncate">
            {transaction.description}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">{transactionDate}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 capitalize">
              {transaction.transaction_type}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </motion.div>
          <span className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{transaction.amount}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default CoinTransaction
