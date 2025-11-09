import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Save,
  Camera,
  Bell,
  Shield,
  Palette
} from 'lucide-react'

function Settings() {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    eventReminders: true,
    coinUpdates: false,
    darkMode: true
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePreferenceChange = (key) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Profile updated:', formData)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    console.log('Password changed')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-gray-400">Manage your profile and preferences</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <User className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Profile Information</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 p-1">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <span className="text-sm text-gray-400">Change Photo</span>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 glass-card border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 glass-card border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 glass-card border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 glass-card border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 glass-card border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" className="btn-primary flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Update Password
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Preferences</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(preferences).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 glass-card rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                {key === 'emailNotifications' && <Mail className="w-5 h-5 text-gray-400" />}
                {key === 'eventReminders' && <Bell className="w-5 h-5 text-gray-400" />}
                {key === 'coinUpdates' && <ImageIcon className="w-5 h-5 text-gray-400" />}
                {key === 'darkMode' && <Palette className="w-5 h-5 text-gray-400" />}
                <span className="text-white font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
              <button
                onClick={() => handlePreferenceChange(key)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    value ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Settings
