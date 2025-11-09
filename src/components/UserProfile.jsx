import { motion } from 'framer-motion'
import { User, Mail, Calendar, Award } from 'lucide-react'

function UserProfile({ user }) {
  const memberSince = new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 p-1">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 animate-glow" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-1">
            {user?.full_name || 'John Doe'}
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{user?.email || 'john.doe@example.com'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Member since {memberSince}</span>
            </div>
          </div>
        </div>

        <div className="glass-card px-6 py-4 border border-yellow-400/30 bg-yellow-400/5">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Total Coins</p>
              <p className="text-2xl font-bold text-yellow-400">
                {user?.coins_balance || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default UserProfile
