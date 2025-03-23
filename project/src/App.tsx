import React, { useState } from 'react';
import { MessageCircle, Share2, HandHeart, Building2, Users, Search, Bell, Menu, Send, ThumbsUp } from 'lucide-react';

type Tab = 'resources' | 'volunteers' | 'businesses' | 'discussions';

interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('discussions');
  const [newMessage, setNewMessage] = useState('');
  const [newReply, setNewReply] = useState<{ [key: number]: string }>({});
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Sarah Chen",
      content: "Looking to share some gardening tools this weekend. Anyone interested?",
      timestamp: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      likes: 3,
      replies: [
        {
          id: 1,
          user: "David Kim",
          content: "I'd love to borrow a spade if you have one!",
          timestamp: "1 hour ago",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150"
        }
      ]
    },
    {
      id: 2,
      user: "Michael Rodriguez",
      content: "Our local café is hosting a community breakfast this Sunday!",
      timestamp: "3 hours ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      likes: 5,
      replies: []
    }
  ]);

  const tabs = [
    { id: 'resources', label: 'Resource Sharing', icon: Share2 },
    { id: 'volunteers', label: 'Volunteer Coordination', icon: HandHeart },
    { id: 'businesses', label: 'Local Business', icon: Building2 },
    { id: 'discussions', label: 'Local Discussions', icon: MessageCircle }
  ];

  const handlePostMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: messages.length + 1,
      user: "Current User",
      content: newMessage,
      timestamp: "Just now",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      likes: 0,
      replies: []
    };

    setMessages([newMsg, ...messages]);
    setNewMessage('');
  };

  const handlePostReply = (messageId: number) => {
    if (!newReply[messageId]?.trim()) return;

    const updatedMessages = messages.map(message => {
      if (message.id === messageId) {
        return {
          ...message,
          replies: [...message.replies, {
            id: message.replies.length + 1,
            user: "Current User",
            content: newReply[messageId],
            timestamp: "Just now",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
          }]
        };
      }
      return message;
    });

    setMessages(updatedMessages);
    setNewReply({ ...newReply, [messageId]: '' });
  };

  const handleLike = (messageId: number) => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, likes: message.likes + 1 }
        : message
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">CommunityConnect</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Community Messages</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {messages.map((message) => (
                  <div key={message.id} className="p-4">
                    <div className="flex space-x-3">
                      <img
                        src={message.avatar}
                        alt={message.user}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{message.user}</h3>
                          <p className="text-sm text-gray-500">{message.timestamp}</p>
                        </div>
                        <p className="text-sm text-gray-600">{message.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button 
                            onClick={() => handleLike(message.id)}
                            className="flex items-center text-sm text-gray-500 hover:text-blue-600"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {message.likes}
                          </button>
                          <button 
                            onClick={() => setShowReplies({ ...showReplies, [message.id]: !showReplies[message.id] })}
                            className="text-sm text-gray-500 hover:text-blue-600"
                          >
                            {message.replies.length} replies
                          </button>
                        </div>

                        {/* Replies Section */}
                        {showReplies[message.id] && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-100">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="mb-3">
                                <div className="flex space-x-3">
                                  <img
                                    src={reply.avatar}
                                    alt={reply.user}
                                    className="h-8 w-8 rounded-full"
                                  />
                                  <div>
                                    <div className="flex items-center">
                                      <h4 className="text-sm font-medium text-gray-900">{reply.user}</h4>
                                      <span className="ml-2 text-xs text-gray-500">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{reply.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Reply Input */}
                            <div className="flex items-center mt-2">
                              <input
                                type="text"
                                value={newReply[message.id] || ''}
                                onChange={(e) => setNewReply({ ...newReply, [message.id]: e.target.value })}
                                placeholder="Write a reply..."
                                className="flex-1 border rounded-l-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => handlePostReply(message.id)}
                                className="bg-blue-600 text-white px-3 py-1 rounded-r-lg text-sm hover:bg-blue-700"
                              >
                                <Send className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Start a Conversation</h2>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="What would you like to share with your community?"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button 
                onClick={handlePostMessage}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Post Message
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be respectful and inclusive</li>
                <li>• Share accurate information</li>
                <li>• Keep conversations constructive</li>
                <li>• Report inappropriate content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;