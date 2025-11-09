import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Award, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import UserProfile from '../components/UserProfile'
import EventCard from '../components/EventCard'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [stats, setStats] = useState({
    totalEvents: 0,
    coinsEarned: 0,
    eventsAttended: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    const mockUser = {
      id: '1',
      email: 'john.doe@example.com',
      full_name: 'John Doe',
      profile_picture: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg',
      coins_balance: 1250,
      created_at: new Date('2024-01-15')
    }
    setUser(mockUser)

    const { data: events } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'upcoming')
      .order('event_date', { ascending: true })
      .limit(3)

    if (events && events.length > 0) {
      setUpcomingEvents(events)
    } else {
      setUpcomingEvents([
        {
          id: '1',
          title: 'Web Development Workshop',
          description: 'Learn modern web development with React and Node.js',
          event_date: new Date('2025-12-15T14:00:00'),
          location: 'Tech Lab, Building A',
          image_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
          coins_reward: 50,
          status: 'upcoming'
        },
        {
          id: '2',
          title: 'AI & Machine Learning Bootcamp',
          description: 'Dive into artificial intelligence and machine learning fundamentals',
          event_date: new Date('2025-12-20T10:00:00'),
          location: 'Conference Hall, Main Campus',
          image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
          coins_reward: 100,
          status: 'upcoming'
        },
        {
          id: '3',
          title: 'Hackathon 2025',
          description: '24-hour coding challenge with amazing prizes',
          event_date: new Date('2025-12-25T09:00:00'),
          location: 'Innovation Center',
          image_url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
          coins_reward: 200,
          status: 'upcoming'
        }
      ])
    }

    setStats({
      totalEvents: 12,
      coinsEarned: 1250,
      eventsAttended: 8
    })
  }

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: 'Coins Earned',
      value: stats.coinsEarned,
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      title: 'Events Attended',
      value: stats.eventsAttended,
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    }
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{user?.full_name?.split(' ')[0] || 'User'}!</span>
        </h1>
        <p className="text-gray-400">Here's what's happening with your NSDC journey</p>
      </motion.div>

      <UserProfile user={user} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          <button className="btn-secondary text-sm">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
