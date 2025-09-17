import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  xp: number
  points: number
  streak: number
  location?: string
  farmSize?: number
  crops?: string[]
}

export interface Mission {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  xpReward: number
  pointsReward: number
  estimatedTime: string
  steps: MissionStep[]
  isCompleted: boolean
  progress: number
  icon: string
  requirements?: string[]
}

export interface MissionStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  order: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
  icon: string
  image?: string
  views: number
  likes: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

export interface WeatherData {
  location: string
  temperature: number
  humidity: number
  windSpeed: number
  description: string
  forecast: {
    date: string
    high: number
    low: number
    condition: string
  }[]
}

export interface CommunityPostAuthor {
  id: string
  name: string
  avatar?: string
  location?: string
  level: number
  verified?: boolean
}

export interface CommunityPost {
  id: string
  title: string
  content: string
  author: CommunityPostAuthor
  category: string
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  isLiked: boolean
}

export interface MarketplaceItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  seller: string
  rating: number
  reviews: number
  inStock: boolean
  discount?: number
}

// Cart item extends a marketplace item with quantity
export interface CartItem extends MarketplaceItem {
  quantity: number
}

// Store interface
interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean

  // Missions state
  missions: Mission[]
  completedMissions: string[]
  currentMission: Mission | null

  // Blog state
  blogPosts: BlogPost[]
  featuredPosts: BlogPost[]

  // Notifications
  notifications: Notification[]
  unreadCount: number

  // Weather
  weather: WeatherData | null

  // Community
  communityPosts: CommunityPost[]

  // Marketplace
  marketplaceItems: MarketplaceItem[]
  cart: CartItem[]

  // UI state
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'

  // Actions
  setUser: (user: User | null) => void
  updateUserXP: (xp: number) => void
  updateUserPoints: (points: number) => void

  // Mission actions
  loadMissions: () => void
  startMission: (missionId: string) => void
  completeMissionStep: (missionId: string, stepId: string) => void
  completeMission: (missionId: string) => void

  // Blog actions
  loadBlogPosts: () => void
  incrementBlogViews: (postId: string) => void
  likeBlogPost: (postId: string) => void

  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  markNotificationAsRead: (notificationId: string) => void
  clearAllNotifications: () => void

  // Weather actions
  setWeather: (weather: WeatherData) => void

  // Community actions
  loadCommunityPosts: () => void
  likePost: (postId: string) => void
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'isLiked'>) => void

  // Marketplace actions
  loadMarketplaceItems: () => void
  addToCart: (item: MarketplaceItem, quantity?: number) => void
  updateCartItemQuantity: (itemId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void

  // UI actions
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

// Mock data generators
const generateMockMissions = (): Mission[] => [
  {
    id: '1',
    title: 'Water Conservation Challenge',
    description: 'Learn and implement water-saving techniques in your farming practices.',
    category: 'Water Management',
    difficulty: 'beginner',
    xpReward: 100,
    pointsReward: 50,
    estimatedTime: '2 weeks',
    icon: 'Droplets',
    progress: 0,
    isCompleted: false,
    steps: [
      { id: '1-1', title: 'Research water conservation methods', description: 'Study different water-saving techniques', isCompleted: false, order: 1 },
      { id: '1-2', title: 'Implement drip irrigation', description: 'Set up a drip irrigation system', isCompleted: false, order: 2 },
      { id: '1-3', title: 'Monitor water usage', description: 'Track and reduce water consumption', isCompleted: false, order: 3 },
    ]
  },
  {
    id: '2',
    title: 'Organic Composting Mastery',
    description: 'Create nutrient-rich compost from organic waste materials.',
    category: 'Soil Health',
    difficulty: 'intermediate',
    xpReward: 150,
    pointsReward: 75,
    estimatedTime: '3 weeks',
    icon: 'Sprout',
    progress: 0,
    isCompleted: false,
    steps: [
      { id: '2-1', title: 'Collect organic materials', description: 'Gather kitchen scraps and farm waste', isCompleted: false, order: 1 },
      { id: '2-2', title: 'Build compost pile', description: 'Create a proper compost structure', isCompleted: false, order: 2 },
      { id: '2-3', title: 'Maintain compost', description: 'Turn and monitor compost regularly', isCompleted: false, order: 3 },
      { id: '2-4', title: 'Apply compost', description: 'Use finished compost in your fields', isCompleted: false, order: 4 },
    ]
  },
  {
    id: '3',
    title: 'Natural Pest Control',
    description: 'Implement chemical-free pest management strategies.',
    category: 'Pest Management',
    difficulty: 'advanced',
    xpReward: 200,
    pointsReward: 100,
    estimatedTime: '4 weeks',
    icon: 'Bug',
    progress: 0,
    isCompleted: false,
    steps: [
      { id: '3-1', title: 'Identify common pests', description: 'Learn to recognize pest problems', isCompleted: false, order: 1 },
      { id: '3-2', title: 'Plant beneficial flowers', description: 'Add plants that attract beneficial insects', isCompleted: false, order: 2 },
      { id: '3-3', title: 'Create natural repellents', description: 'Make organic pest control solutions', isCompleted: false, order: 3 },
      { id: '3-4', title: 'Monitor pest levels', description: 'Track pest populations and effectiveness', isCompleted: false, order: 4 },
      { id: '3-5', title: 'Adjust strategies', description: 'Refine pest control methods based on results', isCompleted: false, order: 5 },
    ]
  }
]

const generateMockBlogPosts = (): BlogPost[] => [
  {
    id: '1',
    title: 'Water Conservation Techniques for Indian Farmers',
    excerpt: 'Learn about innovative water-saving methods that can reduce your water usage by up to 50% while maintaining crop yields.',
    content: 'Full blog content about water conservation...',
    author: 'Dr. Rajesh Kumar',
    publishedAt: '2025-09-15',
    readTime: 5,
    category: 'Water Management',
    tags: ['water', 'conservation', 'irrigation'],
    icon: 'Droplets',
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    title: 'Organic Composting: From Kitchen Waste to Farm Gold',
    excerpt: 'Discover how to turn your kitchen scraps and farm waste into nutrient-rich compost that improves soil health naturally.',
    content: 'Full blog content about composting...',
    author: 'Priya Sharma',
    publishedAt: '2025-09-12',
    readTime: 7,
    category: 'Soil Health',
    tags: ['composting', 'organic', 'soil'],
    icon: 'Sprout',
    views: 980,
    likes: 67
  },
  {
    id: '3',
    title: 'Natural Pest Control: Chemical-Free Solutions',
    excerpt: 'Explore effective organic pest management strategies that protect your crops without harming beneficial insects or the environment.',
    content: 'Full blog content about pest control...',
    author: 'Amit Patel',
    publishedAt: '2025-09-10',
    readTime: 6,
    category: 'Pest Management',
    tags: ['pest control', 'organic', 'natural'],
    icon: 'Bug',
    views: 1100,
    likes: 78
  }
]

const generateMockMarketplaceItems = (): MarketplaceItem[] => [
  {
    id: '1',
    name: 'Organic Tomato Seeds',
    description: 'High-yield organic tomato seeds perfect for home gardens',
    price: 299,
    originalPrice: 399,
    category: 'Seeds',
    image: '/images/tomato-seeds.jpg',
    seller: 'Green Earth Seeds',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    discount: 25
  },
  {
    id: '2',
    name: 'Drip Irrigation Kit',
    description: 'Complete drip irrigation system for efficient water usage',
    price: 2499,
    originalPrice: 2999,
    category: 'Irrigation',
    image: '/images/drip-irrigation.jpg',
    seller: 'FarmTech Solutions',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    discount: 17
  },
  {
    id: '3',
    name: 'Organic Fertilizer 5kg',
    description: 'Natural organic fertilizer for healthy plant growth',
    price: 599,
    category: 'Fertilizers',
    image: '/images/organic-fertilizer.jpg',
    seller: 'Nature\'s Best',
    rating: 4.7,
    reviews: 234,
    inStock: true
  },
  {
    id: '4',
    name: 'Biofertilizer 2kg',
    description: 'Eco-friendly biofertilizer for all crops',
    price: 399,
    originalPrice: 499,
    category: 'Fertilizers',
    image: '/images/biofertilizer.jpg',
    seller: 'AgroLife',
    rating: 4.5,
    reviews: 120,
    inStock: true,
    discount: 20
  },
  {
    id: '5',
    name: 'Garden Tool Set',
    description: 'Complete set of tools for home gardening',
    price: 799,
    originalPrice: 999,
    category: 'Tools',
    image: '/images/garden-tools.jpg',
    seller: 'ToolMaster',
    rating: 4.9,
    reviews: 210,
    inStock: true,
    discount: 20
  },
  {
    id: '6',
    name: 'Organic Pesticide',
    description: 'Safe and effective organic pesticide',
    price: 199,
    originalPrice: 249,
    category: 'Pesticides',
    image: '/images/organic-pesticide.jpg',
    seller: 'GreenGuard',
    rating: 4.3,
    reviews: 80,
    inStock: true,
    discount: 20
  },
  {
    id: '7',
    name: 'Watering Can 5L',
    description: 'Durable plastic watering can for easy irrigation',
    price: 249,
    originalPrice: 299,
    category: 'Tools',
    image: '/images/watering-can.jpg',
    seller: 'FarmEssentials',
    rating: 4.7,
    reviews: 60,
    inStock: true,
    discount: 17
  }
]

// Create the store
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      missions: [],
      completedMissions: [],
      currentMission: null,
      blogPosts: [],
      featuredPosts: [],
      notifications: [],
      unreadCount: 0,
      weather: null,
      communityPosts: [],
      marketplaceItems: [],
      cart: [],
      sidebarOpen: false,
      theme: 'system',

      // User actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      updateUserXP: (xp) => set((state) => ({
        user: state.user ? { ...state.user, xp: state.user.xp + xp } : null
      })),
      updateUserPoints: (points) => set((state) => ({
        user: state.user ? { ...state.user, points: state.user.points + points } : null
      })),

      // Mission actions
      loadMissions: () => set({ missions: generateMockMissions() }),
      startMission: (missionId) => {
        const mission = get().missions.find(m => m.id === missionId)
        if (mission) {
          set({ currentMission: mission })
        }
      },
      completeMissionStep: (missionId, stepId) => {
        set((state) => ({
          missions: state.missions.map(mission => {
            if (mission.id === missionId) {
              const updatedSteps = mission.steps.map(step =>
                step.id === stepId ? { ...step, isCompleted: true } : step
              )
              const completedSteps = updatedSteps.filter(step => step.isCompleted).length
              const progress = (completedSteps / mission.steps.length) * 100
              return { ...mission, steps: updatedSteps, progress }
            }
            return mission
          })
        }))
      },
      completeMission: (missionId) => {
        const mission = get().missions.find(m => m.id === missionId)
        if (mission) {
          set((state) => ({
            completedMissions: [...state.completedMissions, missionId],
            missions: state.missions.map(m =>
              m.id === missionId ? { ...m, isCompleted: true, progress: 100 } : m
            ),
            currentMission: state.currentMission?.id === missionId ? null : state.currentMission
          }))

          // Award XP and points
          get().updateUserXP(mission.xpReward)
          get().updateUserPoints(mission.pointsReward)

          // Add notification
          get().addNotification({
            title: 'Mission Completed!',
            message: `Congratulations! You completed "${mission.title}" and earned ${mission.xpReward} XP and ${mission.pointsReward} points.`,
            type: 'success',
            isRead: false,
            actionUrl: '/missions'
          })
        }
      },

      // Blog actions
      loadBlogPosts: () => set({ blogPosts: generateMockBlogPosts(), featuredPosts: generateMockBlogPosts().slice(0, 3) }),
      incrementBlogViews: (postId) => {
        set((state) => ({
          blogPosts: state.blogPosts.map(post =>
            post.id === postId ? { ...post, views: post.views + 1 } : post
          )
        }))
      },
      likeBlogPost: (postId) => {
        set((state) => ({
          blogPosts: state.blogPosts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        }))
      },

      // Notification actions
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }))
      },
      markNotificationAsRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map(notification =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }))
      },
      clearAllNotifications: () => set({ notifications: [], unreadCount: 0 }),

      // Weather actions
      setWeather: (weather) => set({ weather }),

      // Community actions
      loadCommunityPosts: () => set({ communityPosts: [] }),
      likePost: (postId) => {
        set((state) => ({
          communityPosts: state.communityPosts.map(post =>
            post.id === postId
              ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
              : post
          )
        }))
      },
      addCommunityPost: (post) => {
        const newPost: CommunityPost = {
          ...post,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isLiked: false
        }
        set((state) => ({
          communityPosts: [newPost, ...state.communityPosts]
        }))
      },

      // Marketplace actions
      loadMarketplaceItems: () => set({ marketplaceItems: generateMockMarketplaceItems() }),
      addToCart: (item, quantity = 1) => {
        set((state) => {
          const existing = state.cart.find(ci => ci.id === item.id)
          if (existing) {
            return {
              cart: state.cart.map(ci =>
                ci.id === item.id ? { ...ci, quantity: Math.min(99, ci.quantity + quantity) } : ci
              )
            }
          }
          const cartItem: CartItem = { ...item, quantity: Math.max(1, Math.min(99, quantity)) }
          return { cart: [...state.cart, cartItem] }
        })
      },
      updateCartItemQuantity: (itemId, quantity) => {
        set((state) => {
          const qty = Math.max(0, Math.min(99, quantity))
          if (qty === 0) {
            return { cart: state.cart.filter(ci => ci.id !== itemId) }
          }
          return {
            cart: state.cart.map(ci => ci.id === itemId ? { ...ci, quantity: qty } : ci)
          }
        })
      },
      removeFromCart: (itemId) => {
        set((state) => ({
          cart: state.cart.filter(item => item.id !== itemId)
        }))
      },
      clearCart: () => set({ cart: [] }),

      // UI actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'farmgrow-storage',
      version: 2,
      migrate: (persistedState: any, version) => {
        if (!persistedState) return persistedState
        // v1 -> v2: ensure cart items have quantity
        if (version < 2 && Array.isArray(persistedState.cart)) {
          persistedState.cart = persistedState.cart.map((it: any) => ({
            ...it,
            quantity: typeof it?.quantity === 'number' ? it.quantity : 1,
          }))
        }
        return persistedState
      },
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        completedMissions: state.completedMissions,
        theme: state.theme,
        cart: state.cart
      })
    }
  )
)
