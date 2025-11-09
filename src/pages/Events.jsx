import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { supabase } from '../lib/supabase'
import EventCard from '../components/EventCard'

function Events() {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [filter])

  const fetchEvents = async () => {
    let query = supabase.from('events').select('*').order('event_date', { ascending: true })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data } = await query

    if (data && data.length > 0) {
      setEvents(data)
    } else {
      setEvents([
        {
          id: '1',
          title: 'Web Development Workshop',
          description: 'Learn modern web development with React and Node.js. Build full-stack applications from scratch.',
          event_date: new Date('2025-12-15T14:00:00'),
          location: 'Tech Lab, Building A',
          image_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
          coins_reward: 50,
          status: 'upcoming'
        },
        {
          id: '2',
          title: 'AI & Machine Learning Bootcamp',
          description: 'Dive into artificial intelligence and machine learning fundamentals. Hands-on projects included.',
          event_date: new Date('2025-12-20T10:00:00'),
          location: 'Conference Hall, Main Campus',
          image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
          coins_reward: 100,
          status: 'upcoming'
        },
        {
          id: '3',
          title: 'Hackathon 2025',
          description: '24-hour coding challenge with amazing prizes. Team up and build innovative solutions.',
          event_date: new Date('2025-12-25T09:00:00'),
          location: 'Innovation Center',
          image_url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
          coins_reward: 200,
          status: 'upcoming'
        },
        {
          id: '4',
          title: 'Cloud Computing Workshop',
          description: 'Master AWS, Azure, and Google Cloud platforms. Get hands-on with cloud deployments.',
          event_date: new Date('2025-11-05T13:00:00'),
          location: 'Lab 3, IT Building',
          image_url: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
          coins_reward: 75,
          status: 'completed'
        },
        {
          id: '5',
          title: 'Cybersecurity Fundamentals',
          description: 'Learn essential cybersecurity concepts and protect digital assets effectively.',
          event_date: new Date('2025-10-20T11:00:00'),
          location: 'Security Lab, Building B',
          image_url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
          coins_reward: 60,
          status: 'completed'
        },
        {
          id: '6',
          title: 'Mobile App Development',
          description: 'Build native and cross-platform mobile applications. iOS and Android covered.',
          event_date: new Date('2025-12-18T15:00:00'),
          location: 'Mobile Dev Lab',
          image_url: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
          coins_reward: 80,
          status: 'upcoming'
        }
      ])
    }
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
        <p className="text-gray-400">Discover and register for exciting events</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 glass-card border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition-colors"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-3 rounded-lg whitespace-nowrap font-medium transition-all ${
                filter === option.value
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-12 text-center"
        >
          <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  )
}

export default Events
