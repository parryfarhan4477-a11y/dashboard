import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Calendar, Award, Upload, X } from 'lucide-react'

function UserProfile({ user, onUpdateUser }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const fileInputRef = useRef(null)

  const memberSince = new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onUpdateUser({ ...user, profile_picture: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfilePicture = () => {
    onUpdateUser({ ...user, profile_picture: null })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => user?.profile_picture && setIsZoomed(true)}
              className={`w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 p-1 ${user?.profile_picture ? 'cursor-pointer' : ''}`}
            >
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
            </motion.div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 animate-glow" />

            <div className="absolute -bottom-2 -right-2 flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-all shadow-lg hover:scale-110"
                title="Upload photo"
              >
                <Upload className="w-4 h-4 text-white" />
              </button>
              {user?.profile_picture && (
                <button
                  onClick={handleRemoveProfilePicture}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg hover:scale-110"
                  title="Remove photo"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
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

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-card px-6 py-4 border border-yellow-400/30 bg-yellow-400/5 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Total Coins</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {user?.coins_balance || 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isZoomed && user?.profile_picture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <img
                src={user.profile_picture}
                alt={user.full_name}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default UserProfile
