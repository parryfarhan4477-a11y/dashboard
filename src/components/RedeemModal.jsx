import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Award, Coffee, ShoppingBag } from 'lucide-react'

function RedeemModal({ isOpen, onClose }) {
  const rewards = [
    {
      id: 1,
      name: 'NSDC T-Shirt',
      coins: 500,
      icon: ShoppingBag,
      description: 'Premium quality NSDC branded t-shirt'
    },
    {
      id: 2,
      name: 'Coffee Voucher',
      coins: 200,
      icon: Coffee,
      description: 'Free coffee at campus cafeteria'
    },
    {
      id: 3,
      name: 'Workshop Pass',
      coins: 800,
      icon: Award,
      description: 'Access to exclusive premium workshop'
    },
    {
      id: 4,
      name: 'Mystery Box',
      coins: 1000,
      icon: Gift,
      description: 'Surprise gift with exciting items'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Gift className="w-7 h-7 text-blue-400" />
                  Redeem Rewards
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rewards.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-5 hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-white/10 hover:border-blue-400/30"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                        <reward.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{reward.name}</h3>
                        <p className="text-sm text-gray-400">{reward.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-yellow-400 font-bold">{reward.coins} Coins</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                        Redeem
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default RedeemModal
