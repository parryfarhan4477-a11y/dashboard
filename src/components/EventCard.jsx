import { motion } from 'framer-motion'
import { Calendar, MapPin, Coins, ExternalLink, Clock } from 'lucide-react'

function EventCard({ event, index }) {
  const eventDate = new Date(event.event_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  const eventTime = new Date(event.event_date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const statusColors = {
    upcoming: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
    ongoing: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
    completed: 'from-gray-500/20 to-slate-500/20 border-gray-400/30'
  }

  const statusTextColors = {
    upcoming: 'text-blue-400',
    ongoing: 'text-green-400',
    completed: 'text-gray-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card overflow-hidden group cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5 }}
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md bg-gradient-to-r ${statusColors[event.status]} border`}
        >
          <span className={statusTextColors[event.status]}>{event.status}</span>
        </motion.div>
        {event.coins_reward > 0 && (
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-yellow-400/20 border border-yellow-400/30"
          >
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-400">+{event.coins_reward}</span>
          </motion.div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{eventDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>{eventTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <span>View Details</span>
          <ExternalLink className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default EventCard
